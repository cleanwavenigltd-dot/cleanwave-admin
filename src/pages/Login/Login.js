import React from 'react';
import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col justify-center space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
        <p className="text-sm text-gray-600">Please enter your credentials to proceed.</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
