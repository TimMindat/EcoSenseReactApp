import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, Wind, User, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TouchFeedback } from './TouchFeedback';

const menuItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Wind, label: 'Air Quality', path: '/air-quality' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' }
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Close menu on route change
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
        <div className="flex items-center justify-between h-full px-4">
          <TouchFeedback onClick={() => navigate('/')}>
            <span className="text-xl font-bold text-green-600">EcoSense</span>
          </TouchFeedback>

          <TouchFeedback onClick={() => setIsOpen(true)}>
            <Menu className="h-6 w-6 text-gray-700" />
          </TouchFeedback>
        </div>
      </header>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50"
            />

            {/* Menu Panel */}
            <motion.div
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 w-4/5 h-full bg-white shadow-lg z-50"
            >
              <div className="p-4">
                <TouchFeedback 
                  onClick={() => setIsOpen(false)}
                  className="inline-block"
                >
                  <X className="h-6 w-6 text-gray-700" />
                </TouchFeedback>
              </div>

              <nav className="px-4 py-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <TouchFeedback
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <motion.div
                        className={`flex items-center space-x-4 p-4 rounded-lg mb-2 ${
                          isActive 
                            ? 'bg-green-50 text-green-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </TouchFeedback>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Content Spacer */}
      <div className="h-16" />
    </>
  );
}