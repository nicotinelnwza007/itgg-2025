"use client";
import React, { useEffect, useState } from "react";
import { register } from "../actions";

function Page({ searchParams }: { searchParams: Promise<any> }) {
  const [isOldStudent, setIsOldStudent] = useState(false);
  const [isGateValid, setIsGateValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      const message = (await searchParams).message;
      setMessage(await message);
    }
    fetchMessage();
  }, [searchParams]);

  const gates = ['AND', 'OR', 'NOR', 'NOT'];

  const validatePasswords = (pass: string, confirmPass: string) => {
    if (confirmPass === "") {
      setPasswordsMatch(true); // Don't show error when confirm password is empty
      return;
    }
    setPasswordsMatch(pass === confirmPass);
  };

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
                value={password}
                placeholder="Password"
                className="w-full bg-transparent outline-none text-[#5e3c1b] placeholder-[#b98c68]"
                required
                onChange={(e) => {
                  const newPassword = e.target.value;
                  setPassword(newPassword);
                  validatePasswords(newPassword, confirmPassword);
                }}
              />
              <span
                className="text-[#8b5e3c] ml-2 cursor-pointer select-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <div className={`flex items-center border rounded-md bg-[#f9eee3] px-3 py-2 ${
              !passwordsMatch ? 'border-red-400' : 'border-[#e2c9b1]'
            }`}>
              <span className="text-[#8b5e3c] mr-2">🔒</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                className="w-full bg-transparent outline-none text-[#5e3c1b] placeholder-[#b98c68]"
                required
                onChange={(e) => {
                  const newConfirmPassword = e.target.value;
                  setConfirmPassword(newConfirmPassword);
                  validatePasswords(password, newConfirmPassword);
                }}
              />
              <span
                className="text-[#8b5e3c] ml-2 cursor-pointer select-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {!passwordsMatch && confirmPassword !== "" && (
              <div className="text-red-500 text-sm">
                Passwords do not match
              </div>
            )}

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
              disabled={!isGateValid || !passwordsMatch || password === "" || confirmPassword === ""}
              type="submit"
              className={`w-full font-semibold py-2 rounded-lg transition 
                ${(isGateValid && passwordsMatch && password !== "" && confirmPassword !== "") ? "bg-[#c27a44] hover:bg-[#a86438] text-white" : "bg-[#e2c9b1] text-[#8b5e3c] cursor-not-allowed"}`}
            >
              Submit
            </button>

            {message && (
              <div className="text-red-500 text-sm text-center">
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
