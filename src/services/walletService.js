// src/services/walletService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL; // or process.env.REACT_APP_API_BASE_URL if using CRA

// Fetch all wallets (Admin)
export const getAdminWallets = async (token) => {
  const response = await axios.get(`${BASE_URL}/wallet/admin/wallets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
