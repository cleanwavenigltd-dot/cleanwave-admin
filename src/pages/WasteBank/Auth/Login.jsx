import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import FloatingInput from '../../../components/ui/FloatingInput';
import { useDispatch } from 'react-redux';
import { loginUser, fetchUserProfile } from '../../../redux/auth/authSlice';

const Login = ({ onSwitch }) => {
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
      await dispatch(loginUser({ email: form.email, password: form.password })).unwrap();
      await dispatch(fetchUserProfile()).unwrap();
      // navigate('/home');
      document.location.href = '/waste/dashboard'
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
    <div className="w-full max-w-md mx-auto flex flex-col justify-center">
      <div className="mb-6 flex flex-col items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2909/2909765.png"
          alt="Cleanwave Logo"
          className="w-14 h-14 mb-2"
        />
        <h1 className="text-xl sm:text-2xl font-bold text-[#8CA566] mb-1 text-center">
          Cleanwave Recycling Nigeria Limited
        </h1>
        <span className="text-gray-500 text-sm">Waste Bank Login</span>
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
            required
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
            required
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
      {/* <div className="mt-4 text-center text-xs text-gray-500">
        Don&apos;t have an account?{' '}
        <button
          className="text-[#8CA566] font-semibold hover:underline"
          onClick={() => onSwitch('register')}
          type="button"
        >
          Register
        </button>
      </div>
      <div className="mt-2 text-center text-xs">
        <button
          className="text-[#8CA566] hover:underline"
          onClick={() => onSwitch && onSwitch('forgot')}
          type="button"
        >
          Forgot password?
        </button>
      </div> */}
      <div className="mt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Cleanwave Recycling Nigeria Limited. All rights reserved.
      </div>
    </div>
  );
};

export default Login;