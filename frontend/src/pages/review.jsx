import React from 'react';

// --- CONFIGURATION ---
const primaryColor = "#3d2269";
const buttonColor = "#d3a847";

/**
 * Data video review (YouTube Embed)
 */
const videoReviews = [
  { id: 1, src: "https://www.youtube.com/embed/9GumGhmKVVo" },
  { id: 2, src: "https://www.youtube.com/embed/fA93cEE-frg" },
  { id: 3, src: "https://www.youtube.com/embed/fqyB5U9dnk4" },
];

/**
 * Review Section
 */
const ReviewSection = () => {
  return (
    <section
      className="bg-gray-50 py-16 sm:py-24"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* TITLE */}
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          style={{ color: primaryColor }}
        >
          Dengar Kisah Sukses Mereka
        </h2>

        {/* SUBTITLE */}
        <p className="text-lg text-gray-600 mb-14 max-w-3xl mx-auto">
          Testimoni inspiratif dari para penulis yang telah berkolaborasi dengan Aksara.
        </p>

        {/* VIDEO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {videoReviews.map((video) => (
            <div key={video.id} className="w-full">

              <div
                className="relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                style={{
                  paddingTop: '133.33%', // Aspect Ratio 3:4
                  border: `1px solid rgba(61, 34, 105, 0.15)`
                }}
              >
                <iframe
                  src={`${video.src}?controls=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>

            </div>
          ))}
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
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="min-h-screen antialiased">
        <ReviewSection />
      </div>
    </>
  );
};

export default Review;
