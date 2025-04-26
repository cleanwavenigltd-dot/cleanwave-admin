import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const getProfile = async (token) => {
  const response = await axios.get(`${BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
