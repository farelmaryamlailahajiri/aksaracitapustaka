import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { 
  FiArrowLeft, 
  FiImage, 
  FiFileText, 
  FiBook, 
  FiUser, 
  FiCalendar, 
  FiDollarSign, 
  FiHash,
  FiMaximize,
  FiEdit2
} from 'react-icons/fi';

const API_URL = "/api";
const primaryColor = "#3d2269";
const accentColor = "#d3a847";
const textSecondary = "#5a4b81";

const DetailBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await axios.get(`${API_URL}/books/get.php?id=${id}`, {
          headers: { "X-Auth-Token": token || "" },
        });

        const fetchedBook = res.data.data;
        if (!fetchedBook || Array.isArray(fetchedBook)) {
          setErrorMsg("Buku tidak ditemukan.");
          setBook(null);
          return;
        }
        setBook(fetchedBook);
      } catch (err) {
        setErrorMsg("Gagal memuat data buku.");
      } finally {
        setFetching(false);
      }
    };
    fetchBook();
  }, [id]);

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Tombol Navigasi */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-sm font-bold transition-colors"
            style={{ color: textSecondary }}
          >
            <FiArrowLeft /> Kembali ke Dashboard
          </button>
          
          {book && (
            <Link
              to={`/admin/edit-book/${book.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-sm font-bold hover:bg-amber-100 transition-all"
            >
              <FiEdit2 size={16} /> Edit Data
            </Link>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {errorMsg ? (
            <div className="p-12 text-center">
              <FiAlertTriangle size={48} className="mx-auto text-red-400 mb-4" />
              <p className="text-slate-600 font-medium">{errorMsg}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* SISI KIRI: VISUAL */}
              <div className="lg:col-span-4 p-8 md:p-12 bg-slate-50 flex flex-col items-center border-r border-slate-100">
                <div className="w-full max-w-[220px] aspect-[3/4.5] bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200 flex items-center justify-center mb-8">
                  {book.foto_buku ? (
                    <img
                      src={`/file.php?t=covers&f=${book.foto_buku}`}
                      alt={book.nama_buku}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <FiImage size={48} className="text-slate-200" />
                  )}
                </div>
                
                {book.preview_pdf && (
                  <a
                    href={`/file.php?t=previews&f=${book.preview_pdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-red-50 text-red-600 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-red-100 transition-all shadow-sm"
                  >
                    <FiFileText size={16} /> Lihat Preview PDF
                  </a>
                )}
                
                <div className="mt-8 text-center">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">ID Sistem</p>
                   <p className="text-sm font-mono font-bold" style={{ color: primaryColor }}>#{book.id}</p>
                </div>
              </div>

              {/* SISI KANAN: INFORMASI */}
              <div className="lg:col-span-8 p-8 md:p-12">
                <div className="mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentColor }}>Informasi Katalog</span>
                  <h1 className="text-3xl font-black mt-2 mb-2 leading-tight" style={{ color: primaryColor }}>{book.nama_buku}</h1>
                  <p className="text-lg font-bold" style={{ color: textSecondary }}>{book.nama_penulis || 'Penulis Tidak Terdaftar'}</p>
                  
                  {book.harga_buku && (
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl font-black text-xl" style={{ color: primaryColor }}>
                      <FiDollarSign className="text-purple-400" />
                      Rp {Number(book.harga_buku).toLocaleString('id-ID')}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 py-8 border-y border-slate-100">
                  <InfoRow label="ISBN / No. Seri" value={book.isbn} icon={<FiHash />} />
                  <InfoRow label="Tahun Terbit" value={book.tahun_terbit} icon={<FiCalendar />} />
                  <InfoRow label="Jumlah Halaman" value={book.jumlah_halaman ? `${book.jumlah_halaman} Hal` : null} icon={<FiFileText />} />
                  <InfoRow label="Dimensi Buku" value={book.ukuran_buku} icon={<FiMaximize />} />
                  <InfoRow label="Editor" value={book.nama_editor} icon={<FiUser />} />
                  <InfoRow label="Tata Letak" value={book.nama_tata_letak} icon={<FiUser />} />
                </div>

                <div className="mt-10">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4" style={{ color: accentColor }}>Sinopsis / Deskripsi</h4>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <p className="text-sm leading-relaxed text-justify whitespace-pre-line" style={{ color: textSecondary }}>
                      {book.deskripsi_buku || 'Data deskripsi belum ditambahkan oleh admin.'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Komponen Reusable untuk Row Informasi
const InfoRow = ({ label, value, icon }) => (
  <div className="flex items-start gap-4">
    <div className="p-2 rounded-lg bg-white border border-slate-100 text-slate-400 shadow-sm">
      {React.cloneElement(icon, { size: 16 })}
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
      <p className="text-sm font-bold text-slate-700">{value || '—'}</p>
    </div>
  </div>
);

export default DetailBook;