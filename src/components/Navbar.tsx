import React from 'react';
import { supabase } from '../lib/supabaseClient';

interface NavbarProps {
  user?: {
    user_metadata?: { avatar_url?: string };
    avatar_url?: string;
    // add other fields as needed
  };
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  // Get user photo from Supabase user object
  const defaultPhoto = '/assets/images/user-profile.png';
  const photo = user?.user_metadata?.avatar_url || user?.avatar_url || defaultPhoto;

  // Search handler (stub)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement search logic
  };

  return (
    <div id="nav-bar">
      <div className="nav-container">
        <div className="logo">
          <h2>DiVINE</h2>
        </div>
        <form className="search-bar" onSubmit={handleSearch}>
          <input type="text" placeholder="Search for products..." />
          <div className="divider"></div>
          <div className="searchbutt">
            <button type="submit">
              <i className="ri-search-line"></i>
            </button>
          </div>
        </form>
        <div className="user-profile">
          <div className="wishlist">
            <i className="ri-heart-3-line"></i>
          </div>
          <div className="cart">
            <i className="ri-shopping-cart-line"></i>
          </div>
          <div className="profile">
            <img
              src={photo}
              alt="profile"
              width={40}
              height={40}
              onError={e => {
                const target = e.target as HTMLImageElement;
                if (target.src !== window.location.origin + defaultPhoto) {
                  target.src = defaultPhoto;
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;