// src/components/Footer.jsx

import React from 'react';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

// Import logo dan aset
import logo from '../assets/logo.webp';
import isbnLogo from '../assets/isbn.webp';
import perpusnasLogo from '../assets/perpusnas.webp';
import ikapiLogo from '../assets/ikapi.webp';
import qrcbn from '../assets/qrcbn.webp';

// Data navigasi yang disederhanakan (DITERJEMAHKAN KE BAHASA INDONESIA)
const quickLinks = [
  { name: 'Beranda', href: '/' },
  { name: 'Layanan', href: '/service' },
  { name: 'Produk', href: '/product' },
  { name: 'Artikel', href: '/article' },
  { name: 'Tentang Kami', href: '/#about-us' },
  { name: 'Hubungi Kami', href: '/contact' },
];

const Footer = () => {
  // Warna ungu gelap (Primary Color)
  const primaryColor = '#3d2269';
  // Warna Oranye/Amber kustom untuk link aktif/aksen (#d3a847)
  const accentColor = '#d3a847';

  // Teks Tahun untuk hak cipta
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* ========================================================== */}
        {/* Konten Utama Footer: 4 Kolom */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 items-start">
          
          {/* Kolom 1-2: Logo, Deskripsi, dan Kontak */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
              <img 
                className="h-10 w-auto" 
                src={logo} 
                alt="Aksara Cita Pustaka Logo"
              />
              <span className="text-xl font-bold tracking-wide" style={{ color: primaryColor }}>
                Aksara Cita Pustaka
              </span>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Mewujudkan kisah dan ilmu Anda menjadi karya nyata. Kami adalah mitra terpercaya dalam penerbitan dan pengembangan literasi profesional.
            </p>
            
            {/* Informasi Kontak */}
            <div className="space-y-2 pt-2">
              <div className="flex items-start space-x-2">
                <MapPinIcon className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: accentColor }} />
                <p className="text-gray-700 text-sm">
                  Jl. Raya Blimbing No. 1, Blimbing, Kec. Paciran, Kab. Lamongan, Jawa Timur. 62264.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="w-4 h-4 flex-shrink-0" style={{ color: accentColor }} />
                <p className="text-gray-700 text-sm">aksaracitapustaka@gmail.com</p>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="w-4 h-4 flex-shrink-0" style={{ color: accentColor }} />
                <p className="text-gray-700 text-sm">+62 851-8322-0443</p>
              </div>
            </div>
          </div>
          
          {/* Kolom 3: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 
              className="text-base font-bold uppercase tracking-wide mb-3" 
              style={{ color: primaryColor }}
            >
              Navigasi Cepat
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 hover:text-gray-900 text-sm transition duration-150 relative inline-block group py-1"
                  >
                    {link.name}
                    <span 
                      className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                      style={{ backgroundColor: accentColor }}
                    ></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Mitra & Legalitas - LOGO DIBESARKAN dan SEJAJAR DENGAN NAVIGASI */}
          <div className="space-y-3">
            <h4 
              className="text-base font-bold uppercase tracking-wide mb-3" 
              style={{ color: primaryColor }}
            >
              Legalitas & Mitra
            </h4>
            
            {/* Card Legalitas - LOGO LEBIH BESAR */}
            <div className="p-4 bg-white rounded-lg border border-purple-200 shadow-sm">
              <p className="text-xs font-medium text-gray-700 mb-4 text-center">
                Terdaftar resmi sebagai anggota:
              </p>
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="flex justify-center">
                  <img 
                    src={isbnLogo} 
                    alt="Logo ISBN" 
                    className="h-12 w-auto object-contain"
                    title="Anggota ISBN"
                  />
                </div>
                <div className="flex justify-center">
                  <img 
                    src={perpusnasLogo} 
                    alt="Logo Perpusnas" 
                    className="h-12 w-auto object-contain"
                    title="Anggota Perpusnas"
                  />
                </div>
                <div className="flex justify-center">
                  <img 
                    src={ikapiLogo} 
                    alt="Logo IKAPI" 
                    className="h-12 w-auto object-contain"
                    title="Anggota IKAPI"
                  />
                </div>
                <div className="flex justify-center">
                  <img 
                    src={qrcbn} 
                    alt="Logo QR CBN" 
                    className="h-12 w-auto object-contain"
                    title="Penerbit Berbasis CBN"
                  />
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* ========================================================== */}
        {/* Hak Cipta (Copyright) */}
        {/* ========================================================== */}
        <div className="mt-8 pt-6 border-t border-purple-100 text-center">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Aksara Cita Pustaka. All rights reserved. 
            <span className="block sm:inline"> | Dikelola oleh CV. Aksara Cita Pustaka.</span>
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;