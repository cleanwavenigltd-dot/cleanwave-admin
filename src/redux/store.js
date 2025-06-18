import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import cartReducer from './cart/cartSlice'; // <-- Add this line

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, // <-- Add this line
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
});


export default store;