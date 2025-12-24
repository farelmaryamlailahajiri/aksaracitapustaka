import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FiArrowLeft,
  FiShoppingCart,
  FiBookOpen,
  FiEye,
  FiCalendar,
  FiHash,
  FiMaximize,
  FiUser,
  FiFileText,
} from "react-icons/fi";

const primaryColor = "#3d2269";
const accentColor = "#d3a847";
const textSecondary = "#5a4b81";

const ProductDetail = () => {
  const { slugOrId } = useParams();

  const [book, setBook] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slugOrId) return;

    const fetchBook = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `/api/books/get_detail.php?slug=${slugOrId}`
        );
        if (res.data.success && res.data.data) {
          setBook(res.data.data);
        } else {
          setError("Maaf, buku tidak ditemukan.");
        }
      } catch (err) {
        setError("Gagal memuat detail buku.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [slugOrId]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("/api/books/public_get.php");
        if (res.data.success && Array.isArray(res.data.data)) {
          setAllBooks(res.data.data);
        }
      } catch (err) {}
    };
    fetchAllBooks();
  }, []);

  const relatedBooks = allBooks
    .filter((b) => b.id !== book?.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const handlePreview = () => {
    if (book?.preview_pdf) {
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
          className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: primaryColor, borderTopColor: "transparent" }}
        ></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <FiBookOpen size={64} className="text-gray-200 mb-6" />
        <h2 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
          {error || "Buku tidak ditemukan"}
        </h2>
        <Link
          to="/product"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all bg-gray-100 rounded-xl hover:bg-gray-200"
        >
          <FiArrowLeft /> Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigasi Kembali */}
        <div className="mb-8">
          <Link
            to="/product"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#3d2269] transition-colors"
          >
            <FiArrowLeft size={18} />
            <span className="tracking-wide">Kembali ke Katalog</span>
          </Link>
        </div>

        {/* --- GRID UTAMA --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Foto Buku */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24">
              <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-lg p-6">
                <div className="aspect-[3/4] flex items-center justify-center">
                  {book.foto_buku ? (
                    <img
                      src={`/file.php?t=covers&f=${book.foto_buku}`}
                      alt={book.nama_buku}
                      className="w-full h-full object-contain max-h-[480px]"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-300">
                      <FiBookOpen size={80} />
                      <span className="mt-3 text-sm">Cover tidak tersedia</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Detail Buku */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Badge & Judul */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-full mb-4">
                <FiBookOpen size={14} className="text-purple-600" />
                <span className="text-xs font-bold tracking-wider uppercase text-purple-700">
                  Katalog Resmi
                </span>
              </div>

              <h1
                className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
                style={{ color: primaryColor }}
              >
                {book.nama_buku}
              </h1>

              <p className="text-lg font-medium text-gray-700 mb-2">
                {book.nama_penulis || "Penulis tidak tersedia"}
              </p>

              <div className="flex items-center gap-4 mt-6">
                <div
                  className="text-2xl font-bold"
                  style={{ color: primaryColor }}
                >
                  Rp {Number(book.harga_buku).toLocaleString("id-ID")}
                </div>
                {book.isbn && (
                  <div className="text-sm text-gray-500 font-mono bg-gray-100 px-3 py-1 rounded">
                    ISBN: {book.isbn}
                  </div>
                )}
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="https://id.shp.ee/gJ84wYK"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#3d2269] text-white rounded-xl text-sm font-semibold transition-all hover:bg-[#2d1954] active:scale-[0.98] shadow-lg hover:shadow-xl min-w-[180px]"
              >
                <FiShoppingCart size={18} />
                BELI SEKARANG
              </a>

              {book.preview_pdf && (
                <button
                  onClick={handlePreview}
                  className="inline-flex items-center justify-center gap-3 px-8 py-3.5 border-2 rounded-xl text-sm font-semibold transition-all hover:bg-purple-50 active:scale-[0.98] min-w-[180px]"
                  style={{ color: primaryColor, borderColor: primaryColor }}
                >
                  <FiEye size={18} />
                  PREVIEW BUKU
                </button>
              )}
            </div>

            {/* Spesifikasi Detail */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold mb-6 text-gray-800">
                Detail Spesifikasi
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpecItem
                  label="Tahun Terbit"
                  value={book.tahun_terbit}
                  icon={<FiCalendar />}
                />
                <SpecItem
                  label="Jumlah Halaman"
                  value={`${book.jumlah_halaman || "-"} Halaman`}
                  icon={<FiFileText />}
                />
                <SpecItem
                  label="Ukuran Buku"
                  value={book.ukuran_buku}
                  icon={<FiMaximize />}
                />
                <SpecItem
                  label="Editor"
                  value={book.nama_editor}
                  icon={<FiUser />}
                />
                <SpecItem
                  label="Tata Letak"
                  value={book.nama_tata_letak}
                  icon={<FiUser />}
                />
                <SpecItem label="ISBN" value={book.isbn} icon={<FiHash />} />
              </div>
            </div>
          </div>
        </div>

        {/* --- SINOPSIS --- */}
        {book.deskripsi_buku && (
          <div className="mt-16 pt-10 border-t border-gray-200">
            <h3
              className="text-2xl font-bold mb-8"
              style={{ color: primaryColor }}
            >
              Sinopsis
            </h3>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div
                className="text-gray-700 leading-relaxed text-justify whitespace-pre-line"
                style={{ lineHeight: "1.8", fontSize: "1.05rem" }}
              >
                {book.deskripsi_buku}
              </div>
            </div>
          </div>
        )}

        {/* --- REKOMENDASI BUKU (TAMPILAN MINI) --- */}
        {relatedBooks.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Rekomendasi Lainnya
                </h3>
                <p className="text-xs text-gray-500">
                  Mungkin Anda juga tertarik
                </p>
              </div>
              <Link
                to="/product"
                className="text-xs font-bold uppercase tracking-wider text-purple-700 hover:text-purple-800 transition-colors"
              >
                Lihat Semua
              </Link>
            </div>

            {/* Grid dibuat lebih padat: 3 kolom di mobile, 6 kolom di desktop besar */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {relatedBooks.map((rb) => (
                <Link
                  key={rb.id}
                  to={`/product/${rb.slug || rb.id}`}
                  className="group flex flex-col"
                >
                  {/* Container Gambar Mini */}
                  <div className="relative aspect-[3/4.2] bg-slate-50 rounded-xl overflow-hidden mb-2.5 border border-gray-100 group-hover:border-purple-200 group-hover:shadow-md transition-all duration-300">
                    {rb.foto_buku ? (
                      <img
                        src={`/file.php?t=covers&f=${rb.foto_buku}`}
                        alt={rb.nama_buku}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <FiBookOpen size={24} />
                      </div>
                    )}
                  </div>

                  {/* Info Mini */}
                  <div className="px-1">
                    <h4 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors mb-0.5 line-clamp-1 text-[11px] leading-tight">
                      {rb.nama_buku}
                    </h4>
                    <p className="text-[10px] text-gray-500 mb-1 truncate uppercase tracking-tighter">
                      {rb.nama_penulis || "Penulis"}
                    </p>
                    <div className="text-[11px] font-black text-purple-700">
                      Rp {Number(rb.harga_buku).toLocaleString("id-ID")}
                    </div>
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

const SpecItem = ({ label, value, icon }) => (
  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="text-gray-500 mt-0.5">
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
      <p className="text-base font-semibold text-gray-900">
        {value || <span className="text-gray-400">—</span>}
      </p>
    </div>
  </div>
);

export default ProductDetail;
