// src/pages/admin/EditBook.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    nama_buku: '', nama_penulis: '', nama_tata_letak: '', nama_editor: '',
    isbn: '', jumlah_halaman: '', ukuran_buku: '', deskripsi_buku: '',
    harga_buku: '', tahun_terbit: '', foto_buku: null, preview_pdf: null
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/api/books/get.php?id=${id}`);
        const book = res.data[0];
        if (book) setForm({ ...book, foto_buku: null, preview_pdf: null });
      } catch (err) {
        alert('Gagal ambil data buku');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const data = new FormData();
    data.append('id', id);
    Object.keys(form).forEach(key => {
      if (form[key] !== null && form[key] !== '') {
        data.append(key, form[key]);
      }
    });

    try {
      await axios.post('/api/books/update.php', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Auth-Token': localStorage.getItem('admin_token')
        }
      });
      alert('Buku berhasil diperbarui!');
      navigate('/admin');
    } catch (err) {
      alert('Gagal update: ' + (err.response?.data?.message || 'Error'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#3d2269] mb-8">Edit Buku</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SEMUA FIELD SAMA SEPERTI AddBook – tinggal copy dari atas */}
          {/* Hanya beda: value={form.xxx} */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Buku *</label>
            <input type="text" name="nama_buku" value={form.nama_buku} required onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Penulis *</label>
            <input type="text" name="nama_penulis" value={form.nama_penulis} required onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg" />
          </div>
          {/* ... (sisa field sama seperti AddBook, cuma tambah value={form.xxx}) ... */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Saat Ini</label>
            {form.foto_buku !== null ? (
              <img src={`/backend/file.php?t=covers&f=${form.foto_buku}`} className="w-32 h-32 object-cover rounded" />
            ) : <p>Tanpa cover</p>}
            <input type="file" name="foto_buku" accept="image/*" onChange={handleChange} className="mt-2 w-full" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ganti Preview PDF</label>
            <input type="file" name="preview_pdf" accept=".pdf" onChange={handleChange} className="w-full" />
          </div>

          <div className="md:col-span-2 flex gap-4 mt-6">
            <button type="submit" disabled={saving}
              className="px-8 py-4 bg-[#3d2269] text-white font-bold rounded-lg hover:bg-[#2d1850] disabled:opacity-70">
              {saving ? 'Menyimpan...' : 'UPDATE BUKU'}
            </button>
            <button type="button" onClick={() => navigate('/admin')}
              className="px-8 py-4 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600">
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;