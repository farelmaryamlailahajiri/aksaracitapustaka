import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

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
    foto_buku_lama: "",
    preview_pdf_lama: "",
  });

  // Ambil data buku saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        // 🔥 MEMANGGIL get.php DENGAN ID
        const res = await axios.get(`/api/books/get.php?id=${id}`, {
          headers: { "X-Auth-Token": token || "" },
        });

        // 🔥 MENGAKSES DATA DARI res.data.data
        const book = res.data.data;

        // Pastikan 'book' adalah objek dan bukan array kosong
        if (!book || Array.isArray(book)) {
            throw new Error("Data buku tidak ditemukan atau format salah.");
        }

        setForm({
          nama_buku: book.nama_buku || "",
          nama_penulis: book.nama_penulis || "",
          nama_tata_letak: book.nama_tata_letak || "",
          nama_editor: book.nama_editor || "",
          isbn: book.isbn || "",
          // Konversi ke string untuk input type="number"
          jumlah_halaman: String(book.jumlah_halaman || ""), 
          ukuran_buku: book.ukuran_buku || "",
          deskripsi_buku: book.deskripsi_buku || "",
          // Konversi ke string untuk input type="number"
          harga_buku: String(book.harga_buku || ""), 
          // Konversi ke string untuk input type="number"
          tahun_terbit: String(book.tahun_terbit || ""), 
          foto_buku: null,
          preview_pdf: null,
          foto_buku_lama: book.foto_buku || "",
          preview_pdf_lama: book.preview_pdf || "",
        });
      } catch (err) {
        console.error("Gagal fetch data buku:", err.response?.data?.message || err.message || err);
        setErrorMsg("Gagal memuat data buku. Pastikan API get.php?id=... berjalan.");
      } finally {
        setFetching(false);
      }
    };

    fetchBook();
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

    Object.keys(form).forEach((key) => {
      const value = form[key];

      // File baru (jika user mengganti)
      if ((key === "foto_buku" || key === "preview_pdf") && value instanceof File) {
        data.append(key, value);
      }
      // File lama (kirim nama file yang sudah ada agar backend tahu tidak usah dihapus)
      else if (key === "foto_buku_lama" || key === "preview_pdf_lama") {
        if (value) data.append(key, value);
      }
      // Field teks / angka
      else if (value !== null && value !== undefined && key !== "foto_buku" && key !== "preview_pdf") {
        data.append(key, value);
      }
    });

    data.append("id", id); // Selalu kirim ID buku

    try {
      const token = localStorage.getItem("admin_token");
      // MEMANGGIL update.php UNTUK SIMPAN
      await axios.post("/api/books/update.php", data, {
        headers: {
          "X-Auth-Token": token || "",
        },
      });

      alert("Buku berhasil diperbarui!");
      navigate("/admin");
    } catch (err) {
      console.error("Error update buku:", err.response || err);
      const msg = err.response?.data?.message || "Terjadi kesalahan pada server.";
      setErrorMsg("Gagal memperbarui buku: " + msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-[#3d2269]">Memuat data buku...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#3d2269] mb-8">Edit Buku</h1>

        {errorMsg && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
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

          {/* === FIELD OPSIONAL (diperpendek) === */}
          {/* ... (input fields lainnya seperti tata letak, editor, isbn, halaman, ukuran) ... */}
           <div>
            <label htmlFor="nama_tata_letak" className="block text-sm font-semibold text-gray-700 mb-2"> Tata Letak </label>
            <input type="text" id="nama_tata_letak" name="nama_tata_letak" value={form.nama_tata_letak} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:outline-none" />
          </div>
          <div>
            <label htmlFor="nama_editor" className="block text-sm font-semibold text-gray-700 mb-2"> Editor </label>
            <input type="text" id="nama_editor" name="nama_editor" value={form.nama_editor} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:outline-none" />
          </div>
          <div>
            <label htmlFor="isbn" className="block text-sm font-semibold text-gray-700 mb-2"> ISBN </label>
            <input type="text" id="isbn" name="isbn" value={form.isbn} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:outline-none" />
          </div>
          <div>
            <label htmlFor="jumlah_halaman" className="block text-sm font-semibold text-gray-700 mb-2"> Jumlah Halaman </label>
            <input type="number" id="jumlah_halaman" name="jumlah_halaman" value={form.jumlah_halaman} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:outline-none" />
          </div>
          <div>
            <label htmlFor="ukuran_buku" className="block text-sm font-semibold text-gray-700 mb-2"> Ukuran Buku </label>
            <input type="text" id="ukuran_buku" name="ukuran_buku" value={form.ukuran_buku} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:outline-none" placeholder="15x23 cm" />
          </div>
          <div>
            <label htmlFor="harga_buku" className="block text-sm font-semibold text-gray-700 mb-2"> Harga (Rp) </label>
            <input type="number" id="harga_buku" name="harga_buku" value={form.harga_buku} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:outline-none" />
          </div>
          <div>
            <label htmlFor="tahun_terbit" className="block text-sm font-semibold text-gray-700 mb-2"> Tahun Terbit </label>
            <input type="number" id="tahun_terbit" name="tahun_terbit" value={form.tahun_terbit} onChange={handleChange} min="1900" max="2099" className="w-full px-4 py-3 border rounded-lg focus:outline-none" />
          </div>

          {/* FILE COVER */}
          <div>
            <label htmlFor="foto_buku" className="block text-sm font-semibold text-gray-700 mb-2">Cover Buku (JPG/PNG/WebP)</label>
            {form.foto_buku_lama && (
              <div className="mb-3">
                {/* Asumsi: URL /uploads/ dapat diakses dari frontend */}
                <img src={`/uploads/${form.foto_buku_lama}`} alt="Cover saat ini" className="w-32 h-48 object-cover rounded border" />
                <p className="text-xs text-gray-500 mt-1">Cover saat ini: **{form.foto_buku_lama}**</p>
              </div>
            )}
            <input type="file" id="foto_buku" name="foto_buku" accept="image/*" onChange={handleChange} className="w-full px-4 py-3 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#3d2269] file:text-white hover:file:bg-[#2d1850]" />
            <p className="text-xs text-gray-500 mt-1">Biarkan kosong jika tidak ingin mengganti cover</p>
          </div>

          {/* FILE PREVIEW PDF */}
          <div>
            <label htmlFor="preview_pdf" className="block text-sm font-semibold text-gray-700 mb-2">Preview PDF</label>
            {form.preview_pdf_lama && (
              <div className="mb-3">
                <a href={`/uploads/${form.preview_pdf_lama}`} target="_blank" rel="noopener noreferrer" className="text-[#3d2269] underline text-sm">
                  {form.preview_pdf_lama}
                </a>
                <p className="text-xs text-gray-500 mt-1">File preview saat ini</p>
              </div>
            )}
            <input type="file" id="preview_pdf" name="preview_pdf" accept=".pdf" onChange={handleChange} className="w-full px-4 py-3 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#3d2269] file:text-white hover:file:bg-[#2d1850]" />
            <p className="text-xs text-gray-500 mt-1">Biarkan kosong jika tidak ingin mengganti preview</p>
          </div>

          {/* DESKRIPSI */}
          <div className="md:col-span-2">
            <label htmlFor="deskripsi_buku" className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Buku</label>
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
              {loading ? "Menyimpan..." : "UPDATE BUKU"}
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

export default EditBook;