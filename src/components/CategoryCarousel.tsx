import React, { useRef } from 'react';

const CategoryCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const categoryCards = [
    {
      title: "Product Name",
      units: generateRandomUnits(),
      image: "/assets/images/example.jpg"
    },
    {
      title: "Product Name & Long Txt",
      units: generateRandomUnits(),
      image: "/assets/images/example.jpg"
    },
    {
      title: "Product Name",
      units: generateRandomUnits(),
      image: "/assets/images/example.jpg"
    },
    {
      title: "Product",
      units: generateRandomUnits(),
      image: "/assets/images/example.jpg"
    },
    {
      title: "Product",
      units: generateRandomUnits(),
      image: "/assets/images/example.jpg"
    },
    {
      title: "Product",
      units: generateRandomUnits(),
      image: "/assets/images/example.jpg"
    }

  ];

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
            {categoryCards.map((card, index) => (
              <div key={index} className="card">
                <div className="card-image">
                  <img 
                    src={card.image} 
                    alt={card.title}
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
                <img 
                  src="/assets/images/example.jpg" 
                  alt="All Products"
                />
                <button className="card-arrow-btn">
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
              <div className="card-content">
                <h3>All Products</h3>
                <p>Total {categoryCards.reduce((total, card) => total + card.units, 0)} Products Available</p>
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