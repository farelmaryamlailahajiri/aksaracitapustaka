// src/pages/Article.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiBook, FiCalendar, FiSearch, FiChevronRight } from "react-icons/fi";

const primaryColor = "#3d2269";
const goldColor = "#d3a847";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("/api/articles/public_get.php");

        if (res.data.success && Array.isArray(res.data.data)) {
          setArticles(res.data.data);
          setFilteredArticles(res.data.data);
        } else {
          setArticles([]);
          setFilteredArticles([]);
        }
      } catch (err) {
        console.error("Gagal memuat artikel:", err);
        setError("Tidak dapat memuat daftar artikel. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter berdasarkan pencarian
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredArticles(articles);
      return;
    }

    const term = searchTerm.toLowerCase();
    const result = articles.filter(
      (article) =>
        article.judul?.toLowerCase().includes(term) ||
        article.penulis?.toLowerCase().includes(term) ||
        article.isi_articles?.toLowerCase().includes(term)
    );

    setFilteredArticles(result);
  }, [searchTerm, articles]);

  // Potong isi artikel untuk preview (hilangkan HTML tag)
  const getSnippet = (htmlContent) => {
    if (!htmlContent) return "Tidak ada preview.";
    const text = htmlContent.replace(/<[^>]*>?/gm, "").trim();
    return text.length > 120 ? text.substring(0, 120) + "..." : text;
  };

  // Format tanggal created_at
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mb-4"
            style={{ borderColor: primaryColor, borderTopColor: "transparent" }}
          ></div>
          <p className="text-gray-500">Memuat artikel terbaru...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight" style={{ color: primaryColor }}>
            Artikel & Berita
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Wawasan seputar dunia literasi, tips menulis, dan kabar terbaru dari Aksara
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Cari judul, penulis, atau isi artikel..."
              className="w-full pl-12 pr-6 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-30 transition-all shadow-sm"
              style={{ borderColor: primaryColor + "30" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8 text-center"
          >
            <p>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {filteredArticles.length === 0 && !error ? (
          <div className="text-center py-20">
            <div
              className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8"
              style={{ backgroundColor: primaryColor + "10" }}
            >
              <FiBook size={48} style={{ color: primaryColor }} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              {searchTerm ? "Artikel tidak ditemukan" : "Belum ada artikel"}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm
                ? "Coba gunakan kata kunci lain untuk mencari artikel."
                : "Koleksi artikel akan segera hadir. Nantikan update terbaru dari kami!"}
            </p>
          </div>
        ) : (
          /* Articles Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.slug || article.id}`} // fallback ke id jika slug kosong
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group border flex flex-col h-full"
                style={{ borderColor: primaryColor + "10" }}
              >
                {/* Gambar Artikel */}
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  {article.foto_artikel ? (
                    <img
                      src={`/file.php?t=articles&f=${article.foto_artikel}`}
                      alt={article.judul}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "/assets/no-image.jpg"; // optional: buat fallback lokal
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <FiBook size={60} className="text-gray-300" />
                    </div>
                  )}

                  {/* Tanggal Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md">
                    <FiCalendar size={12} />
                    {formatDate(article.created_at)}
                  </div>
                </div>

                {/* Info Artikel */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3
                    className="font-bold text-lg leading-tight line-clamp-2 mb-3 group-hover:underline"
                    style={{ color: primaryColor }}
                  >
                    {article.judul}
                  </h3>

                  {article.penulis && (
                    <p className="text-sm text-gray-600 mb-3">
                      Oleh <span className="font-medium">{article.penulis}</span>
                    </p>
                  )}

                  <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
                    {getSnippet(article.isi_articles)}
                  </p>

                  <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: primaryColor + "15" }}>
                    <span
                      className="text-sm font-bold uppercase tracking-wider"
                      style={{ color: goldColor }}
                    >
                      Baca Selengkapnya
                    </span>
                    <FiChevronRight
                      size={18}
                      className="text-gray-400 group-hover:translate-x-2 transition-transform"
                      style={{ color: goldColor }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Footer Info */}
        {filteredArticles.length > 0 && (
          <div className="mt-16 pt-8 border-t text-center" style={{ borderColor: primaryColor + "15" }}>
            <p className="text-gray-500 text-sm">
              Menampilkan {filteredArticles.length} artikel terbaru
              {searchTerm && ` untuk pencarian "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;