import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fadeIn"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;