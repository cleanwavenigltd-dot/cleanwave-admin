import React from 'react';

function FloatingInput({ label, type = 'text', value, onChange, name }) {
  return (
    <div className="relative w-full mb-6">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="peer h-12 w-full text-[14px] border border-gray-300 rounded-md px-3 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#8CA566] focus:border-[#8CA566] text-[10px]"
        placeholder={label}
        required
      />
      <label
        htmlFor={name}
        className="absolute left-3 -top-2 bg-white px-1 text-gray-500 text-[10px] transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-[#8CA566]"
      >
        {label}
      </label>
    </div>
  );
}

export default FloatingInput;
