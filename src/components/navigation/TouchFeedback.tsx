import React from 'react';
import { motion } from 'framer-motion';

interface TouchFeedbackProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function TouchFeedback({ children, onClick, className = '' }: TouchFeedbackProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={`touch-none ${className}`}
      onClick={onClick}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {children}
    </motion.div>
  );
}