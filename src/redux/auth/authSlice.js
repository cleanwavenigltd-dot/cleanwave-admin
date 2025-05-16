import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken, saveToken, removeToken } from '../../utils/auth';
import { vendorLogin, getVendorProfile, adminLogin, getAdminProfile } from '../../services/authService';

const tokenFromStorage = getToken();

// Async thunk for vendor login
export const loginVendor = createAsyncThunk(
  'auth/loginVendor',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await vendorLogin(email, password);
      saveToken(data.token); // Save vendor token to localStorage
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to log in as vendor');
    }
  }
);

// Async thunk for fetching vendor profile
export const fetchVendorProfile = createAsyncThunk(
  'auth/fetchVendorProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const data = await getVendorProfile(token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch vendor profile');
    }
  }
);

// Async thunk for admin login
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await adminLogin(email, password);
      saveToken(data.token); // Save admin token to localStorage
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to log in as admin');
    }
  }
);

// Async thunk for fetching admin profile
export const fetchAdminProfile = createAsyncThunk(
  'auth/fetchAdminProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const data = await getAdminProfile(token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin profile');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: tokenFromStorage || null,
    vendor: null, // Vendor profile
    admin: null, // Admin profile
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state, action) => {
      removeToken(); // Remove token from localStorage
      state.token = null; // Clear token from Redux state
      state.vendor = null; // Clear vendor data
      state.admin = null; // Clear admin data

      // Redirect based on role
      const { role } = action.payload || {};
      if (role === 'admin') {
        window.location.href = '/login'; // Redirect to admin login
      } else {
        window.location.href = '/vendor/login'; // Redirect to vendor login
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Vendor Login
      .addCase(loginVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Save vendor token
        state.error = null;
      })
      .addCase(loginVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Vendor Profile
      .addCase(fetchVendorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload; // Save vendor profile
        state.error = null;
      })
      .addCase(fetchVendorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Admin Login
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Save admin token
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Admin Profile
      .addCase(fetchAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload; // Save admin profile
        state.error = null;
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;