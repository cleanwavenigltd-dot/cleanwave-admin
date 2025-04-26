import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AppRoutes from './layouts/AppRoutes';
import store from './redux/store';
import { fetchProfile } from './redux/auth/authSlice';

const AppWrapper = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile(token));
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
