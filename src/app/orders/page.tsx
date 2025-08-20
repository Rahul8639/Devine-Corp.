'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';
import LoadingPage from '@/components/LoadingPage';

export default function OrdersPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }
      setLoading(false);
    };
    check();
  }, [router]);

  if (loading) return <LoadingPage />;

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem' }}>
        <h1 style={{ fontWeight: 500 }}>Your Orders</h1>
        <p>Coming soon.</p>
      </div>
    </div>
  );
}


