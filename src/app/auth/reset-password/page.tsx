'use client';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import 'remixicon/fonts/remixicon.css';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState('ri-eye-close-line');
  const [showConfirmPasswordIcon, setShowConfirmPasswordIcon] = useState('ri-eye-close-line');
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth/login');
      }
    };
    checkSession();
  }, [router]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setShowPasswordIcon(!showPassword ? 'ri-eye-line' : 'ri-eye-close-line');
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
    setShowConfirmPasswordIcon(!showConfirmPassword ? 'ri-eye-line' : 'ri-eye-close-line');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Password updated successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div id='login'>
      <div className='login-container'>
        <h1>Reset Password</h1>
        <div id='line'></div>
        <form onSubmit={handleResetPassword}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className='success-message'>{success}</div>}
          <div className='password-input'>
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='password-input'>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <div id='password-input'>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
              <motion.i 
                whileTap={{ scale: 0.6 }} 
                onClick={toggleConfirmPasswordVisibility} 
                className={showConfirmPasswordIcon}
              ></motion.i>
            </div>
          </div>
          <div className='login-button'>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ width: '94%' }}
              whileTap={{ scale: 0.92 }}
            >
              {loading ? <span className="loader"></span> : 'Update Password'}
            </motion.button>
          </div>
        </form>
        <div id='line2'></div>
        <div className='login-links'>
          <p>
            Remember your password?{' '}
            <Link href="/auth/login">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
} 