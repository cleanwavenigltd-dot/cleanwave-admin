import React, { useState } from 'react';
import { FiMail, FiLock, FiUser, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi';
import Lottie from 'lottie-react';
import Button from '../../../components/ui/Button';
import FloatingInput from '../../../components/ui/FloatingInput';
import recycleAnimation from '../../../assets/recycle.json';
import { register } from '../../../services/authService';
import VerifyEmail from './VerifyEmail';

const Register = ({ onSwitch }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showVerify, setShowVerify] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await register(form);
      setSuccess('Registration successful! Please verify your email.');
      setTimeout(() => {
        setShowVerify(true);
      }, 1000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (showVerify) {
    return (
      <VerifyEmail
        email={form.email}
        onVerified={() => {
          setShowVerify(false);
          setSuccess('');
          onSwitch('login');
        }}
        onResend={() => {/* Optionally implement resend logic here */}}
        onBack={() => setShowVerify(false)}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 animate-fade-in">
      <div className="mb-6 flex flex-col items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2909/2909765.png"
          alt="Cleanwave Logo"
          className="w-14 h-14 mb-2"
        />
        <h1 className="text-xl sm:text-2xl font-bold text-[#8CA566] mb-1 text-center">
          Cleanwave Recycling Nigeria Limited
        </h1>
        <span className="text-gray-500 text-sm">User Registration</span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-3 py-2 rounded text-sm text-center">
            {success}
          </div>
        )}
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA566]" size={20} />
          <FloatingInput
            label="Full Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA566]" size={20} />
          <FloatingInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
        <div className="relative">
          <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA566]" size={20} />
          <FloatingInput
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="pl-10"
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
          Register
        </Button>
      </form>
      <div className="mt-4 text-center text-xs text-gray-500">
        Already have an account?{' '}
        <button
          className="text-[#8CA566] font-semibold hover:underline"
          onClick={() => onSwitch('login')}
          type="button"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;