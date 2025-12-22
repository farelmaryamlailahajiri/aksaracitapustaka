import React, { useEffect } from "react";
import AOS from "aos";
import { Eye, Target, BookOpen, Sparkles, Users } from "lucide-react";

const AboutUsSection = () => {
  useEffect(() => {
    if (AOS && typeof AOS.refresh === "function") {
      AOS.refresh();
    }
  }, []);

  const primaryColor = "#3d2269";
  const secondaryColor = "#6d28d9";
  const goldColor = "#d3a847";

  const visiItems = [
    "Menjadi penerbit yang berorientasi pada edukasi, memiliki daya saing tinggi, dan menghasilkan karya-karya yang penuh inspirasi.",
    "Menjadi mitra terpercaya dalam layanan penerbitan, pelatihan literasi, dan pengembangan kreativitas yang memberikan dampak positif bagi masyarakat luas.",
  ];

  const misiItems = [
    "Menjadi penerbit yang responsif terhadap kebutuhan dan harapan penulis.",
    "Mendukung penulis dalam menghasilkan karya yang relevan dan inspiratif.",
    "Berkomitmen mencetak karya berkualitas yang dapat diterima dan diapresiasi oleh masyarakat.",
  ];

  return (
    <section
      className="relative py-20 bg-gradient-to-b from-white via-purple-50/20 to-white overflow-hidden"
      id="about-us"
    >
      {/* Background Elements */}
      <div className="absolute top-1/4 left-10 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
            style={{ color: primaryColor }}
          >
            Tentang Aksara Cita Pustaka
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-6"></div>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center leading-relaxed">
            Komitmen kami dalam mendukung setiap penulis mewujudkan
            <br />
            karya terbaik melalui layanan profesional dan kemitraan
            berkelanjutan
          </p>
        </div>

        {/* Main Content - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Image */}
          <div className="relative" data-aos="fade-right">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-20"></div>

            {/* Book Stack Style */}
            <div className="relative">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute w-full h-full rounded-2xl shadow-xl border border-white/30"
                  style={{
                    transform: `translate(${i * 6}px, ${i * 6}px) rotate(${
                      i * 1
                    }deg)`,
                    background:
                      i === 0
                        ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                        : i === 1
                        ? `linear-gradient(135deg, #7c3aed, #a78bfa)`
                        : `linear-gradient(135deg, #f59e0b, ${goldColor})`,
                    opacity: 1 - i * 0.2,
                    zIndex: 3 - i,
                  }}
                />
              ))}

              {/* Main Image */}
              <div
                className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/40 backdrop-blur-sm"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))`,
                  zIndex: 4,
                }}
              >
                <img
                  src="/assets/aboutus.webp"
                  alt="Tentang Aksara Cita Pustaka"
                  className="w-full h-full object-contain p-6"
                />
              </div>
            </div>

            {/* Floating Element */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white shadow-xl border border-purple-100 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="space-y-8" data-aos="fade-left" data-aos-delay="200">
            {/* Introduction */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-purple-100">
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: primaryColor }}
              >
                Siapa Kami
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Aksara Cita Pustaka hadir sejak 2024 untuk membantu penulis
                menerbitkan karya mereka dengan proses yang mudah, transparan,
                dan profesional.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-white to-amber-50 p-6 rounded-2xl shadow-lg border border-amber-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4
                      className="font-bold text-lg"
                      style={{ color: primaryColor }}
                    >
                      Sejak 2024
                    </h4>
                    <div className="w-8 h-1 bg-amber-400 rounded-full mt-1"></div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Pengalaman penerbitan & layanan penulisan profesional.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-2xl shadow-lg border border-purple-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4
                      className="font-bold text-lg"
                      style={{ color: primaryColor }}
                    >
                      Fokus Edukasi
                    </h4>
                    <div className="w-8 h-1 bg-purple-500 rounded-full mt-1"></div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Mendukung penulis akademik dan kreatif berkembang.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div
            className="relative overflow-hidden rounded-3xl p-8 shadow-2xl"
            style={{
              background: `linear-gradient(135deg, rgba(251, 207, 232, 0.2), rgba(244, 114, 182, 0.1))`,
              border: "1px solid rgba(244, 114, 182, 0.2)",
            }}
            data-aos="zoom-in"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>

            <div className="flex items-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mr-5 shadow-lg">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: primaryColor }}
                >
                  Visi Kami
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full mt-2"></div>
              </div>
            </div>

            <ul className="space-y-4 relative z-10">
              {visiItems.map((visi, index) => (
                <li key={index} className="flex items-start group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform">
                    <span className="text-xs font-bold text-pink-600">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                    {visi}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission Card */}
          <div
            className="relative overflow-hidden rounded-3xl p-8 shadow-2xl"
            style={{
              background: `linear-gradient(135deg, rgba(199, 210, 254, 0.2), rgba(129, 140, 248, 0.1))`,
              border: "1px solid rgba(129, 140, 248, 0.2)",
            }}
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-300 to-indigo-400 rounded-full translate-y-16 -translate-x-16 opacity-20"></div>

            <div className="flex items-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mr-5 shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: primaryColor }}
                >
                  Misi Kami
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mt-2"></div>
              </div>
            </div>

            <ul className="space-y-4 relative z-10">
              {misiItems.map((misi, index) => (
                <li key={index} className="flex items-start group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform">
                    <span
                      className="text-xs font-bold"
                      style={{ color: secondaryColor }}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                    {misi}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
