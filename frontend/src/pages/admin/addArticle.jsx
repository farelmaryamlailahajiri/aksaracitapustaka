// src/pages/admin/AddArticle.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddArticle = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    nama_buku: "",        // judul artikel
    nama_penulis: "",     // penulis artikel
    isi_articles: "",     // isi artikel (bisa panjang)
    foto_buku: null,      // file gambar cover
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMsg("");

    const data = new FormData();

    // Append semua field (termasuk yang kosong, supaya backend bisa tangkap)
    data.append("nama_buku", form.nama_buku || "");
    data.append("nama_penulis", form.nama_penulis || "");
    data.append("isi_articles", form.isi_articles || "");

    // Append file hanya jika ada
    if (form.foto_buku instanceof File) {
      data.append("foto_buku", form.foto_buku);
    }

    try {
      const token = localStorage.getItem("admin_token");

      await axios.post("/api/articles/create.php", data, {
        headers: {
          "X-Auth-Token": token || "",
          // Axios otomatis set Content-Type multipart/form-data dengan boundary
        },
      });

      alert("Artikel berhasil ditambahkan!");
      navigate("/admin"); // sesuaikan dengan route list artikelmu
    } catch (err) {
      console.error("Error tambah artikel:", err.response || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Terjadi kesalahan pada server.";
      setErrorMsg("Gagal menambah artikel: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#3d2269] mb-8">
          Tambah Artikel Baru
        </h1>

        {/* Error Message */}
        {errorMsg && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <span className="block sm:inline">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Judul Artikel (wajib) */}
          <div className="md:col-span-2">
            <label
              htmlFor="nama_buku"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Judul Artikel <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nama_buku"
              name="nama_buku"
              value={form.nama_buku}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3d2269] focus:outline-none"
              placeholder="Masukkan judul artikel"
            />
          </div>

          {/* Penulis (wajib) */}
          <div>
            <label
              htmlFor="nama_penulis"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Penulis <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nama_penulis"
              name="nama_penulis"
              value={form.nama_penulis}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3d2269] focus:outline-none"
              placeholder="Nama penulis"
            />
          </div>

          {/* Gambar Cover (opsional) */}
          <div>
            <label
              htmlFor="foto_buku"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Gambar Cover Artikel (JPG/PNG/WebP/GIF)
            </label>
            <input
              type="file"
              id="foto_buku"
              name="foto_buku"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#3d2269] file:text-white hover:file:bg-[#2d1850]"
            />
          </div>

          {/* Isi Artikel */}
          <div className="md:col-span-2">
            <label
              htmlFor="isi_articles"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Isi Artikel
            </label>
            <textarea
              id="isi_articles"
              name="isi_articles"
              value={form.isi_articles}
              onChange={handleChange}
              rows="12"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3d2269] focus:outline-none resize-none"
              placeholder="Tulis isi artikel di sini... (boleh kosong)"
            />
          </div>

          {/* Tombol */}
          <div className="md:col-span-2 flex gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-[#3d2269] text-white font-bold rounded-lg hover:bg-[#2d1850] disabled:opacity-70 disabled:cursor-not-allowed transition shadow-lg"
            >
              {loading ? "Menyimpan..." : "SIMPAN ARTIKEL"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-10 py-4 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition shadow-lg"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;