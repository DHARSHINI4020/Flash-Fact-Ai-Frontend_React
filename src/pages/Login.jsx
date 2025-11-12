// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 🧩 Basic Validation
    if (!username.trim() || !password.trim()) {
      toast.error("Please enter both username and password");
      return;
    }

    // ✅ Mock authentication (can replace with real API later)
    if (password.length < 4) {
      toast.error("Password must be at least 4 characters long");
      return;
    }

    // Store locally for session simulation
    localStorage.setItem("user", JSON.stringify({ username }));

    toast.success(`Welcome back, ${username}!`);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 w-80 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
          User Login
        </h2>

        {/* Username Field */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
