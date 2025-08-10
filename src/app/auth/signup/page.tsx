'use client';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import 'remixicon/fonts/remixicon.css';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState('ri-eye-close-line');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.phone || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone
          }
        }
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Account created successfully! Please check your email to verify your account.');
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setShowPasswordIcon(!showPassword ? 'ri-eye-line' : 'ri-eye-close-line');
  };

  return (
    <div id='login'>
      <div className='login-container'>
        <h1>Sign Up</h1>
        <div id='line'></div>
        <form onSubmit={handleSignup}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <div className='signup-row-flex'>
            <div className='email-input' style={{ flex: 1 }}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='email-input'>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className='email-input'>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='password-input'>
            <label htmlFor="password">Password</label>
            <div id='password-input'>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <motion.i
                whileTap={{ scale: 0.6 }}
                onClick={togglePasswordVisibility}
                className={showPasswordIcon}
              ></motion.i>
            </div>
          </div>
          <div className='signup-actions-row'>
            <motion.button
              type="submit"
              disabled={loading}
              className="signup-submit-sign-btn"
              whileTap={{ scale: 0.92 }}
            >
              {loading ? <span className="loader"></span> : 'Create Account'}
            </motion.button>
            <motion.button
              type="button"
              onClick={handleGoogleSignup}
              disabled={googleLoading}
              className="signup-google-btn"
              whileHover={{ width: '94%' }}
              whileTap={{ scale: 0.92 }}
            >
              <i className="ri-google-fill"></i>
            </motion.button>
          </div>
        </form>
        <div id='line2'></div>
        <div className='login-links'>
          <p style={{ marginBottom: '0.5rem' }}>
            By signing up, you agree to our <Link href="/terms">Terms and Conditions</Link>.
          </p>
          <p>
            Already have an account?{' '}
            <Link href="/auth/login">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 