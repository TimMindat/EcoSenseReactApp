import { useState, useEffect } from 'react';

interface ViewportInfo {
  width: number;
  height: number;
  isLandscape: boolean;
  hasNotch: boolean;
  safeAreaInsets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export function useViewport(): ViewportInfo {
  const [viewport, setViewport] = useState<ViewportInfo>({
    width: window.innerWidth,
    height: window.innerHeight,
    isLandscape: window.innerWidth > window.innerHeight,
    hasNotch: hasDisplayNotch(),
    safeAreaInsets: getSafeAreaInsets()
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        isLandscape: window.innerWidth > window.innerHeight,
        hasNotch: hasDisplayNotch(),
        safeAreaInsets: getSafeAreaInsets()
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return viewport;
}

function hasDisplayNotch(): boolean {
  // Check for iOS notch
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (iOS) {
    return window.screen.height >= 812 || window.screen.width >= 812;
  }
  
  // Check for Android notch via CSS environment variables
  return (
    CSS.supports('padding-top: env(safe-area-inset-top)') &&
    getComputedStyle(document.documentElement).getPropertyValue('--sat') !== '0px'
  );
}

function getSafeAreaInsets() {
  return {
    top: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0', 10),
    bottom: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sab') || '0', 10),
    left: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sal') || '0', 10),
    right: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sar') || '0', 10)
  };
}