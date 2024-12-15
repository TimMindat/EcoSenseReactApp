import { useState, useEffect } from 'react';
import { useOrientation } from './useOrientation';

export function useNavbarHeight() {
  const { type: orientation } = useOrientation();
  const [navbarHeight, setNavbarHeight] = useState(56);

  useEffect(() => {
    // Adjust height based on orientation and device
    const isAndroid = /android/i.test(navigator.userAgent);
    const baseHeight = isAndroid ? 56 : 64; // Material vs iOS guidelines
    
    setNavbarHeight(orientation === 'landscape' ? Math.min(baseHeight, 48) : baseHeight);
  }, [orientation]);

  return { navbarHeight };
}