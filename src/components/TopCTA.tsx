"use client";
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const defaultMessages = [
  'Free Delivery - FAB400',
  'Get 10% Off - DIVINE10',
  'New Arrivals Just Landed!',
  'Flash Sale: Up to 50% Off',
  'Sign up for exclusive deals!',
];

const ANIMATION_DURATION = 0.35;
const EXIT_FADE_DURATION = 0.20;

const TopCTA = () => {
  const [messages, setMessages] = useState<string[]>(defaultMessages);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for up/next, -1 for down/prev

  useEffect(() => {
    // Load from localStorage
    try {
      const raw = localStorage.getItem('topCtaMessages');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.every((m) => typeof m === 'string')) {
          setMessages(parsed.length > 0 ? parsed : defaultMessages);
          setCurrent(0);
        }
      }
    } catch {}

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'topCtaMessages') {
        try {
          const nxt = e.newValue ? JSON.parse(e.newValue) : [];
          if (Array.isArray(nxt) && nxt.every((m) => typeof m === 'string')) {
            setMessages(nxt.length > 0 ? nxt : defaultMessages);
            setCurrent(0);
          }
        } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % Math.max(messages.length, 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [messages]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + Math.max(messages.length, 1)) % Math.max(messages.length, 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % Math.max(messages.length, 1));
  };

  return (
    <div className="top-cta-bar">
      <motion.span
        className="top-cta-arrow"
        onClick={handlePrev}
        whileTap={{ scale: 0.95 }}
        style={{ marginRight: 0 }}
      >
        <i className="ri-arrow-left-long-line"></i>
      </motion.span>
      <span className="top-cta-text" style={{ position: 'relative', display: 'inline-block', minWidth: '220px', minHeight: '1.7em' }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.span
            key={current}
            custom={direction}
            initial={{
              y: direction === 1 ? 32 : -32,
              opacity: 0,
              position: 'absolute',
              left: 0,
              right: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              position: 'absolute',
              left: 0,
              right: 0,
            }}
            exit={{
              y: direction === 1 ? -32 : 32,
              opacity: 0,
              position: 'absolute',
              left: 0,
              right: 0,
            }}
            transition={{
              y: { duration: ANIMATION_DURATION, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: EXIT_FADE_DURATION, ease: 'easeIn' },
              position: { duration: 0 }
            }}
            style={{ width: '100%', display: 'inline-block', textAlign: 'center' }}
          >
            {messages[current]}
          </motion.span>
        </AnimatePresence>
      </span>
      <motion.span
        className="top-cta-arrow"
        onClick={handleNext}
        whileTap={{ scale: 0.90 }}
        style={{ marginLeft: 0 }}
      >
        <i className="ri-arrow-right-long-line"></i>
      </motion.span>
    </div>
  );
};

export default TopCTA;