import React, { useState, useRef, useEffect } from 'react';
import { FiMail, FiClock, FiCheckCircle } from 'react-icons/fi';
import Button from '../../../components/ui/Button';
import { verifyEmail } from '../../../services/authService';

const OTP_LENGTH = 5;
const TIMER_SECONDS = 240; // 4 minutes

const VerifyEmail = ({ email, onVerified, onResend, onBack }) => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [activeIdx, setActiveIdx] = useState(0);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const inputsRef = useRef([]);

  // Timer effect
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Focus next input on change
  useEffect(() => {
    if (inputsRef.current[activeIdx]) {
      inputsRef.current[activeIdx].focus();
    }
  }, [activeIdx]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await verifyEmail({ email, code: otp.join('') });
      setSuccess('Email verified successfully!');
      setTimeout(() => onVerified && onVerified(), 1200);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Verification failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (onResend) onResend();
    setTimer(TIMER_SECONDS);
    setOtp(Array(OTP_LENGTH).fill(''));
    setActiveIdx(0);
    setError('');
    setSuccess('');
  };

  // Format timer mm:ss
  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

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
            <FiMail size={40} className="text-[#8CA566] mb-2" />
            <h1 className="text-lg sm:text-xl font-bold text-[#8CA566] mb-1 text-center">
              Verify Your Email
            </h1>
            <span className="text-gray-500 text-xs sm:text-sm text-center">
              Enter the 5-digit code sent to <span className="font-semibold">{email}</span>
            </span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs sm:text-sm text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 text-green-700 px-3 py-2 rounded text-xs sm:text-sm text-center flex items-center justify-center gap-2">
                <FiCheckCircle /> {success}
              </div>
            )}
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
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 mb-2">
              <FiClock />
              <span>
                {timer > 0
                  ? `Code expires in ${formatTime(timer)}`
                  : 'Code expired'}
              </span>
            </div>
            <Button
              type="submit"
              isActive={!loading && otp.every(d => d)}
              isLoading={loading}
              className="w-full"
              disabled={timer === 0}
            >
              Verify Email
            </Button>
          </form>
          <div className="mt-4 text-center text-xs text-gray-500">
            Didn&apos;t receive the code?{' '}
            <button
              className="text-[#8CA566] font-semibold hover:underline"
              onClick={handleResend}
              type="button"
              disabled={timer === 0}
            >
              Resend Code
            </button>
          </div>
          <div className="mt-2 text-center text-xs">
            <button
              className="text-[#8CA566] hover:underline"
              onClick={onBack}
              type="button"
            >
              Back to Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;