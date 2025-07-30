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
  const [emailError, setEmailError] = useState(""); // เพิ่ม state เก็บ error email

  useEffect(() => {
    const fetchMessage = async () => {
      const message = (await searchParams).message;
      setMessage(await message);
    };
    fetchMessage();
  }, [searchParams]);

  const gates = ["AND", "OR", "NOR", "NOT"];

  const validatePasswords = (pass: string, confirmPass: string) => {
    if (confirmPass === "") {
      setPasswordsMatch(true);
      return;
    }
    setPasswordsMatch(pass === confirmPass);
  };

  // ฟังก์ชันตรวจสอบ email ว่าเป็น email สถาบันหรือไม่
  const validateEmail = (value: string) => {
    const emailPart = value.split("@")[0];
    if (emailPart.startsWith("6")) {
      if (emailPart.startsWith("67") || emailPart.startsWith("68")) {
        setIsOldStudent(false);
        setIsGateValid(true);
        setEmailError("");
      } else if (!emailPart.startsWith("69")) {
        setIsOldStudent(true);
        setIsGateValid(false);
        setEmailError("");
      }
      else {
        setIsOldStudent(false);
        setIsGateValid(false);
        setEmailError("รหัสนักศึกษาไม่ถูกต้อง");
      }
       } else{
      setIsOldStudent(false);
      setIsGateValid(false);
     }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-[url('/background.png')] bg-cover bg-center relative px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-[#fff7ef]/90 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 md:p-10 lg:p-12 space-y-8 z-10">
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#5e3c1b] drop-shadow-md">
            Register
          </h1>
          <p className="text-sm sm:text-base text-[#8b5e3c] text-center">
            กรุณาใช้ Email ของสถาบันในการสมัครเท่านั้น
          </p>
        </div>

        <form className="space-y-4 sm:space-y-5" action={register}>
          <Input icon="👤" name="nickname" placeholder="Enter your Nickname" />

          <Input
            icon="📧"
            name="email"
            placeholder="Enter your email"
            type="email"
            onChange={(e: any) => {
              const value = e.target.value.toLowerCase();
              validateEmail(value);
            }}
          />
          {/* แสดงข้อความ error email */}
          {emailError && (
            <div className="text-red-500 text-sm">{emailError}</div>
          )}

          <PasswordInput
            name="password"
            placeholder="Password"
            value={password}
            show={showPassword}
            toggleShow={() => setShowPassword(!showPassword)}
            onChange={(e: any) => {
              const newPass = e.target.value;
              setPassword(newPass);
              validatePasswords(newPass, confirmPassword);
            }}
          />

          <PasswordInput
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            show={showConfirmPassword}
            toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
            onChange={(e: any) => {
              const newConfirm = e.target.value;
              setConfirmPassword(newConfirm);
              validatePasswords(password, newConfirm);
            }}
            invalid={!passwordsMatch}
          />

          {!passwordsMatch && confirmPassword !== "" && (
            <div className="text-red-500 text-sm">Passwords do not match</div>
          )}

          {isOldStudent && (
            <Input
              icon="🛡️"
              name="gate"
              placeholder="Enter your gate"
              onChange={(e: any) => {
                const value = e.target.value.toUpperCase();
                setIsGateValid(gates.includes(value));
              }}
            />
          )}

          <button
            disabled={
              !isGateValid ||
              !passwordsMatch ||
              password === "" ||
              confirmPassword === "" ||
              emailError !== ""
            }
            type="submit"
            className={`w-full font-semibold py-3 rounded-xl transition text-lg shadow-md ${
              !isGateValid ||
              !passwordsMatch ||
              password === "" ||
              confirmPassword === "" ||
              emailError !== ""
                ? "bg-[#e2c9b1] text-[#8b5e3c] cursor-not-allowed"
                : "bg-[#c27a44] hover:bg-[#a86438] text-white"
            }`}
          >
            Submit
          </button>

          {message && (
            <div className="text-red-500 text-sm text-center">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
}

function Input({ icon, name, placeholder, type = "text", onChange }: any) {
  return (
    <div className="flex items-center border border-[#e2c9b1] rounded-lg bg-[#f9eee3] px-4 py-3 text-base sm:text-lg">
      <span className="text-[#8b5e3c] mr-3">{icon}</span>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-[#5e3c1b] placeholder-[#b98c68]"
        required
      />
    </div>
  );
}

function PasswordInput({
  name,
  placeholder,
  value,
  show,
  toggleShow,
  onChange,
  invalid = false,
}: any) {
  return (
    <div
      className={`flex items-center border rounded-lg bg-[#f9eee3] px-4 py-3 text-base sm:text-lg ${
        invalid ? "border-red-400" : "border-[#e2c9b1]"
      }`}
    >
      <span className="text-[#8b5e3c] mr-3">🔒</span>
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-[#5e3c1b] placeholder-[#b98c68]"
        required
      />
      <span
        className="text-[#8b5e3c] ml-3 cursor-pointer select-none"
        onClick={toggleShow}
      >
        {show ? "🙈" : "👁️"}
      </span>
    </div>
  );
}

export default Page;
