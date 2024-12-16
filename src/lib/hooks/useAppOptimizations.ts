import { useEffect, useCallback } from 'react';
import { useDeviceOptimizations } from './useDeviceOptimizations';
import { usePerformanceMetrics } from './usePerformanceMetrics';
import { cleanupMemory } from '../utils/optimizations';

export function useAppOptimizations() {
  const deviceCapabilities = useDeviceOptimizations();
  const performanceMetrics = usePerformanceMetrics();

  // Handle memory cleanup
  const handleMemoryCleanup = useCallback(() => {
    if (performanceMetrics.memoryUsage > 100_000_000) { // 100MB threshold
      cleanupMemory();
    }
  }, [performanceMetrics.memoryUsage]);

  useEffect(() => {
    // Apply device-specific optimizations
    if (deviceCapabilities.hardwareAcceleration) {
      document.body.classList.add('hardware-accelerated');
    }

    // Handle low-end devices
    if (deviceCapabilities.connection.saveData || 
        deviceCapabilities.connection.type === 'slow-2g') {
      document.body.classList.add('reduce-motion', 'low-res-images');
    }

    // Optimize for screen size
    document.documentElement.style.setProperty(
      '--vh', 
      `${deviceCapabilities.screenSize.height * 0.01}px`
    );

    // Prevent pull-to-refresh on mobile
    document.body.style.overscrollBehavior = 'none';

    // Enable smooth scrolling only on high-end devices
    if (deviceCapabilities.hardwareAcceleration && 
        deviceCapabilities.connection.type !== 'slow-2g') {
      document.documentElement.classList.add('smooth-scroll');
    }

    // Set up performance monitoring
    const memoryInterval = setInterval(handleMemoryCleanup, 30000); // Check every 30s

    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      // @ts-ignore
      window.webVitals.getCLS(console.log);
      // @ts-ignore
      window.webVitals.getFID(console.log);
      // @ts-ignore
      window.webVitals.getLCP(console.log);
    }

    return () => {
      clearInterval(memoryInterval);
    };
  }, [deviceCapabilities, handleMemoryCleanup]);

  // Monitor performance metrics and take action if needed
  useEffect(() => {
    if (performanceMetrics.lcp && performanceMetrics.lcp > 2500) {
      console.warn('Poor LCP detected, consider optimizing largest contentful paint');
    }

    if (performanceMetrics.fid && performanceMetrics.fid > 100) {
      console.warn('Poor FID detected, consider optimizing interaction readiness');
    }
  }, [performanceMetrics]);

  return {
    deviceCapabilities,
    performanceMetrics
  };
}