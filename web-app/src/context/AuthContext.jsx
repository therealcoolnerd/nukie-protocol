import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Generate DID (using our existing crypto logic)
  const generateDID = async () => {
    // This would use the actual crypto from our utils
    const timestamp = Date.now();
    const randomHex = Math.random().toString(16).substring(2, 8);
    return `did:key:z6Mk${randomHex}${timestamp.toString(16)}`;
  };

  const login = async (handle, password) => {
    setLoading(true);
    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const did = await generateDID();
      const userData = {
        handle,
        did,
        displayName: handle,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(handle)}`,
        joinedAt: new Date().toISOString(),
        followers: Math.floor(Math.random() * 1000),
        following: Math.floor(Math.random() * 500),
        posts: Math.floor(Math.random() * 100),
      };
      
      setUser(userData);
      localStorage.setItem('nukie_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (handle, email, password) => {
    setLoading(true);
    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const did = await generateDID();
      const userData = {
        handle,
        email,
        did,
        displayName: handle,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(handle)}`,
        joinedAt: new Date().toISOString(),
        followers: 0,
        following: 0,
        posts: 0,
        bio: '🌍 Scrolling my culture on Nukie! ✊🏾',
      };
      
      setUser(userData);
      localStorage.setItem('nukie_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nukie_user');
  };

  // Check for existing user on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('nukie_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('nukie_user');
      }
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    generateDID,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};