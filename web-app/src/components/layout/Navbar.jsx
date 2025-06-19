import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/timeline', label: 'Timeline', icon: '📱' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <motion.nav 
      className="glass border-b border-white/20 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-nukie-red to-nukie-gold bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              🌍 Nukie
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-white/20 text-nukie-gold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-nukie-red to-nukie-gold rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.handle?.charAt(0).toUpperCase() || '👤'}
                    </span>
                  </div>
                  <span className="text-white/90 font-medium">@{user.handle}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="primary" size="sm">
                  Join Nukie
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-lg ${
                location.pathname === item.path
                  ? 'text-nukie-gold'
                  : 'text-white/70'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;