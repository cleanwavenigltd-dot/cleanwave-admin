import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiMapPin, FiMail, FiPhone, FiPhoneCall, FiCheckCircle } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const placeholderImg = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getCurrentDate = () => new Date().toISOString().slice(0, 10);
const getCurrentTime = () => {
  const d = new Date();
  return d.toTimeString().slice(0, 5);
};

const SuccessModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center max-w-xs w-full">
        <FiCheckCircle size={56} className="text-green-500 mb-3" />
        <h3 className="text-lg font-bold text-[#4C862D] mb-2">Request Submitted!</h3>
        <p className="text-gray-600 text-center mb-4">
          Your pickup request was submitted successfully.
        </p>
        <button
          onClick={onClose}
          className="bg-[#8CA566] hover:bg-[#6d8f3c] text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Go to History
        </button>
      </div>
    </div>
  );
};

const RequestPickup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { agent } = location.state || {};
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [date, setDate] = useState(getCurrentDate());
  const [time, setTime] = useState(getCurrentTime());
  const [pickupLocation, setPickupLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch waste categories directly with axios
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/waste-categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data?.wasteCategories || []);
      } catch (err) {
        setCategories([]);
        toast.error('Failed to load waste categories.');
      }
    };
    if (token) fetchCategories();
  }, [token]);

  const handleCallAgent = () => {
    if (agent?.phone) {
      window.open(`tel:${agent.phone}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      toast.error('Please select a waste category.');
      return;
    }
    if (!pickupLocation.trim()) {
      toast.error('Please enter your location.');
      return;
    }
    if (!user?.id) {
      toast.error('User not found. Please log in again.');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        user_id: user.id,
        agent_id: agent?.id,
        waste_category_id: selectedCategory,
        date,
        time,
        location: pickupLocation,
      };
      await axios.post(`${BASE_URL}/pickups`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowSuccess(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to submit pickup request.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/pickups/history');
  };

  return (
    <div className="w-full min-h-screen bg-[#f8faf5] flex justify-center items-start py-6 px-2 sm:px-0">
      <ToastContainer position="top-center" />
      <SuccessModal open={showSuccess} onClose={handleSuccessClose} />
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-4 sm:p-8">
        {/* Back Button */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#f2f2f2] mb-2"
          onClick={() => navigate(-1)}
        >
          <FiChevronLeft size={20} className="text-[#8CA566]" />
        </button>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-[#8CA566] text-center mb-4">Request Pickup</h2>

        {/* Agent Card */}
        <div className="flex items-start bg-white rounded-xl shadow p-3 mb-6">
          <img
            src={placeholderImg}
            alt={agent?.name}
            className="w-14 h-14 rounded object-cover mr-4 border border-[#e6f2d9]"
          />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-base text-[#222] truncate">{agent?.name}</div>
            <div className="flex items-center mt-1 text-xs text-[#8CA566]">
              <FiMapPin className="mr-1" size={13} />
              5km away
            </div>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <FiMail className="mr-1" size={13} />
              {agent?.email}
            </div>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <FiPhone className="mr-1" size={13} />
              {agent?.phone}
            </div>
          </div>
          <button
            className="ml-3 bg-[#8CA566] rounded-full p-2 flex items-center justify-center hover:bg-[#6d8f3c] transition"
            onClick={handleCallAgent}
            title="Call Agent"
            type="button"
          >
            <FiPhoneCall size={18} color="#fff" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="font-semibold text-base text-[#222] mb-1">Pickup Request Details</div>
            <div className="text-xs text-gray-500 mb-2">
              Please fill out the form below to schedule your pickup.
            </div>
          </div>

          {/* Waste Category */}
          <div>
            <label className="block text-xs font-medium mb-1 text-[#222]">Select Waste Category</label>
            <select
              className="w-full border border-[#e6f2d9] rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#8CA566]"
              value={selectedCategory}
              onChange={e => setSelectedCategory(Number(e.target.value))}
              required
            >
              <option value="">Select waste category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Date and Time */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium mb-1 text-[#222]">Date</label>
              <input
                type="date"
                className="w-full border border-[#e6f2d9] rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#8CA566]"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium mb-1 text-[#222]">Time</label>
              <input
                type="time"
                className="w-full border border-[#e6f2d9] rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#8CA566]"
                value={time}
                onChange={e => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-medium mb-1 text-[#222]">Location</label>
            <input
              type="text"
              className="w-full border border-[#e6f2d9] rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#8CA566]"
              value={pickupLocation}
              onChange={e => setPickupLocation(e.target.value)}
              placeholder="Enter your location"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#8CA566] hover:bg-[#6d8f3c] text-white font-semibold py-2 rounded-lg shadow transition text-xs sm:text-sm flex items-center justify-center"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestPickup;