import React from 'react';

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  isActive = true,
  isLoading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={!isActive || isLoading}
      className={`${
        isActive
          ? "bg-[#8CA566] hover:bg-[#4C862D] text-white"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      } font-medium py-2 px-4 rounded-lg transition-all ${className} ${
        isLoading ? "opacity-75" : ""
      }`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
