'use client';

import React, { useEffect, useRef, useState } from 'react';
import LazyImage from '../../../components/ui/LazyImage';
import ImageSlider from '../../../components/ImageSlider';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/AuthContext';
import LoadingPage from '@/components/LoadingPage';

const SliderManagement = () => {
  const [images, setImages] = useState([
    '/assets/images/example.jpg',
    '/assets/images/2nd.png',
    '/assets/images/3rd.png',
    '/assets/images/user-profile.png',
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');

  const addImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setImages(newImages);
  };

  const router = useRouter();
  const { role, loading } = useUser();

  const redirectOnceRef = useRef(false);
  useEffect(() => {
    if (!loading && role !== 'admin' && !redirectOnceRef.current) {
      redirectOnceRef.current = true;
      setTimeout(() => {
        router.push('/auth/login?admin=1');
      }, 1200);
    }
  }, [loading, role, router]);

  if (loading || role !== 'admin') {
    return <LoadingPage message={role !== 'admin' ? 'Please login with an admin account' : 'Loading...'} />;
  }

  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-header">
        <h1>Slider Management</h1>
        <p>Manage the images displayed in the hero slider</p>
      </div>

      <div className="admin-content">
        {/* Preview Section */}
        <div className="preview-section">
          <h2>Preview</h2>
          <div className="slider-preview">
            <ImageSlider 
              images={images}
              autoPlayInterval={3000}
              showNavigation={true}
              showDots={true}
              showProgress={false}
              className="preview-slider"
            />
          </div>
        </div>

        {/* Management Section */}
        <div className="management-section">
          <h2>Manage Images</h2>
          
          {/* Add New Image */}
          <div className="add-image-form">
            <h3>Add New Image</h3>
            <div className="input-group">
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="image-url-input"
              />
              <button onClick={addImage} className="add-button">
                Add Image
              </button>
            </div>
          </div>

          {/* Image List */}
          <div className="image-list">
            <h3>Current Images ({images.length})</h3>
            {images.map((image, index) => (
              <div key={index} className="image-item">
                <div className="image-preview">
                  <LazyImage 
                    src={image} 
                    alt={`Slide ${index + 1}`}
                    width={100}
                    height={60}
                  />
                </div>
                <div className="image-info">
                  <span className="image-url">{image}</span>
                  <span className="image-index">Position: {index + 1}</span>
                </div>
                <div className="image-actions">
                  {index > 0 && (
                    <button 
                      onClick={() => moveImage(index, index - 1)}
                      className="move-button up"
                    >
                      ↑
                    </button>
                  )}
                  {index < images.length - 1 && (
                    <button 
                      onClick={() => moveImage(index, index + 1)}
                      className="move-button down"
                    >
                      ↓
                    </button>
                  )}
                  <button 
                    onClick={() => removeImage(index)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderManagement;
