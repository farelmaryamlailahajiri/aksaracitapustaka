import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiSave, FiX, FiUploadCloud, FiFileText, FiImage } from "react-icons/fi";

const primaryColor = "#3d2269";
const accentColor = "#d3a847";
const textSecondary = "#5a4b81";

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
    foto_buku_lama: "",   // nama file lama
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await axios.get(`/api/articles/get.php?id=${id}`, {
          headers: { "X-Auth-Token": token || "" },
        });

        const article = res.data.data;
        if (!article) throw new Error("Artikel tidak ditemukan.");

        setForm({
          nama_buku: article.nama_buku || "",
          nama_penulis: article.nama_penulis || "",
          isi_articles: article.isi_articles || "",
          foto_buku: null,
          foto_buku_lama: article.foto_buku || "",
        });
      } catch (err) {
        setErrorMsg("Gagal memuat data artikel.");
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
    data.append("id", id);
    data.append("nama_buku", form.nama_buku || "");
    data.append("nama_penulis", form.nama_penulis || "");
    data.append("isi_articles", form.isi_articles || "");
    if (form.foto_buku instanceof File) data.append("foto_buku", form.foto_buku);
    if (form.foto_buku_lama) data.append("foto_buku_lama", form.foto_buku_lama);

    try {
      const token = localStorage.getItem("admin_token");
      await axios.post("/api/articles/update.php", data, {
        headers: { "X-Auth-Token": token || "" },
      });
      alert("Artikel berhasil diperbarui!");
      navigate("/admin");
    } catch (err) {
      setErrorMsg("Gagal memperbarui artikel.");
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
        
        {/* Tombol Kembali */}
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
                <FiFileText size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-black" style={{ color: primaryColor }}>Edit Artikel</h1>
                <p className="text-sm" style={{ color: textSecondary }}>ID Artikel: #{id}</p>
              </div>
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3 text-sm font-medium">
                <FiX className="flex-shrink-0" /> {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Grup 1: Informasi Dasar */}
              <section>
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6" style={{ color: accentColor }}>1. Identitas Konten</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Judul Artikel *</label>
                    <input
                      type="text"
                      name="nama_buku"
                      value={form.nama_buku}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 focus:ring-4 focus:ring-purple-50 transition-all outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Penulis *</label>
                    <input
                      type="text"
                      name="nama_penulis"
                      value={form.nama_penulis}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-200 focus:ring-4 focus:ring-purple-50 transition-all outline-none text-sm"
                    />
                  </div>

                  {/* Upload & Preview Gambar */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold px-1" style={{ color: primaryColor }}>Ganti Cover Artikel</label>
                    <label className="flex items-center justify-center w-full h-[52px] border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                        <div className="flex items-center gap-2 text-slate-500">
                          <FiUploadCloud size={18} />
                          <p className="text-[10px] font-medium truncate max-w-[150px]">
                            {form.foto_buku ? form.foto_buku.name : "Pilih file baru..."}
                          </p>
                        </div>
                        <input type="file" name="foto_buku" accept="image/*" onChange={handleChange} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* Tampilan Gambar Saat Ini */}
                {form.foto_buku_lama && !form.foto_buku && (
                  <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 inline-flex items-center gap-4">
                    <div className="w-12 h-16 rounded-lg overflow-hidden border border-slate-200">
                      <img src={`/file.php?t=articles&f=${form.foto_buku_lama}`} alt="Current" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cover Saat Ini</p>
                      <p className="text-xs font-medium text-slate-600 truncate max-w-[200px]">{form.foto_buku_lama}</p>
                    </div>
                  </div>
                )}
              </section>

              {/* Grup 2: Konten Narasi */}
              <section>
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6" style={{ color: accentColor }}>2. Narasi Lengkap</h2>
                <div className="space-y-2">
                  <textarea
                    name="isi_articles"
                    value={form.isi_articles}
                    onChange={handleChange}
                    rows="15"
                    className="w-full px-6 py-5 bg-slate-50 border border-transparent rounded-[2rem] focus:bg-white focus:border-purple-200 focus:ring-4 focus:ring-purple-50 transition-all outline-none text-sm leading-relaxed resize-none"
                    placeholder="Tuliskan isi artikel..."
                  />
                </div>
              </section>

              {/* Tombol Aksi */}
              <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-slate-50">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] py-4 bg-[#3d2269] text-white font-bold rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-purple-100 disabled:opacity-50"
                >
                  <FiSave size={20} />
                  {loading ? "Menyimpan..." : "SIMPAN PERUBAHAN ARTIKEL"}
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

export default EditArticle;