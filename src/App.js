import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AppRoutes from './layouts/AppRoutes';
import store from './redux/store';
import { fetchAdminProfile, fetchVendorProfile } from './redux/auth/authSlice';
import { jwtDecode } from 'jwt-decode';

const NetworkBanner = () => (
  <div className="fixed top-0 left-0 w-full z-50 bg-red-600 text-white text-center py-2 font-semibold shadow">
    No internet connection. Please check your network.
  </div>
);

const AppWrapper = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

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

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Router>
      {!isOnline && <NetworkBanner />}
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
