import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Wind, User } from 'lucide-react';
import { TouchFeedback } from './TouchFeedback';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Wind, label: 'Air Quality', path: '/air-quality' },
  { icon: User, label: 'Profile', path: '/profile' }
];

export function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;

          return (
            <TouchFeedback
              key={path}
              onClick={() => navigate(path)}
              className="flex-1"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <motion.div
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  className={`flex flex-col items-center ${
                    isActive ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs mt-1">{label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute bottom-0 w-12 h-0.5 bg-green-600 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </div>
            </TouchFeedback>
          );
        })}
      </div>
    </nav>
  );
}