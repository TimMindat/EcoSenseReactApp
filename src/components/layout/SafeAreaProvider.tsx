import React from 'react';
import { useSafeArea } from '../../lib/hooks/useSafeArea';

interface SafeAreaProviderProps {
  children: React.ReactNode;
}

export function SafeAreaProvider({ children }: SafeAreaProviderProps) {
  const safeArea = useSafeArea();

  return (
    <div
      style={{
        paddingTop: `${safeArea.top}px`,
        paddingBottom: `${safeArea.bottom + 56}px`, // Add navbar height
        paddingLeft: `${safeArea.left}px`,
        paddingRight: `${safeArea.right}px`,
      }}
    >
      {children}
    </div>
  );
}