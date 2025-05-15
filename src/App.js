import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AppRoutes from './layouts/AppRoutes';
import store from './redux/store';
import { fetchAdminProfile, fetchVendorProfile } from './redux/auth/authSlice';
import {jwtDecode} from 'jwt-decode';

const AppWrapper = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;

        if (role === 'admin') {
          dispatch(fetchAdminProfile());
        } else if (role === 'vendor') {
          dispatch(fetchVendorProfile());
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, [dispatch, token]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const App = () => (
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);

export default App;
