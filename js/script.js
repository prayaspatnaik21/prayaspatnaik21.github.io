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
 * Test animation system with simple verification
 */
function testAnimationSystem() {
    console.log("=== RUNNING UNIT TEST ===");
    
    // Test 1: Check if elements exist
    const profileImg = document.getElementById('profileImg');
    const greetingMessage = document.getElementById('greetingMessage');
    
    if (!profileImg) {
        console.error("❌ FAIL: Profile image not found");
        return;
    }
    if (!greetingMessage) {
        console.error("❌ FAIL: Greeting message not found");
        return;
    }
    
    console.log("✅ PASS: Both elements found");
    
    // Test 2: Check if CSS classes can be added
    try {
        profileImg.classList.add('test-class');
        greetingMessage.classList.add('test-class');
        
        if (profileImg.classList.contains('test-class')) {
            console.log("✅ PASS: Can add classes to profile image");
        } else {
            console.error("❌ FAIL: Cannot add classes to profile image");
        }
        
        if (greetingMessage.classList.contains('test-class')) {
            console.log("✅ PASS: Can add classes to greeting message");
        } else {
            console.error("❌ FAIL: Cannot add classes to greeting message");
        }
        
        // Clean up test classes
        profileImg.classList.remove('test-class');
        greetingMessage.classList.remove('test-class');
        
    } catch (error) {
        console.error("❌ FAIL: Error adding classes:", error);
    }
    
    // Test 3: Check if CSS animations exist
    const testElement = document.createElement('div');
    testElement.style.animation = 'wave 0.6s ease-in-out 5';
    
    if (testElement.style.animation) {
        console.log("✅ PASS: CSS animations supported");
    } else {
        console.error("❌ FAIL: CSS animations not supported");
    }
    
    console.log("=== UNIT TEST COMPLETE ===");
}

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
