import React, { useState, useRef, useEffect } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiKey } from 'react-icons/fi';
import Button from '../../../components/ui/Button';
import FloatingInput from '../../../components/ui/FloatingInput';
import { forgotPassword, resetPassword } from '../../../services/authService';

const OTP_LENGTH = 5;

const ForgotPassword = ({ onSwitch }) => {
  const [step, setStep] = useState(1); // 1: enter email, 2: enter otp & new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [activeIdx, setActiveIdx] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const inputsRef = useRef([]);

  useEffect(() => {
    if (step === 2 && inputsRef.current[activeIdx]) {
      inputsRef.current[activeIdx].focus();
    }
  }, [activeIdx, step]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMsg('');
    try {
      await forgotPassword(email);
      setMsg('OTP sent to your email. Please check your inbox.');
      setStep(2);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Failed to send OTP. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (!val) return;
    let newOtp = [...otp];
    newOtp[idx] = val[val.length - 1];
    setOtp(newOtp);
    if (idx < OTP_LENGTH - 1) setActiveIdx(idx + 1);
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (otp[idx]) {
        let newOtp = [...otp];
        newOtp[idx] = '';
        setOtp(newOtp);
      } else if (idx > 0) {
        setActiveIdx(idx - 1);
      }
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (pasted.length === OTP_LENGTH) {
      setOtp(pasted.split(''));
      setActiveIdx(OTP_LENGTH - 1);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMsg('');
    try {
      await resetPassword({ email, otp: otp.join(''), newPassword });
      setMsg('Password reset successful! You can now log in.');
      setTimeout(() => onSwitch('login'), 1500);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Failed to reset password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center h-full">
      <div
        className="
          w-full max-w-md bg-white rounded-2xl shadow-lg
          flex flex-col
          justify-center
          items-center
          py-6 px-4 sm:px-8
          h-[90vh] max-h-[500px]
          min-h-[400px]
        "
        style={{ minHeight: 400 }}
      >
        <div className="w-full flex-1 flex flex-col overflow-y-auto">
          <div className="mb-6 flex flex-col items-center">
            <FiKey size={40} className="text-[#8CA566] mb-2" />
            <h1 className="text-lg sm:text-xl font-bold text-[#8CA566] mb-1 text-center">
              Forgot Password
            </h1>
            <span className="text-gray-500 text-xs sm:text-sm text-center">
              {step === 1
                ? 'Enter your email to receive a reset code.'
                : 'Enter the OTP sent to your email and your new password.'}
            </span>
          </div>
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs sm:text-sm text-center">
                  {error}
                </div>
              )}
              {msg && (
                <div className="bg-green-100 text-green-700 px-3 py-2 rounded text-xs sm:text-sm text-center">
                  {msg}
                </div>
              )}
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA566]" size={20} />
                <FloatingInput
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <Button type="submit" isActive={!loading} isLoading={loading} className="w-full">
                Send OTP
              </Button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleResetSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs sm:text-sm text-center">
                  {error}
                </div>
              )}
              {msg && (
                <div className="bg-green-100 text-green-700 px-3 py-2 rounded text-xs sm:text-sm text-center">
                  {msg}
                </div>
              )}
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA566]" size={20} />
                <FloatingInput
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  disabled
                  className="pl-10 bg-gray-100"
                  required
                />
              </div>
              <div className="flex justify-center gap-2 mb-2" onPaste={handlePaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => inputsRef.current[idx] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(e, idx)}
                    onKeyDown={e => handleKeyDown(e, idx)}
                    className="
                      w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl border-2 border-[#8CA566] rounded-lg
                      focus:outline-none focus:border-[#4C862D] transition
                      bg-gray-50
                    "
                    autoFocus={idx === activeIdx}
                  />
                ))}
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA566]" size={20} />
                <FloatingInput
                  label="New Password"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
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
              <Button
                type="submit"
                isActive={!loading && otp.every(d => d)}
                isLoading={loading}
                className="w-full"
              >
                Reset Password
              </Button>
            </form>
          )}
          <div className="mt-4 text-center text-xs text-gray-500">
            Remembered your password?{' '}
            <button
              className="text-[#8CA566] font-semibold hover:underline"
              onClick={() => onSwitch('login')}
              type="button"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;