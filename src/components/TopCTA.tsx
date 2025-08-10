import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const messages = [
  'Free Delivery - FAB400',
  'Get 10% Off - DIVINE10',
  'New Arrivals Just Landed!',
  'Flash Sale: Up to 50% Off',
  'Sign up for exclusive deals!',
];

const ANIMATION_DURATION = 0.35;
const EXIT_FADE_DURATION = 0.20;

const TopCTA = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for up/next, -1 for down/prev

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [current]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % messages.length);
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