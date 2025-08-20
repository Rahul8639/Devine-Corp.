"use client";
import React, { useEffect, useRef, useState } from 'react';
import LazyImage from './ui/LazyImage';

const CategoryCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<{ title: string; units: number; image: string }[]>([]);
  const [allProductsCard, setAllProductsCard] = useState<{ image: string; stock: number }>({ image: '/assets/images/example.jpg', stock: 0 });

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // Generate random units between 5-50
  const generateRandomUnits = () => Math.floor(Math.random() * 46) + 5;

  const defaultCategories = [
    { title: 'Product Name', units: generateRandomUnits(), image: '/assets/images/example.jpg' },
    { title: 'Product Name & Long Txt', units: generateRandomUnits(), image: '/assets/images/example.jpg' },
    { title: 'Product Name', units: generateRandomUnits(), image: '/assets/images/example.jpg' },
    { title: 'Product', units: generateRandomUnits(), image: '/assets/images/example.jpg' },
    { title: 'Product', units: generateRandomUnits(), image: '/assets/images/example.jpg' },
    { title: 'Product', units: generateRandomUnits(), image: '/assets/images/example.jpg' },
  ];

  useEffect(() => {
    try {
      const raw = localStorage.getItem('categoriesData');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter(
            (c) => c && typeof c.title === 'string' && typeof c.image === 'string' && typeof c.units === 'number'
          );
          setCategories(cleaned.length ? cleaned : defaultCategories);
        } else {
          setCategories(defaultCategories);
        }
      } else {
        setCategories(defaultCategories);
      }
    } catch {
      setCategories(defaultCategories);
    }

    try {
      const raw = localStorage.getItem('allProductsCardData');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.image === 'string' && typeof parsed.stock === 'number') {
          setAllProductsCard(parsed);
        }
      }
    } catch {}

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'categoriesData') {
        try {
          const nxt = e.newValue ? JSON.parse(e.newValue) : [];
          if (Array.isArray(nxt)) {
            const cleaned = nxt.filter(
              (c: any) => c && typeof c.title === 'string' && typeof c.image === 'string' && typeof c.units === 'number'
            );
            setCategories(cleaned.length ? cleaned : defaultCategories);
          }
        } catch {}
      }
      if (e.key === 'allProductsCardData') {
        try {
          const nxt = e.newValue ? JSON.parse(e.newValue) : null;
          if (nxt && typeof nxt.image === 'string' && typeof nxt.stock === 'number') {
            setAllProductsCard(nxt);
          }
        } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <>
    <div id="shop-by-category">
      <div className="shop-by-category-container">
        <div className="top-nav">
          <h1>Shop By Categories</h1>
          <div className="nav">
            <button 
              onClick={scrollLeft}
              className="nav-left"
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button 
              onClick={scrollRight}
              className="nav-right"
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div>
        <div className="category-carousel">
          <div 
            ref={scrollContainerRef}
            className="category-card"
          >
            {categories.map((card, index) => (
              <div key={index} className="card">
                <div className="card-image">
                  <LazyImage 
                    src={card.image} 
                    alt={card.title}
                    width={250}
                    height={150}
                  />
                  <button className="card-arrow-btn">
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
                <div className="card-content">
                  <h3>{card.title}</h3>
                  <p>Total {card.units} Products Available</p>
                </div>
              </div>
            ))}
          </div>
          <div className="all-categories">
            <div className="card">
              <div className="card-image">
                <LazyImage 
                  src={allProductsCard.image} 
                  alt="All Products"
                  width={250}
                  height={150}
                />
                <button className="card-arrow-btn">
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
              <div className="card-content">
                <h3>All Products</h3>
                                 <p>Total {allProductsCard.stock} Products Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CategoryCarousel;