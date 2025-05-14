import React from 'react';
import { useSelector } from 'react-redux';
import VendorProfileMenu from './VendorProfileMenu';

const VendorHeader = () => {
  const vendor = useSelector((state) => state.auth.vendor);

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md z-10">
      {/* Branding */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#8CA566] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
          V
        </div>
        <h1 className="text-sm font-bold text-gray-800">Vendor Control Panel</h1>
      </div>

      {/* Store Information and Profile Menu */}
      <div className="flex items-center gap-6">
        {vendor && (
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">{vendor.store_name}</p>
            <p className="text-xs text-gray-500">{vendor.store_address}</p>
          </div>
        )}
        <VendorProfileMenu />
      </div>
    </header>
  );
};

export default VendorHeader;