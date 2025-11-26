import React from 'react';

// --- CONFIGURATION ---
// Warna Ungu Gelap (Primary Color): #3d2269
const primaryColor = "#3d2269";
// Warna Amber/Gold untuk tombol utama
const buttonColor = "#d3a847";
// Warna lightPurple telah dihapus karena hanya digunakan di LandingPageSection.

/**
 * Data video review, diubah menjadi link embed YouTube.
 */
const videoReviews = [
    // Link asli: https://youtube.com/shorts/9GumGhmKVVo
    { id: 1, src: "https://www.youtube.com/embed/9GumGhmKVVo" },
    // Link asli: https://youtube.com/shorts/fA93cEE-frg
    { id: 2, src: "https://www.youtube.com/embed/fA93cEE-frg"},
    // Link asli: https://youtube.com/shorts/fqyB5U9dnk4
    { id: 3, src: "https://www.youtube.com/embed/fqyB5U9dnk4"},
    // Video placeholder lainnya telah dihapus karena hanya ada 3 link yang disediakan.
];

/**
 * Komponen Review Section
 */
const ReviewSection = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* JUDUL REVIEW */}
        <h2 
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          style={{ color: primaryColor }}
        >
          Dengar Kisah Sukses Mereka
        </h2>
        
        {/* SUBTITLE REVIEW */}
        <p 
          className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto"
        >
          Testimoni inspiratif dari para penulis yang telah berkolaborasi dengan Aksara.
        </p>
        
        {/* GRID VIDEO CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          {videoReviews.map((video) => (
            <div key={video.id} className="w-full">
              <div 
                className="relative overflow-hidden rounded-xl shadow-xl transition duration-300 hover:shadow-2xl" 
                style={{ 
                  paddingTop: '133.33%', // Aspect Ratio 3:4 (vertikal yang lebih kecil)
                  border: `4px solid ${primaryColor}` 
                }}
              >
                {/* Menggunakan <iframe> untuk embed video YouTube Shorts */}
                <iframe 
                    src={`${video.src}?controls=1`} // Menambahkan controls
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full object-cover"
                ></iframe>
              </div>
              <p className="mt-2 text-sm font-medium" style={{ color: primaryColor }}></p>
            </div>
          ))}
        </div>

        {/* Tombol CTA "Lihat Semua Testimoni" telah dihapus sesuai permintaan. */}
      </div>
    </section>
  );
};


/**
 * Komponen Utama Aplikasi (Review)
 */
const Review = () => {
  return (
    // Memuat font Inter dari Google Fonts
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      <div className="min-h-screen antialiased">
        <ReviewSection />
        {/* Anda bisa menambahkan bagian lain (Footer, dll.) di sini */}
      </div>
    </>
  );
};

export default Review; // Export default adalah Review