import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../../../components/ui/FloatingInput";
import Button from "../../../components/ui/Button";
import { useDispatch } from "react-redux";
import { loginWaste, fetchWasteProfile } from "../../../redux/auth/authSlice";
import { toast } from "react-toastify";

const WasteLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      // toast.error("Email and password are required!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // toast.error("Please enter a valid email address!");
      return;
    }
    // if (formData.email === "mmdmuazu@gmail.com") {
    //   // console.log(formData)
    //   setIsLoading(true);
    //   // onSwitch('/waste/dashboard')
    //   document.location.href = "/waste/dashboard";
    // }

    setIsLoading(true);
    // document.location.href = '/waste/dashboard'
    try {
      await dispatch(
        loginWaste({ email: formData.email, password: formData.password })
      ).unwrap();

      // toast.success('Waste login successful!');
      // navigate('waste/dashboard');
      document.location.href = "/waste/dashboard";
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <h1 className="text-xl sm:text-2xl font-bold text-[#8CA566] mb-1 text-center">
        Cleanwave Recycling Nigeria Limited {error}
      </h1>
      <h2 className="text-xl text-gray-800 text-center">Waste Bank Login</h2>
      <FloatingInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <FloatingInput
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
      />
      <Button
        type="submit"
        isActive={formData.email && formData.password}
        isLoading={isLoading}
        className="w-full bg-[#8CA566] text-white hover:bg-[#779254] transition"
      >
        Login
      </Button>
      <div className="mt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Cleanwave Recycling Nigeria Limited.
        All rights reserved.
      </div>
    </form>
  );
};

export default WasteLogin;
