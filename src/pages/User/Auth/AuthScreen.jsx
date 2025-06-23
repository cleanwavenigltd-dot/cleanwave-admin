import React, { useState } from 'react';
import Lottie from 'lottie-react';
import recycleAnimation from '../../../assets/recycle.json';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword'; // You can add this later

const AuthScreen = () => {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'forgot'

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
            Please log in or register to continue.
          </p>
        </div>
        {/* Auth Form Side */}
        <div className="flex-1 flex flex-col justify-center p-6 sm:p-8">
          {view === 'login' && <Login onSwitch={setView} />}
          {view === 'register' && <Register onSwitch={setView} />}
          {view === 'forgot' && <ForgotPassword onSwitch={setView} />}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;