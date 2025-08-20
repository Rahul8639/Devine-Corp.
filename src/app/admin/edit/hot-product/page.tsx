'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import LoadingPage from '@/components/LoadingPage';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';

type HP = { id: string; name: string; currentPrice: string; mrp: string; images: string[]; description?: string };

export default function EditHotProductPage() {
  const router = useRouter();
  const { role, loading } = useUser();
  const [product, setProduct] = useState<HP>({ id: '1', name: '', currentPrice: '₹ 5000/-', mrp: '₹ 6000/-', images: [], description: '' });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const redirectOnceRef = useRef(false);

  useEffect(() => {
    if (!loading && role !== 'admin' && !redirectOnceRef.current) {
      redirectOnceRef.current = true;
      setTimeout(() => router.push('/auth/login?admin=1'), 1200);
    }
  }, [loading, role, router]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('hotProductData');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed) setProduct(parsed);
      }
    } catch {}
  }, []);

  const save = (next: HP) => {
    setProduct(next);
    try { localStorage.setItem('hotProductData', JSON.stringify(next)); } catch {}
  };

  const addImage = (url: string) => save({ ...product, images: [...product.images, url] });
  const removeImage = (idx: number) => save({ ...product, images: product.images.filter((_, i) => i !== idx) });
  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= product.images.length) return;
    const next = [...product.images];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    save({ ...product, images: next });
  };

  const onUploadFile = async (file: File) => {
    try {
      setUploading(true);
      setUploadError(null);
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `hot/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from('Crousel-Image')
        .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });
      if (uploadErr) { setUploadError(uploadErr.message); return; }
      const { data } = supabase.storage.from('Crousel-Image').getPublicUrl(path);
      const publicUrl = data?.publicUrl;
      if (publicUrl) addImage(publicUrl);
    } catch (e: any) {
      setUploadError(e?.message || 'Upload failed');
    } finally { setUploading(false); }
  };

  if (loading || role !== 'admin') {
    return <LoadingPage message={role !== 'admin' ? 'Please login with an admin account' : 'Loading...'} />;
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h1 style={{ fontWeight: 500 }}>Edit Hot Product</h1>
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
          <h2>Details</h2>
          <div className="input-group" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.5rem' }}>
            <label>Product Name</label>
            <input className="image-url-input" value={product.name} onChange={(e) => save({ ...product, name: e.target.value })} />
            <label>Current Price</label>
            <input className="image-url-input" value={product.currentPrice} onChange={(e) => save({ ...product, currentPrice: e.target.value })} />
            <label>MRP</label>
            <input className="image-url-input" value={product.mrp} onChange={(e) => save({ ...product, mrp: e.target.value })} />
            <label>Description</label>
            <input className="image-url-input" value={product.description || ''} onChange={(e) => save({ ...product, description: e.target.value })} />
          </div>
        </div>

        <div className="management-section">
          <h2>Images</h2>
          <div className="input-group" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.5rem' }}>
            <label>Upload image</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="file" accept="image/*" className="image-url-input" onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) onUploadFile(f); if (e.target) e.target.value = '' as any; }} />
              {uploading && <span style={{ fontSize: 14, opacity: 0.8 }}>Uploading...</span>}
              {uploadError && <span style={{ fontSize: 14, color: '#f87171' }}>{uploadError}</span>}
            </div>
          </div>
          <div className="image-list" style={{ marginTop: '1rem' }}>
            <h3>Images ({product.images.length})</h3>
            {product.images.map((img, idx) => (
              <div key={idx} className="image-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                <img src={img} alt={`Img ${idx+1}`} width={100} height={60} style={{ objectFit: 'cover', borderRadius: 6 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                  <span className="image-url" style={{ wordBreak: 'break-all' }}>{img}</span>
                </div>
                <div className="image-actions" style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => moveImage(idx, idx - 1)} disabled={idx === 0} className="move-button up">↑</button>
                  <button onClick={() => moveImage(idx, idx + 1)} disabled={idx === product.images.length - 1} className="move-button down">↓</button>
                  <button onClick={() => removeImage(idx)} className="remove-button">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


