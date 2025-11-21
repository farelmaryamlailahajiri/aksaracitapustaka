// src/components/Header.jsx

import React, { useState } from 'react';
import logo from '../assets/logo.webp'; // Pastikan path ke logo Anda benar

// Data navigasi (DITERJEMAHKAN KE BAHASA INDONESIA)
const navLinks = [
  { name: 'BERANDA', href: '/' },
  { name: 'LAYANAN', href: '/service' },
  { name: 'PRODUK', href: '/product' },
  { name: 'ARTIKEL', href: '/article' },
  { name: 'HUBUNGI KAMI', href: '/contact' },
];

const Header = () => {
  // State untuk mengontrol status menu mobile (buka/tutup)
  const [isOpen, setIsOpen] = useState(false);
  
  // Warna ungu gelap (Primary Color)
  const primaryColor = '#3d2269'; 
  
  // Warna Oranye/Amber kustom untuk link aktif (#d3a847)
  const activeLinkColor = '#d3a847'; 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Logika untuk menentukan link mana yang aktif (sementara: hanya 'BERANDA')
  const isLinkActive = (linkName) => linkName === 'BERANDA';

  return (
    // PERUBAHAN:
    // 1. bg-white shadow-lg shadow-black/20 : Memberikan bayangan hitam transparan
    // 2. fixed top-0 w-full z-50 : Membuat header tetap di atas saat di-scroll
    <header className="bg-white fixed top-0 w-full z-50 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================== */}
        {/* BARIS UTAMA HEADER (LOGOs & ICON TOGGLE) */}
        {/* ========================================================== */}
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand: Kiri */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-3">
              <img 
                className="h-10 w-auto" 
                src={logo} 
                alt="Aksara Cita Pustaka Logo"
              />
            </a>
          </div>

          {/* Navigasi Link: Kanan (Desktop View) */}
          <nav className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.name);

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`
                      font-poppins text-lg font-bold uppercase tracking-wider 
                      transition duration-150
                      ${isActive 
                        ? 'border-b-2 pb-1' 
                        : 'hover:text-amber-500' 
                      }
                    `}
                    style={{ 
                        color: isActive ? activeLinkColor : primaryColor,
                        borderColor: isActive ? activeLinkColor : 'transparent'
                    }} 
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </nav>
          
          {/* Tombol Hamburger/Close: Mobile View (md:hidden) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu} 
              type="button"
              className="text-gray-900 hover:text-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {/* Ikon yang Tampil (Hamburger atau Close) */}
              {isOpen ? (
                // Ikon Close (X) saat menu terbuka
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Ikon Hamburger (Garis Tiga) saat menu tertutup
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================== */}
      {/* MENU MOBILE CONTENT (DROPDOWN) */}
      {/* ========================================================== */}
      <div 
        className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute w-full bg-white z-40 shadow-xl`} 
        id="mobile-menu"
      >
        <div className="pb-3 pt-0">
          {navLinks.map((link) => {
               const isActive = isLinkActive(link.name);
               
               return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`
                    font-poppins block px-4 py-3 text-xl font-bold uppercase 
                    transition duration-150 w-full text-left
                    
                    ${isActive
                      ? 'bg-gray-50' 
                      : 'hover:bg-gray-100'
                    }
                  `}
                  style={{ 
                      color: isActive ? activeLinkColor : primaryColor 
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={toggleMenu} 
                >
                  {link.name}
                </a>
               );
           })}
        </div>
      </div>
    </header>
  );
};

export default Header;