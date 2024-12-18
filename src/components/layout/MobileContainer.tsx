import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileContainer = forwardRef<HTMLDivElement, MobileContainerProps>(
  ({ children, className = '' }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`
          min-h-[calc(100vh-4rem)]
          max-w-[428px]
          mx-auto
          px-4
          py-4
          pb-20
          ${className}
        `}
        style={{
          minHeight: 'calc(var(--vh, 1vh) * 100 - 4rem)'
        }}
      >
        {children}
      </motion.div>
    );
  }
);

MobileContainer.displayName = 'MobileContainer';