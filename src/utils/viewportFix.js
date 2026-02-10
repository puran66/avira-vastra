/**
 * iOS Safari Viewport Height Fix
 * 
 * Problem: iOS Safari's 100vh includes the browser chrome (address bar + toolbar)
 * which creates a white gap at the bottom when they're visible.
 * 
 * Solution: Calculate the actual viewport height using window.innerHeight
 * and expose it as a CSS custom property --vh
 * 
 * Usage in CSS:
 * height: calc(var(--vh, 1vh) * 100);
 */

export function initViewportFix() {
    // Calculate and set the viewport height
    const setViewportHeight = () => {
        // Get the actual viewport height
        const vh = window.innerHeight * 0.01;
        
        // Set the CSS custom property
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set on initial load
    setViewportHeight();

    // Update on resize (handles orientation change too)
    let resizeTimer;
    window.addEventListener('resize', () => {
        // Debounce to avoid excessive updates
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setViewportHeight, 100);
    });

    // Update on orientation change (iOS specific)
    window.addEventListener('orientationchange', () => {
        // Delay to ensure the viewport has settled
        setTimeout(setViewportHeight, 300);
    });

    // iOS Safari specific: Update when scrolling stops
    // (address bar show/hide can affect viewport)
    let scrollTimer;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(setViewportHeight, 200);
    }, { passive: true });

    // Visual Viewport API for better iOS support (if available)
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', setViewportHeight);
    }
}

// Auto-initialize if this script is loaded directly
if (typeof window !== 'undefined') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initViewportFix);
    } else {
        initViewportFix();
    }
}
