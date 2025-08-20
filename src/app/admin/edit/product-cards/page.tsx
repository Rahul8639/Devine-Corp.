'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import LoadingPage from '@/components/LoadingPage';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';

type Card = { id: number; name: string; video: string; originalPrice: number; discountedPrice: number };

export default function EditProductCardsPage() {
  const router = useRouter();
  const { role, loading } = useUser();
  const [cards, setCards] = useState<Card[]>([]);
  const [form, setForm] = useState<Card>({ id: Date.now(), name: '', video: '/assets/videos/vid.mp4', originalPrice: 2000, discountedPrice: 1200 });
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadVideoError, setUploadVideoError] = useState<string | null>(null);
  const redirectOnceRef = useRef(false);

  useEffect(() => {
    if (!loading && role !== 'admin' && !redirectOnceRef.current) {
      redirectOnceRef.current = true;
      setTimeout(() => router.push('/auth/login?admin=1'), 1200);
    }
  }, [loading, role, router]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('productCardsData');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCards(parsed);
      }
    } catch {}
  }, []);

  const save = (next: Card[]) => {
    setCards(next);
    try { localStorage.setItem('productCardsData', JSON.stringify(next)); } catch {}
  };

  const add = () => {
    if (!form.name.trim()) return;
    save([...cards, { ...form, id: Date.now() }]);
    setForm({ id: Date.now(), name: '', video: '/assets/videos/vid.mp4', originalPrice: 2000, discountedPrice: 1200 });
  };
  const remove = (idx: number) => save(cards.filter((_, i) => i !== idx));
  const move = (from: number, to: number) => {
    if (to < 0 || to >= cards.length) return;
    const next = [...cards];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    save(next);
  };

  const onUploadVideo = async (file: File) => {
    try {
      setUploadingVideo(true);
      setUploadVideoError(null);
      const ext = file.name.split('.').pop() || 'mp4';
      const path = `product-videos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from('Crousel-Image')
        .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });
      if (uploadErr) { setUploadVideoError(uploadErr.message); return; }
      const { data } = supabase.storage.from('Crousel-Image').getPublicUrl(path);
      const publicUrl = data?.publicUrl;
      if (publicUrl) setForm((f) => ({ ...f, video: publicUrl }));
    } catch (e: any) {
      setUploadVideoError(e?.message || 'Upload failed');
    } finally {
      setUploadingVideo(false);
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
          <h1 style={{ fontWeight: 500 }}>Edit Product Cards</h1>
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
          <h2>Add Card</h2>
          <div className="input-group" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.5rem' }}>
            <label>Product Name</label>
            <input className="image-url-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <label>Upload Video</label>
            <input
              type="file"
              accept="video/*"
              className="image-url-input"
              onChange={(e) => {
                const f = e.target.files && e.target.files[0];
                if (f) onUploadVideo(f);
                if (e.target) e.target.value = '' as any;
              }}
            />
            {uploadingVideo && <span style={{ fontSize: 14, opacity: 0.8 }}>Uploading...</span>}
            {uploadVideoError && <span style={{ fontSize: 14, color: '#f87171' }}>{uploadVideoError}</span>}
            <label>MRP</label>
            <input className="image-url-input" type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })} style={{ maxWidth: 200 }} />
            <label>Discounted</label>
            <input className="image-url-input" type="number" value={form.discountedPrice} onChange={(e) => setForm({ ...form, discountedPrice: Number(e.target.value) })} style={{ maxWidth: 200 }} />
            <div>
              <button onClick={add} className="add-button">Add</button>
            </div>
          </div>
        </div>

        <div className="image-list" style={{ marginTop: '1rem' }}>
          <h3>Cards ({cards.length})</h3>
          {cards.map((c, idx) => (
            <div key={c.id} className="image-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
              <video width={120} height={68} controls style={{ borderRadius: 6 }}>
                <source src={c.video} />
              </video>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                <span className="image-url" style={{ wordBreak: 'break-all' }}>{c.name}</span>
                <span className="image-index">₹ {c.discountedPrice} (MRP {c.originalPrice})</span>
              </div>
              <div className="image-actions" style={{ display: 'flex', gap: 4 }}>
                <button onClick={() => move(idx, idx - 1)} disabled={idx === 0} className="move-button up">↑</button>
                <button onClick={() => move(idx, idx + 1)} disabled={idx === cards.length - 1} className="move-button down">↓</button>
                <button onClick={() => remove(idx)} className="remove-button">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


