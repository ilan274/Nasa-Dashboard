import axios, { AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const getAsteroids = async (startDate?: string, endDate?: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/asteroids`, {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Error fetching asteroids:', error.message);
    }

    console.error('Error fetching asteroids:', error);
    throw error;
  }
};
