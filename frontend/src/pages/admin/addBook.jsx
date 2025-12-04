// src/pages/admin/AddBook.jsx (VERSI FINAL YANG DISESUAIKAN)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(''); // Tambahkan state untuk error

  const [form, setForm] = useState({
    nama_buku: "",
    nama_penulis: "",
    nama_tata_letak: "",
    nama_editor: "",
    isbn: "",
    jumlah_halaman: "",
    ukuran_buku: "",
    deskripsi_buku: "",
    harga_buku: "",
    tahun_terbit: "",
    foto_buku: null,
    preview_pdf: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    setForm((prev) => ({
      ...prev,
      // Perbaikan: Gunakan File object jika ada, jika tidak gunakan value
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMsg(''); // Reset error

    const data = new FormData();
    
    // Logika append yang lebih aman dan eksplisit
    Object.keys(form).forEach((key) => {
      const value = form[key];
      
      // Khusus untuk File (pastikan nilainya adalah objek File)
      if (key === 'foto_buku' || key === 'preview_pdf') {
        if (value instanceof File) {
          data.append(key, value);
        }
      } 
      // Untuk field teks (append bahkan jika kosong agar PHP bisa menangkapnya)
      else if (value !== null && value !== undefined) {
        data.append(key, value);
      }
    });

    try {
      const token = localStorage.getItem("admin_token");
      
      const response = await axios.post("/api/books/create.php", data, {
        headers: {
          "X-Auth-Token": token || "",
        },
      });

      alert("Buku berhasil ditambahkan!");
      navigate("/admin");

    } catch (err) {
      console.error("Error tambah buku:", err.response || err);
      const msg = err.response?.data?.message || "Terjadi kesalahan pada server.";
      setErrorMsg("Gagal tambah buku: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#3d2269] mb-8">
          Tambah Buku Baru
        </h1>
        
        {/* Tampilkan Error Message */}
        {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                <span className="block sm:inline">{errorMsg}</span>
            </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* === FIELD WAJIB === */}
          <div>
            <label htmlFor="nama_buku" className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Buku <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nama_buku"
              name="nama_buku"
              value={form.nama_buku}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3d2269] focus:outline-none"
              placeholder="Judul Buku"
            />
          </div>

          <div>
            <label htmlFor="nama_penulis" className="block text-sm font-semibold text-gray-700 mb-2">
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
              placeholder="Nama Penulis"
            />
          </div>

          {/* === FIELD OPSIONAL === */}
          <div>
            <label htmlFor="nama_tata_letak" className="block text-sm font-semibold text-gray-700 mb-2">
              Tata Letak
            </label>
            <input
              type="text"
              id="nama_tata_letak"
              name="nama_tata_letak"
              value={form.nama_tata_letak}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none"
              placeholder="Desainer Tata Letak"
            />
          </div>

          <div>
            <label htmlFor="nama_editor" className="block text-sm font-semibold text-gray-700 mb-2">
              Editor
            </label>
            <input
              type="text"
              id="nama_editor"
              name="nama_editor"
              value={form.nama_editor}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none"
              placeholder="Nama Editor"
            />
          </div>

          <div>
            <label htmlFor="isbn" className="block text-sm font-semibold text-gray-700 mb-2">
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={form.isbn}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none"
              placeholder="978-602-xxxxx-xx-x"
            />
          </div>

          <div>
            <label htmlFor="jumlah_halaman" className="block text-sm font-semibold text-gray-700 mb-2">
              Jumlah Halaman
            </label>
            <input
              type="number"
              id="jumlah_halaman"
              name="jumlah_halaman"
              value={form.jumlah_halaman}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none"
              placeholder="0"
            />
          </div>

          <div>
            <label htmlFor="ukuran_buku" className="block text-sm font-semibold text-gray-700 mb-2">
              Ukuran Buku (contoh: 15x23 cm)
            </label>
            <input
              type="text"
              id="ukuran_buku"
              name="ukuran_buku"
              value={form.ukuran_buku}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none"
              placeholder="15x23 cm"
            />
          </div>

          <div>
            <label htmlFor="harga_buku" className="block text-sm font-semibold text-gray-700 mb-2">
              Harga (Rp)
            </label>
            <input
              type="number"
              id="harga_buku"
              name="harga_buku"
              value={form.harga_buku}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none"
              placeholder="0"
            />
          </div>

          <div>
            <label htmlFor="tahun_terbit" className="block text-sm font-semibold text-gray-700 mb-2">
              Tahun Terbit
            </label>
            <input
              type="number"
              id="tahun_terbit"
              name="tahun_terbit"
              value={form.tahun_terbit}
              onChange={handleChange}
              min="1900"
              max="2099"
              placeholder="2025"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none"
            />
          </div>

          {/* INPUT FILE */}
          <div>
            <label htmlFor="foto_buku" className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Buku (JPG/PNG/WebP)
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

          <div>
            <label htmlFor="preview_pdf" className="block text-sm font-semibold text-gray-700 mb-2">
              Preview PDF
            </label>
            <input
              type="file"
              id="preview_pdf"
              name="preview_pdf"
              accept=".pdf"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#3d2269] file:text-white hover:file:bg-[#2d1850]"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="deskripsi_buku" className="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi Buku
            </label>
            <textarea
              id="deskripsi_buku"
              name="deskripsi_buku"
              value={form.deskripsi_buku}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3d2269] focus:outline-none resize-none"
              placeholder="Ceritakan tentang buku ini..."
            />
          </div>

          {/* TOMBOL */}
          <div className="md:col-span-2 flex gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-[#3d2269] text-white font-bold rounded-lg hover:bg-[#2d1850] disabled:opacity-70 disabled:cursor-not-allowed transition shadow-lg"
            >
              {loading ? "Menyimpan..." : "SIMPAN BUKU"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
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

export default AddBook;