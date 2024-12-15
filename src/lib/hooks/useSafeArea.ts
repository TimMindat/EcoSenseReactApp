import { useState, useEffect } from 'react';

export function useSafeArea() {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });

  useEffect(() => {
    const updateSafeArea = () => {
      setSafeArea({
        top: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0', 10),
        bottom: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sab') || '0', 10),
        left: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sal') || '0', 10),
        right: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sar') || '0', 10)
      });
    };

    // Set CSS variables for safe areas
    const root = document.documentElement;
    root.style.setProperty('--sat', 'env(safe-area-inset-top)');
    root.style.setProperty('--sab', 'env(safe-area-inset-bottom)');
    root.style.setProperty('--sal', 'env(safe-area-inset-left)');
    root.style.setProperty('--sar', 'env(safe-area-inset-right)');

    updateSafeArea();
    window.addEventListener('resize', updateSafeArea);
    return () => window.removeEventListener('resize', updateSafeArea);
  }, []);

  return safeArea;
}