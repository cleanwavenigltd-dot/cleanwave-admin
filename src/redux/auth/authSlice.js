import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken, saveToken, removeToken } from '../../utils/auth';

const tokenFromStorage = getToken();

// Async thunk for logging in the user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      const data = await response.json();
      return data; // Assuming the response contains the token
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching the user's profile
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching the vendor's profile
export const fetchVendorProfile = createAsyncThunk(
  'auth/fetchVendorProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/vendors/profile`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch vendor profile');
      }

      const data = await response.json();
      return data; // Assuming the response contains vendor profile data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: tokenFromStorage || null,
    user: null,
    vendor: null, // Added vendor state
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      removeToken(); // Remove token from localStorage
      state.token = null; // Clear token from Redux state
      state.user = null; // Clear user data from Redux state
      state.vendor = null; // Clear vendor data from Redux state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Update Redux state with the new token
        saveToken(action.payload.token); // Save token to localStorage
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Update Redux state with user profile
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchVendorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload; // Update Redux state with vendor profile
        state.error = null;
      })
      .addCase(fetchVendorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
