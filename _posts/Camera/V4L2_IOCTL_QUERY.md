# IOCTL VIDIOC_QUERYCAP

1. Query Device Capabilities
2. V4L2 devices support the VIDIOC_QUERYCAP ioctl. It is used to identify kernel devices compatible with this specification and to obtain information about driver and hardware capabilities.
3. A specification means the format V4L2 API contract that defines the ioctl is supposed to do , what arguments an application must provide etc.
4. The ioctl takes a pointer to a struct ``` v4l2_capability ``` which is filled by the driver. when the driver is not compatible with this specification the ioctl returns an EINVAL error code.
5. There are various device capabilities flag which tells about what can be done with device.

# IOCTL VIDIOC_QUERYCTRL , VIDIOC_QUERY_EXT_CTRL , VIDIOC_QUERYMENU

1. Enumerate controls and menu control items.
2. To query the attributes of a control applications
    1. set id field of a struct v4l2_queryctrl
    2. call the VIDIOC_QUERYCTRL ioctl with pointer to this structure.
    3. The driver fills the rest of the structure.

# Framework Architecture and the Main Data Structures

1. Drivers normally mirror the hardware model in programming.
2. In V4L2 context , the diverse IP components are modeled as software blocks called sub devices.
3. V4L2 sub devices are usually kernel only objects.
4. Core of V4L2
    1. struct v4l2_device : A hardware device may contain multiple child devices. It is the root node of all these devices and is responsible for managing all child devices.
5. struct video_device - provide the well known /dev/videoX or /dev/v4l-subdevX device nodes.
    1. This structure abstracts the capture interface or bridge interface (because it carries data from the data lines to the kernel memory).
    2. This will always be either part of the SoC or connected to high speed buses such as PCI.
    3. base class for all devices and sub devices.
6. struct vb2_queue
    1. used in the logic of data streaming and the center part of the DMA operations.
7. struct v4l2_subdev
    1. This is the sub device responsible for implementing specific functions and abstracting a specific function in the video system of the SoC.


# Leveraging the V4L2 API from the User Space


1. The main purpose of device drivers is controlling and leveraging the underlying hardware while exposing functionalities to users.
2. The V4L2 user space API has a reduced number of functions and a lot of data structures , all defined in include/uapi/linux/videodev2.h.
3. This API relies on the following functions:
    1. open() : To open a video device.
    2. close() : To close a video device.
    3. ioctl() : To send ioctl commands to the display driver.
    4. mmap() : To memory map a driver allocated buffer to user space.
    5. read() or write() : depending on the streaming method.
4. This reduced set of APIs is extended by a very large number of ioctl commands , the most important of which are as follows:

    1. VIDIOC_QUERYCAP - query the capabilities of the driver. User space passes a struct v4l2_capability  structure , which will be filled by the video driver with the relevant information.
    2. VIDIO_ENUM_FMT - enumerate the image formats that are supported by the driver. The driver user space passes a structu v4l2_fmtdesc structure, which will be filled by the driver with the relevant information.
    3. VIDIOC_G_FMT - for a capture device , this is used to get the current image format. for a display device , you use this to get the current display window. In either case , the user space passes a struct v4l2_format structure , which will be filled by the driver with the relevant information.
    4. VIDIOC_S_FMT - set a new image format for a capture device or a new display window for a display (output device). The driver may change the values passed by user space if they are not supported.
    5. VIDIOC_CROPCAP - used to get the default cropping rectangle based on the current image size and the current display panel size. The driver fills a struct v4l2_cropcap structure.
    6. VIDIO_G_CROP - used to get the current cropping rectangle. The driver fills a struct v4l2_crop structure.
    7. VIDIO_S_CROP - used to set a new cropping rectangle. The driver fills a struct v4l2_crop structure.
    8. VIDIOC_REQBUFS - this ioctl is used to request a number of buffers that can later be memory mapped. The driver fills a struct    ``` v4l2_requestbuffers ``` structure. As the driver may allocate more or less than the actual number of buffers requested , the application should check how many buffers are really granted. No buffer is queued yet after this.
    9. The VIDIOC_QUERYBUF ioctl is used to get a buffer's information , which can be used by the mmap() system call in order to map that buffer to user space.
    10. VIDIOC_DQBUF is used to dequeue a filled buffer (from the V4L2's list of ready buffers for the input device) or a displayed (output device) buffer by passing a struct v4l2_buffer structure associated with that buffer. This will block if no buffer is ready unless O_NONBLOCK was used with open(), in which case VIDIOC_DQBUF will immediately return with an EAGAIN error code. You should call VIDIOC_DQBUF only after STREAMON has been called. In the meantime, calling this ioctl after STREAMOFF would return -EINVAL.
    11. VIDIOC_STREAMON is used to turn on streaming. After that, any VIDIOC_QBUF results in an image are rendered.
    12. VIDIOC_STREAMOFF is used to turn off streaming. This ioctl removes all buffers. It actually flushes the buffer queue.

# Video Device Opening and Property Management

    1. Drivers expose node entries in the /dev/ directory corresponding to the video interfaces they are responsible for.
    2. These file nodes correspond to /dev/videoX special files for capture devices.
    3. The application must open the appropriate file node prior to any interaction with the video device. It uses the open() system call for that , which will return a file descriptor that will be entry point for any command sent to the device.
    4. After opening , we do query the device capabilities.

# Query the device capabilities

    1. query the capabilities of the device in order to make sure it supports the mode we need to work with.
    2. Use VIDIOC_QUERYCAP ioctl command.

# Buffer Management

    Introduction
    ============

    1. Consider this in V4L2 , two buffer queues are maintained
        1. Driver (referred to as input queue)
        2. User (referred to as OUTPUT Queue)
    2. Buffers are queued into the driver's queue by the user space application in order to be filled with data (the application uses VIDIOC_QBUF)
    3. Buffers are filled by the driver in the order they have been enqueued.
    4. Once filled , each buffer is moved off the INPUT queue and put into the OUTPUT queue , which is the user queue.
    5. when the user application calls VIDIOC_DQBUF in order to dequeue a buffer , this buffer is looked for into the OUTPUT queue.
    6. If it's in there , the buffer will be dequeued and pushed to the user application , otherwise the application will wait until a filled buffer is there.
    7. After the user finishes using the buffer , it must call VIDIOC_QBUF on this buffer in order to enqueue it back in the INPUT queue so that it can be filled again.
    8. After driver initialization , the application calls the VIDIOC_REQBUFS ioctl to set the number of buffers it needs to work with.
    9. Once this is granted , the application queues all the buffers using VIDIOC_QBUF and then calls the VIDIOC_STREAMON ioctl.
    10. Then the driver goes ahead on its own. and fills the queued buffers. If there are no more queued buffers , then the driver will be waiting for a buffer to be queued in by the application. If such a case arises , that it means that some frames are lost in the capture itself.

    Image Buffer Format
    ===================

    1. The V4L2 API uses v4l2_-format to represent the buffer format, whatever the type of the device is.
    2. An image buffer is a region of memory containing the bytes for one captured frame. The image buffer format is the agreement between your application and the V4L2 driver about those bytes must be interpreted.
    2. The format tells you:
        1. Image width and height
        2. Pixel format such as YUYV , NV12 , or RGB24
        3. How color components are arranged in memroy.
        4. Whether the image uses one plane or multiple planes.
        5. How many bytes separate two consecutive image rows.
        6. How much memory is required for one complete frame.
        7. Whether the frame is progressive or interlaced.
        8. color space information.

        9.Query the current format
            1. Application can ask the driver about the image format video node currently configured to use. (``` VIDIOC_G_FMT ```)
            2. G - get and FMT - Format
        10. Create and Zero initialize ``` v4l2_format ```
            1. The application prepares - ``` v4l2_format format{} ```.
            2. Set the buffer type
                1. The Application must tell the driver which kind of buffer format it is asking about:
                format.type = V4L2_BUG_TYPE_VIDEO_CAPTURE
                2. for multi planar
                format.type = V4L2_BUF_TYPE_VIDEO_CAPTURE_MPLANE
                3. the type field tells the driver which member of the fmt union should be used.
        11. Call VIDIOC_G_FMT
            1. For single planar capture device
                1. ``` if(ioctl(fd , VIDIOC_G_FMT, & format) == -1) {
                    // handle error
                } ```
            2. The driver then fills the structure with its current configuration.

        12. Modify only the properties of interest
            1. After retrieving the current format , the application can modify selected fields.
            2. The advantage of querying first is that fields you do not intend to change retain reasonable driver-provided values.

        13. Send the requested format back
            1. The modified structure is sent to the driver back using ``` VIDIOC_S_FMT ```
            2. S - set
            3. ``` if(ioctl(fd , VIDIOC_S_FMT , &format) == -1){

            } ```
            4. The driver may adjust the request. Example - if the application requests an unsupported size , the driver might return the closest
            supported dimensions. Therefore, the application must inspect the returned structure after VIDIOC_S_FMT. It contains the format what was actually negotiated.

        14. Querying first is common , but not mandatory
            1. The application does not have to call ``` VIDIOC_G_FMT ``` before ``` VIDIOC_S_FMT ```
            2. Important Format Fields
                1. width and height -> describe the requests or active image dimensions in pixels.
                2. Pixel format -> which color components are present , bit depth , whether chroma is subsampled or not.
                3. Eg - ``` V4L2_PIX_FMT_YUYV ```
                4. ``` V4L2_PIX_FMT_NV12 ```
                5. ``` V4L2_PIX_FMT_RGB24 ```
            3. field - describes the field or interlacing organization
                1. for progressive video - V4L2_FIELD_NONE
                2. For interlaced video , the buffer may contain both fields interlaced , top fields only.
            4. bytes per line
                1. called pitch or stride , this is the distance in bytes between the start of the one row and the start of the next.
                2. It's not always width * bytes per pixel - The hardware may add padding for memory alignment , Applications should therefor use the driver provided bytesperline rather than assuming that rows are tightly packed.
        15. sizeimage
            1. This is the number of bytes required to store one complete image buffer.
            2. For many uncompressed single planar formats , it is approximately
                1. sizeimage = bytesperline * height.
            3. The driver determines the final value because padding , multiple planes , compressed data , and hardware alignment can affect it.

        16. Packed , Planar and Semi Planar formats

            1. Packed - Color Components are interleaved in one continuous sequence
                1. ``` R G B | R G B | ```
                2. ``` Y U Y V | Y U Y V | ```

            2. Planar
                1. Each color component is stored in separate region
                    1. [Y_plane] [U_plane] [V_plane]

            3. Semi Planar
                1. one component has its own plane , while the other components are interleaved together
                    1. [Y_plane][interleaved UV plane]

            4. YUYV
                1. Packed YUV 4 : 2 : 2
                2. Four bytes represent two pixels
                    1. Each pixel has its own brightness value Y.
                    2. Two adjacent pixels share the U and V chroma values.

        17. Flow
            1. Create and Zero v4l2_format
            2. set format.type
            3. VIDIOC_G_FMT
            4. Driver returns current format
            5. Application changes selected fields.
            6. VIDIOC_S_FMT
            7. Driver validates or adjust the requests
            8. Application reads back the actual negotiated format
            9. Allocate/request buffers using the returned layout

    3. Negotiation between application and the V4L2 driver
        1. Image format Negotiation
        2. Streaming parameter negotiation

```

Device
======
Path:    /dev/video0
Driver:  tegra-video
Card:    vi-output, imx477 9-001a
Bus:     platform:tegra-capture-vi:2
API:     Single-planar capture
Streaming I/O: supported

Supported pixel formats
=======================

Format index: 0
  FourCC: RG10
  Description: 10-bit Bayer RGRG/GBGB
  Flags: 0x0
  Compressed: no
  Emulated: no
    Resolution: 4032x3040
      Frame intervals:
        1/21 seconds per frame = 21.000 FPS
    Resolution: 3840x2160
      Frame intervals:
        1/30 seconds per frame = 30.000 FPS
    Resolution: 1920x1080
      Frame intervals:
        1/60 seconds per frame = 60.000 FPS

Current single-planar format
============================
Width:           4032
Height:          3040
Pixel format:    RG10
Field:           1
Bytes per line:  8064
Image size:      24514560 bytes
Colorspace:      8
Quantization:    0
Transfer func:   0
Y'CbCr encoding: 0

Current streaming parameters
============================
Capability flags: 0x1000
Frame-rate selection: supported
Time per frame: 1/21 seconds
Current FPS: 21.000
Read buffers: 0

```