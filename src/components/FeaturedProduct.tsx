"use client";
import React, { useEffect, useRef, useState } from 'react';
import LazyImage from './ui/LazyImage';

const FeaturedProduct = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  type FP = { id: number; name: string; price: string; mrp: string; rating: string; image: string; brand: string };
  const [products, setProducts] = useState<FP[]>([]);
  const [title, setTitle] = useState<string>('Mouse & Keyboards');

  useEffect(() => {
    const fallback: FP[] = Array.from({ length: 6 }).map((_, i) => ({
      id: i + 1,
      name: 'Product Name',
      price: '₹2550/-',
      mrp: '5000',
      rating: '4.2',
      image: '/assets/images/example.jpg',
      brand: 'Divine',
    }));
    try {
      const raw = localStorage.getItem('featuredProductsData');
      const t = localStorage.getItem('featuredTitle');
      if (t) setTitle(t);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setProducts(parsed.length ? parsed : fallback);
      } else {
        setProducts(fallback);
      }
    } catch {
      setProducts(fallback);
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'featuredProductsData') {
        try { const nxt = e.newValue ? JSON.parse(e.newValue) : []; if (Array.isArray(nxt)) setProducts(nxt); } catch {}
      }
      if (e.key === 'featuredTitle' && e.newValue != null) setTitle(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

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
    <div id="featured-product">
      <div className="featured-product-container">
        <div className="top-nav">
          <h1>{title}</h1>
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
                <LazyImage 
                  src={product.image} 
                  alt={product.name}
                  width={300}
                  height={200}
                />
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

export default FeaturedProduct;