import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingInput from '../../../components/ui/FloatingInput';
import Button from '../../../components/ui/Button';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/auth/authSlice';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Email and password are required!');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address!');
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(loginUser(formData)).unwrap();
      toast.success('Login successful!');
      navigate('/dashboard'); // Navigate to the dashboard after login
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6 bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <FloatingInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <FloatingInput
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button
        type="submit"
        isActive={formData.email && formData.password}
        isLoading={isLoading}
        className="w-full"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
