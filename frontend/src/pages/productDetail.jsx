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
  FiEye,
} from "react-icons/fi";

const primaryColor = "#3d2269";
const accentColor = "#d3a847";
const textSecondary = "#5a4b81";

const ProductDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;

    const fetchBook = async () => {
      try {
        const res = await axios.get(`/api/books/get_detail.php?id=${id}`);
        if (res.data.success && res.data.data) {
          setBook(res.data.data);
        } else {
          setError("Buku tidak ditemukan.");
        }
      } catch (err) {
        setError("Gagal memuat detail buku.");
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
        console.error(err);
      } finally {
        setLoadingRelated(false);
      }
    };
    fetchAllBooks();
  }, []);

  const relatedBooks = allBooks.filter((b) => b.id !== book?.id).slice(0, 4);

  const handlePreview = () => {
    if (book.preview_pdf) {
      window.open(
        `/file.php?t=previews&f=${book.preview_pdf}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div
          className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: primaryColor, borderTopColor: "transparent" }}
        ></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Navigasi Kembali - DISESUAIKAN SEPERTI ARTIKEL */}
        <Link
          to="/product"
          className="inline-flex items-center gap-3 text-sm font-bold tracking-wider uppercase mb-10 transition-all hover:gap-4"
          style={{ color: textSecondary }}
        >
          <FiArrowLeft size={20} /> Kembali ke Koleksi
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* SISI KIRI: COVER BUKU */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-[320px]">
              <div className="aspect-[3/4.2] bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
                {book.foto_buku ? (
                  <img
                    src={`/file.php?t=covers&f=${book.foto_buku}`}
                    alt={book.nama_buku}
                    className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <FiBookOpen size={60} className="text-gray-200" />
                )}
              </div>
            </div>
          </div>

          {/* SISI KANAN: INFO BUKU */}
          <div className="lg:col-span-7">
            <div className="mb-2">
              <span
                className="text-[10px] font-bold tracking-[0.2em] uppercase"
                style={{ color: accentColor }}
              >
                Penerbit Aksara Cita Pustaka
              </span>
              <h1
                className="text-2xl md:text-3xl font-extrabold mt-1 mb-1 leading-tight"
                style={{ color: primaryColor }}
              >
                {book.nama_buku}
              </h1>
              <p
                className="text-base font-semibold mb-3"
                style={{ color: textSecondary }}
              >
                {book.nama_penulis || "Penulis Aksara"}
              </p>

              <div
                className="text-xl font-black mb-4"
                style={{ color: primaryColor }}
              >
                Rp {Number(book.harga_buku).toLocaleString("id-ID")}
              </div>
            </div>

            {/* Spesifikasi - Font text-base (16px) sesuai permintaan */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-4 mb-8 py-5 border-y border-gray-100">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-400">
                  ISBN
                </p>
                <p className="text-base font-bold" style={{ color: primaryColor }}>
                  {book.isbn || "-"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-400">
                  Tahun
                </p>
                <p className="text-base font-bold" style={{ color: primaryColor }}>
                  {book.tahun_terbit || "-"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-400">
                  Halaman
                </p>
                <p className="text-base font-bold" style={{ color: primaryColor }}>
                  {book.jumlah_halaman ? `${book.jumlah_halaman} Hal` : "-"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-400">
                  Dimensi
                </p>
                <p className="text-base font-bold" style={{ color: primaryColor }}>
                  {book.ukuran_buku || "-"}
                </p>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/6285183220443"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-[2] px-6 py-3.5 rounded-xl font-bold text-white text-center transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-purple-50"
                style={{ backgroundColor: primaryColor }}
              >
                <FiShoppingCart size={18} /> BELI SEKARANG
              </a>

              {book.preview_pdf && (
                <button
                  onClick={handlePreview}
                  className="flex-1 px-6 py-3.5 rounded-xl font-bold border-2 transition-all active:scale-95 flex items-center justify-center gap-2"
                  style={{ color: primaryColor, borderColor: primaryColor }}
                >
                  <FiEye size={18} /> PREVIEW
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Section Deskripsi */}
        {book.deskripsi_buku && (
          <div className="mt-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-6 h-1 rounded-full"
                style={{ backgroundColor: accentColor }}
              ></div>
              <h2
                className="text-xs font-black uppercase tracking-[0.2em]"
                style={{ color: primaryColor }}
              >
                Sinopsis Buku
              </h2>
            </div>
            <div
              className="prose prose-sm max-w-none leading-relaxed text-justify"
              style={{ color: textSecondary }}
            >
              <p className="whitespace-pre-line text-sm">
                {book.deskripsi_buku}
              </p>
            </div>
          </div>
        )}

        {/* Section Rekomendasi */}
        {relatedBooks.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-50">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-extrabold" style={{ color: primaryColor }}>
                Rekomendasi Lainnya
              </h2>
              <Link
                to="/product"
                className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#3d2269]"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {relatedBooks.map((rb) => (
                <Link
                  key={rb.id}
                  to={`/product/${rb.id}`}
                  className="group flex flex-col items-center"
                >
                  <div className="relative w-full max-w-[160px] aspect-[3/4.2] bg-gray-50 rounded-xl overflow-hidden mb-3 border border-gray-100 flex items-center justify-center p-2 transition-all group-hover:border-purple-200 group-hover:shadow-sm">
                    {rb.foto_buku ? (
                      <img
                        src={`/file.php?t=covers&f=${rb.foto_buku}`}
                        alt={rb.nama_buku}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <FiBookOpen size={20} className="text-gray-200" />
                    )}
                  </div>

                  <div className="text-center w-full max-w-[160px]">
                    <h3
                      className="text-[11px] md:text-xs font-bold line-clamp-1 transition-colors group-hover:text-purple-700 leading-tight"
                      style={{ color: primaryColor }}
                    >
                      {rb.nama_buku}
                    </h3>
                    <p className="text-[9px] font-medium text-gray-400 mt-0.5 uppercase tracking-tighter truncate">
                      {rb.nama_penulis || "Aksara"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;