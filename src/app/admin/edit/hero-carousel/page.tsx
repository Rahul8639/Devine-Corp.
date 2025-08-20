'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import LoadingPage from '@/components/LoadingPage';
import ImageSlider from '@/components/ImageSlider';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';

export default function EditHeroCarouselPage() {
  const router = useRouter();
  const { role, loading } = useUser();
  const [images, setImages] = useState<string[]>([]);
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
      const raw = localStorage.getItem('heroCarouselImages');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.every((u) => typeof u === 'string')) {
          setImages(parsed);
        }
      }
    } catch {}
  }, []);

  const save = (next: string[]) => {
    setImages(next);
    try {
      localStorage.setItem('heroCarouselImages', JSON.stringify(next));
    } catch {}
  };

  // Removed manual URL add; uploads only

  const removeImage = (idx: number) => {
    const next = images.filter((_, i) => i !== idx);
    save(next);
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const next = [...images];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    save(next);
  };

  const onUploadFile = async (file: File) => {
    try {
      setUploading(true);
      setUploadError(null);
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `hero/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from('Crousel-Image')
        .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });
      if (uploadErr) {
        setUploadError(uploadErr.message);
        return;
      }
      const { data } = supabase.storage.from('Crousel-Image').getPublicUrl(path);
      const publicUrl = data?.publicUrl;
      if (publicUrl) {
        save([...images, publicUrl]);
      }
    } catch (e: any) {
      setUploadError(e?.message || 'Upload failed');
    } finally {
      setUploading(false);
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
          <h1 style={{ fontWeight: 500 }}>Edit Hero Carousel</h1>
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

        <div className="admin-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="preview-section">
            <h2>Preview</h2>
            <div className="slider-preview">
              <ImageSlider
                images={images.length ? images : ['/assets/images/example.jpg']}
                autoPlayInterval={4000}
                showNavigation
                showDots
                showProgress={false}
                className="preview-slider"
              />
            </div>
          </div>

          <div className="management-section">
            <h2>Manage Images</h2>
            <div className="add-image-form">
              <h3>Add New Image</h3>
              <div className="input-group" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.5rem' }}>
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
              </div>
            </div>

            <div className="image-list">
              <h3>Current Images ({images.length})</h3>
              {images.map((image, index) => (
                <div key={index} className="image-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                  <img src={image} alt={`Slide ${index + 1}`} width={100} height={60} style={{ objectFit: 'cover', borderRadius: 6 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                    <span className="image-url" style={{ wordBreak: 'break-all' }}>{image}</span>
                    <span className="image-index">Position: {index + 1}</span>
                  </div>
                  <div className="image-actions" style={{ display: 'flex', gap: 4 }}>
                    <button onClick={() => moveImage(index, index - 1)} disabled={index === 0} className="move-button up">↑</button>
                    <button onClick={() => moveImage(index, index + 1)} disabled={index === images.length - 1} className="move-button down">↓</button>
                    <button onClick={() => removeImage(index)} className="remove-button">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


