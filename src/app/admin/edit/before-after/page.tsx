'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import LoadingPage from '@/components/LoadingPage';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';

type BA = { before: string; after: string; title?: string };

export default function EditBeforeAfterPage() {
  const router = useRouter();
  const { role, loading } = useUser();
  const [data, setData] = useState<BA>({ before: '/assets/images/example.jpg', after: '/assets/images/2nd.png', title: 'Time To Shine' });
  const [uploading, setUploading] = useState<'before' | 'after' | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const redirectOnceRef = useRef(false);

  useEffect(() => {
    if (!loading && role !== 'admin' && !redirectOnceRef.current) {
      redirectOnceRef.current = true;
      setTimeout(() => router.push('/auth/login?admin=1'), 1200);
    }
  }, [loading, role, router]);

  useEffect(() => {
    try { const raw = localStorage.getItem('beforeAfterData'); if (raw) setData(JSON.parse(raw)); } catch {}
  }, []);

  const save = (next: BA) => { setData(next); try { localStorage.setItem('beforeAfterData', JSON.stringify(next)); } catch {} };

  const onUploadFile = async (file: File, which: 'before' | 'after') => {
    try {
      setUploading(which);
      setUploadError(null);
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `before-after/${which}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from('Crousel-Image')
        .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });
      if (uploadErr) { setUploadError(uploadErr.message); return; }
      const { data } = supabase.storage.from('Crousel-Image').getPublicUrl(path);
      const publicUrl = data?.publicUrl;
      if (publicUrl) save({ ...data, [which]: publicUrl });
    } catch (e: any) {
      setUploadError(e?.message || 'Upload failed');
    } finally { setUploading(null); }
  };

  if (loading || role !== 'admin') { return <LoadingPage message={role !== 'admin' ? 'Please login with an admin account' : 'Loading...'} />; }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h1 style={{ fontWeight: 500 }}>Edit Before & After</h1>
          <motion.button 
            onClick={() => router.push('/admin')} 
            style={{ 
              padding: '8px 16px', 
              borderRadius: 8, 
              backgroundColor: '#f3f4f6',
              border: '1px solid #e5e7eb',
              color: '#374151',
              minWidth: '100px',
              cursor: 'pointer'
            }} 
            aria-label="Back"
            whileTap={{ scale: 0.95 }}
          >
            <i className="ri-arrow-left-long-line" style={{ fontSize: '18px' }}></i>
          </motion.button>
        </div>

        <div className="management-section">
          <h2>Content</h2>
          <div className="input-group" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.5rem' }}>
            <label>Title</label>
            <input className="image-url-input" value={data.title || ''} onChange={(e) => save({ ...data, title: e.target.value })} />
            <label>Upload Before</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="file" accept="image/*" className="image-url-input" onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) onUploadFile(f, 'before'); if (e.target) e.target.value = '' as any; }} />
              {uploading === 'before' && <span style={{ fontSize: 14, opacity: 0.8 }}>Uploading...</span>}
            </div>
            <label>Upload After</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="file" accept="image/*" className="image-url-input" onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) onUploadFile(f, 'after'); if (e.target) e.target.value = '' as any; }} />
              {uploading === 'after' && <span style={{ fontSize: 14, opacity: 0.8 }}>Uploading...</span>}
            </div>
            {uploadError && <div style={{ color: '#f87171' }}>{uploadError}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}


