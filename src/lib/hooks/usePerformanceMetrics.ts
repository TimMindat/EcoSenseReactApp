import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  componentLoadTimes: Record<string, number>;
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
}

export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    componentLoadTimes: {},
    fcp: null,
    lcp: null,
    fid: null,
    cls: null
  });

  useEffect(() => {
    // Track Web Vitals
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
          case 'cumulative-layout-shift':
            setMetrics(prev => ({ ...prev, cls: entry.value }));
            break;
        }
      });
    });

    observer.observe({ 
      entryTypes: ['paint', 'first-input', 'layout-shift', 'largest-contentful-paint'] 
    });

    // Track Memory Usage
    const trackMemory = () => {
      if (performance.memory) {
        setMetrics(prev => ({
          ...prev,
          memoryUsage: performance.memory.usedJSHeapSize
        }));
      }
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

    const interval = setInterval(() => {
      trackMemory();
      trackComponentPerformance();
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return metrics;
}