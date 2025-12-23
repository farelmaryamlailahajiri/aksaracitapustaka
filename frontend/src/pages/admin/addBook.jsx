import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiSave, FiX, FiUploadCloud, FiBookOpen } from "react-icons/fi";

const primaryColor = "#3d2269";
const accentColor = "#d3a847";
const textSecondary = "#5a4b81";

const AddBook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMsg('');

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      const value = form[key];
      if (key === 'foto_buku' || key === 'preview_pdf') {
        if (value instanceof File) data.append(key, value);
      } else if (value !== null && value !== undefined) {
        data.append(key, value);
      }
    });

    try {
      const token = localStorage.getItem("admin_token");
      await axios.post("/api/books/create.php", data, {
        headers: { "X-Auth-Token": token || "" },
      });
      alert("Buku berhasil ditambahkan!");
      navigate("/admin");
    } catch (err) {
      const msg = err.response?.data?.message || "Terjadi kesalahan pada server.";
      setErrorMsg("Gagal: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Tombol Kembali yang Minimalis */}
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-sm font-bold mb-8 transition-colors"
          style={{ color: textSecondary }}
        >
          <FiArrowLeft /> Kembali ke Dashboard
        </button>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 rounded-2xl" style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}>
                <FiBookOpen size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-black" style={{ color: primaryColor }}>Tambah Buku Baru</h1>
                <p className="text-sm" style={{ color: textSecondary }}>Lengkapi informasi detail buku untuk diterbitkan di katalog.</p>
              </div>
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3 text-sm font-medium">
                <FiX className="flex-shrink-0" /> {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Grup: Informasi Utama */}
              <section>
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6" style={{ color: accentColor }}>1. Informasi Utama</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Judul Buku *</label>
                    <input
                      type="text"
                      name="nama_buku"
                      value={form.nama_buku}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 focus:ring-4 focus:ring-purple-50 transition-all outline-none text-sm"
                      placeholder="Contoh: Akuntansi Dasar"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Nama Penulis *</label>
                    <input
                      type="text"
                      name="nama_penulis"
                      value={form.nama_penulis}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 focus:ring-4 focus:ring-purple-50 transition-all outline-none text-sm"
                      placeholder="Nama Lengkap Penulis"
                    />
                  </div>
                </div>
              </section>

              {/* Grup: Detail Teknis */}
              <section>
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6" style={{ color: accentColor }}>2. Detail Produksi & Harga</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>ISBN</label>
                    <input type="text" name="isbn" value={form.isbn} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 transition-all outline-none text-sm" placeholder="978-xxx-..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Tahun Terbit</label>
                    <input type="number" name="tahun_terbit" value={form.tahun_terbit} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 transition-all outline-none text-sm" placeholder="2025" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Harga (Rp)</label>
                    <input type="number" name="harga_buku" value={form.harga_buku} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 transition-all outline-none text-sm font-bold" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Halaman</label>
                    <input type="number" name="jumlah_halaman" value={form.jumlah_halaman} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 transition-all outline-none text-sm" placeholder="230" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Ukuran Buku</label>
                    <input type="text" name="ukuran_buku" value={form.ukuran_buku} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 transition-all outline-none text-sm" placeholder="15.5 x 23 cm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Editor</label>
                    <input type="text" name="nama_editor" value={form.nama_editor} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 transition-all outline-none text-sm" placeholder="Nama Editor" />
                  </div>
                </div>
              </section>

              {/* Grup: File Upload */}
              <section>
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6" style={{ color: accentColor }}>3. Lampiran File</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <label className="text-xs font-bold block mb-2" style={{ color: primaryColor }}>Cover Buku (Gambar)</label>
                    <div className="relative flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-purple-300 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FiUploadCloud className="text-slate-400 mb-2" size={24} />
                          <p className="text-[10px] text-slate-500 font-medium">
                            {form.foto_buku ? form.foto_buku.name : "Klik untuk upload cover"}
                          </p>
                        </div>
                        <input type="file" name="foto_buku" accept="image/*" onChange={handleChange} className="hidden" />
                      </label>
                    </div>
                  </div>
                  <div className="relative group">
                    <label className="text-xs font-bold block mb-2" style={{ color: primaryColor }}>File Preview (PDF)</label>
                    <div className="relative flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-purple-300 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FiUploadCloud className="text-slate-400 mb-2" size={24} />
                          <p className="text-[10px] text-slate-500 font-medium">
                            {form.preview_pdf ? form.preview_pdf.name : "Klik untuk upload PDF"}
                          </p>
                        </div>
                        <input type="file" name="preview_pdf" accept=".pdf" onChange={handleChange} className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Deskripsi */}
              <div className="space-y-2">
                <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Sinopsis / Deskripsi Buku</label>
                <textarea
                  name="deskripsi_buku"
                  value={form.deskripsi_buku}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-5 py-4 bg-slate-50 border border-transparent rounded-3xl focus:bg-white focus:border-purple-200 focus:ring-4 focus:ring-purple-50 transition-all outline-none text-sm resize-none"
                  placeholder="Tuliskan deskripsi singkat mengenai isi buku..."
                />
              </div>

              {/* Tombol Aksi */}
              <div className="flex flex-col md:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] py-4 bg-[#3d2269] text-white font-bold rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-purple-100 disabled:opacity-50"
                >
                  <FiSave size={20} />
                  {loading ? "Menyimpan..." : "TERBITKAN BUKU SEKARANG"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  className="flex-1 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <FiX size={20} /> Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;