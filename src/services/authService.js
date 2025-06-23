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



// Fetch vendor dashboard data
export const getVendorDashboardData = async (token) => {
  const response = await axios.get(`${BASE_URL}/vendors/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const vendorLogin = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/vendors/login`, {
    email,
    password,
  });
  return response.data;
};

export const getVendorProfile = async (token) => {
  const response = await axios.get(`${BASE_URL}/vendors/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Admin-specific API calls (unchanged)
export const adminLogin = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const getAdminProfile = async (token) => {
  const response = await axios.get(`${BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Vendor login


// Admin login


// User login (NEW)
export const userLogin = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return res.data;
};

// User profile (NEW)
export const getUserProfile = async (token) => {
  const res = await axios.get(`${BASE_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProfile = async (data, token) => {
  const response = await axios.put(`${BASE_URL}/auth/update-profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const register = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, data);
  return response.data;
};

export const verifyEmail = async ({ email, code }) => {
  const response = await axios.post(`${BASE_URL}/auth/verify-email`, { email, code });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${BASE_URL}/auth/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async ({ email, otp, newPassword }) => {
  const response = await axios.post(`${BASE_URL}/auth/reset-password`, { email, otp, newPassword });
  return response.data;
};