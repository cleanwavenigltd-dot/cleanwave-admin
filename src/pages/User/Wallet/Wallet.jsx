import React, { useEffect, useState } from 'react';
import { FiArrowUpCircle, FiArrowDownCircle, FiCreditCard, FiCalendar, FiClock, FiRefreshCw, FiDownload } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { getWalletBalance, getTransactions } from '../../../services/walletService';

const typeStyles = {
  points_earned: { icon: <FiArrowUpCircle size={18} />, bg: 'bg-green-100', color: 'text-green-700' },
  points_purchased: { icon: <FiCreditCard size={18} />, bg: 'bg-blue-100', color: 'text-blue-700' },
  points_redeemed: { icon: <FiArrowDownCircle size={18} />, bg: 'bg-yellow-100', color: 'text-yellow-700' },
};

const Wallet = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch wallet and transactions
  const fetchWalletData = async () => {
    setLoading(true);
    try {
      const walletRes = await getWalletBalance(token);
      const txRes = await getTransactions(token);
      setWallet(walletRes);
      setTransactions(txRes || []);
    } catch (err) {
      setWallet(null);
      setTransactions([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchWalletData();
    // eslint-disable-next-line
  }, [token]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchWalletData();
  };

  // Withdraw button handler (to be implemented)
  const handleWithdraw = () => {
    // Open withdraw modal or navigate to withdraw page
    alert('Withdraw feature coming soon!');
  };

  const renderTransaction = (item, idx) => {
    const style = typeStyles[item.type] || {};
    const createdAt = new Date(item.created_at);
    const dateStr = createdAt.toLocaleDateString(undefined, {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
    });
    const timeStr = createdAt.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const description =
      item.type === 'points_earned'
        ? 'Earned from agent assignment'
        : item.type === 'points_redeemed'
        ? 'Redeemed in marketplace'
        : 'Wallet transaction';

    return (
      <div
        key={item.id || idx}
        className="flex items-center bg-white rounded-xl shadow-sm p-3 mb-3"
      >
        <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-3 ${style.bg}`}>
          <span className={`${style.color}`}>{style.icon || <FiCreditCard size={18} />}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-xs text-[#4C862D] capitalize truncate">{item.type.replace(/_/g, ' ')}</div>
          <div className="text-xs text-gray-500 truncate">{description}</div>
          <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-1">
            <FiCalendar size={12} />
            <span>{dateStr}</span>
            <FiClock size={12} />
            <span>{timeStr}</span>
          </div>
        </div>
        <div className="font-bold text-xs text-[#8CA566] ml-2 whitespace-nowrap">
          ₦{item.amount}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#f8faf5] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8CA566]" />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="w-full min-h-screen bg-[#f8faf5] flex flex-col items-center justify-center">
        <div className="text-gray-400 text-center">
          Unable to load wallet. Please log in.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f8faf5] flex flex-col lg:flex-row items-start py-4 px-2 sm:px-0">
      {/* Wallet Card - left on desktop, top on mobile */}
      <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-12 lg:mr-8 lg:mt-12">
        <div className="relative bg-gradient-to-br from-[#8CA566] to-[#4C862D] rounded-2xl shadow-2xl p-7 sm:p-10 flex flex-col items-start overflow-hidden min-h-[220px]">
          {/* Wallet Icon Watermark */}
          <div className="absolute top-4 right-4 opacity-10 text-white text-8xl pointer-events-none select-none z-0">
            <FiCreditCard size={110} />
          </div>
          <div className="flex w-full justify-between items-center z-10">
            <div className="text-xs text-white font-semibold tracking-wide">Wallet Balance</div>
            <button
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white/20 text-white hover:bg-white/30 transition ${refreshing ? 'opacity-60 pointer-events-none' : ''}`}
              onClick={handleRefresh}
              disabled={refreshing}
              title="Refresh"
            >
              <FiRefreshCw className={refreshing ? 'animate-spin' : ''} size={14} />
              Refresh
            </button>
          </div>
          <div className="text-4xl sm:text-5xl font-bold text-white tracking-wide mt-6 mb-2 z-10">
            ₦{wallet?.points?.toLocaleString() || 0}
          </div>
          <div className="text-xs text-white mb-4 z-10">Hello, {user?.name}</div>
          <button
            className="flex items-center gap-2 mt-2 bg-white text-[#8CA566] font-semibold px-5 py-2 rounded-full shadow hover:bg-[#e6f2d9] transition text-sm z-10"
            onClick={handleWithdraw}
            title="Withdraw"
          >
            <FiDownload size={18} />
            Withdraw
          </button>
        </div>
      </div>

      {/* Transactions - right on desktop, below on mobile */}
      <div className="w-full max-w-lg mx-auto mt-10 lg:mt-12 lg:ml-0 lg:mr-12 flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="text-base font-semibold text-[#8CA566]">Recent Transactions</div>
        </div>
        {transactions.length === 0 ? (
          <div className="text-center text-gray-400 py-8 text-sm">No transactions yet.</div>
        ) : (
          <div className="max-h-[420px] overflow-y-auto pr-1">
            {transactions.map(renderTransaction)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;