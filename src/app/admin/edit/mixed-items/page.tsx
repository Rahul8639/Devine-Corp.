'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import LoadingPage from '@/components/LoadingPage';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';

type MP = { id: number; name: string; price: string; mrp: string; rating: string; image: string; brand: string };

export default function EditMixedItemsPage() {
  const router = useRouter();
  const { role, loading } = useUser();
  const [items, setItems] = useState<MP[]>([]);
  const [form, setForm] = useState<MP>({ id: Date.now(), name: '', price: '₹1800/-', mrp: '3200', rating: '4.5', image: '', brand: 'Divine' });
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
      const raw = localStorage.getItem('mixedItemsData');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
  }, []);

  const save = (next: MP[]) => {
    setItems(next);
    try { localStorage.setItem('mixedItemsData', JSON.stringify(next)); } catch {}
  };

  const add = () => {
    if (!form.name.trim()) return;
    save([...items, { ...form, id: Date.now() }]);
    setForm({ id: Date.now(), name: '', price: '₹1800/-', mrp: '3200', rating: '4.5', image: '', brand: 'Divine' });
  };
  const remove = (idx: number) => save(items.filter((_, i) => i !== idx));
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    save(next);
  };

  const onUploadFile = async (file: File) => {
    try {
      setUploading(true);
      setUploadError(null);
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `mixed/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from('Crousel-Image')
        .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });
      if (uploadErr) { setUploadError(uploadErr.message); return; }
      const { data } = supabase.storage.from('Crousel-Image').getPublicUrl(path);
      const publicUrl = data?.publicUrl;
      if (publicUrl) setForm((f) => ({ ...f, image: publicUrl }));
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
          <h1 style={{ fontWeight: 500 }}>Edit Mixed Items</h1>
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
          <h2>Add Item</h2>
          <div className="input-group" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.5rem' }}>
            <label>Product Name</label>
            <input className="image-url-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <label>Price</label>
            <input className="image-url-input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <label>MRP</label>
            <input className="image-url-input" value={form.mrp} onChange={(e) => setForm({ ...form, mrp: e.target.value })} />
            <label>Rating</label>
            <input className="image-url-input" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
            <label>Brand</label>
            <input className="image-url-input" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
            <label>Upload image</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="file" accept="image/*" className="image-url-input" onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) onUploadFile(f); if (e.target) e.target.value = '' as any; }} />
              {uploading && <span style={{ fontSize: 14, opacity: 0.8 }}>Uploading...</span>}
              {uploadError && <span style={{ fontSize: 14, color: '#f87171' }}>{uploadError}</span>}
            </div>
            <div>
              <button onClick={add} className="add-button">Add</button>
            </div>
          </div>
        </div>

        <div className="image-list" style={{ marginTop: '1rem' }}>
          <h3>Items ({items.length})</h3>
          {items.map((p, idx) => (
            <div key={p.id} className="image-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
              <img src={p.image} alt={p.name} width={100} height={60} style={{ objectFit: 'cover', borderRadius: 6 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                <span className="image-url" style={{ wordBreak: 'break-all' }}>{p.name}</span>
                <span className="image-index">{p.price} (MRP {p.mrp}) • ⭐ {p.rating} • {p.brand}</span>
              </div>
              <div className="image-actions" style={{ display: 'flex', gap: 4 }}>
                <button onClick={() => move(idx, idx - 1)} disabled={idx === 0} className="move-button up">↑</button>
                <button onClick={() => move(idx, idx + 1)} disabled={idx === items.length - 1} className="move-button down">↓</button>
                <button onClick={() => remove(idx)} className="remove-button">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


