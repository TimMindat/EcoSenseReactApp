import { useEffect, useRef } from 'react';

interface GestureHandlers {
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void;
  onPinch?: (scale: number) => void;
  onRotate?: (angle: number) => void;
}

export function useGestures(element: HTMLElement | null, handlers: GestureHandlers) {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchesRef = useRef<Touch[]>([]);

  useEffect(() => {
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        touchStartRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          time: Date.now()
        };
      }
      touchesRef.current = Array.from(e.touches);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      // Handle pinch
      if (e.touches.length === 2 && handlers.onPinch) {
        const currentTouches = Array.from(e.touches);
        const initialDistance = getDistance(touchesRef.current[0], touchesRef.current[1]);
        const currentDistance = getDistance(currentTouches[0], currentTouches[1]);
        const scale = currentDistance / initialDistance;
        handlers.onPinch(scale);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touchEnd = e.changedTouches[0];
      const deltaX = touchEnd.clientX - touchStartRef.current.x;
      const deltaY = touchEnd.clientY - touchStartRef.current.y;
      const deltaTime = Date.now() - touchStartRef.current.time;

      // Detect swipe
      if (deltaTime < 250) {
        const swipeThreshold = 50;
        if (Math.abs(deltaX) > swipeThreshold || Math.abs(deltaY) > swipeThreshold) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            handlers.onSwipe?.(deltaX > 0 ? 'right' : 'left');
          } else {
            handlers.onSwipe?.(deltaY > 0 ? 'down' : 'up');
          }
        }
      }

      touchStartRef.current = null;
      touchesRef.current = [];
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [element, handlers]);
}

function getDistance(touch1: Touch, touch2: Touch): number {
  const dx = touch1.clientX - touch2.clientX;
  const dy = touch1.clientY - touch2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}