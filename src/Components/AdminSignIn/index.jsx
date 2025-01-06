import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const AdminSignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleAdminLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", "admin");

        const adminUrl = `http://localhost:5174/?token=${data.token}`;
        window.open(adminUrl, "_blank");
      } else {
        setErrorMessage("Geçersiz kullanıcı adı veya şifre.");
      }
    } catch (error) {
      setErrorMessage("Sunucu bağlantısı hatası.");
    }
  };

  return (
    <div className="w-full h-[600px] mx-auto w-1/4 min-w-60 flex items-center justify-center flex-col">
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold">Admin Giriş</h1>
      </div>

      {errorMessage && (
        <div className="w-full p-3 bg-red-500 text-white text-center mb-4 rounded-lg">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleAdminLogin} className="w-full space-y-5">
        <div className="w-full">
          <label className="text-gray-500 text-sm" htmlFor="userName">
            Kullanıcı Adı
          </label>
          <input
            type="text"
            id="userName"
            className="w-full text-sm text-black py-3 border-b-2 border-gray-300"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="admin"
          />
        </div>

        <div className="w-full">
          <label className="text-black text-sm" htmlFor="password">
            Şifre
          </label>
          <input
            type="password"
            id="password"
            className="w-full text-sm py-3 border-b-2 text-black border-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="adminPassword"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AdminSignIn;
