// Main JavaScript file for portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add active class to navbar links based on current page
    const currentPage = window.location.pathname;
    document.querySelectorAll('.navbar-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage || link.getAttribute('href').includes(currentPage)) {
            link.style.borderBottom = '3px solid #FFD700';
        }
    });

    console.log('Portfolio loaded successfully!');
});
