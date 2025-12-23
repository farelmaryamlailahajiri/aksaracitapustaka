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
      {/* HERO SECTION - Menggunakan pt-28 agar seimbang antara header dan footer */}
      <section className="relative min-h-screen flex flex-col justify-center bg-white pt-28 pb-12 px-6 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* LEFT TEXT */}
          <div className="text-left" data-aos="fade-right">
            {/* mb-4 dikurangi agar teks lebih padat ke atas */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span style={{ color: primaryColor }}>Bersama Aksara,</span>
              <br />
              <span style={{ color: primaryColor }}>Ciptakan Karya Anda!</span>
            </h1>

            {/* mb-6 dikurangi agar tombol naik ke atas */}
            <p className="text-base md:text-lg mb-6 leading-relaxed text-gray-600 max-w-lg">
              Jelajahi koleksi buku kami dan wujudkan kisah Anda menjadi nyata
              bersama penerbit yang tumbuh dari visi dan dedikasi.
            </p>

            {/* BUTTONS - Jarak mt dikurangi agar naik */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a
                href="https://wa.me/6285183220443"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-bold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
                style={{ backgroundColor: goldColor }}
              >
                Mulai Penerbitan
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="/service"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-gray-700 border border-gray-300 transition-all hover:border-gray-400 hover:text-gray-900"
              >
                Lihat Layanan
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* RIGHT — FOUNDER CARD (DIPERKECIL) */}
          <div data-aos="fade-up" data-aos-delay="150" className="mt-6 md:mt-0">
            <div className="max-w-sm mx-auto border border-gray-100 rounded-xl shadow-sm overflow-hidden bg-white">
              {/* IMAGE - Tinggi dikurangi dari h-80 menjadi h-60 agar tidak memotong ke bawah */}
              <div className="w-full h-60 bg-gray-50 flex items-center justify-center p-4">
                <img
                  src="/assets/hero.webp"
                  alt="Founder Aksara Cita Pustaka"
                  className="w-full h-full object-contain"
                  onError={(e) =>
                    (e.target.src =
                      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600")
                  }
                />
              </div>

              {/* CONTENT - Padding dikurangi agar kartu lebih pendek */}
              <div className="px-5 py-4 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-0.5">
                  Iklil Abiyyu Zhafran, A.Md.A.B.
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  Founder Aksara Cita Pustaka
                </p>
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-gray-700 italic text-xs leading-relaxed">
                    "Kami berkomitmen membantu Anda mewujudkan ide-ide besar
                    menjadi nyata!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOK SHOWCASE */}
      <section className="bg-white pt-2 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* mb-16 disesuaikan agar sama dengan section 'Tentang' */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 text-center" // Ukuran disamakan
              style={{ color: primaryColor }}
            >
              Koleksi Buku Kami
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-6"></div>
            {/* text-lg agar sub-judulnya juga terlihat lebih proporsional dengan judul besar */}
            <p className="text-gray-600 text-lg">
              Karya yang telah diterbitkan bersama Aksara Cita Pustaka
            </p>
          </div>

          <div className="overflow-hidden">
            <div className="flex animate-scroll">
              {[...bookImages, ...bookImages].map((book, idx) => (
                <div key={idx} className="mx-3 flex-shrink-0">
                  <div className="w-40 h-56 md:w-48 md:h-64 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={book.src}
                      alt={book.alt}
                      className="w-full h-full object-contain p-3"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 60s linear infinite;
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
