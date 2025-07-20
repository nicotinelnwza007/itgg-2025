"use client";
import React, { useState } from "react";
import { register } from "../actions";

function Page() {
  const [isOldStudent, setIsOldStudent] = useState(false);
  const [isGateValid, setIsGateValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const gates = ['AND', 'OR', 'NOR', 'NOT'];

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center px-4">
        <div className="bg-[#fff7ef] rounded-2xl shadow-lg w-full max-w-sm p-8 space-y-6">

          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-2xl font-bold text-[#5e3c1b]">Register</h1>
          </div>

          <form className="space-y-4" action={register}>
            <div className="flex items-center border border-[#e2c9b1] rounded-md bg-[#f9eee3] px-3 py-2">
              <span className="text-[#8b5e3c] mr-2">👤</span>
              <input
                type="text"
                name="nickname"
                id="nickname"
                placeholder="Enter your Nickname"
                className="w-full bg-transparent outline-none text-[#5e3c1b] placeholder-[#b98c68]"
                required
              />
            </div>

            <div className="flex items-center border border-[#e2c9b1] rounded-md bg-[#f9eee3] px-3 py-2">
              <span className="text-[#8b5e3c] mr-2">📧</span>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-[#5e3c1b] placeholder-[#b98c68]"
                required
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();
                  const emailPart = value.split('@')[0];
                  if (emailPart.startsWith('6')) {
                    if (emailPart.startsWith('67') || emailPart.startsWith('68')) {
                      setIsOldStudent(false);
                      setIsGateValid(true);
                    } else {
                      setIsOldStudent(true);
                      setIsGateValid(false);
                    }
                  } else {
                    setIsOldStudent(false);
                    setIsGateValid(false);
                  }
                }}
              />
            </div>
            <div className="flex items-center border border-[#e2c9b1] rounded-md bg-[#f9eee3] px-3 py-2">
              <span className="text-[#8b5e3c] mr-2">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full bg-transparent outline-none text-[#5e3c1b] placeholder-[#b98c68]"
                required
              />
              <span
                className="text-[#8b5e3c] ml-2 cursor-pointer select-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {isOldStudent && (
              <div className="flex items-center border border-[#e2c9b1] rounded-md bg-[#f9eee3] px-3 py-2">
                <span className="text-[#8b5e3c] mr-2">🛡️</span>
                <input
                  type="text"
                  name="gate"
                  id="gate"
                  placeholder="Enter your gate"
                  className="w-full bg-transparent outline-none text-[#5e3c1b] placeholder-[#b98c68]"
                  required
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    setIsGateValid(gates.includes(value));
                  }}
                />
              </div>
            )}

            <button
              disabled={!isGateValid}
              type="submit"
              className={`w-full font-semibold py-2 rounded-lg transition 
                ${isGateValid ? "bg-[#c27a44] hover:bg-[#a86438] text-white" : "bg-[#e2c9b1] text-[#8b5e3c] cursor-not-allowed"}`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
