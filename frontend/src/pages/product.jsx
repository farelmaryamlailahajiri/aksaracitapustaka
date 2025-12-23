import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiBookOpen, FiSearch } from "react-icons/fi";

const primaryColor = "#3d2269";
const goldColor = "#d3a847";

const Product = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/api/books/public_get.php");
        if (res.data.success && Array.isArray(res.data.data)) {
          setBooks(res.data.data);
          setFilteredBooks(res.data.data);
        } else {
          setBooks([]);
          setFilteredBooks([]);
        }
      } catch (err) {
        console.error("Gagal memuat buku:", err);
        setError("Tidak dapat memuat daftar buku. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBooks(books);
      return;
    }
    const term = searchTerm.toLowerCase();
    const result = books.filter(
      (book) =>
        book.nama_buku?.toLowerCase().includes(term) ||
        book.nama_penulis?.toLowerCase().includes(term)
    );
    setFilteredBooks(result);
  }, [searchTerm, books]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div
            className="w-16 h-16 border-3 border-t-transparent rounded-full animate-spin mb-4 mx-auto"
            style={{ borderColor: primaryColor, borderTopColor: "transparent" }}
          ></div>
          <p className="text-gray-500">Memuat koleksi buku...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 uppercase"
            style={{ color: primaryColor }}
          >
            Koleksi Buku kami
          </h1>
          <div className="w-20 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan karya-karya terbaik dari penulis berkualitas yang diterbitkan oleh Aksara Cita Pustaka.
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
              placeholder="Cari judul buku atau penulis..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all shadow-sm"
              style={{ borderColor: primaryColor + "20" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Error Handling */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8 text-center">
            {error}
          </div>
        )}

        {/* Grid System - Responsif 2 kolom di HP, 4 kolom di Laptop */}
        {filteredBooks.length === 0 && !error ? (
          <div className="text-center py-20">
             <FiBookOpen size={48} className="mx-auto mb-4 opacity-20" style={{ color: primaryColor }} />
             <h3 className="text-xl font-medium text-gray-700">Buku tidak ditemukan</h3>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => navigate(`/product/${book.id}`)}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group border cursor-pointer flex flex-col h-full"
                style={{ borderColor: primaryColor + "15" }}
              >
                {/* Book Cover Container */}
                <div className="relative h-48 md:h-72 bg-gray-50 flex items-center justify-center p-3 md:p-6 overflow-hidden">
                  {book.foto_buku ? (
                    <img
                      src={`/file.php?t=covers&f=${book.foto_buku}`}
                      alt={book.nama_buku}
                      className="max-w-full max-h-full object-contain shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center opacity-20 text-gray-400">
                        <FiBookOpen size={48} />
                        <span className="text-[10px] mt-2 italic">Tanpa Cover</span>
                    </div>
                  )}

                  {/* Price Tag Badge */}
                  {book.harga_buku && (
                    <div
                      className="absolute top-2 right-2 text-white px-2 py-1 rounded-md text-[10px] md:text-xs font-bold shadow-lg"
                      style={{ backgroundColor: goldColor }}
                    >
                      Rp {Number(book.harga_buku).toLocaleString("id-ID")}
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-4 flex flex-col flex-1">
                  <h3
                    className="font-bold text-gray-900 text-sm md:text-base leading-snug line-clamp-2 mb-2 group-hover:text-purple-800 transition-colors"
                    style={{ color: primaryColor }}
                  >
                    {book.nama_buku}
                  </h3>
                  
                  <div className="mt-auto space-y-1">
                    <p className="text-gray-500 text-[10px] md:text-xs truncate">
                      <span className="font-semibold text-gray-700">Penulis:</span> {book.nama_penulis || "-"}
                    </p>
                    <p className="text-gray-500 text-[10px] md:text-xs">
                      <span className="font-semibold text-gray-700">Tahun:</span> {book.tahun_terbit || "-"}
                    </p>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-purple-600 transition-colors">
                      Lihat Detail
                    </span>
                    <a
                      href="https://id.shp.ee/gJ84wYK"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()} // Supaya tidak memicu navigasi ke halaman detail
                      className="p-2 rounded-lg text-white hover:scale-110 transition-transform shadow-sm"
                      style={{ backgroundColor: goldColor }}
                      title="Beli di Shopee"
                    >
                      <FiShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Result Counter (Hanya muncul jika sedang mencari) */}
        {searchTerm && filteredBooks.length > 0 && (
          <div className="mt-12 text-center text-gray-400 text-xs italic">
            Menampilkan {filteredBooks.length} hasil untuk "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;