# V4L2 camera blog examples

These examples support the camera blog series and are intentionally separate
from the WITHIN application. Each program demonstrates one small V4L2 concept,
prints the intermediate structures returned by the driver, and can be compiled
directly on the Jetson controller.

## Design

The examples will be developed in dependency order:

1. `01_querycap.cpp` — open the video node and call `VIDIOC_QUERYCAP`.
2. Format enumeration — `VIDIOC_ENUM_FMT`, `VIDIOC_ENUM_FRAMESIZES`, and
   `VIDIOC_ENUM_FRAMEINTERVALS`.
3. Format inspection and negotiation — `VIDIOC_G_FMT`, `VIDIOC_TRY_FMT`, and
   later `VIDIOC_S_FMT`.
4. Control enumeration — `VIDIOC_QUERY_EXT_CTRL`, `VIDIOC_QUERYMENU`, and
   `VIDIOC_G_CTRL`/`VIDIOC_G_EXT_CTRLS`.
5. Buffer allocation and mapping — `VIDIOC_REQBUFS`, `VIDIOC_QUERYBUF`, and
   `mmap()`.
6. Streaming ownership — `VIDIOC_QBUF`, `VIDIOC_STREAMON`, `poll()`,
   `VIDIOC_DQBUF`, requeue, and `VIDIOC_STREAMOFF`.

Only the first example is implemented now. Keeping each stage independent makes
the returned kernel data visible without hiding it inside the full WITHIN camera
class.

## Why `VIDIOC_QUERYCAP` comes first

`VIDIOC_QUERYCAP` is read-only and does not change the sensor mode, format,
controls, or buffer state. It tells the application what kind of V4L2 node was
opened and which I/O mechanisms that node reports.

The program prints:

- driver name;
- card/device name;
- bus information;
- driver version;
- raw capability mask;
- single-planar versus multi-planar capture support;
- `read()`/`write()` support;
- streaming-I/O support;
- whether `device_caps` must be used for node-specific capabilities.

When `V4L2_CAP_DEVICE_CAPS` is present in `capabilities`, applications must use
the `device_caps` field to check the capabilities of the opened `/dev/videoX`
node. The aggregate `capabilities` field may describe the larger physical
device.

## Target test plan

The example should be compiled natively on the Jetson because macOS does not
provide Linux's `<linux/videodev2.h>` userspace API header.

### 1. Copy only the example to the controller

Run from the website repository root:

```bash
scp examples/v4l2_camera/01_querycap.cpp pattuX:/tmp/01_querycap.cpp
```

### 2. Compile with warnings enabled

```bash
ssh pattuX
g++ -std=c++17 -Wall -Wextra -Wpedantic \
    /tmp/01_querycap.cpp -o /tmp/01_querycap
```

This program uses only the C++ standard library and Linux/V4L2 headers. It does
not require OpenCV, GStreamer, libargus, or libv4l2.

### 3. Run it against the IMX477 capture node

```bash
/tmp/01_querycap /dev/video0
```

The default is already `/dev/video0`, so this is equivalent:

```bash
/tmp/01_querycap
```

### 4. Compare with the standard utility

```bash
v4l2-ctl -d /dev/video0 --info
```

The driver, card, bus, version, and capability masks should agree. The custom
program is useful for the blog because it shows exactly which structure and bit
tests produce the information summarized by `v4l2-ctl`.

### 5. Test the error path

```bash
/tmp/01_querycap /dev/video999
echo $?
```

The program should print an `open()` error and return a nonzero exit status.

### 6. Remove target-only build artifacts

```bash
rm /tmp/01_querycap /tmp/01_querycap.cpp
```

## Safety classification for later examples

| Stage | Changes camera state? | Test rule |
|---|---|---|
| `QUERYCAP`, enumeration, `G_FMT`, control queries | No | Can be tested read-only |
| `TRY_FMT` | No persistent format change | Verify returned proposal only |
| `S_FMT`, `S_CTRL` | Yes | Record and restore the original state |
| `REQBUFS`, mapping, streaming | Yes, for the open file handle | Stop WITHIN first and always clean up |

The buffer/streaming example should not be written as one large jump. It should
be built and tested in the order `REQBUFS -> QUERYBUF -> mmap -> QBUF ->
STREAMON -> poll -> DQBUF -> QBUF -> STREAMOFF -> munmap` so ownership can be
observed at every boundary.

## Validation status

Validated on the Jetson controller on 2026-08-30:

```text
COMPILE_EXIT=0

VIDIOC_QUERYCAP succeeded

Device:      /dev/video0
Driver:      tegra-video
Card:        vi-output, imx477 9-001a
Bus:         platform:tegra-capture-vi:2
Version:     5.15.148

Capabilities for this /dev/videoX node:
  Raw mask:                     0x04200001
  Single-planar capture:        yes
  Multi-planar capture:         no
  read()/write() I/O:           no
  Streaming I/O:                yes
  Extended pixel format:        yes

V4L2_CAP_DEVICE_CAPS present: yes
VALID_EXIT=0
```

`v4l2-ctl -d /dev/video0 --info` returned the same driver, card, bus,
version, node capability mask, and decoded capability flags.

The error-path test produced:

```text
open(/dev/video999) failed: No such file or directory
INVALID_EXIT=1
```

The compiler emitted no warnings with `-Wall -Wextra -Wpedantic`. The temporary
source and binary were removed from the controller after validation.
