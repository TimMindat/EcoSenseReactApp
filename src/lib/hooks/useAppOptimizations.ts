import { useEffect } from 'react';
import { useDeviceOptimizations } from './useDeviceOptimizations';
import { usePerformanceMetrics } from './usePerformanceMetrics';

export function useAppOptimizations() {
  const deviceCapabilities = useDeviceOptimizations();
  const performanceMetrics = usePerformanceMetrics();

  useEffect(() => {
    // Apply device-specific optimizations
    if (deviceCapabilities.hardwareAcceleration) {
      document.body.style.transform = 'translateZ(0)';
    }

    // Handle low-end devices
    if (deviceCapabilities.connection.saveData || 
        deviceCapabilities.connection.type === 'slow-2g') {
      // Disable animations
      document.body.classList.add('reduce-motion');
      // Load low-res images
      document.body.classList.add('low-res-images');
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
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }, [deviceCapabilities]);

  // Monitor performance and take action if needed
  useEffect(() => {
    if (performanceMetrics.memoryUsage > 100_000_000) { // 100MB
      console.warn('High memory usage detected');
      // Implement memory cleanup strategies
    }

    if (performanceMetrics.lcp && performanceMetrics.lcp > 2500) {
      console.warn('Poor LCP detected');
      // Implement performance optimizations
    }
  }, [performanceMetrics]);

  return {
    deviceCapabilities,
    performanceMetrics
  };
}