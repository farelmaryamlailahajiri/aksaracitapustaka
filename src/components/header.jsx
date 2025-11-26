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

const LockIcon = ({ color }) => (
  <svg 
    className="h-6 w-6" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke={color} 
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M12 15v2m-6-6v4h12V11a6 6 0 00-12 0z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M12 11V9a3 3 0 00-6 0v2h6z" 
    />
  </svg>
);


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const primaryColor = '#3d2269'; 
  const activeLinkColor = '#d3a847'; 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isLinkActive = (linkName) => linkName === 'BERANDA';
  
  const loginIconClasses = `
    p-2 
    rounded-full 
    shadow-md 
    transition duration-200 ease-in-out
    
    // PERBAIKAN: Tambahkan Flexbox untuk penempatan ikon di tengah
    flex items-center justify-center 

    hover:scale-[1.1] hover:shadow-lg
    focus:outline-none focus:ring-2 focus:ring-offset-2 
  `;

  const loginIconStyle = {
    backgroundColor: primaryColor,
    color: 'white', 
  };


  return (
    <header className="bg-white fixed top-0 w-full z-50 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-3">
              <img 
                className="h-10 w-auto" 
                src={logo} 
                alt="Aksara Cita Pustaka Logo"
              />
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8"> 
            <nav>
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
            
            {/* Tombol Login Admin (Desktop) - IKON */}
            <a 
              href="/admin/login" 
              className={`
                ${loginIconClasses} 
                focus:ring-[${primaryColor}]
              `} 
              style={loginIconStyle}
              aria-label="Login Admin"
            >
              {/* Ikon kini dipastikan di tengah karena kelas flex, items-center, dan justify-center */}
              <LockIcon color="white" />
            </a>
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu} 
              type="button"
              className="text-gray-900 hover:text-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      <div 
        className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute w-full bg-white z-40 shadow-xl`} 
        id="mobile-menu"
      >
        <div className="pb-3 pt-0 flex flex-col items-start"> 
          {/* Mobile Links */}
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
          
          {/* Tombol Login Admin (Mobile) - IKON dengan Label Teks */}
          <a 
            href="/admin/login" 
            className={`
              flex items-center justify-start gap-2 // Sudah menggunakan flex yang benar
              mx-4 my-2 px-4 py-3
              rounded-md w-[calc(100%-2rem)] 
              text-white font-bold uppercase
              bg-[${primaryColor}] hover:bg-opacity-90 transition duration-200
            `}
            style={{backgroundColor: primaryColor}} 
            onClick={toggleMenu} 
          >
             <LockIcon color="white" />
             LOGIN ADMIN
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;