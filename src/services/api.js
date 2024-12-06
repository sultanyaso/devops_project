import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.linkedin.com/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchLinkedInProfile = async (accessToken) => {
  try {
    const response = await api.get('/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        projection: '(id,firstName,lastName,profilePicture(displayImage~:playableStreams),emailAddress)',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching LinkedIn profile:', error);
    throw error;
  }
};