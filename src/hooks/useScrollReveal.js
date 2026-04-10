import { useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-triggered reveal animations.
 * Uses IntersectionObserver for performance.
 * 
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0-1). Default 0.15
 * @param {string} options.rootMargin - Root margin. Default '0px 0px -50px 0px'
 * @returns {React.RefObject} ref to attach to the container element
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -50px 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe the container itself
    const revealElements = el.querySelectorAll('.reveal');
    revealElements.forEach((child) => observer.observe(child));

    // Also observe the container if it has the class
    if (el.classList.contains('reveal')) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

export default useScrollReveal;
