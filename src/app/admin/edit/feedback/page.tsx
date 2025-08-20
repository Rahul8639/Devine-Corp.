'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import LoadingPage from '@/components/LoadingPage';
import { motion } from 'framer-motion';

type FB = { id: number; quote: string; name: string; description: string; image: string };

export default function EditFeedbackPage() {
  const router = useRouter();
  const { role, loading } = useUser();
  const [items, setItems] = useState<FB[]>([]);
  const [form, setForm] = useState<FB>({ id: Date.now(), quote: '', name: '', description: '', image: '/assets/images/user-profile.png' });
  const redirectOnceRef = useRef(false);

  useEffect(() => {
    if (!loading && role !== 'admin' && !redirectOnceRef.current) {
      redirectOnceRef.current = true;
      setTimeout(() => router.push('/auth/login?admin=1'), 1200);
    }
  }, [loading, role, router]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('feedbackData');
      if (raw) { const parsed = JSON.parse(raw); if (Array.isArray(parsed)) setItems(parsed); }
    } catch {}
  }, []);

  const save = (next: FB[]) => { setItems(next); try { localStorage.setItem('feedbackData', JSON.stringify(next)); } catch {} };
  const add = () => { if (!form.quote.trim()) return; save([...items, { ...form, id: Date.now() }]); setForm({ id: Date.now(), quote: '', name: '', description: '', image: '/assets/images/user-profile.png' }); };
  const remove = (idx: number) => save(items.filter((_, i) => i !== idx));
  const move = (from: number, to: number) => { if (to < 0 || to >= items.length) return; const next = [...items]; const [m] = next.splice(from, 1); next.splice(to, 0, m); save(next); };

  if (loading || role !== 'admin') { return <LoadingPage message={role !== 'admin' ? 'Please login with an admin account' : 'Loading...'} />; }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h1 style={{ fontWeight: 500 }}>Edit Feedback</h1>
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
          <h2>Add Testimonial</h2>
          <div className="input-group" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.5rem' }}>
            <label>Quote</label>
            <input className="image-url-input" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
            <label>Name</label>
            <input className="image-url-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <label>Description</label>
            <input className="image-url-input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <label>Profile image upload (optional)</label>
            <input type="file" accept="image/*" className="image-url-input" onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => setForm({ ...form, image: String(reader.result) });
              reader.readAsDataURL(file);
              if (e.target) e.target.value = '' as any;
            }} />
            <div>
              <button onClick={add} className="add-button">Add</button>
            </div>
          </div>
        </div>

        <div className="image-list" style={{ marginTop: '1rem' }}>
          <h3>Testimonials ({items.length})</h3>
          {items.map((p, idx) => (
            <div key={p.id} className="image-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
              <img src={p.image} alt={p.name} width={50} height={50} style={{ objectFit: 'cover', borderRadius: '9999px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                <span className="image-url" style={{ wordBreak: 'break-all' }}>{p.quote}</span>
                <span className="image-index">{p.name} • {p.description}</span>
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


