import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { 
  FiArrowLeft, 
  FiImage, 
  FiUser, 
  FiCalendar, 
  FiFileText, 
  FiEdit2, 
  FiAlertTriangle 
} from "react-icons/fi";

const API_URL = "/api";
const primaryColor = "#3d2269";
const accentColor = "#d3a847";
const textSecondary = "#5a4b81";

const DetailArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await axios.get(`${API_URL}/articles/get.php?id=${id}`, {
          headers: { "X-Auth-Token": token || "" },
        });

        const data = res.data.data;
        if (!data) {
          setErrorMsg("Artikel tidak ditemukan.");
          setArticle(null);
          return;
        }
        setArticle(data);
      } catch (err) {
        setErrorMsg("Gagal memuat artikel.");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchArticle();
  }, [id]);

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Tombol Navigasi */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-sm font-bold transition-colors hover:opacity-70"
            style={{ color: textSecondary }}
          >
            <FiArrowLeft /> Kembali ke Dashboard
          </button>
          
          {article && (
            <Link
              to={`/admin/edit-article/${article.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-sm font-bold hover:bg-amber-100 transition-all"
            >
              <FiEdit2 size={16} /> Edit Artikel
            </Link>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {errorMsg ? (
            <div className="p-12 text-center">
              <FiAlertTriangle size={48} className="mx-auto text-red-400 mb-4" />
              <p className="text-slate-600 font-medium">{errorMsg}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* SISI KIRI: INFORMASI PENULIS & COVER */}
              <div className="lg:col-span-4 p-8 md:p-12 bg-slate-50 flex flex-col items-center border-r border-slate-100">
                <div className="w-full max-w-[240px] aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200 flex items-center justify-center mb-8">
                  {article.foto_buku ? (
                    <img
                      src={`/file.php?t=articles&f=${article.foto_buku}`}
                      alt={article.nama_buku}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiImage size={48} className="text-slate-200" />
                  )}
                </div>
                
                <div className="space-y-6 w-full">
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Penulis</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full text-sm font-bold" style={{ color: primaryColor }}>
                      <FiUser size={14} />
                      {article.nama_penulis || "Anonim"}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200 space-y-4 text-center lg:text-left">
                    <InfoMini label="Dipublikasikan" value={new Date(article.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} icon={<FiCalendar />} />
                    <InfoMini label="ID Sistem" value={`#${article.id}`} icon={<FiFileText />} />
                  </div>
                </div>
              </div>

              {/* SISI KANAN: ISI ARTIKEL */}
              <div className="lg:col-span-8 p-8 md:p-12">
                <div className="mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentColor }}>Konten Artikel</span>
                  <h1 className="text-3xl font-black mt-2 mb-4 leading-tight" style={{ color: primaryColor }}>
                    {article.nama_buku}
                  </h1>
                </div>

                <div className="mt-8">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 pb-2 border-b border-slate-100" style={{ color: accentColor }}>Narasi Lengkap</h4>
                  <div className="prose prose-sm md:prose-base max-w-none text-justify">
                    <div 
                      style={{ color: textSecondary, lineHeight: "1.8" }}
                      className="whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: article.isi_articles || '<p class="italic">Belum ada isi konten.</p>' }}
                    />
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Komponen Kecil untuk Informasi di Sisi Kiri
const InfoMini = ({ label, value, icon }) => (
  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-1 lg:gap-3">
    <div className="text-slate-300 mt-1">{icon}</div>
    <div className="text-center lg:text-left">
      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
      <p className="text-xs font-bold text-slate-700">{value || '—'}</p>
    </div>
  </div>
);

export default DetailArticle;