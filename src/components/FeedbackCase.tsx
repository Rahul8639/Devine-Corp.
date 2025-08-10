import React, { useState, useEffect } from 'react';

const FeedbackCase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "A fantastic bit of feedback",
      name: "John Smith",
      description: "Software Engineer",
      image: "/assets/images/user-profile.png"
    },
    {
      id: 2,
      quote: "A fantastic bit of feedback",
      name: "Sarah Johnson",
      description: "Product Manager",
      image: "/assets/images/user-profile.png"
    },
    {
      id: 3,
      quote: "A genuinely glowing review",
      name: "Mike Davis",
      description: "Designer",
      image: "/assets/images/user-profile.png"
    },
    {
      id: 4,
      quote: "Exceptional service and quality",
      name: "Emily Wilson",
      description: "Marketing Director",
      image: "/assets/images/user-profile.png"
    },
    {
      id: 5,
      quote: "Highly recommended for everyone",
      name: "David Brown",
      description: "Business Analyst",
      image: "/assets/images/user-profile.png"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 3 ? 0 : prevIndex + 1
      );
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  return (
    <div id="feedback-case">
      <div className="feedback-case-container">
        <div className="testimonials-carousel">
          {visibleTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="quote-text">
                "{testimonial.quote}"
              </div>
              <div className="profile-section">
                <div className="profile-image">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className="profile-info">
                  <div className="profile-name">{testimonial.name}</div>
                  <div className="profile-description">{testimonial.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackCase;