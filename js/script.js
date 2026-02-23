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
    console.log("Setting up greeting animation...");
    
    const profileImg = document.getElementById('profileImg');
    const greetingMessage = document.getElementById('greetingMessage');
    
    console.log("Profile img found:", !!profileImg);
    console.log("Greeting message found:", !!greetingMessage);
    
    if (profileImg && greetingMessage) {
        console.log("Both elements found, starting animation...");
        
        // Start the profile image animation
        setTimeout(() => {
            console.log("Adding animate-greeting class to profile image");
            profileImg.classList.add('animate-greeting');
            
            // Show the greeting message
            setTimeout(() => {
                console.log("Adding show class to greeting message");
                greetingMessage.classList.add('show');
                
                // Hide greeting after 4 seconds
                setTimeout(() => {
                    console.log("Removing show class from greeting message");
                    greetingMessage.classList.remove('show');
                }, 4000);
            }, 800);
        }, 500);
    } else {
        console.log("Missing elements - profileImg:", profileImg, "greetingMessage:", greetingMessage);
    }
}
