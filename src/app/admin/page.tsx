"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { useUser } from "@/context/AuthContext";
import LoadingPage from "@/components/LoadingPage";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const { user, role, loading } = useUser();

  const redirectOnceRef = useRef(false);
  useEffect(() => {
    if (!loading && role !== 'admin' && !redirectOnceRef.current) {
      redirectOnceRef.current = true;
      setTimeout(() => {
        router.push('/auth/login?admin=1');
      }, 1200);
    }
  }, [loading, role, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login?admin=1");
  };

  if (loading || role !== 'admin') {
    return <LoadingPage message={role !== 'admin' ? 'Please login with an admin account' : 'Loading...'} />;
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h1 style={{ fontWeight: 500 }}>Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => router.push('/')} style={{ padding: '8px 14px', borderRadius: 6, backgroundColor: '#dc2626', color: 'white', cursor: 'pointer', border: 'none', fontWeight: 500 }}>Go to Storefront</button>
          </div>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #2a2a2a', borderRadius: 8, marginBottom: '1rem' }}>
          <p>Welcome, {user?.email}. Use the admin tools to adjust content shown in the user panel.</p>
        </div>

        <section className="admin-sections">
          <h2 className="admin-sections-title">Edit Site Sections</h2>
          <div className="admin-grid">
            <Link href="/admin/edit/top-cta" className="admin-card">
              <i className="ri-megaphone-line"></i>
              <span>Edit CTA (TopCTA)</span>
            </Link>
            <Link href="/admin/edit/hero-carousel" className="admin-card">
              <i className="ri-slideshow-3-line"></i>
              <span>Edit Carousel (Hero)</span>
            </Link>
            <Link href="/admin/edit/categories" className="admin-card">
              <i className="ri-grid-line"></i>
              <span>Edit Categories</span>
            </Link>
            <Link href="/admin/edit/product-cards" className="admin-card">
              <i className="ri-shopping-bag-3-line"></i>
              <span>Edit Product Cards</span>
            </Link>
            <Link href="/admin/edit/featured-product" className="admin-card">
              <i className="ri-star-smile-line"></i>
              <span>Edit Featured Product</span>
            </Link>
            <Link href="/admin/edit/hot-product" className="admin-card">
              <i className="ri-fire-line"></i>
              <span>Edit Hot Product</span>
            </Link>
            <Link href="/admin/edit/mixed-items" className="admin-card">
              <i className="ri-layout-2-line"></i>
              <span>Edit MixedItems Centre</span>
            </Link>
            <Link href="/admin/edit/feedback" className="admin-card">
              <i className="ri-chat-1-line"></i>
              <span>Edit Feedback</span>
            </Link>
            <Link href="/admin/edit/before-after" className="admin-card">
              <i className="ri-contrast-drop-2-line"></i>
              <span>Edit Before & After</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
