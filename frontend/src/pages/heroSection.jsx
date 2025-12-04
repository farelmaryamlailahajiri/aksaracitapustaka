// src/components/HeroSection.jsx

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSection = () => {
  const [bookImages] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      src: `/assets/hero/book${i + 1}.png`,
      alt: `Buku ${i + 1}`,
    }))
  );

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const primaryColor = "#3d2269";
  const goldColor = "#d3a847";
  const lightPurple = "rgba(230, 204, 255, 0.6)";

  return (
    <>
      {/* HERO — GRADIENT UNGU HANYA DI BELAKANG JUDUL */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center bg-white pt-32 pb-24 px-6 overflow-hidden">
        
        {/* GRADIENT UNGU — DIPOSISIKAN TEPAT DI TENGAH JUDUL */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10">
          <div
            className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full blur-3xl opacity-60"
            style={{
              background: `radial-gradient(circle, ${lightPurple} 0%, transparent 65%)`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* JUDUL 2 BARIS */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
            style={{ color: primaryColor }}
            data-aos="fade-up"
          >
            Bersama Aksara,
            <br />
            <span className="block mt-2 text-4xl md:text-5xl lg:text-6xl">
              Ciptakan Karya Anda!
            </span>
          </h1>

          <p
            className="text-lg md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto italic leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Jelajahi koleksi buku kami yang menarik dan wujudkan kisahmu menjadi nyata
            dengan layanan penerbitan profesional dari kami
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center" data-aos="fade-up" data-aos-delay="400">
            <a
              href="https://wa.me/6285183220443"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-6 rounded-full text-white font-bold uppercase tracking-wider text-lg shadow-2xl transform hover:scale-105 transition duration-300"
              style={{
                backgroundColor: goldColor,
                boxShadow: "0 15px 35px rgba(211,168,71,0.4), inset 0 -6px 0 rgba(0,0,0,0.2)",
              }}
            >
              Publish Your Book Today
            </a>

            <a
              href="/service"
              className="px-12 py-6 rounded-full font-bold uppercase tracking-wider text-lg border-4 transform hover:scale-105 transition duration-300"
              style={{
                color: primaryColor,
                borderColor: primaryColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#2a1648";
                e.currentTarget.style.borderColor = "#2a1648";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = primaryColor;
                e.currentTarget.style.borderColor = primaryColor;
              }}
            >
              See Our Service
            </a>
          </div>
        </div>
      </section>

      {/* BUKU GESER — UKURAN KECIL & ELEGAN */}
      <section className="relative bg-gradient-to-b from-white to-purple-50 py-24">
        <div className="max-w-screen-2xl mx-auto px-6">
          <h2
            className="text-center text-4xl md:text-5xl font-bold mb-20"
            style={{ color: primaryColor }}
            data-aos="fade-up"
          >
            Koleksi Buku Kami
          </h2>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden">
              <div className="flex animate-scroll">
                {[...bookImages, ...bookImages].map((book, idx) => (
                  <div
                    key={idx}
                    className="mx-4 md:mx-8 flex-shrink-0"
                    data-aos="zoom-in"
                    data-aos-delay={(idx % bookImages.length) * 50}
                  >
                    <div className="w-48 h-72 md:w-56 md:h-80 rounded-2xl shadow-xl overflow-hidden bg-white">
                      <img
                        src={book.src}
                        alt={book.alt}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/224x320/E5E7EB/6B7280?text=Buku")
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            width: max-content;
            animation: scroll 80s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>
    </>
  );
};

export default HeroSection;