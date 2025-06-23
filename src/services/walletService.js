// src/services/walletService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch all wallets (Admin)
export const getAdminWallets = async (token) => {
  const response = await axios.get(`${BASE_URL}/wallet/admin/wallets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get wallet balance for current user (using /me)
export const getWalletBalance = async (token) => {
  const response = await axios.get(`${BASE_URL}/wallet/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // { user_id, points }
};

// Fetch transaction history for user
export const getTransactions = async (token) => {
  const response = await axios.get(`${BASE_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.transactions; // Array of transactions
};
