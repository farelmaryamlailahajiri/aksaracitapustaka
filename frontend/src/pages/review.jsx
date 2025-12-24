import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// --- CONFIGURATION ---
const primaryColor = "#3d2269";

/**
 * Review Section - Single Video Version (Compact Size)
 */
const ReviewSection = () => {
  // Inisialisasi AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Satu sumber video terpilih
  const videoSrc = "https://www.youtube.com/embed/CQol74TelxU";

  return (
    <section
      className="bg-white py-20 px-6 overflow-x-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Dengar Kisah Sukses Mereka
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-6"></div>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Testimoni inspiratif dari penulis yang telah berkolaborasi dengan kami
          </p>
        </div>

        {/* SINGLE VIDEO DISPLAY - UKURAN DIKECILKAN */}
        <div
          className="flex justify-center"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          {/* Menggunakan max-w-2xl (~672px) agar video tampil manis di tengah */}
          <div className="relative w-full max-w-2xl shadow-xl rounded-2xl overflow-hidden border border-gray-100">
            <div
              className="relative overflow-hidden bg-black"
              style={{
                paddingTop: "56.25%", // Tetap menjaga Aspect Ratio 16:9
              }}
            >
              <iframe
                src={`${videoSrc}?modestbranding=1&rel=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                title="Video testimoni sukses"
              />
            </div>
          </div>
        </div>

        {/* FOOTER TEXT */}
        <div
          className="mt-10 text-center"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <p className="text-gray-400 text-sm italic">
            "Membantu Anda menerbitkan karya terbaik."
          </p>
        </div>
      </div>
    </section>
  );
};

/**
 * Main Review Page
 */
const Review = () => {
  return (
    <div className="min-h-screen antialiased bg-white">
      <ReviewSection />
    </div>
  );
};

export default Review;
