// src/pages/admin/EditArticle.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    nama_buku: "",        // judul artikel
    nama_penulis: "",     // penulis
    isi_articles: "",     // isi artikel
    foto_buku: null,      // file baru (jika diganti)
    foto_buku_lama: "",   // nama file lama (agar backend tidak hapus)
  });

  // Fetch data artikel saat komponen mount
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem("admin_token");

        const res = await axios.get(`/api/articles/get.php?id=${id}`, {
          headers: { "X-Auth-Token": token || "" },
        });

        const article = res.data.data;

        if (!article) {
          throw new Error("Artikel tidak ditemukan.");
        }

        setForm({
          nama_buku: article.nama_buku || "",
          nama_penulis: article.nama_penulis || "",
          isi_articles: article.isi_articles || "",
          foto_buku: null,
          foto_buku_lama: article.foto_buku || "",
        });
      } catch (err) {
        console.error("Gagal fetch artikel:", err);
        setErrorMsg("Gagal memuat data artikel. Pastikan ID valid dan API berjalan.");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchArticle();
  }, [id]);

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

    // Field teks
    data.append("nama_buku", form.nama_buku || "");
    data.append("nama_penulis", form.nama_penulis || "");
    data.append("isi_articles", form.isi_articles || "");

    // File baru (jika user mengganti gambar)
    if (form.foto_buku instanceof File) {
      data.append("foto_buku", form.foto_buku);
    }

    // Kirim nama file lama agar backend tahu tidak perlu dihapus
    if (form.foto_buku_lama) {
      data.append("foto_buku_lama", form.foto_buku_lama);
    }

    // ID artikel (wajib!)
    data.append("id", id);

    try {
      const token = localStorage.getItem("admin_token");

      await axios.post("/api/articles/update.php", data, {
        headers: {
          "X-Auth-Token": token || "",
        },
      });

      alert("Artikel berhasil diperbarui!");
      navigate("/admin"); // sesuaikan dengan route list artikelmu
    } catch (err) {
      console.error("Error update artikel:", err.response || err);
      const msg =
        err.response?.data?.message ||
        "Terjadi kesalahan saat menyimpan artikel.";
      setErrorMsg("Gagal update artikel: " + msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-[#3d2269]">
          Memuat artikel...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#3d2269] mb-8">
          Edit Artikel
        </h1>

        {/* Error Message */}
        {errorMsg && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
            role="alert"
          >
            <span className="block sm:inline">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Judul Artikel */}
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
              placeholder="Judul artikel"
            />
          </div>

          {/* Penulis */}
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

          {/* Gambar Cover Saat Ini + Upload Baru */}
          <div>
            <label
              htmlFor="foto_buku"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Gambar Cover Artikel
            </label>

            {form.foto_buku_lama && (
              <div className="mb-4">
                <img
                  src={`/uploads/articles/${form.foto_buku_lama}`}
                  alt="Cover artikel"
                  className="w-48 h-64 object-cover rounded border shadow"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Cover saat ini: <strong>{form.foto_buku_lama}</strong>
                </p>
              </div>
            )}

            <input
              type="file"
              id="foto_buku"
              name="foto_buku"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#3d2269] file:text-white hover:file:bg-[#2d1850]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Biarkan kosong jika tidak ingin mengganti gambar
            </p>
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
              rows="14"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3d2269] focus:outline-none resize-none"
              placeholder="Tulis isi artikel di sini..."
            />
          </div>

          {/* Tombol */}
          <div className="md:col-span-2 flex gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-[#3d2269] text-white font-bold rounded-lg hover:bg-[#2d1850] disabled:opacity-70 disabled:cursor-not-allowed transition shadow-lg"
            >
              {loading ? "Menyimpan..." : "UPDATE ARTIKEL"}
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

export default EditArticle;