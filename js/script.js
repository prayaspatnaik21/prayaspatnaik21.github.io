/**
 * Main Application Script
 * Handles general functionality
 */

document.addEventListener("DOMContentLoaded", function() {
    console.log("=== PAGE LOADED ===");
    console.log("Portfolio loaded!");
    
    // Add smooth scroll behavior
    setupSmoothScroll();
    
    // Trigger greeting animation
    setupGreetingAnimation();
    
    console.log("=== SETUP COMPLETE ===");
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
    console.log("=== SETTING UP GREETING ANIMATION ===");
    
    const profileImg = document.getElementById('profileImg');
    const greetingMessage = document.getElementById('greetingMessage');
    
    console.log("Profile img found:", !!profileImg);
    console.log("Greeting message found:", !!greetingMessage);
    
    if (profileImg && greetingMessage) {
        console.log("=== BOTH ELEMENTS FOUND, STARTING ANIMATION ===");
        
        // Test: Add a simple class change immediately
        profileImg.style.border = "5px solid red";
        console.log("Added red border test");
        
        // Start the profile image animation
        setTimeout(() => {
            console.log("=== ADDING ANIMATE-GREETING CLASS ===");
            profileImg.classList.add('animate-greeting');
            console.log("Current classes:", profileImg.className);
            
            // Show the greeting message
            setTimeout(() => {
                console.log("=== ADDING SHOW CLASS TO GREETING ===");
                greetingMessage.classList.add('show');
                console.log("Greeting message classes:", greetingMessage.className);
                
                // Hide greeting after 4 seconds
                setTimeout(() => {
                    console.log("=== REMOVING SHOW CLASS FROM GREETING ===");
                    greetingMessage.classList.remove('show');
                }, 4000);
            }, 800);
        }, 500);
    } else {
        console.log("=== MISSING ELEMENTS ===");
        console.log("profileImg:", profileImg);
        console.log("greetingMessage:", greetingMessage);
    }
    
    console.log("=== GREETING SETUP COMPLETE ===");
}
