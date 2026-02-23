/**
 * Main Application Script
 * Handles general functionality
 */

document.addEventListener("DOMContentLoaded", function() {
    console.log("Portfolio loaded!");
    
    // Add smooth scroll behavior
    setupSmoothScroll();
    
    // Trigger greeting animation
    setupGreetingAnimation();
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

/**
 * Setup greeting animation on page load
 */
function setupGreetingAnimation() {
    const profileImg = document.getElementById('profileImg');
    const greetingMessage = document.getElementById('greetingMessage');
    
    if (profileImg && greetingMessage) {
        // Start the profile image animation
        setTimeout(() => {
            profileImg.classList.add('animate-greeting');
            
            // Show the greeting message
            setTimeout(() => {
                greetingMessage.classList.add('show');
                
                // Hide greeting after 4 seconds
                setTimeout(() => {
                    greetingMessage.classList.remove('show');
                }, 4000);
            }, 800);
        }, 500);
    }
}
