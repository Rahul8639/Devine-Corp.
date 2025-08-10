import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && isValidEmail(email)) {
      // Here you can add logic to send the email to your backend
      console.log('Email submitted:', email);
      setIsSubscribed(true);
      setEmail('');
      // You can add a success message or redirect logic here
    } else {
      alert('Please enter a valid email address');
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEmailSubmit(e as any);
    }
  };

  return (
    <>
    <div id="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="comp-name">
            <h1>DiVINE</h1>
          </div>
          <div className="contact">
            <div className="contact-us">
              <h3>CONTACT</h3>
              <div className="contact-detail">
                <h2>
                  <a href="https://maps.google.com/?q=Pune,Maharashtra" target="_blank" rel="noopener noreferrer">
                    Divine Corp. PUNE
                  </a>
                </h2>
                <h2>
                  <a href="mailto:divine@help.com">
                    divine@help.com
                  </a>
                </h2>
                <h2>
                  <a href="tel:+919527500222">
                    +91 95275 00222
                  </a>
                </h2>
              </div>
            </div>
            <div className="social-media">
              <h3>SOCIAL MEDIA</h3>
              <div className="social-media-detail">
                <h2>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </h2>
                <h2>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </h2>
              </div>
            </div>
            <div className="language">
              <h3>LANGUAGE</h3>
              <div className="language-detail">
                <h2>
                  <a href="#" onClick={(e) => { e.preventDefault(); console.log('Language changed to English'); }}>
                    English
                  </a>
                </h2>
                <h2>
                  <a href="#" onClick={(e) => { e.preventDefault(); console.log('Language changed to Hindi'); }}>
                    Hindi
                  </a>
                </h2>
              </div>
            </div>
          </div>
          <div className="enquiry">
            <h3>Made by <span>Rahul</span></h3>
            <div className="mid">
              <h3>
                <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); console.log('Privacy Policy clicked'); }}>
                  Privacy Policy
                </a>
              </h3>
            </div>
            <h3>Copyright &copy; 2025 Divine.</h3>
          </div>
        </div>
        <div className="footer-right">
          <div className="end-des">
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, praesentium.</h1>
          </div>
          <div className="news-letter">
            <div className="news-letter">
              <div>
              <h3>NEWSLETTER</h3>
              <div className="div">
                <h3>Sign up for our updates</h3>
                <form onSubmit={handleEmailSubmit}>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <i 
                      className="ri-arrow-right-long-fill"
                      onClick={handleEmailSubmit}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  </div>
                </form>
              </div>
              </div>
            </div>
            <div className="news-description">
              <h3>By subscribing, I agree that DiVINE may email me news and offers.</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Footer;