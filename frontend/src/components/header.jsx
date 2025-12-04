import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginModal from './LoginModal';

// Navigasi
const navLinks = [
  { name: 'BERANDA', to: '/' },
  { name: 'LAYANAN', to: '/service' },
  { name: 'PRODUK', to: '/product' },
  { name: 'ARTIKEL', to: '/article' },
  { name: 'HUBUNGI KAMI', to: '/contact' },
];

const LockIcon = ({ color = 'white' }) => (
  <svg className="h-6 w-6" fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M12 15v2m-6-6v4h12V11a6 6 0 00-12 0z M12 11V9a3 3 0 00-6 0v2h6z" />
  </svg>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();

  const primaryColor = '#3d2269';
  const activeLinkColor = '#d3a847';

  const isActive = (path) => location.pathname === path;

  const openLogin = () => {
    setIsLoginModalOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <header className="bg-white fixed top-0 w-full z-50 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                <img className="h-10 w-auto" src="/assets/logo.webp" alt="Aksara Cita Pustaka" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="font-poppins text-lg font-bold uppercase tracking-wider pb-1 border-b-4 transition-all duration-200"
                    style={{
                      color: active ? activeLinkColor : primaryColor,
                      borderColor: active ? activeLinkColor : 'transparent',
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Desktop Login Button */}
              <button
                onClick={openLogin}
                className="ml-8 p-3 rounded-full shadow-lg hover:scale-110 transition transform duration-200"
                style={{ backgroundColor: primaryColor }}
                aria-label="Login Admin"
              >
                <LockIcon />
              </button>
            </nav>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-800"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-2xl z-40">
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-xl font-bold uppercase rounded-md transition"
                    style={{
                      color: active ? activeLinkColor : primaryColor,
                      backgroundColor: active ? 'rgba(211, 168, 71, 0.1)' : 'transparent',
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <button
                onClick={openLogin}
                className="w-full mt-6 py-4 rounded-lg text-white font-bold uppercase text-lg shadow-lg"
                style={{ backgroundColor: primaryColor }}
              >
                <div className="flex items-center justify-center gap-3">
                  <LockIcon />
                  LOGIN ADMIN
                </div>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;