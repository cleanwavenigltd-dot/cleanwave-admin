import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';
import VendorLayout from '../layouts/VendorLayout'; // Vendor Layout

// Pages
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import AgentManagement from '../pages/AgentManagement/AgentManagement';
import VendorManagement from '../pages/VendorManagement/VendorManagement';
import PickupRequests from '../pages/PickupRequests/PickupRequests';
import WalletTransactions from '../pages/WalletTransactions/WalletTransactions';
import Marketplace from '../pages/Marketplace/Marketplace';
import ProfileSettings from '../pages/ProfileSettings/ProfileSettings';
import OrderManagement from '../pages/OrderManagement/OrderManagement';

// Vendor Pages
import VendorLogin from '../pages/Vendor/Login/VendorLogin';
import VendorDashboard from '../pages/Vendor/Dashboard/VendorDashboard';
import VendorProducts from '../pages/Vendor/Products/VendorProducts';
import VendorOrders from '../pages/Vendor/Orders/VendorOrders';
import VendorWallet from '../pages/Vendor/Wallet/VendorWallet';
import VendorProfile from '../pages/Vendor/Profile/VendorProfile';

const ProtectedRoute = ({ children }) => {
  const auth = isAuthenticated();
  return auth ? children : <Navigate to="/vendor/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/vendor/login" element={<VendorLogin />} />
      </Route>

      {/* Vendor Routes */}
      <Route
        element={
          <ProtectedRoute>
            <VendorLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/products" element={<VendorProducts />} />
        <Route path="/vendor/orders" element={<VendorOrders />} />
        <Route path="/vendor/wallet" element={<VendorWallet />} />
        <Route path="/vendor/profile" element={<VendorProfile />} />
      </Route>

      {/* Admin Routes */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agents" element={<AgentManagement />} />
        <Route path="/vendors" element={<VendorManagement />} />
        <Route path="/pickup-requests" element={<PickupRequests />} />
        <Route path="/wallet-transactions" element={<WalletTransactions />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/profile" element={<ProfileSettings />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default AppRoutes;