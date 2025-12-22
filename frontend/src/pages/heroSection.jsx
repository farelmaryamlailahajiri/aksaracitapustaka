import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight, ChevronRight } from "lucide-react";

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

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center bg-gradient-to-br from-white via-purple-50 to-indigo-50 pt-32 pb-20 px-6 overflow-hidden">
        
        {/* BACKGROUND BLUR */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT TEXT */}
          <div className="text-left" data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
              <span style={{ color: primaryColor }}>Bersama Aksara,</span>
              <br />
              <span style={{ color: primaryColor }}>Ciptakan Karya Anda!</span>
            </h1>

            <p className="text-lg md:text-xl mb-10 leading-relaxed text-gray-600">
              Jelajahi koleksi buku kami dan wujudkan kisah Anda menjadi nyata
              bersama penerbit yang tumbuh dari visi dan dedikasi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a
                href="https://wa.me/6285183220443"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white shadow-lg transition-all hover:shadow-xl"
                style={{ backgroundColor: goldColor }}
              >
                Mulai Penerbitan
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="/service"
                className="inline-flex items-center gap-2 px-6 py-4 font-semibold text-gray-700 hover:text-gray-900 transition"
              >
                <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                  <ChevronRight className="w-5 h-5" />
                </div>
                Lihat Layanan
              </a>
            </div>
          </div>

          {/* RIGHT — FOUNDER CARD */}
          <div data-aos="fade-up" data-aos-delay="150">
            <div className="border border-gray-200 rounded-xl shadow-md overflow-hidden bg-white">
              
              {/* IMAGE */}
              <div className="w-full h-[360px] bg-gray-50 flex items-center justify-center">
                <img
                  src="/assets/hero.webp"
                  alt="Founder Aksara Cita Pustaka"
                  className="w-full h-full object-contain p-4"
                  onError={(e) =>
                    (e.target.src =
                      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600")
                  }
                />
              </div>

              {/* CAPTION */}
              <div className="px-6 py-4 border-t text-center">
                <p className="font-semibold text-gray-900">
                  Founder Aksara Cita Pustaka
                </p>
                <p className="text-sm text-gray-500">
                  Membangun literasi melalui karya bermakna
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOK SHOWCASE */}
      <section className="bg-gradient-to-b from-white via-purple-50/20 to-white pt-10 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-12" data-aos="fade-up">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: primaryColor }}
            >
              Koleksi Buku Kami
            </h2>
            <p className="text-gray-600 text-sm">
              Karya yang telah diterbitkan bersama Aksara Cita Pustaka
            </p>
          </div>

          <div className="overflow-hidden">
            <div className="flex animate-scroll">
              {[...bookImages, ...bookImages].map((book, idx) => (
                <div key={idx} className="mx-3 flex-shrink-0">
                  <div className="w-36 h-52 md:w-40 md:h-56 bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={book.src}
                      alt={book.alt}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 80s linear infinite;
            width: max-content;
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
