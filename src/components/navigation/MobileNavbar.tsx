import React from 'react';
import { useLocation } from 'react-router-dom';
import { Home, Wind, User, Settings } from 'lucide-react';
import { MobileNavLink } from './MobileNavLink';
import { useNavbarHeight } from '../../lib/hooks/useNavbarHeight';
import { useKeyboardVisibility } from '../../lib/hooks/useKeyboardVisibility';

const NAV_ITEMS = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/air-quality', icon: Wind, label: 'Air Quality' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/settings', icon: Settings, label: 'Settings' }
];

export function MobileNavbar() {
  const location = useLocation();
  const { navbarHeight } = useNavbarHeight();
  const { isKeyboardVisible } = useKeyboardVisibility();

  if (isKeyboardVisible) {
    return null;
  }

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[1000] transition-transform duration-200"
      style={{ 
        height: `${navbarHeight}px`,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      <div className="h-full max-w-lg mx-auto px-4 flex items-center justify-around">
        {NAV_ITEMS.map(({ path, icon, label }) => (
          <MobileNavLink
            key={path}
            to={path}
            icon={icon}
            label={label}
            isActive={location.pathname === path}
          />
        ))}
      </div>
    </nav>
  );
}