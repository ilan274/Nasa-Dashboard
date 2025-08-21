import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL

export const getAsteroids = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/asteroids`);
    return response.data;
  } catch (error) {
    console.error('Error fetching asteroids:', error);
    return null;
  }
};
