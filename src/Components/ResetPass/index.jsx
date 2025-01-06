import React, { useRef, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const ResetPass = () => {
  const emailRef = useRef();
  const [message, setMessage] = useState("");

  const handleReset = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value.trim();

    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(
        `${apiUrl}/auth/request-password-reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("A password reset link has been sent to your email.");
      } else {
        setMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to send reset link. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          Reset Password
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Enter your email address to receive a reset link.
        </p>
        {message && (
          <div
            className={`text-center text-sm p-3 mb-4 rounded ${
              message.includes("sent")
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}>
            {message}
          </div>
        )}
        <form onSubmit={handleReset} className="space-y-4">
          <div className="w-full">
            <label htmlFor="email" className="block text-sm text-gray-500">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              placeholder="yourname@example.com"
              className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-150">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
