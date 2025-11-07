import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AuthLayout from "./AuthLayout";
import AdminLayout from "./AdminLayout";
import VendorLayout from "./VendorLayout";
import UserLayout from "./UserLayout";
import WasteBankLayout from "./WasteBankLayout";
// import Profile from "../pages/WasteBank/Profile";


// Admin Pages
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import AgentManagement from "../pages/AgentManagement/AgentManagement";
import VendorManagement from "../pages/VendorManagement/VendorManagement";
import PickupRequests from "../pages/PickupRequests/PickupRequests";
import WalletTransactions from "../pages/WalletTransactions/WalletTransactions";
import Marketplace from "../pages/Marketplace/Marketplace";
import ProfileSettings from "../pages/ProfileSettings/ProfileSettings";
import OrderManagement from "../pages/OrderManagement/OrderManagement";

// Vendor Pages
import VendorLogin from "../pages/Vendor/Login/VendorLogin";
import VendorDashboard from "../pages/Vendor/Dashboard/VendorDashboard";
import VendorProducts from "../pages/Vendor/Products/VendorProducts";
import VendorOrders from "../pages/Vendor/Orders/VendorOrders";
import VendorWallet from "../pages/Vendor/Wallet/VendorWallet";
import VendorProfile from "../pages/Vendor/Profile/VendorProfile";

// Waste Bank Pages
import WasteBank from "../pages/WasteBank/WasteBank";
import WasteLogin from "../pages/WasteBank/Auth/Login";
import WasteScreen from "../pages/WasteBank/Auth/WasteScreen";
import Profile from "../pages/WasteBank/Profile";
import Pickups from "../pages/WasteBank/Pickups";
import Wallet from "../pages/WasteBank/Wallete";

// User Pages
import UserLogin from "../pages/User/Auth/Login";
import UserHome from "../pages/User/Home/Home";
import UserPickups from "../pages/User/Pickups/Pickups";
import UserMarketplace from "../pages/User/Marketplace/Marketplace";
import UserWallet from "../pages/User/Wallet/Wallet";
import UserProfile from "../pages/User/Profile/Profile";
import ProductDetails from "../pages/User/other/ProductDetails";
import Checkout from "../pages/User/Marketplace/components/Checkout";
import RequestPickup from "../pages/User/Pickups/components/RequestPickup";
import PickupsHistory from "../pages/User/Pickups/components/PickupsHistory";
import Register from "../pages/User/Auth/Register";
import AuthScreen from "../pages/User/Auth/AuthScreen";

// ProtectedRoute
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/User/other/NotFound";

const AppRoutes = () => (
  <Routes>
    {/* User Public Route */}
    <Route path="/" element={<AuthScreen />} />
    <Route path="/waste/login" element={<WasteScreen />} />

    {/* User Protected Routes */}
    <Route
      element={
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/home" element={<UserHome />} />
      <Route path="/pickups" element={<UserPickups />} />
      <Route path="/marketplace" element={<UserMarketplace />} />
      <Route path="/wallet" element={<UserWallet />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/marketplace/cart" element={<Checkout />} />
      <Route path="/request-pickup" element={<RequestPickup />} />
      <Route path="/pickups/history" element={<PickupsHistory />} />
    </Route>

    {/* Admin/Vendor/waste-bank Auth */}
    <Route element={<AuthLayout />}>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/vendor/login" element={<VendorLogin />} />
    </Route>

    {/* Vendor Protected Routes */}
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

    {/* Admin Protected Routes */}
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
      <Route path="/admin-marketplace" element={<Marketplace />} />
      <Route path="/orders" element={<OrderManagement />} />
      <Route path="/profile" element={<ProfileSettings />} />
    </Route>

    {/* Waste-Bank unProtected Routes before maintenance */}
    <Route element={<WasteBankLayout />}>
      <Route path="/waste/dashboard" element={<WasteBank/>} />
      <Route path="/waste/pickups" element={<Pickups />} />
      <Route path="/waste/wallet" element={<Wallet />} />
      <Route path="waste/profile" element={<Profile />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* <Route path="/waste/dashboard" element={<WasteBank />} /> */}
      {/* <Route path="/vendors" element={<VendorManagement />} /> */}
    </Route>

    {/* Redirect unknown routes */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
