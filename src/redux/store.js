import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import cartReducer from './cart/cartSlice'; // <-- Add this line

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, // <-- Add this line
  },
});

export default store;