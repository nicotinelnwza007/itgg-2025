"use client";

import React, { useState } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  type = "text",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="flex items-center border border-[#e2c9b1] rounded-md bg-[#f9eee3] px-3 py-2">
      {icon && <span className="text-[#8b5e3c] mr-2">{icon}</span>}
      <input
        {...props}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        className="w-full bg-transparent outline-none text-[#5e3c1b] placeholder-[#b98c68]"
      />
      {isPassword && (
        <span
          className="text-[#8b5e3c] ml-2 cursor-pointer select-none"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={0}
          role="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      )}
    </div>
  );
};

export default InputField;
