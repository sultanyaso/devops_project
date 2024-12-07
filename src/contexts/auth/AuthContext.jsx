import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { saveUserSession, clearUserSession, getUserSession } from './authStorage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = getUserSession();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulated user authentication
    mockUser = {
      id: '1',
      email,
      role: 'student',
    };

    
    saveUserSession(mockUser);
    setUser(mockUser);
    navigate('/student-dashboard');
  };

  const loginAsAdmin = async (email, password) => {
    // Simulated admin authentication
    if (email === 'admin@example.com' && password === 'admin123') {
      const adminUser = {
        id: 'admin-1',
        email,
        role: 'admin',
        isAdmin: true,
      };
      saveUserSession(adminUser);
      setUser(adminUser);
      return true;
    }
    throw new Error('Invalid admin credentials');
  };

  const loginWithLinkedIn = async (userData) => {
    const user = {
      ...userData,
      role: 'student',
    };
    saveUserSession(user);
    setUser(user);
    navigate('/student-dashboard');
  };

  const signup = async (email, password, role) => {
    const mockUser = {
      id: '1',
      email,
      role,
    };
    saveUserSession(mockUser);
    setUser(mockUser);
    navigate(`/${role}-dashboard`);
  };

  const logout = async () => {
    clearUserSession();
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login,
      loginAsAdmin,
      loginWithLinkedIn, 
      signup, 
      logout,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}