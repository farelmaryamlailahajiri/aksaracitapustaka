// src/pages/articleDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiCalendar, FiUser, FiBookOpen } from "react-icons/fi";

const primaryColor = "#3d2269";
const accentColor = "#d3a847";
const lightBgColor = "#f9fafb";

const ArticleDetail = () => {
  const { slugOrId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Tentukan apakah parameter adalah ID (angka) atau slug
        const isNumeric = !isNaN(slugOrId);
        const param = isNumeric ? `id=${slugOrId}` : `slug=${slugOrId}`;

        const res = await axios.get(`/api/articles/get_detail.php?${param}`);

        if (res.data.success && res.data.data) {
          setArticle(res.data.data);
        } else {
          setError(res.data.message || "Artikel tidak ditemukan.");
        }
      } catch (err) {
        console.error("Gagal memuat artikel:", err);
        setError("Tidak dapat memuat detail artikel.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slugOrId]);

  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center pt-24"
        style={{ backgroundColor: lightBgColor }}
      >
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mb-4 mx-auto"
            style={{ borderColor: primaryColor, borderTopColor: "transparent" }}
          ></div>
          <p className="text-gray-600">Memuat artikel...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div
        className="min-h-screen flex items-center justify-center pt-24"
        style={{ backgroundColor: lightBgColor }}
      >
        <div className="text-center max-w-md mx-auto px-6">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ backgroundColor: primaryColor + "10" }}
          >
            <FiBookOpen size={32} style={{ color: primaryColor }} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Artikel Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-8">
            {error || "Artikel yang Anda cari tidak tersedia."}
          </p>
          <Link
            to="/article"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors hover:shadow"
            style={{
              color: primaryColor,
              border: `1px solid ${primaryColor + "40"}`,
              backgroundColor: primaryColor + "05",
            }}
          >
            <FiArrowLeft size={18} />
            Kembali ke Daftar Artikel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: lightBgColor }}>
      {/* Breadcrumb / Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <Link
          to="/article"
          className="inline-flex items-center gap-2 font-medium hover:underline transition"
          style={{ color: primaryColor }}
        >
          <FiArrowLeft size={18} />
          Kembali ke Daftar Artikel
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul */}
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          style={{ color: primaryColor }}
        >
          {article.judul}
        </h1>

        {/* Meta informasi */}
        <div className="flex flex-wrap items-center gap-6 mb-10 text-gray-600">
          {article.penulis && (
            <div className="flex items-center gap-2">
              <FiUser size={18} />
              <span>{article.penulis}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <FiCalendar size={18} />
            <span>{formatDate(article.created_at)}</span>
          </div>
        </div>

        {/* Gambar utama */}
        {article.foto_artikel && (
          <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
            <img
              src={`/file.php?t=articles&f=${article.foto_artikel}`}
              alt={article.judul}
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.src = "/assets/no-image.jpg";
              }}
            />
          </div>
        )}

        {/* Isi artikel */}
        <div
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.isi_articles || "" }}
        />

        {/* Footer info */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: primaryColor + "20" }}>
          <p className="text-center text-gray-500 text-sm">
            Artikel #{article.id} • Dipublikasikan pada {formatDate(article.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;