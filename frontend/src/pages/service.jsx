import React from "react";

const Service = () => {
  const primaryColor = "#3d2269";
  const goldColor = "#d3a847";

  const services = [
    {
      title: "JASA KONSULTASI, PENDAMPINGAN PENYUSUNAN, DAN KONVERSI NASKAH",
      description: "Layanan komprehensif mulai dari konsultasi ide hingga penyusunan naskah siap terbit."
    },
    {
      title: "JASA DESAIN & LAYOUTING BUKU / JURNAL",
      description: "Desain cover dan layout interior profesional untuk buku dan jurnal ilmiah."
    },
    {
      title: "LAYANAN PENERBITAN ISBN / QRCBN BUKU CETAK / E-BOOK",
      description: "Pengurusan ISBN, QRCBN, dan penerbitan buku dalam format cetak maupun digital."
    },
    {
      title: "LAYANAN PENGURUSAN HAK KEKAYAAN INTELEKTUAL (HKI) KEMENTERIAN HUKUM R.I",
      description: "Pendampingan pengurusan HKI untuk melindungi karya intelektual Anda."
    },
    {
      title: "LAYANAN PERCETAKAN BUKU CETAK",
      description: "Percetakan berkualitas dengan berbagai pilihan kertas dan finishing."
    }
  ];

  const packageImages = [
    { src: "/assets/8.webp", alt: "Paket Layanan 1" },
    { src: "/assets/9.webp", alt: "Paket Layanan 2" },
    { src: "/assets/10.webp", alt: "Paket Layanan 3" },
    { src: "/assets/11.webp", alt: "Paket Layanan 4" }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-6 uppercase"
            style={{ color: primaryColor }}
          >
            Layanan
          </h1>
          
          <div className="w-20 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Berbagai layanan profesional untuk membantu mewujudkan karya Anda menjadi buku berkualitas
          </p>
        </div>

        {/* SERVICES LIST - 2 KOLOM GRID */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.slice(0, 4).map((service, index) => (
              <div 
                key={index}
                className="border border-gray-100 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow h-full"
              >
                <div className="flex items-start h-full">
                  <div 
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1"
                    style={{ backgroundColor: goldColor }}
                  >
                    <span className="text-white text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-lg font-bold mb-3 uppercase"
                      style={{ color: primaryColor }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* SERVICE KE-5 DI TENGAH */}
          <div className="mt-6 flex justify-center">
            <div className="border border-gray-100 rounded-lg p-6 md:p-8 bg-white shadow-sm hover:shadow-md transition-shadow max-w-2xl w-full">
              <div className="flex items-start">
                <div 
                  className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-4 md:mr-5 mt-1"
                  style={{ backgroundColor: goldColor }}
                >
                  <span className="text-white font-bold">5</span>
                </div>
                <div className="flex-1">
                  <h3 
                    className="text-lg md:text-xl font-bold mb-3 uppercase"
                    style={{ color: primaryColor }}
                  >
                    {services[4].title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {services[4].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PACKAGE IMAGES - SEKARANG 1 BARIS 2 GAMBAR */}
        <div className="mb-20">
          <h2 
            className="text-3xl font-bold text-center mb-12"
            style={{ color: primaryColor }}
          >
            Paket Layanan Kami
          </h2>
          
          {/* PERUBAHAN DI SINI: Menggunakan grid-cols-2 pada md keatas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {packageImages.map((image, index) => (
              <div 
                key={index}
                className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-gray-50 flex items-center justify-center p-4 md:p-6">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-contain rounded-lg"
                    style={{ maxHeight: "400px" }}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/600x400/EDE9FE/${primaryColor.replace('#', '')}?text=Paket+Layanan+${index + 1}`;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-lg text-gray-600 mb-6 font-medium">
            Siap mewujudkan karya Anda?
          </p>
          <a
            href="https://wa.me/6285183220443"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-lg font-bold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.05]"
            style={{ backgroundColor: goldColor }}
          >
            Konsultasi Gratis Sekarang
            <span className="text-xl">→</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Service;