// src/pages/admin/DetailBook.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiImage, FiFile, FiBook, FiUser, FiCalendar, FiDollarSign } from 'react-icons/fi';

const primaryColor = "#3d2269";

const DetailBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        
        // Ambil data buku tunggal
        const res = await axios.get(`/api/books/get.php?id=${id}`, {
          headers: { "X-Auth-Token": token || "" },
        });

        const fetchedBook = res.data.data;

        if (!fetchedBook || Array.isArray(fetchedBook)) {
            // Jika backend mengembalikan objek kosong atau array di field data
            setErrorMsg("Buku dengan ID ini tidak ditemukan.");
            setBook(null);
            return;
        }

        setBook(fetchedBook);
      } catch (err) {
        console.error("Gagal fetch data buku:", err.response?.data?.message || err.message || err);
        setErrorMsg("Gagal memuat data buku. Pastikan ID valid dan koneksi API berfungsi.");
      } finally {
        setFetching(false);
      }
    };

    fetchBook();
  }, [id]);

  if (fetching) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-t-primary border-opacity-50 border-solid rounded-full animate-spin mb-3" style={{ borderTopColor: primaryColor }}></div>
        <p className="text-sm text-gray-500">Memuat data detail buku...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin')}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition mb-6"
        >
          <FiArrowLeft size={20} />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8" style={{ color: primaryColor }}>
            Detail Buku
          </h1>

          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              <span className="block sm:inline">{errorMsg}</span>
            </div>
          )}

          {book && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* KOLOM KIRI: COVER */}
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="w-full max-w-[200px] h-[300px] bg-gray-100 rounded-lg overflow-hidden shadow-md mb-4 flex items-center justify-center border">
                  {book.foto_buku ? (
                    <img
                      src={`/file.php?t=covers&f=${book.foto_buku}`}
                      alt={book.nama_buku}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = ''; e.target.parentElement.innerHTML = '<FiImage size={40} class="text-gray-400"/>'; }}
                    />
                  ) : (
                    <FiImage size={40} className="text-gray-400" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800">{book.nama_buku}</h3>
                <p className="text-md text-gray-600 text-center mt-1">oleh {book.nama_penulis || 'Anonim'}</p>

                {book.preview_pdf && (
                  <a
                    href={`/file.php?t=previews&f=${book.preview_pdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
                  >
                    <FiFile size={16} />
                    <span>Lihat Preview PDF</span>
                  </a>
                )}
              </div>

              {/* KOLOM KANAN: DETAIL DATA */}
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-2xl font-semibold border-b pb-2 mb-4" style={{ color: primaryColor }}>Informasi Lengkap</h2>
                
                <DetailItem label="ISBN" value={book.isbn} icon={<FiBook />} />
                <DetailItem label="Harga" value={book.harga_buku ? `Rp ${Number(book.harga_buku).toLocaleString('id-ID')}` : '-'} icon={<FiDollarSign />} />
                <DetailItem label="Penulis" value={book.nama_penulis} icon={<FiUser />} />
                <DetailItem label="Editor" value={book.nama_editor} icon={<FiUser />} />
                <DetailItem label="Tata Letak" value={book.nama_tata_letak} icon={<FiUser />} />
                <DetailItem label="Jumlah Halaman" value={book.jumlah_halaman ? `${book.jumlah_halaman} halaman` : '-'} icon={<FiFile />} />
                <DetailItem label="Ukuran Buku" value={book.ukuran_buku} icon={<FiBook />} />
                <DetailItem label="Tahun Terbit" value={book.tahun_terbit} icon={<FiCalendar />} />
                
                <div className="pt-4 border-t">
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Deskripsi Buku</h4>
                    <p className="text-gray-600 whitespace-pre-wrap">{book.deskripsi_buku || '— Deskripsi belum tersedia —'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Komponen Pembantu untuk Baris Detail
const DetailItem = ({ label, value, icon }) => (
  <div className="flex items-start">
    <div className="text-gray-500 mr-3 mt-1">{icon}</div>
    <div className="flex-1">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-gray-800 font-medium">{value || '-'}</p>
    </div>
  </div>
);

export default DetailBook;