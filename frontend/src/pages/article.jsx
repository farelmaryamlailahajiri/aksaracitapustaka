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

  const getSnippet = (htmlContent) => {
    if (!htmlContent) return "Tidak ada preview.";
    const text = htmlContent.replace(/<[^>]*>?/gm, "").trim();
    return text.length > 80 ? text.substring(0, 80) + "..." : text; // Sedikit dikurangi agar pas di kolom sempit
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short", // Menggunakan format pendek agar hemat ruang
      year: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mb-4 mx-auto"
            style={{ borderColor: primaryColor, borderTopColor: "transparent" }}
          ></div>
          <p className="text-gray-500">Memuat artikel terbaru...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto"> {/* Diubah ke max-w-7xl agar lebih luas */}
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6 uppercase"
            style={{ color: primaryColor }}
          >
            Artikel
          </h1>
            <div className="w-20 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Wawasan seputar dunia literasi, tips menulis, dan kabar terbaru dari Aksara Cita Pustaka.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Cari artikel..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all shadow-sm"
              style={{ borderColor: primaryColor + "20" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid Artikel - Diubah ke 4 Kolom (lg:grid-cols-4) */}
        {filteredArticles.length === 0 && !error ? (
          <div className="text-center py-20">
            <FiBook size={48} className="mx-auto mb-4 opacity-20" style={{ color: primaryColor }} />
            <h3 className="text-xl font-medium text-gray-700">Artikel tidak ditemukan</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.slug || article.id}`}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group border flex flex-col h-full"
                style={{ borderColor: primaryColor + "10" }}
              >
                {/* Gambar Artikel */}
                <div className="relative h-44 bg-gray-50 overflow-hidden flex items-center justify-center p-2">
                  {article.foto_artikel ? (
                    <img
                      src={`/file.php?t=articles&f=${article.foto_artikel}`}
                      alt={article.judul}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "/assets/no-image.jpg";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
                      <FiBook size={40} />
                    </div>
                  )}

                  {/* Tanggal Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2 py-1 rounded text-[10px] font-bold shadow-sm flex items-center gap-1">
                    <FiCalendar size={10} />
                    {formatDate(article.created_at)}
                  </div>
                </div>

                {/* Info Artikel */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3
                    className="font-bold text-base leading-tight line-clamp-2 mb-2 group-hover:text-purple-700 transition-colors"
                    style={{ color: primaryColor }}
                  >
                    {article.judul}
                  </h3>

                  <p className="text-gray-500 text-[11px] mb-2 uppercase tracking-wider">
                    Oleh <span className="font-semibold">{article.penulis || "Admin"}</span>
                  </p>

                  <p className="text-gray-600 text-xs leading-relaxed flex-1 line-clamp-3 mb-4">
                    {getSnippet(article.isi_articles)}
                  </p>

                  <div
                    className="pt-3 border-t flex items-center justify-between"
                    style={{ borderColor: primaryColor + "10" }}
                  >
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: goldColor }}
                    >
                      Baca Artikel
                    </span>
                    <FiChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
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
          <div className="mt-16 pt-8 border-t text-center border-gray-100">
            <p className="text-gray-400 text-xs italic">
              Menampilkan {filteredArticles.length} artikel terbaru
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;