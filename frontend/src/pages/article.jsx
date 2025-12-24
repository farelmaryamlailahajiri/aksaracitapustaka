import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiBook, FiCalendar, FiSearch, FiChevronRight } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

const primaryColor = "#3d2269";
const goldColor = "#d3a847";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Inisialisasi AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

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
    return text.length > 80 ? text.substring(0, 80) + "..." : text;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div
            className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mb-4 mx-auto"
            style={{ borderColor: primaryColor, borderTopColor: "transparent" }}
          ></div>
          <p className="text-gray-500 text-sm font-medium">Memuat artikel terbaru...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
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

        {/* Search Bar Section */}
        <div className="mb-16 flex justify-center" data-aos="fade-up" data-aos-delay="200">
          <div className="relative w-full max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Cari judul atau penulis artikel..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-50 focus:bg-white transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 && !error ? (
          <div className="text-center py-20" data-aos="zoom-in">
            <FiBook size={48} className="mx-auto mb-4 opacity-20" style={{ color: primaryColor }} />
            <h3 className="text-xl font-medium text-gray-700">Artikel tidak ditemukan</h3>
            <p className="text-gray-400 text-sm mt-2">Coba gunakan kata kunci pencarian yang lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredArticles.map((article, index) => (
              <Link
                key={article.id}
                to={`/article/${article.slug || article.id}`}
                data-aos="fade-up"
                data-aos-delay={index * 100} // Efek berurutan
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500 group border border-gray-50 flex flex-col h-full"
              >
                {/* Gambar Artikel */}
                <div className="relative h-48 bg-gray-50 overflow-hidden flex items-center justify-center p-3">
                  {article.foto_artikel ? (
                    <img
                      src={`/file.php?t=articles&f=${article.foto_artikel}`}
                      alt={article.judul}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
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
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm flex items-center gap-1.5" style={{ color: primaryColor }}>
                    <FiCalendar size={12} />
                    {formatDate(article.created_at)}
                  </div>
                </div>

                {/* Info Artikel */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3
                    className="font-bold text-base leading-tight line-clamp-2 mb-3 group-hover:text-purple-700 transition-colors"
                    style={{ color: primaryColor }}
                  >
                    {article.judul}
                  </h3>

                  <p className="text-gray-400 text-[10px] font-bold mb-3 uppercase tracking-[0.1em]">
                    Oleh <span style={{ color: goldColor }}>{article.penulis || "Admin"}</span>
                  </p>

                  <p className="text-gray-500 text-xs leading-relaxed flex-1 line-clamp-3 mb-5">
                    {getSnippet(article.isi_articles)}
                  </p>

                  <div
                    className="pt-4 border-t flex items-center justify-between"
                    style={{ borderColor: primaryColor + "08" }}
                  >
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.2em]"
                      style={{ color: goldColor }}
                    >
                      Baca Selengkapnya
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
          <div className="mt-20 pt-8 border-t text-center border-gray-50" data-aos="fade-in">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              Total {filteredArticles.length} artikel ditemukan
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;