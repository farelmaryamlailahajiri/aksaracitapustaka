import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiCalendar, FiUser, FiClock } from "react-icons/fi";

// Definisi Warna
const primaryColor = "#3d2269";
const accentColor = "#d3a847";
const textSecondary = "#5a4b81";
const lightBgColor = "#ffffff";

const ArticleDetail = () => {
  const { slugOrId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticle = async () => {
      try {
        const isNumeric = !isNaN(slugOrId);
        const param = isNumeric ? `id=${slugOrId}` : `slug=${slugOrId}`;
        const res = await axios.get(`/api/articles/get_detail.php?${param}`);

        if (res.data.success && res.data.data) {
          setArticle(res.data.data);
        } else {
          setError(res.data.message || "Artikel tidak ditemukan.");
        }
      } catch (err) {
        setError("Gagal memuat artikel.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slugOrId]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: primaryColor, borderTopColor: "transparent" }}></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>{error || "Halaman tidak ditemukan"}</h2>
        <Link to="/article" className="text-sm font-medium underline" style={{ color: textSecondary }}>Kembali ke Daftar Artikel</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Navigasi Kembali - Ukuran diperbesar ke text-sm & tracking disesuaikan */}
        <Link
          to="/article"
          className="inline-flex items-center gap-3 text-sm font-bold tracking-wider uppercase mb-12 transition-all hover:gap-4"
          style={{ color: textSecondary }}
        >
          <FiArrowLeft size={20} /> Kembali ke Artikel
        </Link>

        {/* Header Artikel */}
        <header className="mb-10">
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-8"
            style={{ color: primaryColor }}
          >
            {article.judul}
          </h1>

          {/* Meta Info */}
          <div 
            className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-widest border-b pb-8"
            style={{ color: textSecondary, borderColor: `${primaryColor}15` }}
          >
            {article.penulis && (
              <div className="flex items-center gap-2">
                <FiUser size={14} style={{ color: accentColor }} />
                <span>{article.penulis}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <FiCalendar size={14} style={{ color: accentColor }} />
              <span>{formatDate(article.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock size={14} style={{ color: accentColor }} />
              <span>Aksara Cita Pustaka</span>
            </div>
          </div>
        </header>

        {/* Gambar Utama */}
        {article.foto_artikel && (
          <div className="mb-12 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-2 border border-gray-100 shadow-sm">
            <img
              src={`/file.php?t=articles&f=${article.foto_artikel}`}
              alt={article.judul}
              className="w-full h-auto object-contain max-h-[500px]"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}

        {/* Isi Artikel */}
        <article 
          className="prose prose-sm md:prose-base lg:prose-lg max-w-none 
          prose-headings:font-bold prose-headings:text-[#3d2269]
          prose-strong:text-[#3d2269] prose-img:rounded-2xl"
          style={{ 
            color: textSecondary,
            lineHeight: "1.8"
          }}
          dangerouslySetInnerHTML={{ __html: article.isi_articles || "" }}
        />
      </div>
    </div>
  );
};

export default ArticleDetail;