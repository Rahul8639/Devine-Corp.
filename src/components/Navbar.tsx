'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import LazyImage from './ui/LazyImage';
import { useUser } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

interface NavbarProps {
  user?: {
    user_metadata?: { avatar_url?: string };
    avatar_url?: string;
    // add other fields as needed
  };
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const { user: authUser, role, loading } = useUser();
  const router = useRouter();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  // Get user photo from Supabase user object
  const defaultPhoto = '/assets/images/user-profile.png';
  const effectiveUser = authUser || user;
  const photo = effectiveUser?.user_metadata?.avatar_url || effectiveUser?.avatar_url || defaultPhoto;

  // Search handler (stub)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement search logic
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsPanelOpen(false);
    router.push('/auth/login');
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPanelOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div id="nav-bar">
      <div className="nav-container">
        <Link href="/" className="logo" aria-label="Home">
          <h2>DiVINE</h2>
        </Link>
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
          {!loading && role === 'admin' && (
            <Link href="/admin" className="admin">
              <i className="ri-user-settings-line"></i>
            </Link>
          )}
          <Link href="/wishlist" className="wishlist" aria-label="Wishlist">
            <i className="ri-heart-3-line"></i>
          </Link>
          <Link href="/cart" className="cart" aria-label="Cart">
            <i className="ri-shopping-cart-line"></i>
          </Link>
          <div className="profile" onClick={() => setIsPanelOpen(true)}>
            <LazyImage
              src={photo}
              alt="profile"
              width={40}
              height={40}
              onError={() => {
                // Error handling is built into LazyImage component
              }}
            />
          </div>
        </div>
      </div>
      {/* Profile Slide Panel */}
      <div
        className={`profile-panel-overlay${isPanelOpen ? ' open' : ''}`}
        onClick={() => setIsPanelOpen(false)}
      ></div>
      <aside className={`profile-panel${isPanelOpen ? ' open' : ''}`} aria-hidden={!isPanelOpen}>
        <div className="profile-panel-header">
          <div className="profile-brief">
            <LazyImage src={photo} alt="profile" width={44} height={44} />
            <div className="meta">
              <span className="name">{effectiveUser?.email || 'Guest'}</span>
              {role === 'admin' && <span className="role">Admin</span>}
            </div>
          </div>
          <button className="close" aria-label="Close" onClick={() => setIsPanelOpen(false)}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <nav className="profile-panel-links" onClick={() => setIsPanelOpen(false)}>
          <Link href="/">
            <i className="ri-home-5-line"></i>
            <span>Home</span>
          </Link>
          <Link href="/orders">
            <i className="ri-file-list-3-line"></i>
            <span>Orders</span>
          </Link>
          <Link href="/account">
            <i className="ri-user-3-line"></i>
            <span>Account</span>
          </Link>
          <Link href="/saved-address">
            <i className="ri-map-pin-line"></i>
            <span>Saved Address</span>
          </Link>
          <Link href="/cart">
            <i className="ri-shopping-cart-2-line"></i>
            <span>Cart</span>
          </Link>
          <Link href="/track-order">
            <i className="ri-truck-line"></i>
            <span>Track Order</span>
          </Link>
          <Link href="/customer-care">
            <i className="ri-customer-service-2-line"></i>
            <span>Customer Care</span>
          </Link>
          <Link href="/contact">
            <i className="ri-contacts-book-2-line"></i>
            <span>Contact Us</span>
          </Link>
        </nav>
        <div className="profile-panel-footer">
          <button className="logout" onClick={handleLogout}>
            <i className="ri-logout-box-r-line"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;