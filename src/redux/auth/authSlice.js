import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken, saveToken, removeToken } from '../../utils/auth';
import { vendorLogin, getVendorProfile, adminLogin, getAdminProfile, userLogin, getUserProfile } from '../../services/authService';

const tokenFromStorage = getToken();

// Async thunk for vendor login
export const loginVendor = createAsyncThunk(
  'auth/loginVendor',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await vendorLogin(email, password);
      saveToken(data.token);
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
      saveToken(data.token);
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

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await userLogin(email, password);
      saveToken(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to log in as user');
    }
  }
);

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const data = await getUserProfile(token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user profile');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: tokenFromStorage || null,
    vendor: null,
    admin: null,
    user: null, // Add user profile
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state, action) => {
      removeToken();
      state.token = null;
      state.vendor = null;
      state.admin = null;
      state.user = null;
      // Redirect based on role
      const { role } = action.payload || {};
      if (role === 'admin') {
        window.location.href = '/admin/login';
      } else if (role === 'vendor') {
        window.location.href = '/vendor/login';
      } else {
        window.location.href = '/';
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
        state.token = action.payload.token;
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
        state.vendor = action.payload;
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
        state.token = action.payload.token;
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
        state.admin = action.payload;
        state.error = null;
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // User Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;