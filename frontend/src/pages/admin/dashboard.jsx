// src/pages/admin/dashboard.jsx (VERSI FINAL & SEMPURNA)
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
} from "react-icons/fi";

const API_URL = "/api";
const primaryColor = "#3d2269";
const buttonColor = "#d3a847";
const lightPurple = "rgba(230, 204, 255, 0.6)";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("books");
  const [books, setBooks] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
      setArticles(
        Array.isArray(articlesRes.data?.data) ? articlesRes.data.data : []
      );
    } catch (err) {
      console.error("Load Data Error:", err.response || err);
      if (err.response?.status === 401) {
        localStorage.removeItem("admin_token");
        alert("Sesi berakhir. Silakan login kembali.");
        navigate("/");
      } else {
        alert(
          "Gagal memuat data: " + (err.response?.data?.message || err.message)
        );
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

      alert(`"${itemToDelete.nama}" berhasil dihapus!`);
      setShowDeleteModal(false);
      setItemToDelete(null);
      loadData();
    } catch (err) {
      alert(
        "Gagal menghapus: " + (err.response?.data?.message || "Server error")
      );
    } finally {
      setDeleting(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-purple-600 border-gray-200 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.webp" alt="Logo" className="h-10" />
            <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
              Dashboard Admin
            </h1>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* TABS */}
        <div className="flex border-b mb-8">
          <button
            onClick={() => setActiveMenu("books")}
            className={`px-8 py-4 font-medium flex items-center gap-3 transition ${
              activeMenu === "books"
                ? "text-purple-700 border-b-4 border-purple-700"
                : "text-gray-600"
            }`}
          >
            <FiBook size={20} />
            Buku{" "}
            <span className="ml-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              {books.length}
            </span>
          </button>
          <button
            onClick={() => setActiveMenu("articles")}
            className={`px-8 py-4 font-medium flex items-center gap-3 transition ${
              activeMenu === "articles"
                ? "text-purple-700 border-b-4 border-purple-700"
                : "text-gray-600"
            }`}
          >
            <FiFileText size={20} />
            Artikel{" "}
            <span className="ml-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              {articles.length}
            </span>
          </button>
        </div>

        {/* HEADER + TOMBOL TAMBAH */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {activeMenu === "books" ? "Daftar Buku" : "Daftar Artikel"}
            </h2>
            <p className="text-gray-600">
              Total: {activeMenu === "books" ? books.length : articles.length}{" "}
              item
            </p>
          </div>
          <Link
            to={
              activeMenu === "books" ? "/admin/add-book" : "/admin/add-article"
            }
            className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition shadow"
          >
            <FiPlus size={20} />
            Tambah {activeMenu === "books" ? "Buku" : "Artikel"}
          </Link>
        </div>

        {/* TABEL BUKU */}
        {activeMenu === "books" &&
          (books.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-300">
              <FiBook size={60} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">
                Belum ada buku
              </h3>
              <Link
                to="/admin/add-book"
                className="mt-4 inline-block px-6 py-3 bg-yellow-500 text-white rounded-lg"
              >
                Tambah Buku Pertama
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 font-medium text-gray-700 border-b">
                <div className="col-span-1">No</div>
                <div className="col-span-2">Cover</div>
                <div className="col-span-4">Judul Buku</div>
                <div className="col-span-2">Penulis</div>
                <div className="col-span-3 text-center">Aksi</div>
              </div>
              {books.map((b, i) => (
                <div
                  key={b.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 border-b items-center"
                >
                  <div className="col-span-1 text-gray-600">{i + 1}</div>
                  <div className="col-span-2">
                    {b.foto_buku ? (
                      <img
                        src={`/file.php?t=covers&f=${b.foto_buku}`}
                        alt=""
                        className="w-16 h-20 object-cover rounded shadow"
                      />
                    ) : (
                      <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center">
                        <FiImage className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="col-span-4">
                    <p className="font-medium">{b.nama_buku}</p>
                    {b.harga_buku && (
                      <p className="text-green-600 font-medium">
                        Rp {Number(b.harga_buku).toLocaleString("id-ID")}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2 text-gray-600">
                    {b.nama_penulis || "-"}
                  </div>
                  <div className="col-span-3 flex gap-2 justify-center">
                    <Link
                      to={`/admin/detail-book/${b.id}`}
                      className="p-2 bg-amber-100 text-amber-700 rounded hover:bg-amber-200"
                    >
                      <FiEye size={18} />
                    </Link>
                    <Link
                      to={`/admin/edit-book/${b.id}`}
                      className="p-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                    >
                      <FiEdit2 size={18} />
                    </Link>
                    <button
                      onClick={() => confirmDelete("books", b.id, b.nama_buku)}
                      className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}

        {/* TABEL ARTIKEL — SEKARANG ADA COVER + DETAIL */}
        {activeMenu === "articles" &&
          (articles.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-300">
              <FiFileText size={60} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">
                Belum ada artikel
              </h3>
              <Link
                to="/admin/add-article"
                className="mt-4 inline-block px-6 py-3 bg-yellow-500 text-white rounded-lg"
              >
                Tambah Artikel Pertama
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 font-medium text-gray-700 border-b">
                <div className="col-span-1">No</div>
                <div className="col-span-2">Cover</div>
                <div className="col-span-5">Judul Artikel</div>
                <div className="col-span-2">Penulis</div>
                <div className="col-span-2 text-center">Aksi</div>
              </div>
              {articles.map((a, i) => (
                <div
                  key={a.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 border-b items-center"
                >
                  <div className="col-span-1 text-gray-600">{i + 1}</div>
                  <div className="col-span-2">
                    {a.foto_buku ? (
                      <img
                        src={`/file.php?t=articles&f=${a.foto_buku}`}
                        alt={a.nama_buku}
                        className="w-16 h-20 object-cover rounded shadow"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML =
                            '<div class="w-16 h-20 bg-gray-200 rounded flex items-center justify-center"><FiImage class="text-gray-400" /></div>';
                        }}
                      />
                    ) : (
                      <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center">
                        <FiImage className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="col-span-5">
                    <p className="font-medium line-clamp-2">{a.nama_buku}</p>
                  </div>
                  <div className="col-span-2 text-gray-600">
                    {a.nama_penulis || "-"}
                  </div>
                  <div className="col-span-2 flex gap-2 justify-center">
                    {/* LIHAT DETAIL ARTIKEL */}
                    <Link
                      to={`/admin/detail-article/${a.id}`}
                      className="p-2 bg-amber-100 text-amber-700 rounded hover:bg-amber-200"
                      title="Lihat Detail"
                    >
                      <FiEye size={18} />
                    </Link>
                    <Link
                      to={`/admin/edit-article/${a.id}`}
                      className="p-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                    >
                      <FiEdit2 size={18} />
                    </Link>
                    <button
                      onClick={() =>
                        confirmDelete("articles", a.id, a.nama_buku)
                      }
                      className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>

      {/* MODAL HAPUS (tetap sama) */}
      {showDeleteModal && itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="bg-red-50 px-6 py-4 rounded-t-xl flex justify-between items-center border-b">
              <div className="flex items-center gap-3">
                <FiAlertTriangle className="text-red-600" size={28} />
                <h3 className="text-xl font-bold text-red-700">
                  Konfirmasi Hapus
                </h3>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                Yakin ingin menghapus{" "}
                <strong>
                  {itemToDelete.tipe === "books" ? "buku" : "artikel"}
                </strong>{" "}
                ini?
              </p>
              <p className="mt-3 text-lg font-bold text-gray-900">
                "{itemToDelete.nama}"
              </p>
              <p className="text-sm text-red-600 mt-4">
                Tindakan ini tidak dapat dibatalkan!
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Batal
              </button>
              <button
                onClick={executeDelete}
                disabled={deleting}
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                {deleting ? "Menghapus..." : "Hapus Permanen"}
                {!deleting && <FiTrash2 />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
