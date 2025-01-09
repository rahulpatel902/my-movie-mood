// Handle navbar scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 10; // Lower threshold for mobile
    
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Initial check
    handleScroll();

    // Add scroll event listener with passive option for better mobile performance
    window.addEventListener('scroll', handleScroll, { passive: true });
});
