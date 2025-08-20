'use client';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import 'remixicon/fonts/remixicon.css';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const isAdminMode = searchParams.get('admin') === '1' || searchParams.get('admin') === 'true';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState('ri-eye-close-line');
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setShowPasswordIcon(!showPassword ? 'ri-eye-line' : 'ri-eye-close-line');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Password reset link sent to your email!');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div id='login' className={isAdminMode ? 'admin' : ''}>
      <div className='login-container'>
      <h1>
        {isAdminMode ? 'Admin Login' : 'Login'}
        {isAdminMode && <span className="admin-badge">Admin</span>}
      </h1>
      <div id='line'></div>
      <form onSubmit={handleLogin}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className='success-message'>{success}</div>}
        <div className='email-input'>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='password-input'>
          <label htmlFor="password">Password</label>
          <div id='password-input'>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type={showPassword ? 'text' : 'password'} 
              id='password' 
              name='password' 
              required 
            /> 
            <motion.i 
              whileTap={{ scale: 0.6 }} 
              onClick={togglePasswordVisibility} 
              className={showPasswordIcon}
            ></motion.i>
          </div>
          <div className='forgot-password'>
            <button type="button" onClick={handleForgotPassword}>Forgot password?</button>
          </div>
        </div>
        <div className='login-button'>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ width: '94%' }}
            whileTap={{ scale: 0.92 }}
          >
            {loading ? <span className="loader"></span> : 'Sign In'}
          </motion.button>
        </div>
      </form>
      <div className='google-login'>
        <button onClick={handleGoogleLogin} disabled={googleLoading}>
          {googleLoading ? 'Loading...' : 'Continue with Google'}
        </button>
      </div>
      <div id='line2'></div>
      <div className='login-links'>
        <p>
          Don't have an account?{' '}
          <Link href="/auth/signup">Sign Up</Link>
        </p>
      </div>
      </div>
    </div>
    </>
  );
}
