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
    console.log("lasjdlsajd", API_URL);
    const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    return response.data;
  },

  signup: async (name, email, password, role) => {
    console.log(name,
      email,
      password,
      role);
    const response = await axios.post(`${API_URL}/api/auth/register`, { name, email, password, role });
    return response.data;
  },

  exchangeLinkedInCode: async (code) => {
    const response = await axios.post(`${API_URL}/api/auth/linkedin/token`, { code });
    return response.data;
  },

  getLinkedInUser: async (accessToken) => {
    const response = await axios.get(`${LINKEDIN_API}/api/auth/userinfo`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
  }
};