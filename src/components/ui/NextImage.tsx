import React from 'next/image';
import { useState } from 'react';

interface NextImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const NextImage: React.FC<NextImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  fill = false,
  sizes = '100vw',
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Fallback to regular img if there's an error
  if (hasError) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          opacity: isLoaded ? 1 : 0.7,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    );
  }

  const imageProps = {
    src,
    alt,
    className: `${className} ${isLoaded ? 'loaded' : 'loading'}`,
    priority,
    quality,
    placeholder,
    blurDataURL,
    onLoad: handleLoad,
    onError: handleError,
    sizes,
    style: {
      opacity: isLoaded ? 1 : 0.7,
      transition: 'opacity 0.3s ease-in-out',
      filter: isLoaded ? 'none' : 'blur(2px)'
    }
  };

  if (fill) {
    return <React.Image {...imageProps} fill />;
  }

  return (
    <React.Image
      {...imageProps}
      width={width || 400}
      height={height || 300}
    />
  );
};

export default NextImage;
