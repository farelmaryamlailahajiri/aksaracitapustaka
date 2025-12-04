// src/components/LoginModal.jsx (VERSI DIPERBAIKI)
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // PERBAIKAN: Gunakan /api/auth/login.php (dengan slash di depan) 
      // agar Vite proxy dapat menangkapnya dengan benar dari root.
      const response = await axios.post(
        "/api/auth/login.php", 
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        localStorage.setItem("admin_token", response.data.token);
        localStorage.setItem("isLoggedIn", "true");

        onClose(); // tutup modal
        navigate("/admin"); 
      }
    } catch (err) {
      console.error("Login error:", err.response || err);
      // Menangani error HTTP 401 atau error jaringan lainnya
      setError(
        err.response?.data?.message ||
          "Login gagal. Pastikan server backend berjalan dan kredensial benar."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-light"
        >
          ×
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-[#3d2269]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6-6v4h12V11a6 6 0 00-12 0z M12 11V9a3 3 0 00-6 0v2h6z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#3d2269]">Login Admin</h2>
          <p className="text-gray-600 mt-2">Aksara Cita Pustaka</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            {/* PERBAIKAN: Tambahkan htmlFor untuk aksesibilitas */}
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username" // <-- Ditambahkan ID
              name="username" // <-- Ditambahkan NAME
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d2269]"
              placeholder="aksaraadmin"
              required
            />
          </div>

          <div>
            {/* PERBAIKAN: Tambahkan htmlFor untuk aksesibilitas */}
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password" // <-- Ditambahkan ID
              name="password" // <-- Ditambahkan NAME
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d2269]"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#3d2269] hover:bg-[#2d1850] text-white font-bold text-lg rounded-lg transition disabled:opacity-70"
          >
            {loading ? "Memproses..." : "MASUK"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;