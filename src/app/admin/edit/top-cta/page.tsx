'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import LoadingPage from '@/components/LoadingPage';
import { motion } from 'framer-motion';

export default function EditTopCtaPage() {
  const router = useRouter();
  const { role, loading } = useUser();
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!loading && role !== 'admin' && !hasRedirected.current) {
      hasRedirected.current = true;
      setTimeout(() => router.push('/auth/login?admin=1'), 1200);
    }
  }, [loading, role, router]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('topCtaMessages');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.every((m) => typeof m === 'string')) {
          setMessages(parsed);
        }
      }
    } catch {}
  }, []);

  const saveMessages = (next: string[]) => {
    setMessages(next);
    try {
      localStorage.setItem('topCtaMessages', JSON.stringify(next));
    } catch {}
  };

  const addMessage = () => {
    const value = newMessage.trim();
    if (!value) return;
    saveMessages([...messages, value]);
    setNewMessage('');
  };

  const removeMessage = (index: number) => {
    const next = messages.filter((_, i) => i !== index);
    saveMessages(next);
  };

  const moveMessage = (from: number, to: number) => {
    if (to < 0 || to >= messages.length) return;
    const next = [...messages];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    saveMessages(next);
  };

  if (loading || role !== 'admin') {
    return <LoadingPage message={role !== 'admin' ? 'Please login with an admin account' : 'Loading...'} />;
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h1 style={{ fontWeight: 500 }}>Edit CTA (Top Bar)</h1>
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

        <div className="admin-card" style={{ padding: '1rem', alignItems: 'stretch' }}>
          <label htmlFor="new-cta" style={{ marginBottom: '0.5rem' }}>Add new message</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              id="new-cta"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Enter CTA message"
              style={{ flex: 1, padding: '0.6rem 0.75rem', borderRadius: 8, border: '1px solid #2a2a2a', background: 'transparent', color: '#e9e9e9' }}
            />
            <button onClick={addMessage} style={{ padding: '8px 14px', borderRadius: 8, cursor: 'pointer' }}>Add</button>
          </div>
        </div>

        <div style={{ marginTop: '1rem', border: '1px solid #2a2a2a', borderRadius: 8 }}>
          <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #2a2a2a' }}>Messages ({messages.length})</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {messages.length === 0 && (
              <li style={{ padding: '0.75rem 1rem', color: '#a3a3a3' }}>No messages yet. Add one above.</li>
            )}
            {messages.map((m, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderTop: '1px solid #2a2a2a' }}>
                <span style={{ flex: 1 }}>{m}</span>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button onClick={() => moveMessage(idx, idx - 1)} disabled={idx === 0} style={{ padding: '6px 10px', borderRadius: 6, cursor: 'pointer' }}>
                    ↑
                  </button>
                  <button onClick={() => moveMessage(idx, idx + 1)} disabled={idx === messages.length - 1} style={{ padding: '6px 10px', borderRadius: 6, cursor: 'pointer' }}>
                    ↓
                  </button>
                  <button onClick={() => removeMessage(idx)} style={{ padding: '6px 10px', borderRadius: 6, cursor: 'pointer' }}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


