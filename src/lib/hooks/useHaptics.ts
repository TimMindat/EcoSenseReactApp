import { useCallback } from 'react';

export function useHaptics() {
  const triggerHaptic = useCallback((style: 'light' | 'medium' | 'heavy' = 'light') => {
    // Check if navigator.vibrate is supported (Android)
    if (navigator.vibrate) {
      switch (style) {
        case 'light':
          navigator.vibrate(10);
          break;
        case 'medium':
          navigator.vibrate(15);
          break;
        case 'heavy':
          navigator.vibrate(20);
          break;
      }
    }
    
    // Check if window.navigator.userAgent includes iPhone or iPad (iOS)
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      // Use iOS haptic feedback if available
      try {
        const event = new UIEvent('touchend', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        document.dispatchEvent(event);
      } catch (error) {
        console.debug('Haptics not supported on this device');
      }
    }
  }, []);

  return { triggerHaptic };
}