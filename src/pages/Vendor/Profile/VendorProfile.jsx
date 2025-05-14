import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorProfile } from '../../../redux/auth/authSlice';

const VendorProfile = () => {
  const dispatch = useDispatch();
  const { vendor, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(fetchVendorProfile(token));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Vendor Profile</h1>
      <p>Name: {vendor?.name}</p>
      <p>Email: {vendor?.email}</p>
      <p>Phone: {vendor?.phone}</p>
      <p>Store Name: {vendor?.store_name}</p>
      <p>Wallet Balance: {vendor?.wallet_balance}</p>
    </div>
  );
};

export default VendorProfile;