import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, logout } from '../../../redux/auth/authSlice';
import { getUserProfile, updateProfile } from '../../../services/authService';
import { FiEdit2, FiLogOut, FiChevronRight, FiUser, FiMail, FiPhone, FiCalendar, FiShield, FiLock, FiHelpCircle, FiMessageCircle, FiCreditCard } from 'react-icons/fi';
import dayjs from 'dayjs';

const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState('');
  const [error, setError] = useState('');

  // Fetch profile on mount or when token changes
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getUserProfile(token)
      .then((data) => {
        setProfile(data);
        setForm({ name: data.name, email: data.email, phone: data.phone });
      })
      .catch(() => setError('Failed to load profile'))
      .finally(() => setLoading(false));
  }, [token]);

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setEditMode(false);
    setForm({ name: profile.name, email: profile.email, phone: profile.phone });
    setUpdateMsg('');
    setError('');
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUpdateMsg('');
    setError('');
    try {
      await updateProfile(form, token);
      setUpdateMsg('Profile updated successfully!');
      setEditMode(false);
      // Refresh profile
      const updated = await getUserProfile(token);
      setProfile(updated);
      setForm({ name: updated.name, email: updated.email, phone: updated.phone });
      dispatch(fetchUserProfile());
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout({ role: 'user' }));
  };

  // Support links
  const whatsappLink = `https://wa.me/2347012345678?text=Hello%20Support%2C%20I%20need%20help%20with%20my%20account.`;

  return (
    <div className="w-full min-h-screen bg-[#f8faf5] flex flex-col items-center py-6 px-2 sm:px-0">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-4 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#e6f2d9] rounded-full p-3">
              <FiUser size={28} className="text-[#8CA566]" />
            </div>
            <div>
              <div className="font-bold text-lg text-[#222]">{profile?.name || '...'}</div>
              <div className="text-xs text-gray-500">{profile?.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : ''}</div>
            </div>
          </div>
          <button
            className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-[#e6f2d9] text-[#8CA566] hover:bg-[#d2e6b8] transition"
            onClick={handleEdit}
            disabled={editMode}
          >
            <FiEdit2 size={14} />
            Edit
          </button>
        </div>

        {/* Profile Info or Edit Form */}
        {!editMode ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiMail className="text-[#8CA566]" />
              <span className="text-sm text-gray-700">{profile?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="text-[#8CA566]" />
              <span className="text-sm text-gray-700">{profile?.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiCalendar className="text-[#8CA566]" />
              <span className="text-sm text-gray-700">
                Joined {profile?.created_at ? dayjs(profile.created_at).format('MMM D, YYYY') : ''}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FiCreditCard className="text-[#8CA566]" />
              <span className="text-sm text-gray-700">Wallet Balance: ₦{profile?.wallet_balance?.toLocaleString() || 0}</span>
            </div>
            {profile?.has_pending_request && (
              <div className="flex items-center gap-2 text-xs text-yellow-700 bg-yellow-100 rounded px-2 py-1">
                <FiShield />
                You have a pending request
              </div>
            )}
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleUpdate}>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            {updateMsg && <div className="text-green-600 text-xs">{updateMsg}</div>}
            {error && <div className="text-red-600 text-xs">{error}</div>}
            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                className="bg-[#8CA566] text-white px-4 py-2 rounded font-semibold text-xs hover:bg-[#6d8f3c] transition"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded font-semibold text-xs hover:bg-gray-200 transition"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Divider */}
        <div className="border-t my-6" />

        {/* Account & Support Links */}
        <div className="space-y-2">
          <a
            href="/user/profile/change-password"
            className="flex items-center justify-between text-sm text-[#4C862D] hover:underline py-2"
          >
            <span className="flex items-center gap-2"><FiLock /> Change Password</span>
            <FiChevronRight />
          </a>
          <a
            href="/privacy-policy"
            className="flex items-center justify-between text-sm text-[#4C862D] hover:underline py-2"
            target="_blank" rel="noopener noreferrer"
          >
            <span className="flex items-center gap-2"><FiShield /> Privacy Policy</span>
            <FiChevronRight />
          </a>
          <a
            href="/terms-of-service"
            className="flex items-center justify-between text-sm text-[#4C862D] hover:underline py-2"
            target="_blank" rel="noopener noreferrer"
          >
            <span className="flex items-center gap-2"><FiShield /> Terms of Service</span>
            <FiChevronRight />
          </a>
          <a
            href={whatsappLink}
            className="flex items-center justify-between text-sm text-[#4C862D] hover:underline py-2"
            target="_blank" rel="noopener noreferrer"
          >
            <span className="flex items-center gap-2"><FiMessageCircle /> Contact Support</span>
            <FiChevronRight />
          </a>
        </div>

        {/* Logout */}
        <button
          className="mt-8 w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-100 transition"
          onClick={handleLogout}
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;