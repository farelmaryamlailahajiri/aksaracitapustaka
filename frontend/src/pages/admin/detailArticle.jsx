// src/pages/admin/DetailArticle.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiImage, FiUser, FiCalendar, FiFileText } from "react-icons/fi";

const primaryColor = "#3d2269";

const DetailArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem("admin_token");

        const res = await axios.get(`/api/articles/get.php?id=${id}`, {
          headers: { "X-Auth-Token": token || "" },
        });

        const data = res.data.data;

        if (!data) {
          setErrorMsg("Artikel tidak ditemukan.");
          setArticle(null);
          return;
        }

        setArticle(data);
      } catch (err) {
        console.error("Gagal fetch artikel:", err);
        setErrorMsg(
          err.response?.data?.message ||
          "Gagal memuat artikel. Pastikan ID valid dan API berfungsi."
        );
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchArticle();
  }, [id]);

  // Loading State
  if (fetching) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div
          className="w-10 h-10 border-4 border-t-transparent border-solid rounded-full animate-spin mb-3"
          style={{ borderTopColor: primaryColor }}
        ></div>
        <p className="text-sm text-gray-500">Memuat detail artikel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition mb-8"
        >
          <FiArrowLeft size={20} />
          <span>Kembali</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          {errorMsg && (
            <div className="mx-8 mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <span className="block sm:inline">{errorMsg}</span>
            </div>
          )}

          {article && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-8">
              {/* KOLOM KIRI: Gambar Cover */}
              <div className="lg:col-span-1 flex flex-col items-center">
                <div className="w-full max-w-[280px] aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-lg mb-6 flex items-center justify-center border">
                  {article.foto_buku ? (
                    <img
                      src={`/file.php?t=articles&f=${article.foto_buku}`}
                      alt={article.nama_buku}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                        e.target.parentElement.innerHTML = `<div class="flex flex-col items-center text-gray-400"><FiImage size={60} /><p class="mt-2 text-sm">Gambar tidak tersedia</p></div>`;
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <FiImage size={60} />
                      <p className="mt-2 text-sm">Tanpa gambar</p>
                    </div>
                  )}
                </div>

                <h1 className="text-2xl font-bold text-center text-gray-900">
                  {article.nama_buku}
                </h1>
                <p className="text-lg text-gray-600 text-center mt-2 flex items-center gap-2">
                  <FiUser />
                  {article.nama_penulis || "Anonim"}
                </p>

                {article.created_at && (
                  <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
                    <FiCalendar size={16} />
                    Dipublikasikan: {new Date(article.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>

              {/* KOLOM KANAN: Isi Artikel */}
              <div className="lg:col-span-2">
                <h2
                  className="text-2xl font-bold mb-6 pb-3 border-b-2"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  Isi Artikel
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {article.isi_articles ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: article.isi_articles.replace(/\n/g, "<br>") }}
                    />
                  ) : (
                    <p className="italic text-gray-500">— Belum ada isi artikel —</p>
                  )}
                </div>

                {/* Informasi Tambahan */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Informasi Artikel
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <DetailItem
                      label="Judul"
                      value={article.nama_buku}
                      icon={<FiFileText />}
                    />
                    <DetailItem
                      label="Penulis"
                      value={article.nama_penulis || "-"}
                      icon={<FiUser />}
                    />
                    <DetailItem
                      label="Tanggal Dibuat"
                      value={
                        article.created_at
                          ? new Date(article.created_at).toLocaleDateString("id-ID")
                          : "-"
                      }
                      icon={<FiCalendar />}
                    />
                    <DetailItem
                      label="Terakhir Diupdate"
                      value={
                        article.updated_at
                          ? new Date(article.updated_at).toLocaleDateString("id-ID")
                          : "-"
                      }
                      icon={<FiCalendar />}
                    />
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

// Komponen kecil untuk baris info
const DetailItem = ({ label, value, icon }) => (
  <div className="flex items-center gap-3">
    <div className="text-gray-500">{icon}</div>
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  </div>
);

export default DetailArticle;