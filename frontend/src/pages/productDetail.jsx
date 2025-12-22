import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FiArrowLeft,
  FiShoppingCart,
  FiCalendar,
  FiUser,
  FiBookOpen,
  FiArrowRight,
  FiEye, // Icon untuk Preview
} from "react-icons/fi";

const primaryColor = "#3d2269";
const accentColor = "#d3a847";
const lightBgColor = "#f9fafb";

const ProductDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("ID buku tidak ditemukan.");
      setLoading(false);
      return;
    }

    const fetchBook = async () => {
      try {
        const res = await axios.get(`/api/books/get_detail.php?id=${id}`);

        if (res.data.success && res.data.data) {
          setBook(res.data.data);
        } else {
          setError(res.data.message || "Buku tidak ditemukan.");
        }
      } catch (err) {
        console.error("Gagal memuat detail buku:", err);
        setError("Tidak dapat memuat detail buku.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("/api/books/public_get.php");

        if (res.data.success && Array.isArray(res.data.data)) {
          setAllBooks(res.data.data);
        }
      } catch (err) {
        console.error("Gagal memuat buku rekomendasi:", err);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchAllBooks();
  }, []);

  const getRelatedBooks = () => {
    if (!book || allBooks.length === 0) return [];

    return allBooks.filter((b) => b.id !== book.id).slice(0, 4);
  };

  const relatedBooks = getRelatedBooks();

  // Fungsi membuka preview PDF di tab baru
  const handlePreview = () => {
    if (book.preview_pdf) {
      window.open(`/file.php?t=previews&f=${book.preview_pdf}`, "_blank", "noopener,noreferrer");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24" style={{ backgroundColor: lightBgColor }}>
        <div className="text-center">
          <div
            className="w-16 h-16 border-3 border-t-transparent rounded-full animate-spin mb-4 mx-auto"
            style={{ borderColor: primaryColor, borderTopColor: "transparent" }}
          ></div>
          <p className="text-gray-500">Memuat detail buku...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24" style={{ backgroundColor: lightBgColor }}>
        <div className="text-center max-w-md mx-auto px-6">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ backgroundColor: primaryColor + "10" }}
          >
            <FiBookOpen size={32} style={{ color: primaryColor }} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Buku Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-8">{error || "Buku yang Anda cari tidak tersedia."}</p>
          <Link
            to="/product"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors hover:shadow"
            style={{
              color: primaryColor,
              border: `1px solid ${primaryColor + "40"}`,
              backgroundColor: primaryColor + "05",
            }}
          >
            <FiArrowLeft size={18} />
            Kembali ke Koleksi Buku
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: lightBgColor }}>
      {/* Header Kembali */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <Link
          to="/product"
          className="inline-flex items-center gap-2 font-medium hover:underline transition"
          style={{ color: primaryColor }}
        >
          <FiArrowLeft size={18} />
          Kembali ke Koleksi
        </Link>
      </div>

      {/* Konten Utama */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Kartu Detail Buku */}
        <div
          className="bg-white rounded-xl shadow-sm overflow-hidden mb-12"
          style={{ border: `1px solid ${primaryColor + "10"}` }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Cover Buku */}
            <div className="p-8 lg:p-12 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="relative w-full max-w-md">
                {book.foto_buku ? (
                  <img
                    src={`/file.php?t=covers&f=${book.foto_buku}`}
                    alt={book.nama_buku}
                    className="w-full h-auto max-h-[500px] object-contain shadow-lg rounded-lg"
                    onError={(e) => {
                      e.target.src = "/assets/no-book-cover.jpg";
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-[400px] flex items-center justify-center rounded-lg"
                    style={{ backgroundColor: primaryColor + "05" }}
                  >
                    <FiBookOpen size={80} className="text-gray-300" />
                  </div>
                )}

                {/* Badge Harga */}
                {book.harga_buku && (
                  <div
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 text-white font-bold rounded-full shadow-lg min-w-[200px] text-center"
                    style={{ backgroundColor: accentColor }}
                  >
                    Rp {Number(book.harga_buku).toLocaleString("id-ID")}
                  </div>
                )}
              </div>
            </div>

            {/* Informasi Buku & Tombol Aksi */}
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight" style={{ color: primaryColor }}>
                  {book.nama_buku}
                </h1>

                {/* Penulis */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full"
                    style={{ backgroundColor: primaryColor + "10" }}
                  >
                    <FiUser size={18} style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Penulis</p>
                    <p className="font-medium text-gray-900">{book.nama_penulis || "Tidak diketahui"}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-4 mb-8">
                  {book.tahun_terbit && (
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded"
                        style={{ backgroundColor: primaryColor + "10" }}
                      >
                        <FiCalendar size={14} style={{ color: primaryColor }} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tahun Terbit</p>
                        <p className="text-gray-900">{book.tahun_terbit}</p>
                      </div>
                    </div>
                  )}
                  {book.isbn && (
                    <div className="flex items-start gap-3">
                      <div className="text-sm text-gray-500 min-w-[80px]">ISBN</div>
                      <div className="text-gray-900 font-mono">{book.isbn}</div>
                    </div>
                  )}
                  {book.jumlah_halaman && (
                    <div className="flex items-start gap-3">
                      <div className="text-sm text-gray-500 min-w-[80px]">Halaman</div>
                      <div className="text-gray-900">{book.jumlah_halaman} halaman</div>
                    </div>
                  )}
                  {book.ukuran_buku && (
                    <div className="flex items-start gap-3">
                      <div className="text-sm text-gray-500 min-w-[80px]">Ukuran</div>
                      <div className="text-gray-900">{book.ukuran_buku}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tombol Aksi: Beli & Preview */}
              <div className="pt-6 border-t" style={{ borderColor: primaryColor + "10" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Beli Sekarang */}
                  <a
                    href="https://id.shp.ee/gJ84wYK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 text-lg font-semibold text-white rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-3"
                    style={{
                      backgroundColor: accentColor,
                      boxShadow: `0 4px 6px ${accentColor + "40"}`,
                    }}
                  >
                    <FiShoppingCart size={20} />
                    BELI SEKARANG
                  </a>

                  {/* Preview Buku */}
                  {book.preview_pdf && (
                    <button
                      onClick={handlePreview}
                      className="w-full py-4 text-lg font-semibold text-white rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-3"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <FiEye size={20} />
                      LIHAT BUKU
                    </button>
                  )}
                </div>

                {/* Kode Buku */}
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500">
                    Kode Buku: <span className="font-mono">#{book.id}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deskripsi Buku */}
        {book.deskripsi_buku && (
          <div
            className="bg-white rounded-xl shadow-sm overflow-hidden mb-12 p-8 lg:p-12"
            style={{ border: `1px solid ${primaryColor + "10"}` }}
          >
            <h2
              className="text-2xl font-bold mb-8 pb-4"
              style={{
                color: primaryColor,
                borderBottom: `2px solid ${primaryColor + "20"}`,
              }}
            >
              Deskripsi Buku
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{book.deskripsi_buku}</p>
            </div>
          </div>
        )}

        {/* Rekomendasi Buku Lainnya */}
        {relatedBooks.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
                Rekomendasi Buku Lainnya
              </h2>
              <Link
                to="/product"
                className="inline-flex items-center gap-2 text-sm font-medium hover:underline transition"
                style={{ color: primaryColor }}
              >
                Lihat Semua
                <FiArrowRight size={16} />
              </Link>
            </div>

            {loadingRelated ? (
              <div className="flex justify-center py-12">
                <div
                  className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: primaryColor, borderTopColor: "transparent" }}
                ></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedBooks.map((relatedBook) => (
                  <Link
                    key={relatedBook.id}
                    to={`/product/${relatedBook.id}`}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 group border"
                    style={{ borderColor: primaryColor + "10" }}
                  >
                    <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100">
                      {relatedBook.foto_buku ? (
                        <img
                          src={`/file.php?t=covers&f=${relatedBook.foto_buku}`}
                          alt={relatedBook.nama_buku}
                          className="w-full h-full object-contain p-4"
                          onError={(e) => {
                            e.target.src = "/assets/no-book-cover.jpg";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiBookOpen size={32} className="text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3
                        className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 group-hover:underline"
                        style={{ color: primaryColor }}
                      >
                        {relatedBook.nama_buku}
                      </h3>
                      <p className="text-gray-600 text-xs mb-1">
                        {relatedBook.nama_penulis || "Penulis tidak diketahui"}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-gray-500">{relatedBook.tahun_terbit || "-"}</p>
                        {relatedBook.harga_buku && (
                          <p className="text-sm font-semibold" style={{ color: accentColor }}>
                            Rp {Number(relatedBook.harga_buku).toLocaleString("id-ID")}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;