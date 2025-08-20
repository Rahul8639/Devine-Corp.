"use client";
import React, { useEffect, useRef, useState } from 'react';

const ProductCard = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 350;
      scrollContainerRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' }); // card width + gap
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 350;
      scrollContainerRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' }); // card width + gap
    }
  };

  type Card = { id: number; name: string; video: string; originalPrice: number; discountedPrice: number };
  const [products, setProducts] = useState<Card[]>([]);

  useEffect(() => {
    const generatePricing = () => {
      const originalPrice = Math.floor(Math.random() * 3000) + 2000; // 2000-5000
      const discountedPrice = Math.floor(originalPrice * 0.6); // 40% discount
      return { originalPrice, discountedPrice };
    };
    const fallback: Card[] = Array.from({ length: 6 }).map((_, i) => ({
      id: i + 1,
      name: 'Product Name',
      video: '/assets/videos/vid.mp4',
      ...generatePricing(),
    }));

    try {
      const raw = localStorage.getItem('productCardsData');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter(
            (p: any) => p && typeof p.name === 'string' && typeof p.video === 'string'
          );
          setProducts(cleaned.length ? cleaned : fallback);
        } else {
          setProducts(fallback);
        }
      } else {
        setProducts(fallback);
      }
    } catch {
      setProducts(fallback);
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'productCardsData') {
        try {
          const nxt = e.newValue ? JSON.parse(e.newValue) : [];
          if (Array.isArray(nxt)) setProducts(nxt);
        } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const [mutedVideos, setMutedVideos] = useState<{[key: number]: boolean}>({});

  const toggleMute = (productId: number) => {
    setMutedVideos(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  return (
    <>
      <div id="pep-feed">
        <div className="pep-feed-container">
          <div className="top-txt">
            <h1>Divine Beauities..</h1>
          </div>
          <div className="feed-crousel">
            <button className="nav-left" onClick={scrollLeft}>
              <i className="ri-arrow-left-line"></i>
            </button>
            <div className="feed" ref={scrollContainerRef}>
              {products.map((product) => (
                <div key={product.id} className="feed-card">
                  <div className="card-video">
                    <video 
                      autoPlay 
                      loop 
                      muted={mutedVideos[product.id] !== false}
                      playsInline
                    >
                      <source src={product.video} type="video/mp4" />
                    </video>
                    <button 
                      className="mute-btn"
                      onClick={() => toggleMute(product.id)}
                    >
                      <i className={mutedVideos[product.id] === false ? "ri-volume-up-line" : "ri-volume-mute-line"}></i>
                    </button>
                  </div>
                  <div className="card-content">
                    <h3>{product.name}</h3>
                    <div className="price">
                      <span className="discounted-price">₹ {product.discountedPrice}/-</span>
                      <span className="original-price">{product.originalPrice}</span>
                    </div>
                    <button className="add-to-cart-btn">Add To Cart</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="nav-right" onClick={scrollRight}>
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
          <div className="bottom-txt">
            <h1>"The Best Is Yet To Come<br/>But The Best for Best"</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;