let slideIndex = 0;
const slider = document.querySelector('.testimonial-slider');
const testimonials = document.getElementsByClassName('testimonial');
let testimonialWidth;
let visibleCount;

function calculateVisibleCount() {
    const sliderWidth = slider.clientWidth;
    testimonialWidth = testimonials[0].clientWidth;
    visibleCount = Math.floor(sliderWidth / testimonialWidth);
}

function showSlides() {
    const totalTestimonials = testimonials.length;
    const maxSlides = totalTestimonials - visibleCount;

    // Adjust slideIndex if it's out of bounds
    if (slideIndex > maxSlides) {
        slideIndex = maxSlides;
    }
    if (slideIndex < 0) {
        slideIndex = 0;
    }

    slider.style.transform = `translateX(${-slideIndex * testimonialWidth}px)`;
}

function plusSlides(n) {
    const totalTestimonials = testimonials.length;
    const maxSlides = totalTestimonials - visibleCount;

    slideIndex += n;

    // Adjust slideIndex to be within valid range
    if (slideIndex > maxSlides) {
        slideIndex = maxSlides;
    }
    if (slideIndex < 0) {
        slideIndex = 0;
    }
    showSlides();
}

// Initial setup
calculateVisibleCount();
showSlides();

// Adjust slideIndex and visibleCount on resize
window.addEventListener('resize', () => {
    calculateVisibleCount();
    showSlides();
});