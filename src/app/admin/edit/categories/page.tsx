'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import LoadingPage from '@/components/LoadingPage';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';

type Category = { title: string; units: number; image: string };
type AllProductsCard = { image: string; stock: number };

export default function EditCategoriesPage() {
  const router = useRouter();
  const { role, loading } = useUser();
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProductsCard, setAllProductsCard] = useState<AllProductsCard>({ image: '/assets/images/example.jpg', stock: 0 });
  const [form, setForm] = useState<Category>({ title: '', units: 0, image: '' });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [allProductsUploading, setAllProductsUploading] = useState(false);
  const [allProductsUploadError, setAllProductsUploadError] = useState<string | null>(null);
  const redirectOnceRef = useRef(false);

  useEffect(() => {
    if (!loading && role !== 'admin' && !redirectOnceRef.current) {
      redirectOnceRef.current = true;
      setTimeout(() => router.push('/auth/login?admin=1'), 1200);
    }
  }, [loading, role, router]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('categoriesData');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCategories(parsed);
      }
    } catch {}
    
    try {
      const raw = localStorage.getItem('allProductsCardData');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.image === 'string' && typeof parsed.stock === 'number') {
          setAllProductsCard(parsed);
        }
      }
    } catch {}
  }, []);

  const save = (next: Category[]) => {
    setCategories(next);
    try {
      localStorage.setItem('categoriesData', JSON.stringify(next));
    } catch {}
  };

  const saveAllProductsCard = (next: AllProductsCard) => {
    setAllProductsCard(next);
    try {
      localStorage.setItem('allProductsCardData', JSON.stringify(next));
    } catch {}
  };

  const addCategory = () => {
    const title = form.title.trim();
    if (!title) return;
    const units = Number(form.units) || 0;
    const image = form.image.trim();
    if (!image) return;
    save([...categories, { title, units, image }]);
    setForm({ title: '', units: 0, image: '' });
  };

  const removeCategory = (idx: number) => {
    save(categories.filter((_, i) => i !== idx));
  };

  const moveCategory = (from: number, to: number) => {
    if (to < 0 || to >= categories.length) return;
    const next = [...categories];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    save(next);
  };

  const onUploadFile = async (file: File) => {
    try {
      setUploading(true);
      setUploadError(null);
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `categories/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from('Category-data-2')
        .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });
      if (uploadErr) {
        setUploadError(uploadErr.message);
        return;
      }
      const { data } = supabase.storage.from('Category-data-2').getPublicUrl(path);
      const publicUrl = data?.publicUrl;
      if (publicUrl) {
        setForm((f) => ({ ...f, image: publicUrl }));
      }
    } catch (e: any) {
      setUploadError(e?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onUploadAllProductsFile = async (file: File) => {
    try {
      setAllProductsUploading(true);
      setAllProductsUploadError(null);
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `all-products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from('Category-data-2')
        .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });
      if (uploadErr) {
        setAllProductsUploadError(uploadErr.message);
        return;
      }
      const { data } = supabase.storage.from('Category-data-2').getPublicUrl(path);
      const publicUrl = data?.publicUrl;
      if (publicUrl) {
        saveAllProductsCard({ ...allProductsCard, image: publicUrl });
      }
    } catch (e: any) {
      setAllProductsUploadError(e?.message || 'Upload failed');
    } finally {
      setAllProductsUploading(false);
    }
  };

  if (loading || role !== 'admin') {
    return <LoadingPage message={role !== 'admin' ? 'Please login with an admin account' : 'Loading...'} />;
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h1 style={{ fontWeight: 500 }}>Edit Categories</h1>
          <motion.button 
            onClick={() => router.push('/admin')} 
            style={{ 
              padding: '8px 16px', 
              borderRadius: 8, 
              backgroundColor: '#f3f4f6',
              border: '1px solid #e5e7eb',
              color: '#374151',
              minWidth: '100px'
            }} 
            aria-label="Back"
            whileTap={{ scale: 0.95 }}
          >
            <i className="ri-arrow-left-long-line" style={{ fontSize: '18px' }}></i>
          </motion.button>
        </div>

        <div className="management-section">
          <h2>Add / Edit Category</h2>
          <div className="input-group" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.5rem' }}>
            <label>Product Name</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="image-url-input"
            />
            <label>Stock Available</label>
            <input
              type="number"
              value={form.units}
              onChange={(e) => setForm((f) => ({ ...f, units: Number(e.target.value) }))}
              className="image-url-input"
              style={{ maxWidth: 200 }}
            />
            <label>Upload image</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="file"
                accept="image/*"
                className="image-url-input"
                onChange={(e) => {
                  const f = e.target.files && e.target.files[0];
                  if (f) onUploadFile(f);
                  if (e.target) e.target.value = '' as any;
                }}
              />
              {uploading && <span style={{ fontSize: 14, opacity: 0.8 }}>Uploading...</span>}
              {uploadError && <span style={{ fontSize: 14, color: '#f87171' }}>{uploadError}</span>}
            </div>
            <div>
              <button onClick={addCategory} className="add-button">Add</button>
            </div>
          </div>
        </div>

        <div className="image-list" style={{ marginTop: '1rem' }}>
          <h3>Categories ({categories.length})</h3>
          {categories.map((c, idx) => (
            <div key={idx} className="image-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
              <img src={c.image} alt={c.title} width={100} height={60} style={{ objectFit: 'cover', borderRadius: 6 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                <span className="image-url" style={{ wordBreak: 'break-all' }}>{c.title}</span>
                <span className="image-index">Units: {c.units}</span>
              </div>
              <div className="image-actions" style={{ display: 'flex', gap: 4 }}>
                <button onClick={() => moveCategory(idx, idx - 1)} disabled={idx === 0} className="move-button up">↑</button>
                <button onClick={() => moveCategory(idx, idx + 1)} disabled={idx === categories.length - 1} className="move-button down">↓</button>
                <button onClick={() => removeCategory(idx)} className="remove-button">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="management-section" style={{ marginTop: '2rem' }}>
          <h2>All Products Card</h2>
          <p style={{ marginBottom: '1rem', opacity: 0.8 }}>This card appears at the end of the categories and shows total products available.</p>
          <div className="input-group" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.5rem' }}>
            <label>Total Stock Number</label>
            <input
              type="number"
              value={allProductsCard.stock}
              onChange={(e) => saveAllProductsCard({ ...allProductsCard, stock: Number(e.target.value) || 0 })}
              className="image-url-input"
              style={{ maxWidth: 200 }}
              placeholder="Enter total stock number"
            />
            <label>Upload All Products Card Image</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="file"
                accept="image/*"
                className="image-url-input"
                onChange={(e) => {
                  const f = e.target.files && e.target.files[0];
                  if (f) onUploadAllProductsFile(f);
                  if (e.target) e.target.value = '' as any;
                }}
              />
              {allProductsUploading && <span style={{ fontSize: 14, opacity: 0.8 }}>Uploading...</span>}
              {allProductsUploadError && <span style={{ fontSize: 14, color: '#f87171' }}>{allProductsUploadError}</span>}
            </div>
          </div>
          
          <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: 8, backgroundColor: '#f9fafb' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Current All Products Card</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img 
                src={allProductsCard.image} 
                alt="All Products" 
                width={150} 
                height={90} 
                style={{ objectFit: 'cover', borderRadius: 6 }} 
              />
                             <div>
                 <p style={{ margin: 0, fontWeight: 500 }}>All Products</p>
                 <p style={{ margin: 0, opacity: 0.7 }}>Total {allProductsCard.stock} Products Available</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


