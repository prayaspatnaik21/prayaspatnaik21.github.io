#include <cerrno>
#include <cstdint>
#include <cstring>
#include <fcntl.h>
#include <iomanip>
#include <iostream>
#include <linux/videodev2.h>
#include <string>
#include <sys/ioctl.h>
#include <unistd.h>

namespace
{
int ioctlRetryOnInterrupt(int fileDescriptor, unsigned long request, void* argument)
{
    int result = -1;

    do
    {
        result = ::ioctl(fileDescriptor, request, argument);
    }
    while(result == -1 && errno == EINTR);

    return result;
}

const char* text(const __u8* value)
{
    return reinterpret_cast<const char*>(value);
}

void printVersion(std::uint32_t version)
{
    const std::uint32_t major = (version >> 16U) & 0xFFU;
    const std::uint32_t minor = (version >> 8U) & 0xFFU;
    const std::uint32_t patch = version & 0xFFU;

    std::cout << major << '.' << minor << '.' << patch;
}

void printFlag(std::uint32_t capabilities,
               std::uint32_t flag,
               const char* name)
{
    std::cout << "  " << std::left << std::setw(30) << name
              << ((capabilities & flag) != 0U ? "yes" : "no") << '\n';
}

void printCapabilities(std::uint32_t capabilities)
{
    std::cout << "  Raw mask:                     0x"
              << std::hex << std::setw(8) << std::setfill('0')
              << capabilities
              << std::dec << std::setfill(' ') << '\n';

    printFlag(capabilities, V4L2_CAP_VIDEO_CAPTURE,
              "Single-planar capture:");
    printFlag(capabilities, V4L2_CAP_VIDEO_CAPTURE_MPLANE,
              "Multi-planar capture:");
    printFlag(capabilities, V4L2_CAP_READWRITE,
              "read()/write() I/O:");
    printFlag(capabilities, V4L2_CAP_STREAMING,
              "Streaming I/O:");
    printFlag(capabilities, V4L2_CAP_EXT_PIX_FORMAT,
              "Extended pixel format:");
}
}

int main(int argc, char* argv[])
{
    if(argc > 2)
    {
        std::cerr << "Usage: " << argv[0] << " [video-device]\n";
        return 2;
    }

    const std::string devicePath = argc == 2 ? argv[1] : "/dev/video0";

    const int fileDescriptor =
        ::open(devicePath.c_str(), O_RDWR | O_NONBLOCK);

    if(fileDescriptor == -1)
    {
        std::cerr << "open(" << devicePath << ") failed: "
                  << std::strerror(errno) << '\n';
        return 1;
    }

    v4l2_capability capability{};

    if(ioctlRetryOnInterrupt(fileDescriptor,
                             VIDIOC_QUERYCAP,
                             &capability) == -1)
    {
        const int savedError = errno;
        ::close(fileDescriptor);

        std::cerr << "VIDIOC_QUERYCAP failed: "
                  << std::strerror(savedError) << '\n';
        return 1;
    }

    const bool hasDeviceCapabilities =
        (capability.capabilities & V4L2_CAP_DEVICE_CAPS) != 0U;

    const std::uint32_t nodeCapabilities =
        hasDeviceCapabilities
            ? capability.device_caps
            : capability.capabilities;

    std::cout << "VIDIOC_QUERYCAP succeeded\n\n";
    std::cout << "Device:      " << devicePath << '\n';
    std::cout << "Driver:      " << text(capability.driver) << '\n';
    std::cout << "Card:        " << text(capability.card) << '\n';
    std::cout << "Bus:         " << text(capability.bus_info) << '\n';
    std::cout << "Version:     ";
    printVersion(capability.version);
    std::cout << '\n';

    std::cout << "\nCapabilities for this /dev/videoX node:\n";
    printCapabilities(nodeCapabilities);

    std::cout << "\nV4L2_CAP_DEVICE_CAPS present: "
              << (hasDeviceCapabilities ? "yes" : "no") << '\n';

    if(hasDeviceCapabilities)
    {
        std::cout << "The program used device_caps for the node-specific "
                     "capability checks.\n";
    }

    if(::close(fileDescriptor) == -1)
    {
        std::cerr << "close() failed: " << std::strerror(errno) << '\n';
        return 1;
    }

    return 0;
}
