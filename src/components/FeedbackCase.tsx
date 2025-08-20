"use client";
import React, { useEffect, useState } from 'react';
import LazyImage from './ui/LazyImage';

const FeedbackCase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [testimonials, setTestimonials] = useState([
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
  ]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('feedbackData');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setTestimonials(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const visible = Math.max(1, Math.min(3, testimonials.length));
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= testimonials.length - visible ? 0 : prevIndex + 1
      );
    }, 30000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const visibleCount = Math.max(1, Math.min(3, testimonials.length));
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + visibleCount);

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
                  <LazyImage 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    width={50}
                    height={50}
                  />
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