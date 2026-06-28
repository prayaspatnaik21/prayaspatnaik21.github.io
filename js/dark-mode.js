/**
 * Dark Mode Toggle Functionality
 * Shared across all pages
 */

function initializeDarkMode() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    
    if (!darkModeToggle) return;
    
    // Default to dark mode unless the visitor explicitly chose light mode.
    const savedPreference = localStorage.getItem("darkMode");
    const isDarkMode = savedPreference === null ? true : savedPreference === "true";
    
    // Apply dark mode on load if it was previously enabled
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️";
    } else {
        document.body.classList.remove("dark-mode");
        darkModeToggle.textContent = "🌙";
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
