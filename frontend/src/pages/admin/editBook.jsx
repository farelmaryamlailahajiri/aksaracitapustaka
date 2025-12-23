import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiSave, FiX, FiUploadCloud, FiBookOpen, FiImage, FiFileText } from "react-icons/fi";

const primaryColor = "#3d2269";
const accentColor = "#d3a847";
const textSecondary = "#5a4b81";

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

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await axios.get(`/api/books/get.php?id=${id}`, {
          headers: { "X-Auth-Token": token || "" },
        });

        const book = res.data.data;
        if (!book || Array.isArray(book)) throw new Error("Buku tidak ditemukan.");

        setForm({
          nama_buku: book.nama_buku || "",
          nama_penulis: book.nama_penulis || "",
          nama_tata_letak: book.nama_tata_letak || "",
          nama_editor: book.nama_editor || "",
          isbn: book.isbn || "",
          jumlah_halaman: String(book.jumlah_halaman || ""),
          ukuran_buku: book.ukuran_buku || "",
          deskripsi_buku: book.deskripsi_buku || "",
          harga_buku: String(book.harga_buku || ""),
          tahun_terbit: String(book.tahun_terbit || ""),
          foto_buku: null,
          preview_pdf: null,
          foto_buku_lama: book.foto_buku || "",
          preview_pdf_lama: book.preview_pdf || "",
        });
      } catch (err) {
        setErrorMsg("Gagal memuat data buku.");
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
      if ((key === "foto_buku" || key === "preview_pdf") && value instanceof File) {
        data.append(key, value);
      } else if (key === "foto_buku_lama" || key === "preview_pdf_lama") {
        if (value) data.append(key, value);
      } else if (value !== null && value !== undefined && key !== "foto_buku" && key !== "preview_pdf") {
        data.append(key, value);
      }
    });
    data.append("id", id);

    try {
      const token = localStorage.getItem("admin_token");
      await axios.post("/api/books/update.php", data, {
        headers: { "X-Auth-Token": token || "" },
      });
      alert("Buku berhasil diperbarui!");
      navigate("/admin");
    } catch (err) {
      setErrorMsg("Gagal memperbarui data.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-70"
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
                <h1 className="text-2xl font-black" style={{ color: primaryColor }}>Edit Data Buku</h1>
                <p className="text-sm" style={{ color: textSecondary }}>Perbarui rincian informasi buku ID: #{id}</p>
              </div>
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3 text-sm font-medium">
                <FiX className="flex-shrink-0" /> {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              
              <section>
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6" style={{ color: accentColor }}>1. Informasi Utama</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Judul Buku *</label>
                    <input type="text" name="nama_buku" value={form.nama_buku} onChange={handleChange} required className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 transition-all outline-none text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Nama Penulis *</label>
                    <input type="text" name="nama_penulis" value={form.nama_penulis} onChange={handleChange} required className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 transition-all outline-none text-sm" />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6" style={{ color: accentColor }}>2. Detail Produksi & Harga</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2 col-span-1">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>ISBN</label>
                    <input type="text" name="isbn" value={form.isbn} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 outline-none text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Tahun Terbit</label>
                    <input type="number" name="tahun_terbit" value={form.tahun_terbit} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 outline-none text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Harga (Rp)</label>
                    <input type="number" name="harga_buku" value={form.harga_buku} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 outline-none text-sm font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Halaman</label>
                    <input type="number" name="jumlah_halaman" value={form.jumlah_halaman} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 outline-none text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Ukuran</label>
                    <input type="text" name="ukuran_buku" value={form.ukuran_buku} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 outline-none text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Editor</label>
                    <input type="text" name="nama_editor" value={form.nama_editor} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 outline-none text-sm" />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6" style={{ color: accentColor }}>3. Lampiran File</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Bagian Foto */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold block" style={{ color: primaryColor }}>Ganti Cover</label>
                    {form.foto_buku_lama && !form.foto_buku && (
                       <div className="inline-flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 mb-2">
                          <img src={`/file.php?t=covers&f=${form.foto_buku_lama}`} className="w-12 h-16 object-cover rounded-lg shadow-sm" alt="Current" />
                          <p className="text-[10px] text-slate-400 font-bold max-w-[100px] truncate">{form.foto_buku_lama}</p>
                       </div>
                    )}
                    <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                      <div className="flex flex-col items-center">
                        <FiUploadCloud className="text-slate-400" size={20} />
                        <p className="text-[10px] text-slate-500 font-medium mt-1">{form.foto_buku ? form.foto_buku.name : "Klik untuk upload baru"}</p>
                      </div>
                      <input type="file" name="foto_buku" accept="image/*" onChange={handleChange} className="hidden" />
                    </label>
                  </div>

                  {/* Bagian PDF */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold block" style={{ color: primaryColor }}>Ganti Preview PDF</label>
                    {form.preview_pdf_lama && !form.preview_pdf && (
                       <div className="inline-flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 mb-2">
                          <div className="p-2 bg-white rounded-lg"><FiFileText className="text-red-500" /></div>
                          <p className="text-[10px] text-slate-400 font-bold max-w-[100px] truncate">{form.preview_pdf_lama}</p>
                       </div>
                    )}
                    <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                      <div className="flex flex-col items-center">
                        <FiUploadCloud className="text-slate-400" size={20} />
                        <p className="text-[10px] text-slate-500 font-medium mt-1">{form.preview_pdf ? form.preview_pdf.name : "Klik untuk upload baru"}</p>
                      </div>
                      <input type="file" name="preview_pdf" accept=".pdf" onChange={handleChange} className="hidden" />
                    </label>
                  </div>
                </div>
              </section>

              <div className="space-y-2">
                <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Sinopsis Buku</label>
                <textarea name="deskripsi_buku" value={form.deskripsi_buku} onChange={handleChange} rows="5" className="w-full px-5 py-4 bg-slate-50 border border-transparent rounded-3xl focus:bg-white focus:border-purple-200 transition-all outline-none text-sm resize-none" />
              </div>

              <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-slate-50">
                <button type="submit" disabled={loading} className="flex-[2] py-4 bg-[#3d2269] text-white font-bold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-purple-100">
                  <FiSave size={20} /> {loading ? "Menyimpan..." : "SIMPAN PERUBAHAN"}
                </button>
                <button type="button" onClick={() => navigate("/admin")} className="flex-1 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
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

export default EditBook;