import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MobileNavbar } from './components/navigation/MobileNavbar';
import { SafeAreaProvider } from './components/layout/SafeAreaProvider';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';
import { useAppOptimizations } from './lib/hooks/useAppOptimizations';

function App() {
  // Apply app-wide performance optimizations
  useAppOptimizations();

  return (
    <div className="hardware-accelerated">
      <AuthProvider>
        <Router>
          <SafeAreaProvider>
            <AppRoutes />
            <MobileNavbar />
          </SafeAreaProvider>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;