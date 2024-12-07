import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { saveUserSession, clearUserSession, getToken } from '../utils/sessions';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      validateSession();
    }
    setLoading(false);
  }, []);

  const validateSession = async () => {
    try {
      const { user } = await authService.validateSession();
      setUser(user);
    } catch (error) {
      clearUserSession();
    }
  };

  const login = async (email, password) => {
    try {
      const { user, token } = await authService.login(email, password);
      saveUserSession({ token, userId: user._id });
      setUser(user);
      navigate(`/${user.role}-dashboard`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const loginWithLinkedIn = async (code) => {
    try {
      const { accessToken } = await authService.exchangeLinkedInCode(code);
      const userData = await authService.getLinkedInUser(accessToken);
      
      const user = {
        email: userData.email,
        name: `${userData.given_name} ${userData.family_name}`,
        role: 'student',
        linkedInId: userData.sub,
      };
      
      saveUserSession({ 
        token: accessToken,
        userId: userData.sub,
        user
      });
      
      setUser(user);
      navigate('/student-dashboard');
    } catch (error) {
      throw new Error('LinkedIn login failed');
    }
  };

  const logout = () => {
    clearUserSession();
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      login,
      loginWithLinkedIn,
      logout,
      isAuthenticated: !!user 
    }}>
      {!loading && children}
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