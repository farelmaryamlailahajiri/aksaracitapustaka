import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

const quickLinks = [
  { name: 'Beranda', to: '/' },
  { name: 'Layanan', to: '/service' },
  { name: 'Produk', to: '/product' },
  { name: 'Artikel', to: '/article' },
  { name: 'Tentang Kami', to: '/#about-us' },
  { name: 'Hubungi Kami', to: '/contact' },
];

const Footer = () => {
  const primaryColor = '#3d2269';
  const accentColor = '#d3a847';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-purple-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Kolom 1-2: Logo + Deskripsi + Kontak */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {/* Ganti src={logo} menjadi src="/assets/logo.webp" */}
              <img className="h-10 w-auto" src="/assets/logo.webp" alt="Aksara Cita Pustaka" />
              <span className="text-xl font-bold" style={{ color: primaryColor }}>
                Aksara Cita Pustaka
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md mb-6">
              Mewujudkan kisah dan ilmu Anda menjadi karya nyata. Kami adalah mitra terpercaya dalam penerbitan dan pengembangan literasi profesional.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 mt-0.5" style={{ color: accentColor }} />
                <p className="text-sm text-gray-700">
                  Jl. Raya Blimbing No. 1, Blimbing, Kec. Paciran,<br />
                  Kab. Lamongan, Jawa Timur 62264
                </p>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5" style={{ color: accentColor }} />
                <span className="text-sm text-gray-700">aksaracitapustaka@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5" style={{ color: accentColor }} />
                <span className="text-sm text-gray-700">+62 851-8322-0443</span>
              </div>
            </div>
          </div>

          {/* Kolom 3: Navigasi Cepat */}
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4" style={{ color: primaryColor }}>
              Navigasi Cepat
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-gray-900 text-sm transition relative inline-block group"
                  >
                    {link.name}
                    <span
                      className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                      style={{ backgroundColor: accentColor }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Legalitas & Mitra */}
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4" style={{ color: primaryColor }}>
              Legalitas & Mitra
            </h4>
            <div className="bg-white p-5 rounded-xl border border-purple-200 shadow-sm">
              <p className="text-xs text-center text-gray-600 mb-4">Terdaftar resmi sebagai anggota:</p>
              <div className="grid grid-cols-2 gap-4">
                {/* Ganti src={isbnLogo} dst. menjadi jalur absolut */}
                <img src="/assets/isbn.webp" alt="ISBN" className="h-12 mx-auto" />
                <img src="/assets/perpusnas.webp" alt="Perpusnas" className="h-12 mx-auto" />
                <img src="/assets/IKAPI.webp" alt="IKAPI" className="h-12 mx-auto" />
                <img src="/assets/qrcbn.webp" alt="QR CBN" className="h-12 mx-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-8 border-t border-purple-200 text-center">
          <p className="text-xs text-gray-500">
            © {currentYear} Aksara Cita Pustaka. All rights reserved. 
            <span className="block sm:inline"> | Dikelola oleh CV. Aksara Cita Pustaka</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;