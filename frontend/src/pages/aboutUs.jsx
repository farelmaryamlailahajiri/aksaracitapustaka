import React, { useEffect } from "react";
import AOS from "aos";
import {
  EyeIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  LightBulbIcon,
  HeartIcon
} from "@heroicons/react/24/solid";

const AboutUsSection = () => {
  useEffect(() => {
    console.log("AboutUsSection mounted");
    if (AOS && typeof AOS.refresh === "function") {
      AOS.refresh();
    }
  }, []);

  const primaryColor = "#3d2269";
  const accentColor = "#d3a847";
  const lightBgColor = "#f8f9fa";

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
      className="py-16 sm:py-20 bg-white"
      id="about-us"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Compact Version */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-purple-50 mb-4 border border-purple-100">
            <span 
              className="text-base font-bold uppercase tracking-wider"
              style={{ color: primaryColor }}
            >
              Tentang Kami
            </span>
          </div>
          
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ color: primaryColor }}
          >
            Penerbitan Profesional, <br className="hidden sm:block" />
            Kemitraan Terpercaya
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mx-auto mb-4"></div>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Komitmen kami dalam mendukung setiap penulis mewujudkan karya terbaik mereka
            dengan layanan profesional dan kemitraan yang berkelanjutan.
          </p>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            {/* Introduction Card */}
            <div className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-xl shadow-sm border border-purple-100">
              <h3 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>
                Siapa Kami
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Aksara Cita Pustaka hadir sejak 2024 untuk membantu penulis
                menerbitkan karya mereka dengan proses yang mudah, transparan,
                dan profesional.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-br from-white to-amber-50 border border-amber-100 shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <BriefcaseIcon className="w-5 h-5" style={{ color: accentColor }} />
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1" style={{ color: primaryColor }}>
                    Sejak 2024
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Pengalaman penerbitan & layanan penulisan profesional.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-br from-white to-purple-50 border border-purple-100 shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <LightBulbIcon className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1" style={{ color: primaryColor }}>
                    Fokus Edukasi
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Mendukung penulis akademik dan kreatif berkembang.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="flex justify-center">
            <div className="relative max-w-md">
              <div className="absolute -inset-3 bg-gradient-to-br from-purple-50 to-amber-50 rounded-xl transform rotate-2 opacity-70"></div>
              <img
                src="/assets/aboutus.webp"
                alt="Tentang Aksara Cita Pustaka"
                className="relative rounded-lg shadow-lg w-full border-4 border-white"
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Vision Card */}
          <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl shadow-md border border-amber-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mr-4 shadow-md">
                <EyeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: primaryColor }}>Visi Kami</h3>
                <div className="w-10 h-1 bg-amber-500 rounded-full mt-1"></div>
              </div>
            </div>
            
            <ul className="space-y-3">
              {visiItems.map((visi, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-3 mt-1">
                    <HeartIcon className="w-3 h-3" style={{ color: accentColor }} />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {visi}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission Card */}
          <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-md border border-purple-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-4 shadow-md">
                <CheckCircleIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: primaryColor }}>
                  Misi Kami
                </h3>
                <div className="w-10 h-1 bg-purple-500 rounded-full mt-1"></div>
              </div>
            </div>
            
            <ul className="space-y-3">
              {misiItems.map((misi, index) => (
                <li key={index} className="flex items-start">
                  <div 
                    className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-1"
                  >
                    <span className="text-xs font-bold" style={{ color: primaryColor }}>
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
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