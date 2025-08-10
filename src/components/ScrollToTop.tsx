'use client';
import { useEffect, useState } from 'react';
import { useLenis } from './LenisProvider';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = () => {
      const scrollTop = lenis.scroll;
      setIsVisible(scrollTop > 300);
    };

    const unsubscribe = lenis.on('scroll', handleScroll);
    return () => unsubscribe();
  }, [lenis]);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2 });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
      aria-label="Scroll to top"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </button>
  );
}
