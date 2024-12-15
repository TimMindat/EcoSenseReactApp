import React from 'react';
import { motion } from 'framer-motion';
import { useHaptics } from '../../lib/hooks/useHaptics';

interface TouchFeedbackProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hapticStyle?: 'light' | 'medium' | 'heavy';
}

export function TouchFeedback({ 
  children, 
  onClick, 
  className = '',
  hapticStyle = 'light'
}: TouchFeedbackProps) {
  const { triggerHaptic } = useHaptics();

  const handleClick = (e: React.MouseEvent) => {
    triggerHaptic(hapticStyle);
    onClick?.(e);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={`touch-none ${className}`}
      onClick={handleClick}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {children}
    </motion.div>
  );
}