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

export const addProduct = async (formData, token) => {
  const response = await axios.post(`${BASE_URL}/products`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteProduct = async (productId, token) => {
  const response = await axios.delete(`${BASE_URL}/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};