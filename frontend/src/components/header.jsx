import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lock, Menu, X } from 'lucide-react'; // Menggunakan Lucide untuk semua icon
import LoginModal from './LoginModal';

const navLinks = [
  { name: 'BERANDA', to: '/' },
  { name: 'LAYANAN', to: '/service' },
  { name: 'PRODUK', to: '/product' },
  { name: 'ARTIKEL', to: '/article' },
  { name: 'HUBUNGI KAMI', to: '/contact' },
];

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
      <header className="bg-white fixed top-0 w-full z-50 shadow-lg shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                <img className="h-10 w-auto" src="/assets/logo.webp" alt="Aksara Cita Pustaka" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="font-poppins text-sm lg:text-base font-bold uppercase tracking-wider pb-1 border-b-2 transition-all duration-200"
                    style={{
                      color: active ? activeLinkColor : primaryColor,
                      borderColor: active ? activeLinkColor : 'transparent',
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Desktop Login Button - Menggunakan Lucide Lock */}
              <button
                onClick={openLogin}
                className="ml-4 p-2.5 rounded-xl text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-md hover:shadow-purple-200"
                style={{ backgroundColor: primaryColor }}
                title="Login Admin"
              >
                <Lock size={20} strokeWidth={2.5} />
              </button>
            </nav>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: primaryColor }}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-2xl z-40 border-t border-gray-100">
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-lg font-bold uppercase rounded-xl px-4 transition-all"
                    style={{
                      color: active ? activeLinkColor : primaryColor,
                      backgroundColor: active ? 'rgba(211, 168, 71, 0.05)' : 'transparent',
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <button
                onClick={openLogin}
                className="w-full mt-4 py-4 rounded-xl text-white font-bold uppercase text-base shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
                style={{ backgroundColor: primaryColor }}
              >
                <Lock size={20} strokeWidth={2.5} />
                LOGIN ADMIN
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