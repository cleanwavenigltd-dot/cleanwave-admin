import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch agents
export const getAgents = async () => {
  const response = await axios.get(`${BASE_URL}/agents`);
  return response.data.agents;
};

// Register a new agent
export const registerAgent = async (agentData, token) => {
  const response = await axios.post(`${BASE_URL}/auth/register-agent`, agentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};