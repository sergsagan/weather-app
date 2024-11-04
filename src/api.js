import axios from 'axios';

const WEATHER_API_KEY = 'c5e5548fa5c87051e758646e5d95aec5';
const MAPBOX_API_KEY =
  'pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q';

const BASE_URLS = {
  2.5: 'https://api.openweathermap.org/data/2.5',
  '3.0': 'https://api.openweathermap.org/data/3.0',
};

/**
 * Get detailed weather data using specified API version.
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @param {string} [version='3.0'] - API version to use (e.g., '2.5' or '3.0').
 * @returns {Promise<Object>} - Weather data for the specified location.
 */
export const getWeatherData = async (lat, lon, version = '3.0') => {
  try {
    const response = await axios.get(`${BASE_URLS[version]}/onecall`, {
      params: {
        lat,
        lon,
        exclude: 'part',
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

/**
 * Get basic city weather data using specified API version.
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @param {string} [version='2.5'] - API version to use (e.g., '2.5' or '3.0').
 * @returns {Promise<Object>} - Basic weather data for the specified city.
 */
export const getCities = async (lat, lon, version = '2.5') => {
  try {
    const response = await axios.get(`${BASE_URLS[version]}/weather`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching city weather:', error);
    throw error;
  }
};

/**
 * Search for a city by query using Mapbox API.
 * @param {string} query - The search query (e.g., city name).
 * @returns {Promise<Array>} - Search results containing city information.
 */
export const searchCity = async (query) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token: MAPBOX_API_KEY,
          types: 'place',
        },
      },
    );
    return response.data.features;
  } catch (error) {
    console.error('Error searching for city:', error);
    throw error;
  }
};
