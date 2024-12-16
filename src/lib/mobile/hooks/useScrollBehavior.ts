import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollBehaviorOptions {
  smooth?: boolean;
  resetOnNavigate?: boolean;
  preserveScrollOnRefresh?: boolean;
}

export function useScrollBehavior(options: ScrollBehaviorOptions = {}) {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  
  const {
    smooth = true,
    resetOnNavigate = true,
    preserveScrollOnRefresh = true
  } = options;

  useEffect(() => {
    if (preserveScrollOnRefresh) {
      // Restore scroll position on page refresh
      const savedPosition = sessionStorage.getItem(`scroll_${location.pathname}`);
      if (savedPosition) {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: smooth ? 'smooth' : 'auto'
        });
      }
    }
  }, [location.pathname, preserveScrollOnRefresh, smooth]);

  useEffect(() => {
    if (resetOnNavigate && prevPathRef.current !== location.pathname) {
      // Save current scroll position before navigating
      sessionStorage.setItem(
        `scroll_${prevPathRef.current}`, 
        window.scrollY.toString()
      );

      // Reset scroll position on navigation
      window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }

    prevPathRef.current = location.pathname;
  }, [location.pathname, resetOnNavigate, smooth]);

  return {
    scrollToTop: (smoothOverride?: boolean) => {
      window.scrollTo({
        top: 0,
        behavior: smoothOverride ?? smooth ? 'smooth' : 'auto'
      });
    }
  };
}