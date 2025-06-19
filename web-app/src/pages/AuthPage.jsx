import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const { user, login, signup, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    handle: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/timeline" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    const result = isLogin 
      ? await login(formData.handle, formData.password)
      : await signup(formData.handle, formData.email, formData.password);

    if (!result.success) {
      setError(result.error || 'Authentication failed');
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl font-bold mb-2"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-nukie-red to-nukie-gold bg-clip-text text-transparent">
                {isLogin ? 'Welcome Back' : 'Join Nukie'}
              </span>
            </motion.h1>
            <p className="text-white/80">
              {isLogin 
                ? 'Sign in to continue scrolling your culture' 
                : 'Create your decentralized identity'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <label className="block text-sm font-medium mb-2">
                Handle
              </label>
              <input
                type="text"
                name="handle"
                value={formData.handle}
                onChange={handleInputChange}
                placeholder="@yourusername"
                className="input w-full"
                required
                autoComplete="username"
              />
            </motion.div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="input w-full"
                  required
                  autoComplete="email"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: isLogin ? 0.4 : 0.5 }}
            >
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Your secure password"
                className="input w-full"
                required
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
            </motion.div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <label className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="input w-full"
                  required
                  autoComplete="new-password"
                />
              </motion.div>
            )}

            {error && (
              <motion.div 
                className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-200 text-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Button
                type="submit"
                className="w-full"
                loading={loading}
                disabled={loading}
              >
                {isLogin ? '🚀 Sign In' : '✨ Create Account'}
              </Button>
            </motion.div>
          </form>

          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-white/70">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({
                  handle: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                });
              }}
              className="text-nukie-gold hover:text-nukie-red transition-colors duration-200 font-medium"
            >
              {isLogin ? 'Sign up here' : 'Sign in here'}
            </button>
          </motion.div>

          {!isLogin && (
            <motion.div 
              className="mt-6 p-4 bg-nukie-green/20 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <p className="text-sm text-center text-white/80">
                🔐 Your account will include a unique DID (Decentralized Identifier) 
                that you truly own and control.
              </p>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPage;