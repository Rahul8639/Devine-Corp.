import React, { useState, useEffect } from 'react';

interface ImageSliderProps {
  images: string[];
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showDots?: boolean;
  showProgress?: boolean;
  className?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoPlayInterval = 5000,
  showNavigation = true,
  showDots = true,
  showProgress = false,
  className = ''
}) => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slider
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);
    
    return () => clearInterval(timer);
  }, [isAutoPlaying, images.length, autoPlayInterval]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    // Pause auto-play briefly when user manually navigates
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
    // Pause auto-play briefly when user manually navigates
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    // Pause auto-play briefly when user manually navigates
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  if (!images || images.length === 0) {
    return (
      <div className={`image-slider-container ${className}`}>
        <div className="slider-placeholder">
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`image-slider-container ${className}`}>
      <div className="image-slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slider-image ${index === current ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image})`,
              transform: `translateX(${(index - current) * 100}%)`,
            }}
          />
        ))}
      </div>
      
                                                                                                                                                                                                                                                                                                                                                                                                                                                               {/* Navigation Arrows */}
            {showNavigation && images.length > 1 && (
              <>
                <button className="slider-nav prev" onClick={handlePrev}>
                  <i className="ri-arrow-left-long-line"></i>
                </button>
                <button className="slider-nav next" onClick={handleNext}>
                  <i className="ri-arrow-right-long-line"></i>
                </button>
              </>
            )}
      
      {/* Slider Divider */}
      <div className="slider-divider"></div>

      {/* Progress Bar */}
      {showProgress && images.length > 1 && (
        <div className="slider-progress">
          <div 
            className="slider-progress-bar"
            style={{
              width: `${((current + 1) / images.length) * 100}%`,
              transition: isAutoPlaying ? `width ${autoPlayInterval}ms linear` : 'none'
            }}
          />
        </div>
      )}

      {/* Dot Navigation */}
      {showDots && images.length > 1 && (
        <div className="slider-dots">
          {images.map((_, index) => (
            <div
              key={index}
              className={`slider-dot ${index === current ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
