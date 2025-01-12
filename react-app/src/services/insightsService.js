// frontend/src/services/insightsService.js

import axios from 'axios';

// API endpoint for fetching CNC insights
const API_URL = 'http://localhost:5000/api/insights';

/**
 * Fetch insights data from the backend
 * @returns {Promise<Object>} CNC machine insights data
 */
export const fetchInsights = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching insights:', error);
    throw error;
  }
};
