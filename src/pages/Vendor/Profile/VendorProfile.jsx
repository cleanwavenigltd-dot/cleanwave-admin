import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getVendorWallet } from '../../../services/vendorService';
import { User, Settings, DollarSign, Mail, Phone, MapPin, Store, Calendar, CreditCard } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Button from '../../../components/ui/Button';

const VendorProfile = () => {
  const [activeTab, setActiveTab] = useState('profile'); // Tab state
  const [walletBalance, setWalletBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const vendor = useSelector((state) => state.auth.vendor); // Fetch vendor profile from Redux

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getVendorWallet(token);
        setWalletBalance(response.wallet_balance);
      } catch (error) {
        console.error('Failed to fetch wallet balance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletBalance();
  }, []);

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert('Please enter a valid withdrawal amount.');
      return;
    }

    if (parseFloat(withdrawAmount) > parseFloat(walletBalance)) {
      alert('Insufficient wallet balance.');
      return;
    }

    alert(`Withdrawal of ₦${withdrawAmount} is successful!`);
    setWithdrawAmount('');
  };

  const renderProfileTab = () => (
    <div className="space-y-4">
      {/* Personal Information */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <User size={16} className="text-[#8CA566]" /> Personal Information
        </h3>
        {loading ? (
          <Skeleton count={3} height={15} />
        ) : (
          <div className="space-y-2 text-sm text-gray-600">
            <p><Mail className="inline-block mr-2 text-gray-500" size={14} /> {vendor?.email || 'vendor@example.com'}</p>
            <p><Phone className="inline-block mr-2 text-gray-500" size={14} /> {vendor?.phone || 'N/A'}</p>
            <p><MapPin className="inline-block mr-2 text-gray-500" size={14} /> {vendor?.address || 'N/A'}</p>
          </div>
        )}
      </div>

      {/* Store Information */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Store size={16} className="text-[#8CA566]" /> Store Information
        </h3>
        {loading ? (
          <Skeleton count={3} height={15} />
        ) : (
          <div className="space-y-2 text-sm text-gray-600">
            <p><Store className="inline-block mr-2 text-gray-500" size={14} /> {vendor?.store_name || 'N/A'}</p>
            <p><CreditCard className="inline-block mr-2 text-gray-500" size={14} /> {vendor?.store_identifier || 'N/A'}</p>
            <p><MapPin className="inline-block mr-2 text-gray-500" size={14} /> {vendor?.store_address || 'N/A'}</p>
          </div>
        )}
      </div>

      {/* Wallet Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <DollarSign size={16} className="text-[#8CA566]" /> Wallet
        </h3>
        {loading ? (
          <Skeleton height={15} />
        ) : (
          <p className="text-sm font-bold text-gray-800">₦{parseFloat(walletBalance).toLocaleString()}</p>
        )}
      </div>

      {/* Withdrawal Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <DollarSign size={16} className="text-[#8CA566]" /> Withdraw Funds
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Enter amount"
            className="flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8CA566]"
          />
          <Button onClick={handleWithdraw} isActive={true}>
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Settings size={16} className="text-[#8CA566]" /> Settings
        </h3>
        <p className="text-sm text-gray-600">This is a placeholder for settings features.</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg flex">
        {/* Tab Switcher */}
        <div className="w-1/4 bg-gray-100 p-4 rounded-l-lg">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left p-2 rounded-md mb-2 text-sm ${
              activeTab === 'profile' ? 'bg-[#8CA566] text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left p-2 rounded-md text-sm ${
              activeTab === 'settings' ? 'bg-[#8CA566] text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="w-3/4 p-6">{activeTab === 'profile' ? renderProfileTab() : renderSettingsTab()}</div>
      </div>
    </div>
  );
};

export default VendorProfile;