import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  title?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ 
  beforeImage = "/assets/images/example.jpg",
  afterImage = "/assets/images/2nd.png",
  title = "Time To Shine"
}) => {
  const [sliderPosition, setSliderPosition] = useState(40);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    console.log('Updating slider position:', { clientX, x, percentage, rect });
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    console.log('Mouse down on slider handle');
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    console.log('Mouse move while dragging');
    updateSliderPosition(e.clientX);
  };

  const handleMouseUp = () => {
    console.log('Mouse up, stopping drag');
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    console.log('Touch start on slider handle');
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    console.log('Touch move while dragging');
    updateSliderPosition(touch.clientX);
  };

  const handleTouchEnd = () => {
    console.log('Touch end, stopping drag');
    setIsDragging(false);
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (!isDragging) {
      console.log('Container clicked, updating position');
      updateSliderPosition(e.clientX);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  console.log('Current slider position:', sliderPosition);

  return (
    <div id="compare-img-slider">
      <div className="compare-slider-container">
        <div className="top-text">
          <h1>{title}</h1>
        </div>
        <div 
          className="image-comparison-container" 
          ref={containerRef}
          onClick={handleContainerClick}
        >
          <div className="before-image">
            <img src={beforeImage} alt="Before" />
          </div>
          <div 
            className="after-image" 
            style={{ 
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
            }}
          >
            <img src={afterImage} alt="After" />
          </div>
          <div 
            className="slider-handle"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="slider-line"></div>
            <div className="slider-grip">
              <i className="ri-menu-line"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;