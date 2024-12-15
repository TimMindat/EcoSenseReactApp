import { useState, useEffect } from 'react';

interface OrientationState {
  angle: number;
  type: 'portrait' | 'landscape';
  isFlat: boolean;
}

export function useOrientation() {
  const [orientation, setOrientation] = useState<OrientationState>({
    angle: 0,
    type: 'portrait',
    isFlat: false
  });

  useEffect(() => {
    const handleOrientation = () => {
      if (window.screen.orientation) {
        const angle = window.screen.orientation.angle;
        setOrientation({
          angle,
          type: angle === 0 || angle === 180 ? 'portrait' : 'landscape',
          isFlat: false
        });
      } else if (window.orientation) {
        const angle = Number(window.orientation);
        setOrientation({
          angle,
          type: angle === 0 || angle === 180 ? 'portrait' : 'landscape',
          isFlat: angle === 90 || angle === -90
        });
      }
    };

    handleOrientation(); // Initial check
    window.addEventListener('orientationchange', handleOrientation);
    return () => window.removeEventListener('orientationchange', handleOrientation);
  }, []);

  return orientation;
}