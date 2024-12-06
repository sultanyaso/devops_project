import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserSession, clearUserSession, getUserSession } from './authStorage';

export function useAuthState() {
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
    // Simulated API call
    const mockUser = {
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
    // In production, this would make an API call to verify admin credentials
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

  return {
    user,
    login,
    loginAsAdmin,
    loginWithLinkedIn,
    signup,
    logout,
    isAuthenticated: !!user,
    loading
  };
}