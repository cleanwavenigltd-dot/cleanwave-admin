import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch all pickup requests
export const getPickupRequests = async (token) => {
  const res = await axios.get(`${BASE_URL}/pickups/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Fetch all agents
export const getAgents = async (token) => {
  const res = await axios.get(`${BASE_URL}/agents`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Fetch all waste categories
export const getWasteCategories = async (token) => {
  const res = await axios.get(`${BASE_URL}/waste-categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create a pickup request
export const createPickup = async (payload, token) => {
  const res = await axios.post(`${BASE_URL}/pickups`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};