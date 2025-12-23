import React from "react";

// --- CONFIGURATION ---
const primaryColor = "#3d2269";

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
      className="bg-white py-20 px-6"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER - SAMA DENGAN ABOUT US */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: primaryColor }}
          >
            Dengar Kisah Sukses Mereka
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-6"></div>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Testimoni inspiratif dari para penulis yang telah berkolaborasi
            dengan kami
          </p>
        </div>

        {/* VIDEO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videoReviews.map((video) => (
            <div key={video.id} className="flex flex-col items-center">
              <div className="relative w-full">
                <div
                  className="relative overflow-hidden rounded-lg bg-white shadow-sm border border-gray-100"
                  style={{
                    paddingTop: "56.25%", // Aspect Ratio 16:9
                  }}
                >
                  <iframe
                    src={`${video.src}?modestbranding=1&rel=0`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    title={`Video testimoni ${video.id}`}
                  />
                </div>
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
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="min-h-screen antialiased">
        <ReviewSection />
      </div>
    </>
  );
};

export default Review;
