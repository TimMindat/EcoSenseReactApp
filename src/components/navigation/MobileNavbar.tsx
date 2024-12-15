import React from 'react';
import { useLocation } from 'react-router-dom';
import { Home, Wind, User, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { MobileNavLink } from './MobileNavLink';
import { useNavbarHeight } from '../../lib/hooks/useNavbarHeight';
import { useKeyboardVisibility } from '../../lib/hooks/useKeyboardVisibility';

export function MobileNavbar() {
  const location = useLocation();
  const { navbarHeight } = useNavbarHeight();
  const { isKeyboardVisible } = useKeyboardVisibility();
  const { user } = useAuth();

  // Base navigation items that are always shown
  const baseNavItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/air-quality', icon: Wind, label: 'Air Quality' },
  ];

  // Auth-specific navigation items
  const authNavItems = user
    ? [{ path: '/profile', icon: User, label: 'Profile' }]
    : [
        { path: '/login', icon: LogIn, label: 'Login' },
        { path: '/signup', icon: UserPlus, label: 'Sign Up' }
      ];

  // Combine base and auth-specific items
  const navItems = [...baseNavItems, ...authNavItems];

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
        {navItems.map(({ path, icon, label }) => (
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