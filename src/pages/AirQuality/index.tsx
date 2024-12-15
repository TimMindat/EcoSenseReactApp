import React from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { useSwipeNavigation } from '../../lib/hooks/useSwipeNavigation';
import { AirQualityContent } from './components/AirQualityContent';

export function AirQuality() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Enable swipe navigation
  useSwipeNavigation(containerRef.current);

  return (
    <MobileContainer ref={containerRef} className="bg-gray-50">
      <ErrorBoundary>
        <AirQualityContent />
      </ErrorBoundary>
    </MobileContainer>
  );
}