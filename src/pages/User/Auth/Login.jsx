import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import Button from '../../../components/ui/Button';
import FloatingInput from '../../../components/ui/FloatingInput';
import recycleAnimation from '../../../assets/recycle.json';
import { useDispatch } from 'react-redux';
import { loginUser, fetchUserProfile } from '../../../redux/auth/authSlice';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Login via Redux thunk (saves token in Redux and localStorage)
      await dispatch(loginUser({ email: form.email, password: form.password })).unwrap();
      // Fetch user profile and store in Redux
      await dispatch(fetchUserProfile()).unwrap();
      // Redirect to user home/dashboard
      navigate('/home');
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] to-[#f1f8e9]">
      <div className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full mx-2">
        {/* Lottie Animation Side */}
        <div className="hidden md:flex flex-col items-center justify-center bg-[#8CA566] p-10 w-1/2">
          <Lottie
            animationData={recycleAnimation}
            loop
            style={{ height: '220px', width: '220px' }}
          />
          <h2 className="text-2xl font-bold text-white mt-6 text-center">
            Welcome to <br />
            Cleanwave Recycling Nigeria Limited
          </h2>
          <p className="text-white text-sm mt-2 text-center">
            Join us in making Nigeria cleaner and greener.<br />
            Please log in to continue.
          </p>
        </div>
        {/* Login Form Side */}
        <div className="flex-1 flex flex-col justify-center p-6 sm:p-8">
          <div className="mb-6 flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2909/2909765.png"
              alt="Cleanwave Logo"
              className="w-14 h-14 mb-2"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-[#8CA566] mb-1 text-center">
              Cleanwave Recycling Nigeria Limited
            </h1>
            <span className="text-gray-500 text-sm">User Login</span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm text-center">
                {error}
              </div>
            )}
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA566]" size={20} />
              <FloatingInput
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="pl-10"
                autoComplete="username"
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA566]" size={20} />
              <FloatingInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="pl-10 pr-10"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8CA566] focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            <Button type="submit" isActive={!loading} isLoading={loading} className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-6 text-center text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Cleanwave Recycling Nigeria Limited. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;