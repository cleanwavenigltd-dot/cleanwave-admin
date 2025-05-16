import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch vendors
export const getVendors = async (token) => {
  const response = await axios.get(`${BASE_URL}/vendors/admin/vendors`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Register a new vendor
export const registerVendor = async (vendorData, token) => {
  const response = await axios.post(`${BASE_URL}/vendors/register`, vendorData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getVendorWallet = async (token) => {
  const response = await axios.get(`${BASE_URL}/vendors/wallet`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};