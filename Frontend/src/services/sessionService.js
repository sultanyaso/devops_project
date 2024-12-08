import axios from 'axios';
import { getToken } from '../utils/sessions';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const sessionService = {
  // Create a new session
  createSession: async (sessionData) => {
    try {
      const response = await axios.post(`${API_URL}/api/sessions/create`, sessionData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creating session');
    }
  },

  // Get all sessions
  getAllSessions: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/sessions`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching sessions');
    }
  },

  // Get session by ID
  getSessionById: async (sessionId) => {
    try {
      const response = await axios.get(`${API_URL}/api/sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching session');
    }
  },

  getSessionsByUser: async (userId, role) => {
    try {
      const response = await axios.get(`${API_URL}/api/sessions/${student}/${userId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching user sessions');
    }
  },

  // Update session
  updateSession: async (sessionId, updateData) => {
    try {
      const response = await axios.patch(`${API_URL}/api/sessions/${sessionId}`, updateData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating session');
    }
  },

  // Delete session
  deleteSession: async (sessionId) => {
    try {
      const response = await axios.delete(`${API_URL}/api/sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error deleting session');
    }
  }
};

export default sessionService;