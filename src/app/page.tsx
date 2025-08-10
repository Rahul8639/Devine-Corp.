'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import TopCTA from '../components/TopCTA';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryCarousel from '../components/CategoryCarousel';
import ProductCard from '../components/ProductCard';
import FeaturedProduct from '../components/FeaturedProduct';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { ParalaxText } from '../components/ParalaxText';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';
import HotProduct from '../components/HotProduct';
import MixedItemsProduct from '../components/MixedItemsProduct';
import FeedbackCase from '../components/FeedbackCase';
import { useLenis } from '@/hooks/useLenis';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  if (loading) {
    return <LoadingPage />
  }

  return (
    <div>
      <TopCTA />
      <Navbar />
      <Hero />
      <CategoryCarousel />
      <ProductCard />
      <FeaturedProduct />
      <HotProduct />
      <MixedItemsProduct />
      <FeedbackCase />
      <BeforeAfterSlider />
      <ParalaxText />
      <Footer />
    </div>
  );
}

