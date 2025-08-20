"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/AuthContext';
import ImageSlider from './ImageSlider';

// Default images - will be overridden by admin edits from localStorage
const defaultHeroImages = [
  '/assets/images/example.jpg',
  '/assets/images/2nd.png',
  '/assets/images/example.jpg',
  '/assets/images/2nd.png',
];

const Hero = () => {
  const { user } = useUser();
  const name = user?.user_metadata?.name || user?.email || 'User';
  const [images, setImages] = useState<string[]>(defaultHeroImages);

  useEffect(() => {
    // Load from localStorage on mount
    try {
      const raw = localStorage.getItem('heroCarouselImages');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.every((u) => typeof u === 'string')) {
          setImages(parsed.length > 0 ? parsed : defaultHeroImages);
        }
      }
    } catch {}

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'heroCarouselImages') {
        try {
          const nxt = e.newValue ? JSON.parse(e.newValue) : [];
          if (Array.isArray(nxt) && nxt.every((u) => typeof u === 'string')) {
            setImages(nxt.length > 0 ? nxt : defaultHeroImages);
          }
        } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <>
      <div id="hero-section">
        <div className="hero-container">
          <div className="hero-slider">
            <div className="hero-user-info">
              <h1>Hey, {name}</h1>
              <p>Check Our These.</p>
            </div>
            
            {/* Image Slider */}
            <ImageSlider 
              images={images}
              autoPlayInterval={5000}
              showNavigation={true}
              showDots={true}
              showProgress={false}
              className="hero-image-slider"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;