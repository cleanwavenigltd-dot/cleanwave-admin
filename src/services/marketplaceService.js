// src/services/marketplaceService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};
