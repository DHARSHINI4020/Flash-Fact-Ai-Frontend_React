// src/pages/Profile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.info("Logged out successfully!");
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>
      <p className="mb-2"><strong>Username:</strong> {user.username}</p>
      <p className="mb-4"><strong>Saved Articles:</strong> {savedArticles.length}</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
