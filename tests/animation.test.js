/**
 * Animation System Unit Tests
 * Tests the greeting animation functionality
 */

// Test 1: Element Detection
function testElementDetection() {
    console.log("=== TEST 1: ELEMENT DETECTION ===");
    
    const profileImg = document.getElementById('profileImg');
    const greetingMessage = document.getElementById('greetingMessage');
    
    if (!profileImg) {
        console.error("❌ FAIL: Profile image not found");
        return false;
    }
    if (!greetingMessage) {
        console.error("❌ FAIL: Greeting message not found");
        return false;
    }
    
    console.log("✅ PASS: Both elements found");
    return true;
}

// Test 2: CSS Class Manipulation
function testClassManipulation() {
    console.log("=== TEST 2: CSS CLASS MANIPULATION ===");
    
    const profileImg = document.getElementById('profileImg');
    const greetingMessage = document.getElementById('greetingMessage');
    
    try {
        // Test adding classes
        profileImg.classList.add('test-class');
        greetingMessage.classList.add('test-class');
        
        const profileHasClass = profileImg.classList.contains('test-class');
        const greetingHasClass = greetingMessage.classList.contains('test-class');
        
        // Clean up
        profileImg.classList.remove('test-class');
        greetingMessage.classList.remove('test-class');
        
        if (profileHasClass && greetingHasClass) {
            console.log("✅ PASS: CSS class manipulation works");
            return true;
        } else {
            console.error("❌ FAIL: CSS class manipulation failed");
            return false;
        }
        
    } catch (error) {
        console.error("❌ FAIL: Error in class manipulation:", error);
        return false;
    }
}

// Test 3: CSS Animation Support
function testAnimationSupport() {
    console.log("=== TEST 3: CSS ANIMATION SUPPORT ===");
    
    const testElement = document.createElement('div');
    testElement.style.animation = 'wave 0.6s ease-in-out 5';
    
    if (testElement.style.animation) {
        console.log("✅ PASS: CSS animations supported");
        return true;
    } else {
        console.error("❌ FAIL: CSS animations not supported");
        return false;
    }
}

// Test 4: Animation Timing
function testAnimationTiming() {
    console.log("=== TEST 4: ANIMATION TIMING ===");
    
    const profileImg = document.getElementById('profileImg');
    const greetingMessage = document.getElementById('greetingMessage');
    
    let animationStarted = false;
    let greetingShown = false;
    
    // Monitor animation start
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('animate-greeting')) {
                    animationStarted = true;
                    console.log("✅ PASS: Animation class detected");
                }
                if (mutation.target.classList.contains('show')) {
                    greetingShown = true;
                    console.log("✅ PASS: Greeting show class detected");
                }
            }
        });
    });
    
    observer.observe(profileImg, { attributes: true, attributeFilter: ['class'] });
    observer.observe(greetingMessage, { attributes: true, attributeFilter: ['class'] });
    
    // Wait for animations
    setTimeout(() => {
        observer.disconnect();
        
        if (animationStarted && greetingShown) {
            console.log("✅ PASS: Animation timing works");
            return true;
        } else {
            console.error("❌ FAIL: Animation timing failed");
            console.log("Animation started:", animationStarted, "Greeting shown:", greetingShown);
            return false;
        }
    }, 3000);
}

// Test 5: Visual Verification
function testVisualChanges() {
    console.log("=== TEST 5: VISUAL VERIFICATION ===");
    
    const profileImg = document.getElementById('profileImg');
    
    // Test immediate visual change
    const originalBorder = profileImg.style.border;
    profileImg.style.border = '5px solid red';
    
    setTimeout(() => {
        const newBorder = profileImg.style.border;
        profileImg.style.border = originalBorder;
        
        if (newBorder.includes('red')) {
            console.log("✅ PASS: Visual changes work");
            return true;
        } else {
            console.error("❌ FAIL: Visual changes failed");
            return false;
        }
    }, 100);
}

// Run all tests
function runAllTests() {
    console.log("🧪 STARTING ANIMATION SYSTEM TESTS 🧪");
    
    const results = {
        elementDetection: testElementDetection(),
        classManipulation: testClassManipulation(),
        animationSupport: testAnimationSupport(),
        animationTiming: testAnimationTiming(),
        visualChanges: testVisualChanges()
    };
    
    console.log("=== TEST RESULTS ===");
    Object.entries(results).forEach(([test, result]) => {
        const status = result ? '✅ PASS' : '❌ FAIL';
        console.log(`${status}: ${test}`);
    });
    
    const allPassed = Object.values(results).every(result => result === true);
    console.log(`=== OVERALL: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'} ===`);
    
    return results;
}

// Auto-run tests when DOM is ready
document.addEventListener('DOMContentLoaded', runAllTests);
