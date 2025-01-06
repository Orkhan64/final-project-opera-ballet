import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const NewPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState(""); 
  const [message, setMessage] = useState("");

  const handleReset = async (event) => {
    event.preventDefault();
    const token = searchParams.get("token");

    if (!token) {
      setMessage("Invalid or expired reset link.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch(
        `${apiUrl}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, username, newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Password successfully reset!");
        setTimeout(() => navigate("/sign-in"), 2000);
      } else {
        setMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to reset password. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          Create New Password
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Enter a strong new password to reset your account.
        </p>
        {message && (
          <div
            className={`text-center text-sm p-3 mb-4 rounded ${
              message.includes("success")
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}>
            {message}
          </div>
        )}
        <form onSubmit={handleReset} className="space-y-4">
          <div className="w-full">
            <label htmlFor="username" className="block text-sm text-gray-500">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="newPassword"
              className="block text-sm text-gray-500">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="6+ strong characters"
              className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-150">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
