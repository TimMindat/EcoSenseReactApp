import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  componentLoadTimes: Record<string, number>;
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
}

export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    componentLoadTimes: {},
    fcp: null,
    lcp: null,
    fid: null
  });

  useEffect(() => {
    // Track Web Vitals
    const trackWebVitals = () => {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const metricName = entry.name;
          const value = entry.startTime;

          switch (metricName) {
            case 'first-contentful-paint':
              setMetrics(prev => ({ ...prev, fcp: value }));
              break;
            case 'largest-contentful-paint':
              setMetrics(prev => ({ ...prev, lcp: value }));
              break;
            case 'first-input-delay':
              setMetrics(prev => ({ ...prev, fid: value }));
              break;
          }
        });
      });

      observer.observe({ entryTypes: ['paint', 'first-input', 'layout-shift'] });
      return observer;
    };

    // Track Component Performance
    const trackComponentPerformance = () => {
      const componentLoadTimes: Record<string, number> = {};
      
      performance.getEntriesByType('measure')
        .filter(entry => entry.name.startsWith('component-'))
        .forEach(entry => {
          const componentName = entry.name.replace('component-', '');
          componentLoadTimes[componentName] = entry.duration;
        });

      setMetrics(prev => ({
        ...prev,
        componentLoadTimes,
        renderTime: performance.now()
      }));
    };

    // Track Memory Usage
    const trackMemoryUsage = () => {
      if (performance.memory) {
        setMetrics(prev => ({
          ...prev,
          memoryUsage: performance.memory.usedJSHeapSize
        }));
      }
    };

    const webVitalsObserver = trackWebVitals();
    const performanceInterval = setInterval(() => {
      trackComponentPerformance();
      trackMemoryUsage();
    }, 5000);

    return () => {
      webVitalsObserver.disconnect();
      clearInterval(performanceInterval);
    };
  }, []);

  return metrics;
}