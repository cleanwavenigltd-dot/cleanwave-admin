// src/services/marketplaceService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

// Fetch vendor products
export const getVendorProducts = async (token) => {
  const response = await axios.get(`${BASE_URL}/products/vendor`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Add a new product
export const addProduct = async (token, productData) => {
  const response = await axios.post(`${BASE_URL}/products`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};