import Lenis from '@studio-freight/lenis';

// Utility function to scroll to a specific element
export const scrollToElement = (lenis: Lenis, element: HTMLElement, offset = 0) => {
  const rect = element.getBoundingClientRect();
  const scrollTop = lenis.scroll + rect.top + offset;
  
  lenis.scrollTo(scrollTop, { duration: 2 });
};

// Utility function to scroll to a specific Y position
export const scrollToY = (lenis: Lenis, y: number, duration = 2) => {
  lenis.scrollTo(y, { duration });
};

// Utility function to get scroll progress (0 to 1)
export const getScrollProgress = (lenis: Lenis) => {
  const maxScroll = lenis.limit - window.innerHeight;
  return lenis.scroll / maxScroll;
};

// Utility function to pause scrolling
export const pauseScroll = (lenis: Lenis) => {
  lenis.stop();
};

// Utility function to resume scrolling
export const resumeScroll = (lenis: Lenis) => {
  lenis.start();
};

// Utility function to check if element is in viewport
export const isElementInViewport = (element: HTMLElement, threshold = 0.1) => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  return (
    rect.top <= windowHeight * (1 - threshold) &&
    rect.bottom >= windowHeight * threshold
  );
};
