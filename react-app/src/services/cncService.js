// src/services/cncService.js
import axios from 'axios';

const CNC_API_URL = 'http://localhost:5000/cnc';  // Adjust based on your server setup

// Send CNC Control Command (Start, Stop, Pause)
export const sendCNCCommand = async (command) => {
  try {
    const response = await axios.post(`${CNC_API_URL}/command`, { command });
    return response.data;
  } catch (error) {
    console.error(`Error sending "${command}":`, error.message);
    throw error;
  }
};

// Send G-code Command
export const sendGCodeCommand = async (gcode) => {
  try {
    const response = await axios.post(`${CNC_API_URL}/gcode`, { gcode });
    return response.data;
  } catch (error) {
    console.error(`Error sending G-code "${gcode}":`, error.message);
    throw error;
  }
};

// ✅ NEW: Fetch CNC Monitoring Data
export const fetchCNCData = async () => {
  try {
    const response = await axios.get(`${CNC_API_URL}/status`);
    return response.data;
  } catch (error) {
    console.error('Error fetching CNC data:', error.message);
    throw error;
  }
};
