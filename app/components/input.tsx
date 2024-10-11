import { useState, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const { value = "", className = "", onFocus, onBlur } = props;

  return (
    <div className={`relative input-wrapper ${className}`}>
      <input
        {...props}
        onFocus={e => {
          setIsFocused(true);
          onFocus && onFocus(e);
        }}
        onBlur={e => {
          setIsFocused(e.target.value !== "");
          onBlur && onBlur(e);
        }}
        className={`peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent bg-transparent focus:outline-none focus:ring-0 focus:border-blue-600 ${
          isFocused ? "border-blue-600" : ""
        }`}
      />
      <label
        className={`absolute left-0 text-gray-500 transition-all transform ${
          isFocused || value
            ? "-translate-y-6 text-sm text-blue-600"
            : "translate-y-0 text-base"
        }`}
      >
        {props.placeholder}{" "}
      </label>
    </div>
  );
};
