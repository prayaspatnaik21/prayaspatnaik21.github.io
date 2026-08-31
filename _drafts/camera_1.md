---
layout: post
title: "Capturing Camera Frames with V4L2: Opening the Device"
date: 2026-08-30
category: "Camera, Linux, V4L2"
reading_time: 8
icon: "V4L2"
---

# Camera Blog
-------------

In the previous post, I streamed frames from an IMX477 camera on the Jetson Orin Nano using GStreamer. This confirmed that the sensor, driver, and Jetson camera pipeline were working correctly. However, GStreamer handled most of the capture process for me, leaving the lower-level communication hidden. This led me to my next question: **How does an application capture camera frames through Linux?**

NVIDIA's Jetson camera software stack provides several ways for an application to access camera frames. Applications can use the Argus API directly, or they can build a GStreamer pipeline using NVIDIA's `nvarguscamerasrc` plugin, which uses the Argus API to access the camera and ISP pipeline. In the previous post, I used this GStreamer path to display ISP-processed frames without managing the lower-level capture operations myself.


When an application needs raw sensor data instead of ISP-processed output, it can use a V4L2 capture interface if the camera driver exposes the required raw format. On my setup, `/dev/video0` provides frames from the IMX477 as 10-bit Bayer data in the `RG10` pixel format. This gives my application the raw image data needed for a custom processing pipeline. Before building that pipeline, however, I first need to understand how V4L2 moves a captured frame into application memory.

Before looking at the individual V4L2 operations, I mapped the capture process into a set of fundamental questions:

1. How does the application identify and open the correct camera capture interface?
2. How does it determine what that interface supports?
3. How do the application and the driver agree on the frame format?
4. Where does the driver store the captured frame?
5. How does the application know when a frame is ready?
6. How does the application access the frame and return its buffer to the driver?

Each question corresponds to one stage of the V4L2 capture process:

1. Open the capture device.
2. Query its capabilities.
3. Configure the frame format.
4. Request and map the buffers.
5. Queue the buffers.
6. Start the video stream.
7. Wait for and dequeue a completed frame.
8. Process and requeue the buffer.
9. Stop streaming and release the resources.

<figure class="post-image">
    <img src="{{ '/images/camera_blog_v4l2_images/v4l2_capture_diagram.jpg' | relative_url }}" alt="Hand-drawn flowchart of the complete V4L2 camera capture process from opening the device through cleanup">
    <figcaption>The complete V4L2 capture flow: initialization, the repeating frame-processing loop, and resource cleanup.</figcaption>
</figure>


1. Opening the capture device

    1. When the camera driver registers a V4L2 capture interface, Linux exposes that interface through a device node such as `/dev/video0`.
    2. This node represents an interface through which an application can communicate with the camera driver. It does not represent the image data itself.
    3. Before sending V4L2 requests, the application opens the capture node with the `open()` system call.

        ```cpp
        fileDescriptor_ = ::open(configuration_.devicePath.c_str(), O_RDWR | O_NONBLOCK);
        ```
        1. `configuration_.devicePath.c_str()` supplies the device-node path.
        2. `O_RDWR` requests read and write access, which is required by many V4L2 streaming operations.
        3. `O_NONBLOCK` prevents operations such as `VIDIOC_DQBUF` from waiting when no completed frame is available.
    4. On success, `open()` returns a non-negative file descriptor. The application uses this descriptor in subsequent calls such as `ioctl()`, `poll()`, and `close()`.
    5. It returns `-1` on failure and sets `errno` to describe the error.
    6. The file descriptor is the application's handle to the open capture interface. It does not contain a frame. The application uses it to send subsequent requests to the driver.



2. Querying device capabilities

    1. Opening `/dev/video0` gives the application a handle to the capture interface, but it does not tell the application what that interface supports.
    2. Before configuring formats or allocating buffers, the application queries the device's capabilities.
    3. V4L2 extends standard file operations through device-specific commands called IOCTLs. The application sends an IOCTL request to the driver using the file descriptor returned by `open()`.

        ```cpp
        v4l2_capability capability{};

        if (::ioctl(fileDescriptor_, VIDIOC_QUERYCAP, &capability) == -1)
        {
            // Handle the error
        }
        ```

        1. `fileDescriptor_` → identifies the open capture interface.
        2. `VIDIOC_QUERYCAP` → identifies the requested operation.
        3. `&capability` → points to the structure the driver will fill.
    4. Important capabilities for the program are:
        1. `V4L2_CAP_VIDEO_CAPTURE`
        2. `V4L2_CAP_VIDEO_CAPTURE_MPLANE`
        3. `V4L2_CAP_STREAMING`
        4. `V4L2_CAP_READWRITE`
        5. `V4L2_CAP_DEVICE_CAPS`
    5. If the opened device is not a V4L2 device, `VIDIOC_QUERYCAP` fails with `-1`, and `errno` may be set to `EINVAL`.

    I compiled `queryCap.cpp` on the Jetson and ran it against the IMX477 capture node:

    ```text
    VIDIOC_QUERYCAP succeeded

    Device:      /dev/video0
    Driver:      tegra-video
    Card:        vi-output, imx477 9-001a
    Bus:         platform:tegra-capture-vi:2
    Version:     5.15.148
    Capabilities for this /dev/videoX node:
      Raw mask:0x 04200001
      Single-planar capture:        yes
      Multi-planar capture:         no
      read()/write() I/O:           no
      Streaming I/O:                yes
      Extended pixel format:        yes

    V4L2_CAP_DEVICE_CAPS present: yes
    The program used device_caps for the node-specific capability checks.
    ```

    The result shows that `/dev/video0` supports single-planar capture and streaming I/O, but not multi-planar capture or ordinary `read()`/`write()` I/O. Because `V4L2_CAP_DEVICE_CAPS` is present, the program uses `capability.device_caps` when checking the capabilities of this specific video node.


3. Configuring the frame format

    1. Before allocating buffers, the application and driver must agree on how each captured frame will be represented in memory.
    2. The frame format defines the image dimensions, pixel organization, row stride, and required buffer size. Without this agreement, the application would not know how to interpret the bytes in a completed buffer.

    The capability query showed that `/dev/video0` supports single-planar capture. Therefore, the application sets `format.type` to `V4L2_BUF_TYPE_VIDEO_CAPTURE` and uses the `format.fmt.pix` member:

    ```cpp
    v4l2_format format{};

    format.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    format.fmt.pix.width = 4032;
    format.fmt.pix.height = 3040;
    format.fmt.pix.pixelformat = V4L2_PIX_FMT_SRGGB10;
    format.fmt.pix.field = V4L2_FIELD_NONE;
    ```

    The requested fields mean:

    1. `width` and `height` request a frame size of 4032 × 3040 pixels.
    2. `pixelformat` requests 10-bit Bayer data with an RGGB color-filter pattern. Its V4L2 FourCC is `RG10`.
    3. `field` requests progressive frames rather than interlaced fields.

    The application sends the request to the driver with `VIDIOC_S_FMT`:

    ```cpp
    if (::ioctl(fileDescriptor_, VIDIOC_S_FMT, &format) == -1)
    {
        // Handle the error.
    }
    ```

    `VIDIOC_S_FMT` performs a negotiation. The requested values are not guaranteed to be accepted exactly as supplied. The driver may adjust unsupported dimensions or other properties and writes the negotiated values back into the same `v4l2_format` structure. Therefore, the application must inspect the returned structure after the call.

    The important returned fields are:

    1. `format.fmt.pix.width` and `format.fmt.pix.height` — the accepted dimensions.
    2. `format.fmt.pix.pixelformat` — the accepted pixel format.
    3. `format.fmt.pix.bytesperline` — the number of bytes between the start of two consecutive rows.
    4. `format.fmt.pix.sizeimage` — the number of bytes required for one complete image buffer.

    On my Jetson setup, the driver returned:

    ```text
    Width:           4032
    Height:          3040
    Pixel format:    RG10
    Bytes per line:  8064
    Image size:      24514560 bytes
    ```

    Although the sensor produces 10-bit samples, this Tegra capture format stores each sample in a 16-bit word. A row therefore occupies `4032 × 2 = 8064` bytes, and the complete image requires `8064 × 3040 = 24,514,560` bytes.

    An application should still use the values returned in `bytesperline` and `sizeimage` instead of assuming that rows are tightly packed. Drivers and capture hardware may introduce padding or alignment requirements. The returned `sizeimage` will later determine whether each mapped buffer is large enough to contain a complete frame.

4. Requesting and mapping capture buffers

    After negotiating the frame layout, the application needs memory in which the capture hardware can store frames. With V4L2 memory-mapped streaming, the application asks the driver to create a pool of capture buffers and then maps each buffer into its virtual address space.

    Three operations are involved:

    ```text
    VIDIOC_REQBUFS  → request a driver-managed buffer pool
    VIDIOC_QUERYBUF → obtain the length and mapping offset of each buffer
    mmap()          → make each buffer accessible in the application
    ```

    ### Requesting the buffer pool

    The application first prepares a `v4l2_requestbuffers` structure:

    ```cpp
    v4l2_requestbuffers request{};

    request.count = 4;
    request.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    request.memory = V4L2_MEMORY_MMAP;

    if (::ioctl(fileDescriptor_, VIDIOC_REQBUFS, &request) == -1)
    {
        // Handle the error.
    }
    ```

    `count` is the number of buffers requested by the application. The driver may provide fewer buffers, so the application must inspect `request.count` after the call. `type` must match the single-planar capture type used during format negotiation, and `memory` selects memory-mapped streaming.

    My application requests four buffers and rejects the configuration if the driver returns fewer than two. Multiple buffers allow the capture hardware to keep filling one buffer while the application processes another.

    ### Querying and mapping each buffer

    `VIDIOC_REQBUFS` creates the buffer pool, but it does not give the application pointers to those buffers. For every index returned by the driver, the application uses `VIDIOC_QUERYBUF` to obtain the buffer's length and mapping offset:

    ```cpp
    for (std::uint32_t index = 0; index < request.count; ++index)
    {
        v4l2_buffer buffer{};

        buffer.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
        buffer.memory = V4L2_MEMORY_MMAP;
        buffer.index = index;

        if (::ioctl(fileDescriptor_, VIDIOC_QUERYBUF, &buffer) == -1)
        {
            // Handle the error.
        }

        void* address = ::mmap(
            nullptr,
            buffer.length,
            PROT_READ | PROT_WRITE,
            MAP_SHARED,
            fileDescriptor_,
            static_cast<off_t>(buffer.m.offset)
        );

        if (address == MAP_FAILED)
        {
            // Handle the error.
        }
    }
    ```

    `VIDIOC_QUERYBUF` does not copy any image data. It describes one buffer in the driver-managed pool. The returned `length` tells the application how much memory to map, while `buffer.m.offset` identifies that buffer within the device's mapping area.

    **Backing memory** is the actual memory storage used for the V4L2 capture buffer. The capture hardware, kernel driver, and application may refer to this storage in different ways. The application does not use the driver's kernel address; `mmap()` gives the application its own virtual address through which it can access the same buffer contents.

    <figure class="post-image">
        <img src="{{ '/images/camera_blog_v4l2_images/memory_mapping.jpg' | relative_url }}" alt="Hand-drawn diagram showing capture hardware writing to a driver-managed buffer pool mapped to application virtual addresses">
        <figcaption>Each driver-managed capture buffer is mapped to a virtual address that the application can use.</figcaption>
    </figure>

    On success, `mmap()` returns the starting virtual address of that buffer in the application's address space. In the example above, this address is stored in the `address` pointer. The mapping refers to the driver-managed capture buffer; `mmap()` does not copy the frame into a separate application buffer.

    Later, `VIDIOC_DQBUF` tells the application which buffer contains a completed frame by returning its index. The application uses that index to select the corresponding mapped address and reads the image bytes through the pointer:

    ```cpp
    void* imageData = mappedBuffers_[buffer.index].address;
    std::size_t imageBytes = buffer.bytesused;
    ```

    In other words, the capture hardware writes into the backing buffer, and the application accesses those bytes through the virtual address returned by `mmap()`.

    The application stores both the mapped address and length for every buffer:

    ```cpp
    struct MappedBuffer
    {
        void* address;
        std::size_t length;
    };
    ```

    Before accepting a buffer, the application verifies that `buffer.length` is at least as large as the negotiated `sizeimage`. This connects buffer allocation to the previous section: every mapped buffer must be large enough to hold one complete frame in the format returned by `VIDIOC_S_FMT`.

    Mapping a buffer does not start capture and does not mean that the buffer contains a valid frame. The application must next queue the mapped buffers with `VIDIOC_QBUF` and start the video stream.

5. Queueing buffers and starting the stream

    The buffers are now allocated and mapped, but the driver cannot use them until the application explicitly places them in the incoming buffer queue. The application submits each mapped buffer with `VIDIOC_QBUF`:

    ```cpp
    for (std::size_t index = 0; index < mappedBuffers_.size(); ++index)
    {
        v4l2_buffer buffer{};

        buffer.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
        buffer.memory = V4L2_MEMORY_MMAP;
        buffer.index = static_cast<std::uint32_t>(index);

        if (::ioctl(fileDescriptor_, VIDIOC_QBUF, &buffer) == -1)
        {
            // Handle the error.
        }
    }
    ```

    `type` and `memory` must match the values used when the buffers were requested. `index` identifies which mapped buffer is being submitted. `VIDIOC_QBUF` does not copy image data; it transfers ownership of that buffer from the application to the driver.

    Buffer ownership is important because it determines which component may safely use the memory:

    ```text
    Before VIDIOC_QBUF   → application owns the buffer
    After VIDIOC_QBUF    → driver owns the buffer
    After VIDIOC_DQBUF   → application owns the completed buffer
    After another QBUF   → driver owns the buffer again
    ```

    <figure class="post-image">
        <img src="{{ '/images/camera_blog_v4l2_images/buffer_ownership.jpg' | relative_url }}" alt="Hand-drawn diagram of V4L2 buffer ownership transferring between the application and driver through QBUF and DQBUF">
        <figcaption>Buffer ownership moves from the application to the driver with <code>VIDIOC_QBUF</code> and returns with <code>VIDIOC_DQBUF</code>.</figcaption>
    </figure>

    While a buffer is queued, the application must not treat its contents as a stable frame because the capture hardware may be writing into it. The application waits until the driver returns ownership through `VIDIOC_DQBUF`.

    ### Starting capture

    After all mapped buffers have been queued, the application starts the video stream:

    ```cpp
    v4l2_buf_type type = V4L2_BUF_TYPE_VIDEO_CAPTURE;

    if (::ioctl(fileDescriptor_, VIDIOC_STREAMON, &type) == -1)
    {
        // Handle the error.
    }
    ```

    `VIDIOC_STREAMON` starts streaming for the specified buffer type. The capture hardware can now fill the queued buffers. When one buffer contains a completed frame, it becomes available for the application to dequeue.

    Queueing multiple buffers before `VIDIOC_STREAMON` keeps the capture pipeline supplied with memory. While the application processes one completed buffer, the driver can continue capturing into other queued buffers.

6. Waiting for a completed frame

    After streaming starts, the capture hardware works asynchronously. The application should not repeatedly call `VIDIOC_DQBUF` in a busy loop because that would waste CPU time while no frame is ready. Instead, it waits for activity on the camera file descriptor with `poll()`:

    ```cpp
    pollfd pollDescriptor{};
    pollDescriptor.fd = fileDescriptor_;
    pollDescriptor.events = POLLIN;

    int pollResult = ::poll(
        &pollDescriptor,
        1,
        timeoutMilliseconds
    );
    ```

    `poll()` does not retrieve or copy a frame. It waits until the file descriptor reports an event. `POLLIN` indicates that a completed capture buffer should be available for dequeuing.

    The return value must be interpreted before continuing:

    1. A positive value means that one or more requested events occurred.
    2. Zero means that the timeout expired without a frame becoming ready. This is not necessarily a camera failure.
    3. `-1` indicates an error. If `errno` is `EINTR`, the call was interrupted by a signal and may be retried.

    The application should also inspect `pollDescriptor.revents`. Flags such as `POLLERR`, `POLLHUP`, or `POLLNVAL` report an error rather than a readable frame.

7. Dequeueing and accessing the frame

    When `poll()` reports `POLLIN`, the application asks the driver which buffer contains the completed frame:

    ```cpp
    v4l2_buffer buffer{};
    buffer.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    buffer.memory = V4L2_MEMORY_MMAP;

    if (::ioctl(fileDescriptor_, VIDIOC_DQBUF, &buffer) == -1)
    {
        // Handle EAGAIN or another error.
    }
    ```

    `VIDIOC_DQBUF` removes one completed buffer from the driver's outgoing queue and transfers its ownership to the application. It does not copy the image bytes out of the mapped memory. Instead, the driver fills fields that describe the completed frame, including:

    1. `index` — identifies which mapped buffer contains the frame.
    2. `bytesused` — reports how many bytes in that buffer are valid for this frame.
    3. `sequence` — provides the frame sequence number assigned by the driver.

    Because the camera was opened with `O_NONBLOCK`, `VIDIOC_DQBUF` can return `-1` with `errno` set to `EAGAIN` if no completed buffer is currently available. Even after `poll()`, an application should handle this possibility safely.

    The returned index connects the V4L2 buffer to the virtual address saved after `mmap()`:

    ```cpp
    if (buffer.index >= mappedBuffers_.size())
    {
        // The driver returned an invalid index.
    }

    const MappedBuffer& mappedBuffer = mappedBuffers_[buffer.index];

    if (buffer.bytesused > mappedBuffer.length)
    {
        // The reported frame is larger than the mapping.
    }

    const std::uint8_t* imageData = static_cast<const std::uint8_t*>(mappedBuffer.address);
    const std::size_t imageBytes = buffer.bytesused;
    ```

    `imageData` now points to the beginning of the completed frame in the application's virtual address space. The application interprets those bytes using the negotiated width, height, pixel format, and `bytesperline` values.

8. Processing and requeueing the buffer

    Between `VIDIOC_DQBUF` and the next `VIDIOC_QBUF`, the application owns the buffer. It may inspect or process the image during this interval. A frame view that points into this mapped buffer remains valid only while the application retains ownership.

    When processing is complete, the application returns the buffer to the driver:

    ```cpp
    v4l2_buffer bufferToQueue{};
    bufferToQueue.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    bufferToQueue.memory = V4L2_MEMORY_MMAP;
    bufferToQueue.index = completedBufferIndex;

    if (::ioctl(fileDescriptor_, VIDIOC_QBUF, &bufferToQueue) == -1)
    {
        // Handle the error.
    }
    ```

    After `VIDIOC_QBUF` succeeds, the driver owns the buffer again and the capture hardware may overwrite it with a future frame. The application must not continue using `imageData` after requeueing that buffer.

    The complete application-level capture loop can now be summarized as:

    ```cpp
    camera.initialize();
    camera.start();

    while (capturing)
    {
        std::optional<RawFrameView> frame = camera.waitForFrame(1000);

        if (!frame)
        {
            // The timeout expired without a completed frame.
            continue;
        }

        processFrame(*frame);
        camera.requeueBuffer(frame->bufferIndex);
    }

    camera.stop();
    ```

    `waitForFrame()` performs the `poll()` and `VIDIOC_DQBUF` operations described above. The returned frame view refers directly to a mapped V4L2 buffer, so `processFrame()` must finish using that view before `requeueBuffer()` returns the buffer to the driver. A production implementation must also ensure that the buffer is requeued if frame processing exits early or throws an exception.

9. Stopping streaming and releasing resources

    When capture is finished, the application must stop the stream before unmapping the buffers. It passes the same buffer type used for `VIDIOC_STREAMON` to `VIDIOC_STREAMOFF`:

    ```cpp
    v4l2_buf_type type = V4L2_BUF_TYPE_VIDEO_CAPTURE;

    if (::ioctl(fileDescriptor_, VIDIOC_STREAMOFF, &type) == -1)
    {
        // Handle the error.
    }
    ```

    `VIDIOC_STREAMOFF` stops capture and removes the buffers from the driver's queues. After this call, the capture hardware should no longer write new frames into those buffers.

    The application then removes every virtual-memory mapping created by `mmap()`:

    ```cpp
    for (MappedBuffer& buffer : mappedBuffers_)
    {
        if (buffer.address != nullptr &&
            buffer.address != MAP_FAILED)
        {
            ::munmap(buffer.address, buffer.length);
        }
    }
    ```

    `munmap()` invalidates the application's virtual address for that buffer. Any pointer or frame view referring to the mapping must not be used afterward.

    Finally, the application closes the file descriptor:

    ```cpp
    if (fileDescriptor_ != -1)
    {
        ::close(fileDescriptor_);
        fileDescriptor_ = -1;
    }
    ```

    Closing the descriptor releases the open V4L2 device handle and the remaining driver-side resources associated with it.

    My `V4L2Camera` class performs this cleanup from its destructor by calling `stop()`, `unmapBuffers()`, and `closeDevice()` in that order. This ensures that resources are also released when initialization or later processing exits through an error path.
