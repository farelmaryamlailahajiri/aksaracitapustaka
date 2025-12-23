import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FiBook,
  FiFileText,
  FiLogOut,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiImage,
  FiEye,
  FiAlertTriangle,
  FiX,
  FiGrid,
} from "react-icons/fi";

// Konfigurasi Warna Sesuai Permintaan
const primaryColor = "#3d2269";
const accentColor = "#d3a847";
const textSecondary = "#5a4b81";
const lightBgColor = "#ffffff";
const API_URL = "/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("books");
  const [books, setBooks] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        navigate("/");
        return;
      }

      const [booksRes, articlesRes] = await Promise.all([
        axios.get(`${API_URL}/books/get.php`, {
          headers: { "X-Auth-Token": token },
        }),
        axios.get(`${API_URL}/articles/get.php`, {
          headers: { "X-Auth-Token": token },
        }),
      ]);

      setBooks(Array.isArray(booksRes.data?.data) ? booksRes.data.data : []);
      setArticles(Array.isArray(articlesRes.data?.data) ? articlesRes.data.data : []);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("admin_token");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const confirmDelete = (tipe, id, nama) => {
    setItemToDelete({ tipe, id, nama });
    setShowDeleteModal(true);
  };

  const executeDelete = async () => {
    if (!itemToDelete) return;
    setDeleting(true);
    try {
      await axios.post(
        `${API_URL}/${itemToDelete.tipe}/delete.php`,
        { id: itemToDelete.id },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": localStorage.getItem("admin_token"),
          },
        }
      );
      setShowDeleteModal(false);
      loadData();
    } catch (err) {
      alert("Gagal menghapus data");
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans" style={{ color: primaryColor }}>
      {/* NAVIGATION BAR */}
      <nav className="bg-white border-b sticky top-0 z-30 shadow-sm" style={{ borderColor: `${primaryColor}20` }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <img src="/assets/logo.webp" alt="Logo" className="h-10" />
            <div className="hidden md:flex items-center gap-2 p-1 rounded-xl" style={{ backgroundColor: `${primaryColor}08` }}>
              <button
                onClick={() => setActiveMenu("books")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeMenu === "books" ? "bg-white shadow-sm" : "opacity-60 hover:opacity-100"
                }`}
                style={{ color: primaryColor }}
              >
                Koleksi Buku
              </button>
              <button
                onClick={() => setActiveMenu("articles")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeMenu === "articles" ? "bg-white shadow-sm" : "opacity-60 hover:opacity-100"
                }`}
                style={{ color: primaryColor }}
              >
                Kelola Artikel
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-2 px-4 py-2 font-bold text-sm transition-colors hover:text-red-600"
            style={{ color: textSecondary }}
          >
            <FiLogOut size={18} /> Keluar
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl border bg-white shadow-sm" style={{ borderColor: `${primaryColor}15` }}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}>
                <FiBook size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: textSecondary }}>Total Buku</p>
                <h3 className="text-2xl font-black">{books.length}</h3>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl border bg-white shadow-sm" style={{ borderColor: `${primaryColor}15` }}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}>
                <FiFileText size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: textSecondary }}>Total Artikel</p>
                <h3 className="text-2xl font-black">{articles.length}</h3>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl shadow-lg flex items-center justify-between" style={{ backgroundColor: primaryColor }}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white opacity-70">Aksi Cepat</p>
              <h3 className="text-white font-bold">Tambah Data Baru</h3>
            </div>
            <Link
              to={activeMenu === "books" ? "/admin/add-book" : "/admin/add-article"}
              className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors"
            >
              <FiPlus size={24} />
            </Link>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor: `${primaryColor}15` }}>
          <div className="px-8 py-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ borderColor: `${primaryColor}10` }}>
            <h2 className="text-xl font-black flex items-center gap-2">
              <FiGrid style={{ color: accentColor }} />
              {activeMenu === "books" ? "Daftar Koleksi Buku" : "Daftar Artikel Literasi"}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] font-black uppercase tracking-wider border-b" style={{ backgroundColor: `${primaryColor}05`, borderColor: `${primaryColor}10`, color: textSecondary }}>
                  <th className="px-8 py-4">No</th>
                  <th className="px-4 py-4">Preview</th>
                  <th className="px-4 py-4">Judul & Detail</th>
                  <th className="px-4 py-4">Penulis</th>
                  <th className="px-8 py-4 text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: `${primaryColor}08` }}>
                {(activeMenu === "books" ? books : articles).map((item, i) => (
                  <tr key={item.id} className="group hover:bg-purple-50/30 transition-colors">
                    <td className="px-8 py-5 text-sm font-bold" style={{ color: textSecondary }}>{i + 1}</td>
                    <td className="px-4 py-5">
                      <div className="w-12 h-16 rounded-lg bg-gray-50 overflow-hidden border flex items-center justify-center shadow-sm" style={{ borderColor: `${primaryColor}10` }}>
                        {item.foto_buku || item.foto_artikel ? (
                          <img
                            src={`/file.php?t=${activeMenu === "books" ? "covers" : "articles"}&f=${item.foto_buku || item.foto_artikel}`}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FiImage style={{ color: `${primaryColor}30` }} />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <p className="font-bold text-base mb-0.5 line-clamp-1">{item.nama_buku || item.judul}</p>
                      {activeMenu === "books" && item.harga_buku && (
                        <p className="text-sm font-bold" style={{ color: accentColor }}>
                          Rp {Number(item.harga_buku).toLocaleString("id-ID")}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-5 text-sm font-semibold" style={{ color: textSecondary }}>{item.nama_penulis || item.penulis || "-"}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          to={`/admin/detail-${activeMenu === "books" ? "book" : "article"}/${item.id}`}
                          className="p-2.5 rounded-xl transition-all hover:bg-blue-50 text-blue-600"
                        >
                          <FiEye size={18} />
                        </Link>
                        <Link
                          to={`/admin/edit-${activeMenu === "books" ? "book" : "article"}/${item.id}`}
                          className="p-2.5 rounded-xl transition-all hover:bg-amber-50 text-amber-600"
                        >
                          <FiEdit2 size={18} />
                        </Link>
                        <button
                          onClick={() => confirmDelete(activeMenu, item.id, item.nama_buku || item.judul)}
                          className="p-2.5 rounded-xl transition-all hover:bg-red-50 text-red-600"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL: LOGOUT */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden border" style={{ borderColor: `${primaryColor}20` }}>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FiLogOut size={32} />
              </div>
              <h3 className="text-xl font-black mb-2" style={{ color: primaryColor }}>Konfirmasi Keluar</h3>
              <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>
                Apakah Anda yakin ingin mengakhiri sesi admin saat ini?
              </p>
            </div>
            <div className="flex border-t" style={{ borderColor: `${primaryColor}10` }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-6 py-4 font-bold hover:bg-gray-50 transition-colors"
                style={{ color: textSecondary }}
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-6 py-4 text-white font-bold hover:opacity-90 transition-colors"
                style={{ backgroundColor: primaryColor }}
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE */}
      {showDeleteModal && itemToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border" style={{ borderColor: `${primaryColor}20` }}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                  <FiAlertTriangle size={32} />
                </div>
                <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <FiX size={24} />
                </button>
              </div>
              <h3 className="text-2xl font-black mb-2" style={{ color: primaryColor }}>Hapus Permanen?</h3>
              <p className="leading-relaxed mb-6" style={{ color: textSecondary }}>
                Data <span className="font-bold">"{itemToDelete.nama}"</span> akan dihapus selamanya. Tindakan ini tidak bisa dibatalkan.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 rounded-xl font-bold hover:bg-gray-200 transition-all"
                  style={{ color: textSecondary }}
                >
                  Batal
                </button>
                <button
                  onClick={executeDelete}
                  disabled={deleting}
                  className="flex-1 px-6 py-3 text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                  style={{ backgroundColor: "#dc2626" }}
                >
                  {deleting ? "Menghapus..." : "Ya, Hapus"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;