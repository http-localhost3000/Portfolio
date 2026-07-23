import { useEffect } from 'react';

/**
 * Hook to reveal elements on scroll using Intersection Observer.
 * Bidirectional reveal: elements animate in when they enter the viewport and
 * animate out when they fully leave it. A hysteresis gap between the reveal
 * threshold (0.15) and the hide threshold (0) prevents rapid toggling/flicker
 * near the viewport edge during scroll.
 * @param {string} selector - CSS selector for elements to reveal
 * @param {object} options - IntersectionObserver options
 */
export const useScrollReveal = (selector = '.reveal', options = { threshold: [0, 0.15] }) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
                    entry.target.classList.add('active');
                } else if (!entry.isIntersecting) {
                    // Only hide once the element is completely out of view —
                    // the gap between 0 and 0.15 prevents edge flicker.
                    entry.target.classList.remove('active');
                }
            });
        }, options);

        const timeoutId = setTimeout(() => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el) => {
                observer.observe(el);
            });
        }, 150);

        return () => {
            clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, [selector]);
};
