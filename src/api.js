import axios from 'axios';

const API_KEY = 'c5e5548fa5c87051e758646e5d95aec5';
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

export const getWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        lat,
        lon,
        exclude: 'part',
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
