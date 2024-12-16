import { useCallback, useEffect, useRef } from 'react';
import { useHaptics } from './useHaptics';

interface GestureConfig {
  threshold?: number;
  velocity?: number;
  preventScroll?: boolean;
}

interface GestureHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export function useGestures(
  element: HTMLElement | null,
  handlers: GestureHandlers,
  config: GestureConfig = {}
) {
  const { triggerHaptic } = useHaptics();
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  
  const {
    threshold = 50,
    velocity = 0.5,
    preventScroll = false
  } = config;

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    // Calculate velocity in pixels per millisecond
    const velocityX = Math.abs(deltaX) / deltaTime;
    const velocityY = Math.abs(deltaY) / deltaTime;

    if (velocityX >= velocity || velocityY >= velocity) {
      if (Math.abs(deltaX) >= threshold) {
        if (deltaX > 0 && handlers.onSwipeRight) {
          triggerHaptic('light');
          handlers.onSwipeRight();
        } else if (deltaX < 0 && handlers.onSwipeLeft) {
          triggerHaptic('light');
          handlers.onSwipeLeft();
        }
      }

      if (Math.abs(deltaY) >= threshold) {
        if (deltaY > 0 && handlers.onSwipeDown) {
          triggerHaptic('light');
          handlers.onSwipeDown();
        } else if (deltaY < 0 && handlers.onSwipeUp) {
          triggerHaptic('light');
          handlers.onSwipeUp();
        }
      }
    }

    touchStartRef.current = null;
  }, [handlers, threshold, velocity, triggerHaptic]);

  useEffect(() => {
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: !preventScroll });
    element.addEventListener('touchend', handleTouchEnd);

    if (preventScroll) {
      element.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    }

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [element, handleTouchStart, handleTouchEnd, preventScroll]);
}