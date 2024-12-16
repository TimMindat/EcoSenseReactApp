// Memory management utilities
export function cleanupMemory() {
  if (window.gc) {
    window.gc();
  }
  
  // Clear image cache
  const images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    images[i].src = images[i].src;
  }

  // Clear unused event listeners
  clearEventListeners();
}

// Event listener cleanup
function clearEventListeners() {
  const elements = document.querySelectorAll('*');
  elements.forEach(element => {
    const clone = element.cloneNode(true);
    element.parentNode?.replaceChild(clone, element);
  });
}

// Image optimization utilities
export function getOptimizedImageUrl(url: string, width: number, quality = 75): string {
  if (url.includes('unsplash.com')) {
    return `${url}&w=${width}&q=${quality}&auto=format`;
  }
  return url;
}

// Performance marking utilities
export function markComponentRender(componentName: string) {
  const markName = `component-${componentName}`;
  performance.mark(`${markName}-start`);
  
  return () => {
    performance.mark(`${markName}-end`);
    performance.measure(markName, `${markName}-start`, `${markName}-end`);
  };
}

// Touch interaction utilities
export function enableTouchOptimizations(element: HTMLElement) {
  element.style.touchAction = 'manipulation';
  element.style.webkitTapHighlightColor = 'transparent';
  element.style.userSelect = 'none';
  
  // Prevent double-tap zoom
  let lastTouchEnd = 0;
  element.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
}

// Network optimization utilities
export function shouldLoadHighQuality(): boolean {
  const connection = (navigator as any).connection;
  if (!connection) return true;
  
  return !(connection.saveData || 
           connection.effectiveType === 'slow-2g' || 
           connection.effectiveType === '2g');
}

// Lazy loading utilities
export function setupIntersectionObserver(
  elements: NodeListOf<HTMLElement>,
  callback: (element: HTMLElement) => void,
  options: IntersectionObserverInit = {}
) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  elements.forEach(element => observer.observe(element));

  return observer;
}