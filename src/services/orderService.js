import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch all orders
export const getOrders = async (token) => {
  const response = await axios.get(`${BASE_URL}/orders/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.orders;
};

// Fetch vendor orders
export const getVendorOrders = async (token) => {
  const response = await axios.get(`${BASE_URL}/orders/vendor/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.orders;
};

// Place a new order
export const placeOrder = async (products, token) => {
  const response = await axios.post(
    `${BASE_URL}/orders`,
    { products },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};