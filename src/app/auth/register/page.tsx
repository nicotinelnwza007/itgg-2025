"use client";
import React, { useState } from "react";
import { register } from "../actions";

function Page() {
  const [isOldStudent, setIsOldStudent] = useState(false);
  const [isGateValid, setIsGateValid] = useState(false);
  const gates = ['AND', 'OR', 'NOR', 'NOT'];

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        action={register}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700"
            >
              Nickname
            </label>
            <input
              type="text"
              name="nickname"
              id="nickname"
              placeholder="Enter your nickname"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => {
                const value = e.target.value.toLowerCase();
                const emailPart = value.split('@')[0];
                if (emailPart.startsWith('6')) {
                  // 67 or 68 -> new student
                  if (emailPart.startsWith('67') || emailPart.startsWith('68')) {
                    setIsOldStudent(false);
                    setIsGateValid(true);
                  }
                  // 66 or lower -> old student  
                  else {
                    setIsOldStudent(true);
                  }
                }
              }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {isOldStudent && (
            <div>
              <label
                htmlFor="gate"
                className="block text-sm font-medium text-gray-700"
              >
                Gate
              </label>
              <input
                type="text"
                name="gate"
                id="gate"
                placeholder="Enter your gate"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  if (gates.includes(value)) {
                    setIsGateValid(true);
                  } else {
                    setIsGateValid(false);
                  }
                }}
              />
            </div>
          )}

          <button
            disabled={!isGateValid}
            type="submit"
            className="disabled:opacity-50 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
