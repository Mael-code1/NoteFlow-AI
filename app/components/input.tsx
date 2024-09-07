import React, { useState } from 'react';

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  className?: string;
}

export  const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative input-wrapper ${className}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== '')}
        className={`peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent bg-transparent focus:outline-none focus:ring-0 focus:border-blue-600 ${isFocused ? 'border-blue-600' : ''} `}
      />
      <label
        className={`absolute left-0 text-gray-500 transition-all transform ${isFocused || value ? "-translate-y-6 text-sm text-blue-600" : "translate-y-0 text-base"}`}
      >
        {label}
      </label>
    </div>
  );
};


