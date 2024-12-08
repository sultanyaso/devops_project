import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const coachService = {

    // Get all sessions for a coach
    getSessionsByUser: async (userId, role) => {
        const response = await axios.get(`${API_URL}/api/sessions/${role}/${userId}`, {
        params: { userId, role }
        });
        return response.data;
    },


    // Get all coaches
    getCoaches: async () => {
        try {
          const response = await axios.get(`${API_URL}/api/coaches`);
          return response.data;
        } catch (error) {
          console.error('Error fetching coaches:', error);
          throw error;
        }
    }

};

export default coachService;