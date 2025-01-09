// Handle navbar scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 10; // Lower threshold for mobile
    
    function handleScroll() {
        // Force a repaint to ensure the background is applied
        navbar.style.display = 'flex';
        
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
