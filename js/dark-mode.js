/**
 * Dark Mode Toggle Functionality
 * Shared across all pages
 */

function initializeDarkMode() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    
    if (!darkModeToggle) return;
    
    // Check for saved dark mode preference or default to false
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    
    // Apply dark mode on load if it was previously enabled
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️";
    }
    
    // Toggle dark mode on button click
    darkModeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        const isCurrentlyDark = document.body.classList.contains("dark-mode");
        
        // Update button icon
        darkModeToggle.textContent = isCurrentlyDark ? "☀️" : "🌙";
        
        // Save preference to localStorage
        localStorage.setItem("darkMode", isCurrentlyDark);
    });
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeDarkMode);
