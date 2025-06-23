import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import notFoundAnimation from '../../../assets/404.json';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8faf5] px-2 py-6">
    <div className="w-full flex justify-center">
      <div className="w-48 sm:w-64 md:w-80 lg:w-96 mb-4">
        <Lottie animationData={notFoundAnimation} loop={true} />
      </div>
    </div>
    <h1 className="text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-[#222] text-center leading-tight">
      404 - Page Not Found
    </h1>
    <p className="text-xs xs:text-[10px] sm:text-base md:text-sm text-gray-500 mb-6 text-center max-w-xs sm:max-w-md">
      Sorry, the page you are looking for doesn&apos;t exist or has been moved.
      Please check the URL or return to the homepage.
    </p>
    <Link
      to="/home"
      className="px-4 py-2 sm:px-6 sm:py-2 bg-[#8CA566] text-white rounded-full font-semibold shadow hover:bg-[#6d8f3c] transition text-sm sm:text-base"
    >
      Go to Home
    </Link>
  </div>
);

export default NotFound;