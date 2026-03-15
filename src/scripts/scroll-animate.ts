/**
 * Shared scroll-reveal animation using IntersectionObserver.
 * Add `data-animate` attribute to a container and `data-animate-items` to specify
 * the child selector. Optionally add `data-animate-stagger` for staggered delays.
 *
 * Usage in .astro:
 *   <div data-animate data-animate-items=".card" data-animate-stagger="0.15">
 */
const observerOptions: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target as HTMLElement;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-animate]').forEach((container) => {
    const selector = container.getAttribute('data-animate-items') || ':scope > *';
    const stagger = parseFloat(container.getAttribute('data-animate-stagger') || '0');

    container.querySelectorAll(selector).forEach((item, index) => {
      const el = item as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      const delay = stagger ? `${index * stagger}s` : '0s';
      el.style.transition = `opacity 0.6s ease ${delay}, transform 0.6s ease ${delay}`;
      observer.observe(el);
    });
  });
});
