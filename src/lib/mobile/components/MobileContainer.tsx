import React from 'react';
import { useViewport } from '../hooks/useViewport';
import { useScrollBehavior } from '../hooks/useScrollBehavior';
import { useGestures } from '../hooks/useGestures';
import { useNavigate } from 'react-router-dom';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
  enableGestures?: boolean;
  enableScrollReset?: boolean;
}

export const MobileContainer = React.forwardRef<HTMLDivElement, MobileContainerProps>(
  ({ children, className = '', enableGestures = true, enableScrollReset = true }, ref) => {
    const { safeAreaInsets, hasNotch } = useViewport();
    const navigate = useNavigate();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = useCombinedRef(ref, containerRef);

    useScrollBehavior({
      smooth: true,
      resetOnNavigate: enableScrollReset
    });

    useGestures(
      enableGestures ? containerRef.current : null,
      {
        onSwipeRight: () => navigate(-1),
      },
      { threshold: 100 }
    );

    return (
      <div
        ref={combinedRef}
        className={`
          min-h-[100vh]
          max-w-[428px]
          mx-auto
          relative
          ${className}
        `}
        style={{
          paddingTop: hasNotch ? `${safeAreaInsets.top}px` : 0,
          paddingBottom: `${safeAreaInsets.bottom}px`,
          paddingLeft: `${safeAreaInsets.left}px`,
          paddingRight: `${safeAreaInsets.right}px`,
          minHeight: 'calc(var(--vh, 1vh) * 100)',
          touchAction: 'manipulation',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'none'
        }}
      >
        {children}
      </div>
    );
  }
);

MobileContainer.displayName = 'MobileContainer';

// Helper function to combine refs
function useCombinedRef<T>(
  ref: React.ForwardedRef<T>,
  localRef: React.RefObject<T>
): React.RefCallback<T> {
  return React.useCallback(
    (element: T) => {
      if (localRef) (localRef as React.MutableRefObject<T>).current = element;
      if (typeof ref === 'function') ref(element);
      else if (ref) (ref as React.MutableRefObject<T>).current = element;
    },
    [ref, localRef]
  );
}