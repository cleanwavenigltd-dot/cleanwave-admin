import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch all pickup requests
export const getPickupRequests = async (token) => {
  const response = await axios.get(`${BASE_URL}/pickups/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};