import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MobileNavbar } from './components/navigation/MobileNavbar';
import { SafeAreaProvider } from './components/layout/SafeAreaProvider';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <SafeAreaProvider>
          <AppRoutes />
          <MobileNavbar />
        </SafeAreaProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;