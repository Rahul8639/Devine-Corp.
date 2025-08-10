import React, { useState } from 'react';

interface ProductData {
  id: string;
  name: string;
  currentPrice: string;
  mrp: string;
  images: string[];
  description?: string;
}

interface HotProductProps {
  product?: ProductData;
}

const HotProduct: React.FC<HotProductProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isShareHovered, setIsShareHovered] = useState(false);

  // Default product data (fallback if no product prop is provided)
  const defaultProduct: ProductData = {
    id: "1",
    name: "Product Name will be Here",
    currentPrice: "₹ 5000/-",
    mrp: "₹ 6000/-",
    images: [
      "/assets/images/example.jpg",
      "/assets/images/2nd.png",
      "/assets/images/example.jpg",
      "/assets/images/2nd.png"
    ],
    description: "Check out this amazing product!"
  };

  // Use provided product data or fallback to default
  const currentProduct = product || defaultProduct;
  const productImages = currentProduct.images;

  const nextImage = () => {
    setSlideDirection('right');
    setTimeout(() => {
      setCurrentImageIndex((prev) => 
        prev === productImages.length - 1 ? 0 : prev + 1
      );
      setSlideDirection(null);
    }, 150);
  };

  const prevImage = () => {
    setSlideDirection('left');
    setTimeout(() => {
      setCurrentImageIndex((prev) => 
        prev === 0 ? productImages.length - 1 : prev - 1
      );
      setSlideDirection(null);
    }, 150);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const shareLinks = [
    { 
      icon: 'ri-twitter-fill', 
      label: 'Twitter',
      action: () => shareToTwitter()
    },
    { 
      icon: 'ri-facebook-fill', 
      label: 'Facebook',
      action: () => shareToFacebook()
    },
    { 
      icon: 'ri-linkedin-fill', 
      label: 'LinkedIn',
      action: () => shareToLinkedIn()
    },
    { 
      icon: 'ri-link', 
      label: 'Copy Link',
      action: () => copyToClipboard()
    }
  ];

  // Product sharing data
  const shareData = {
    name: currentProduct.name,
    price: currentProduct.currentPrice,
    url: typeof window !== 'undefined' ? window.location.href : 'https://yourdomain.com/product',
    description: currentProduct.description || "Check out this amazing product!"
  };

  const shareToTwitter = () => {
    const text = `${shareData.name} - ${shareData.price} ${shareData.description}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareData.url)}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
    window.open(url, '_blank');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = shareData.url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div id="hot-product">
      <div className="hot-product-container">
        {/* Left Side - Thumbnail Navigation */}
        <div className="thumbnail-navigation">
          {productImages.map((image, index) => (
            <div 
              key={index} 
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => selectImage(index)}
            >
              <img src={image} alt={`Product view ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Center - Main Image Slider */}
        <div className="main-image-container">
          <div className="main-image">
            <img 
              src={productImages[currentImageIndex]} 
              alt="Product" 
              className={`slide-image ${slideDirection ? `slide-${slideDirection}` : ''}`}
            />
            <div className="image-nav">
              <button className="nav-left" onClick={prevImage}>
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <button className="nav-right" onClick={nextImage}>
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Product Information */}
        <div className="product-info">
          <div className="product-name">
            <h1>{currentProduct.name}</h1>
          </div>
          
          <div className="product-pricing">
            <div className="current-price">{currentProduct.currentPrice}</div>
            <div className="mrp">M.R.P.: {currentProduct.mrp}</div>
          </div>
          
                     <div className="action-buttons">
             <button className="purchase-now">Purchase Now</button>
             <div className="secondary-buttons">
               <button className="add-to-cart">Add To Cart</button>
               <div 
                 className="share-button-container"
                 onMouseEnter={() => setIsShareHovered(true)}
                 onMouseLeave={() => setIsShareHovered(false)}
               >
                 <button className={`share-button ${isShareHovered ? 'opacity-0' : 'opacity-100'}`}>
                   Share
                 </button>
                                   <div className="share-links">
                    {shareLinks.map((link, index) => (
                      <button
                        key={index}
                        className={`share-link share-link-${index} ${isShareHovered ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log(`Sharing to ${link.label}`);
                          link.action();
                        }}
                        title={link.label}
                        type="button"
                      >
                        <i className={link.icon}></i>
                      </button>
                    ))}
                  </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HotProduct;