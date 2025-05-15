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

export const getTotals = async (token) => {
  const response = await axios.get(`${BASE_URL}/auth/totals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getTransactions = async (token) => {
  const response = await axios.get(`${BASE_URL}/transactions/admin/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getPickups = async (token) => {
  const response = await axios.get(`${BASE_URL}/pickups/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch vendor profile
export const getVendorProfile = async (token) => {
  const response = await axios.get(`${BASE_URL}/vendors/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch vendor dashboard data
export const getVendorDashboardData = async (token) => {
  const response = await axios.get(`${BASE_URL}/vendors/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
