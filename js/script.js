/**
 * Main Application Script
 * Handles general functionality
 */

document.addEventListener("DOMContentLoaded", function() {
    console.log("Portfolio loaded!");
    
    // Add smooth scroll behavior
    setupSmoothScroll();
});

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
