import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('safecircle_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      localStorage.setItem('safecircle_user', JSON.stringify(foundUser));
      setUser(foundUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (userData) => {
    // Mock signup
    const newUser = {
      id: `user${Date.now()}`,
      ...userData,
      profileComplete: false,
      level: 1,
      points: 0,
      responses: 0,
      badges: [],
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('safecircle_user', JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('safecircle_user');
    setUser(null);
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('safecircle_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const completeProfile = (profileData) => {
    const updatedUser = {
      ...user,
      ...profileData,
      profileComplete: true
    };
    localStorage.setItem('safecircle_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    completeProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
