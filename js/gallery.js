document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-gallery-carousel]").forEach((carousel) => {
        const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
        const descriptions = Array.from(carousel.querySelectorAll("[data-carousel-description]"));
        const previousButton = carousel.querySelector("[data-carousel-previous]");
        const nextButton = carousel.querySelector("[data-carousel-next]");

        if (slides.length === 0) {
            return;
        }

        let currentIndex = 0;

        const loadMedia = (index) => {
            const slide = slides[index];
            const image = slide?.querySelector("img[data-carousel-src]");
            const videoSource = slide?.querySelector("video source[data-carousel-src]");

            if (image) {
                image.src = image.dataset.carouselSrc;
                delete image.dataset.carouselSrc;
            }

            if (videoSource) {
                videoSource.src = videoSource.dataset.carouselSrc;
                delete videoSource.dataset.carouselSrc;
                videoSource.closest("video").load();
            }
        };

        const showPhoto = (index) => {
            currentIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, slideIndex) => {
                const isCurrent = slideIndex === currentIndex;
                slide.hidden = !isCurrent;
                slide.classList.toggle("is-active", isCurrent);
                slide.setAttribute("aria-hidden", String(!isCurrent));

                if (!isCurrent) {
                    slide.querySelector("video")?.pause();
                }
            });

            descriptions.forEach((description, descriptionIndex) => {
                const isCurrent = descriptionIndex === currentIndex;
                description.hidden = !isCurrent;
                description.classList.toggle("is-active", isCurrent);
            });

            loadMedia(currentIndex);
            loadMedia((currentIndex + 1) % slides.length);
        };

        previousButton.addEventListener("click", () => showPhoto(currentIndex - 1));
        nextButton.addEventListener("click", () => showPhoto(currentIndex + 1));

        carousel.addEventListener("keydown", (event) => {
            if (event.target.closest?.("video")) {
                return;
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                showPhoto(currentIndex - 1);
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                showPhoto(currentIndex + 1);
            }
        });

        if (slides.length === 1) {
            previousButton.hidden = true;
            nextButton.hidden = true;
        }

        showPhoto(0);
    });
});
