import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';

// Context
import { AuthProvider } from './context/AuthContext';
import { SocialProvider } from './context/SocialContext';

function App() {
  return (
    <AuthProvider>
      <SocialProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-nukie-purple via-cultural-sky to-nukie-green">
            <Navbar />
            
            <motion.main 
              className="container mx-auto px-4 py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/auth" element={<AuthPage />} />
              </Routes>
            </motion.main>
            
            {/* Background decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-nukie-gold/20 rounded-full blur-3xl animate-float"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-nukie-red/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </Router>
      </SocialProvider>
    </AuthProvider>
  );
}

export default App;