import React from 'react';
import { useUser } from '../context/AuthContext';
import ImageSlider from './ImageSlider';

// Sample images array - in real app, this would come from admin/database
const images = [
  '/assets/images/example.jpg',
  '/assets/images/2nd.png',
  '/assets/images/example.jpg',
  '/assets/images/2nd.png',
];

const Hero = () => {
  const { user } = useUser();
  const name = user?.user_metadata?.name || user?.email || 'User';

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