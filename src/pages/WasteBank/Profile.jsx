import React, { useState } from "react";
import { UserIcon, LogOutIcon, Edit2Icon, MailIcon, PhoneIcon, LockIcon } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Amir ",
    email: "amir@cleanwave.green",
    phone: "+234 903 844 8811",
    role: "Waste Bank Manager",
  });

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...user, password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    setUser({
      name: form.name,
      phone: form.phone,
      email: form.email,
      role: user.role,
    });
    setEditMode(false);
    alert("✅ Profile updated successfully!");
  };

  const handleLogout = () => {
    alert("🔒 Logged out!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-gray-400 mt-[100px] text-white py-10 rounded-lg shadow-lg relative">
        <div className="absolute inset-0 backdrop-blur-[2px] opacity-80"></div>
        <div className="relative flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center">
            <UserIcon className="w-12 h-12 text-green-700" />
          </div>
          <h2 className="text-2xl font-bold mt-3">{user.name}</h2>
          <p className="text-sm opacity-80">{user.role}</p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex-1 mt-8 px-5">
        {!editMode ? (
          <div className="space-y-5">
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="text-gray-600 font-semibold mb-3 flex items-center gap-2">
                <MailIcon className="w-4 h-4 text-green-600" /> Email
              </h3>
              <p className="text-gray-800 font-medium">{user.email}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="text-gray-600 font-semibold mb-3 flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-green-600" /> Phone
              </h3>
              <p className="text-gray-800 font-medium">{user.phone}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditMode(true)}
                className="flex-1 bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-800 transition"
              >
                <Edit2Icon className="w-4 h-4" /> Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-300 transition"
              >
                <LogOutIcon className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-5 space-y-5">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Edit Profile</h3>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Change Password
              </label>
              <div className="flex items-center border rounded-lg p-3">
                <LockIcon className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="flex-1 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
