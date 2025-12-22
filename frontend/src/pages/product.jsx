// src/pages/product.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiBookOpen, FiSearch } from "react-icons/fi";

const primaryColor = "#3d2269";
const goldColor = "#d3a847";

const Product = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
    const result = books.filter(book => 
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
            className="w-16 h-16 border-3 border-t-transparent rounded-full animate-spin mb-4"
            style={{ borderColor: primaryColor, borderTopColor: 'transparent' }}
          ></div>
          <p className="text-gray-500">Memuat koleksi buku...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-10">
          <h1 
            className="text-4xl font-bold mb-3 tracking-tight"
            style={{ color: primaryColor }}
          >
            Koleksi Buku
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan karya-karya terbaik dari penulis berkualitas
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
              placeholder="Cari buku atau penulis..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all"
              style={{ 
                borderColor: primaryColor + '20',
                focusRingColor: primaryColor 
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div 
            className="bg-white border px-6 py-4 rounded-lg mb-8 text-center"
            style={{ 
              borderColor: primaryColor + '30',
              backgroundColor: primaryColor + '05'
            }}
          >
            <p className="text-gray-700">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {filteredBooks.length === 0 && !error ? (
          <div className="text-center py-20">
            <div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
              style={{ backgroundColor: primaryColor + '10' }}
            >
              <FiBookOpen size={36} style={{ color: primaryColor }} />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {searchTerm ? "Buku tidak ditemukan" : "Belum ada buku tersedia"}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? "Coba gunakan kata kunci pencarian lain" : "Koleksi akan segera hadir!"}
            </p>
          </div>
        ) : (
          /* Books Grid - 4 cards per row */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 group border"
                style={{ borderColor: primaryColor + '10' }}
              >
                {/* Book Cover - lebih kecil */}
                <div className="relative h-52 bg-gradient-to-br from-gray-50 to-gray-100">
                  {book.foto_buku ? (
                    <img
                      src={`/file.php?t=covers&f=${book.foto_buku}`}
                      alt={book.nama_buku}
                      className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "/assets/no-book-cover.jpg";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiBookOpen size={36} className="text-gray-300" />
                    </div>
                  )}
                  
                  {/* Price Tag - lebih kecil */}
                  {book.harga_buku && (
                    <div 
                      className="absolute top-3 right-3 text-white px-2 py-1 rounded text-xs font-medium shadow"
                      style={{ backgroundColor: goldColor }}
                    >
                      Rp {Number(book.harga_buku).toLocaleString("id-ID")}
                    </div>
                  )}
                </div>

                {/* Book Info - lebih padat */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 
                      className="font-semibold text-gray-900 text-base leading-tight line-clamp-2 mb-2 group-hover:underline transition-all"
                      style={{ color: primaryColor }}
                    >
                      {book.nama_buku}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-gray-600 text-xs">
                        <span className="font-medium">Penulis:</span> {book.nama_penulis || "Tidak diketahui"}
                      </p>
                      <p className="text-gray-600 text-xs">
                        <span className="font-medium">Tahun:</span> {book.tahun_terbit || "Tidak tersedia"}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons - lebih kecil */}
                  <div className="flex gap-2 pt-3 border-t"
                    style={{ borderColor: primaryColor + '10' }}
                  >
                    <Link
                      to={`/product/${book.id}`}
                      className="flex-1 text-center py-2 text-sm font-medium rounded-md transition-colors border hover:shadow"
                      style={{ 
                        color: primaryColor,
                        borderColor: primaryColor + '40',
                        backgroundColor: primaryColor + '05'
                      }}
                    >
                      Detail
                    </Link>
                    
                    <a
                      href="https://id.shp.ee/gJ84wYK"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 text-sm text-white font-medium hover:shadow rounded-md transition-colors flex items-center justify-center gap-1"
                      style={{ backgroundColor: goldColor }}
                    >
                      <FiShoppingCart size={14} />
                      Beli
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Info */}
        {filteredBooks.length > 0 && searchTerm && (
          <div 
            className="mt-8 pt-6 border-t text-center"
            style={{ borderColor: primaryColor + '10' }}
          >
            <p className="text-gray-500 text-xs">
              Menampilkan {filteredBooks.length} buku
              {searchTerm && ` untuk pencarian "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;