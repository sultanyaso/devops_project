import axios from 'axios';
import { getToken } from '../utils/sessions';

const API_URL = import.meta.env.VITE_BACKEND_URL;
const LINKEDIN_API = 'https://api.linkedin.com/v2';

export const authService = {
  validateSession: async () => {
    const response = await axios.get(`${API_URL}/validate`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },

  signup: async (email, password) => {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    return response.data;
  },

  exchangeLinkedInCode: async (code) => {
    const response = await axios.post(`${API_URL}/linkedin/token`, { code });
    return response.data;
  },

  getLinkedInUser: async (accessToken) => {
    const response = await axios.get(`${LINKEDIN_API}/userinfo`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
  }
};