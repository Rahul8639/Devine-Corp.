import React, { useState, useRef } from 'react';

const MixedItemsProduct = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Sample mixed product data
  const products = [
    {
      id: 1,
      name: "Mixed Product 1",
      price: "₹1800/-",
      mrp: "3200",
      rating: "4.5",
      image: "/assets/images/2nd.png",
      brand: "Divine"
    },
    {
      id: 2,
      name: "Mixed Product 2",
      price: "₹2200/-",
      mrp: "4500",
      rating: "4.3",
      image: "/assets/images/3rd.png",
      brand: "Divine"
    },
    {
      id: 3,
      name: "Mixed Product 3",
      price: "₹1500/-",
      mrp: "2800",
      rating: "4.7",
      image: "/assets/images/example.jpg",
      brand: "Divine"
    },
    {
      id: 4,
      name: "Mixed Product 4",
      price: "₹2800/-",
      mrp: "5200",
      rating: "4.1",
      image: "/assets/images/2nd.png",
      brand: "Divine"
    },
    {
      id: 5,
      name: "Mixed Product 5",
      price: "₹1900/-",
      mrp: "3800",
      rating: "4.6",
      image: "/assets/images/3rd.png",
      brand: "Divine"
    },
    {
      id: 6,
      name: "Mixed Product 6",
      price: "₹2400/-",
      mrp: "4800",
      rating: "4.4",
      image: "/assets/images/example.jpg",
      brand: "Divine"
    }
  ];

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      setCurrentIndex(Math.min(products.length - 1, currentIndex + 1));
    }
  };

  return (
    <div id="mixed-items-product">
      <div className="mixed-items-product-container">
        <div className="top-nav">
          <h1>Mixed Items</h1>
          <div className="nav-buttons">
            <div className="nav-left" onClick={scrollLeft}>
              <i className="ri-arrow-left-s-line"></i>
            </div>
            <div className="nav-right" onClick={scrollRight}>
              <i className="ri-arrow-right-s-line"></i>
            </div>
          </div>
        </div>
        <div className="product-carousel" ref={carouselRef}>
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="card-image">
                <img src={product.image} alt={product.name} />
                <div className="image-overlays">
                  <div className="rating-overlay">
                    <i className="ri-star-fill"></i>
                    <span>{product.rating}</span>
                  </div>
                  <div className="quickview-overlay">
                    <i className="ri-eye-line"></i>
                  </div>
                </div>
                <div className="brand-overlay">
                  <span>{product.brand}</span>
                </div>
              </div>
              <div className="card-content">
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="heart-icon">
                    <i className="ri-heart-line"></i>
                  </div>
                </div>
                <div className="price-info">
                  <span className="current-price">{product.price}</span>
                  <span className="mrp">M.R.P.: {product.mrp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MixedItemsProduct;
