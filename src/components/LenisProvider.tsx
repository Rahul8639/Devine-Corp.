'use client';
import { useEffect, useRef, createContext, useContext } from 'react';
import Lenis from '@studio-freight/lenis';

// Create context for Lenis instance
const LenisContext = createContext<Lenis | null>(null);

// Hook to use Lenis in components
export const useLenis = () => {
  const lenis = useContext(LenisContext);
  if (!lenis) {
    console.warn('useLenis must be used within LenisProvider');
  }
  return lenis;
};

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
      lerp: 0.1,
      wheelMultiplier: 1,
    });

    // RAF loop for Lenis
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
