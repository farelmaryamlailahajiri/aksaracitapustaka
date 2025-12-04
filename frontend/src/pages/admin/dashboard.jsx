// src/pages/admin/dashboard.jsx (FINAL KESELURUHAN)
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiBook, FiFileText, FiLogOut, FiEdit2, FiTrash2, FiPlus, FiImage, FiEye } from 'react-icons/fi';

const API_URL = '/api';
const primaryColor = "#3d2269";
const buttonColor = "#d3a847";
const lightPurple = "rgba(230, 204, 255, 0.6)";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('books');
  const [books, setBooks] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    console.log("--- START loadData ---");

    try {
      const token = localStorage.getItem('admin_token');

      if (!token) {
        console.log("Token not found, redirecting.");
        navigate('/');
        return;
      }

      const [booksRes, articlesRes] = await Promise.all([
        axios.get(`${API_URL}/books/get.php`, {
          headers: { 'X-Auth-Token': token }
        }),
        axios.get(`${API_URL}/articles/get.php`, {
          headers: { 'X-Auth-Token': token }
        })
      ]);

      setBooks(Array.isArray(booksRes.data?.data) ? booksRes.data.data : []);
      setArticles(Array.isArray(articlesRes.data?.data) ? articlesRes.data.data : []);

      console.log(`Buku berhasil dimuat: ${booksRes.data?.data?.length || 0}`);

    } catch (err) {
      console.error("Load Data Error:", err.response || err);
      if (err.response?.status === 401) {
        localStorage.removeItem('admin_token');
        alert('Sesi berakhir. Silakan login kembali.');
        navigate('/');
      } else {
        alert('Gagal memuat data: ' + (err.response?.data?.message || err.message));
      }
    } finally {
      setLoading(false);
      console.log("--- END loadData ---");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const hapus = async (tipe, id, nama) => {
    if (!confirm(`Yakin ingin menghapus "${nama}"?`)) return;

    try {
      await axios.post(
        `${API_URL}/${tipe}/delete.php`,
        { id },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('admin_token')
          }
        }
      );

      alert('Berhasil dihapus!');
      loadData();
    } catch (err) {
      alert('Gagal menghapus: ' + (err.response?.data?.message || 'Server error'));
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-3 border-t-primary border-opacity-50 border-solid rounded-full animate-spin mb-3" style={{ borderTopColor: primaryColor }}></div>
        <p className="text-sm text-gray-500">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img 
                src="/assets/logo.webp" 
                alt="Logo" 
                className="h-8 w-8 object-contain"
              />
              <div>
                <h1 className="text-lg font-semibold" style={{ color: primaryColor }}>
                  Dashboard Admin
                </h1>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-sm rounded-md transition hover:bg-red-50 text-red-600 font-medium"
            >
              <FiLogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TABS */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveMenu('books')}
            className={`px-5 py-3 text-sm font-medium transition relative flex items-center space-x-2 ${activeMenu === 'books' ? 'text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <FiBook size={16} />
            <span>Buku</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${activeMenu === 'books' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
              {books.length}
            </span>
            {activeMenu === 'books' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: primaryColor }}></div>
            )}
          </button>
          <button
            onClick={() => setActiveMenu('articles')}
            className={`px-5 py-3 text-sm font-medium transition relative flex items-center space-x-2 ${activeMenu === 'articles' ? 'text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <FiFileText size={16} />
            <span>Artikel</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${activeMenu === 'articles' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
              {articles.length}
            </span>
            {activeMenu === 'articles' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: primaryColor }}></div>
            )}
          </button>
        </div>

        {/* HEADER & TAMBAH BUTTON */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {activeMenu === 'books' ? 'Daftar Buku' : 'Daftar Artikel'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {activeMenu === 'books' ? `${books.length} buku ditemukan` : `${articles.length} artikel ditemukan`}
              </p>
            </div>
            <Link
              to={activeMenu === 'books' ? '/admin/add-book' : '/admin/add-article'}
              className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium transition hover:opacity-90 text-white shadow-sm"
              style={{ backgroundColor: buttonColor }}
            >
              <FiPlus size={16} />
              <span>Tambah {activeMenu === 'books' ? 'Buku' : 'Artikel'}</span>
            </Link>
          </div>
        </div>

        {/* BOOKS LIST - Table dengan tombol besar */}
        {activeMenu === 'books' && (
          books.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: lightPurple }}>
                <FiBook size={24} style={{ color: primaryColor }} />
              </div>
              <h3 className="text-base font-semibold text-gray-700 mb-2">Belum ada buku</h3>
              <p className="text-sm text-gray-500 mb-4">Tambahkan buku pertama Anda</p>
              <Link
                to="/admin/add-book"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium transition hover:opacity-90 text-white"
                style={{ backgroundColor: buttonColor }}
              >
                <FiPlus size={16} />
                <span>Tambah Buku Pertama</span>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b text-sm font-medium text-gray-700">
                <div className="col-span-1">No</div>
                <div className="col-span-2">Cover</div>
                <div className="col-span-4">Judul Buku</div>
                <div className="col-span-2">Penulis</div>
                <div className="col-span-3">Aksi</div>
              </div>
              
              {/* Table Body */}
              <div className="divide-y">
                {books.map((b, index) => (
                  <div 
                    key={b.id} 
                    className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors items-center text-sm"
                  >
                    <div className="col-span-1 text-gray-500 font-medium">{index + 1}</div>
                    
                    <div className="col-span-2">
                      {b.foto_buku ? (
                        <div className="w-16 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center shadow-sm">
                          <img
                            src={`/file.php?t=covers&f=${b.foto_buku}`}
                            alt={b.nama_buku}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = '<div class="w-16 h-20 flex items-center justify-center bg-gray-100 rounded"><FiImage size={20} class="text-gray-400"/></div>';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-20 flex items-center justify-center bg-gray-100 rounded shadow-sm">
                          <FiImage size={20} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="col-span-4">
                      <div className="font-semibold text-gray-800 line-clamp-2 mb-1">{b.nama_buku}</div>
                      {b.harga_buku && (
                        <div className="text-sm font-medium text-green-600">
                          Rp {Number(b.harga_buku).toLocaleString('id-ID')}
                        </div>
                      )}
                    </div>
                    
                    <div className="col-span-2">
                      <div className="text-gray-600 truncate">{b.nama_penulis || '-'}</div>
                    </div>
                    
                    <div className="col-span-3">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/admin/edit-book/${b.id}`}
                          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition hover:opacity-90 text-white shadow-sm min-w-[100px]"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <FiEdit2 size={16} />
                          <span>Edit</span>
                        </Link>
                        <button
                          onClick={() => hapus('books', b.id, b.nama_buku)}
                          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition hover:bg-red-100 bg-red-50 text-red-600 hover:text-red-700 shadow-sm min-w-[100px]"
                        >
                          <FiTrash2 size={16} />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {/* ARTICLES LIST - Table dengan tombol besar */}
        {activeMenu === 'articles' && (
          articles.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: lightPurple }}>
                <FiFileText size={24} style={{ color: primaryColor }} />
              </div>
              <h3 className="text-base font-semibold text-gray-700 mb-2">Belum ada artikel</h3>
              <p className="text-sm text-gray-500 mb-4">Tambahkan artikel pertama Anda</p>
              <Link
                to="/admin/add-article"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium transition hover:opacity-90 text-white"
                style={{ backgroundColor: buttonColor }}
              >
                <FiPlus size={16} />
                <span>Tambah Artikel Pertama</span>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b text-sm font-medium text-gray-700">
                <div className="col-span-1">No</div>
                <div className="col-span-7">Judul Artikel</div>
                <div className="col-span-2">Penulis</div>
                <div className="col-span-2">Aksi</div>
              </div>
              
              {/* Table Body */}
              <div className="divide-y">
                {articles.map((a, index) => (
                  <div 
                    key={a.id} 
                    className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors items-center text-sm"
                  >
                    <div className="col-span-1 text-gray-500 font-medium">{index + 1}</div>
                    
                    <div className="col-span-7">
                      <div className="font-semibold text-gray-800 line-clamp-2">{a.nama_buku}</div>
                    </div>
                    
                    <div className="col-span-2">
                      <div className="text-gray-600 truncate">{a.nama_penulis || '-'}</div>
                    </div>
                    
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/admin/edit-article/${a.id}`}
                          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition hover:opacity-90 text-white shadow-sm flex-1"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <FiEdit2 size={16} />
                          <span>Edit</span>
                        </Link>
                        <button
                          onClick={() => hapus('articles', a.id, a.nama_buku)}
                          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition hover:bg-red-100 bg-red-50 text-red-600 hover:text-red-700 shadow-sm flex-1"
                        >
                          <FiTrash2 size={16} />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {/* INFO */}
        {(books.length > 0 || articles.length > 0) && (
          <div className="mt-4 text-sm text-gray-500 text-center">
            Menampilkan semua {activeMenu === 'books' ? 'buku' : 'artikel'} ({activeMenu === 'books' ? books.length : articles.length})
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;