import React, { useEffect } from "react";
import Header from "./components/header"; // Pastikan nama file adalah Header.jsx
import LandingPage from "./sections/landingpage";
import AboutUsSection from "./sections/aboutUs"; // Mengganti 'aboutUs' menjadi 'AboutUsSection' agar konsisten
import Footer from "./components/footer";

// Import AOS dan CSS-nya
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    // Inisialisasi AOS (Animate On Scroll)
    AOS.init({
      duration: 500, // Durasi animasi lebih cepat
      offset: 100, // Mulai animasi 100px sebelum elemen terlihat
      once: true, // Animasi hanya berjalan sekali
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    // Memastikan overflow-x-hidden untuk mencegah scroll horizontal karena AOS
    <div className="bg-white min-h-screen text-gray-900 overflow-x-hidden">
      {/* 1. HEADER (Fixed Navigation) */}
      <Header />

      {/* 2. KONTEN UTAMA - Konten di bawah header fixed */}
      <main>
        {/* SECTION 1: HERO/LANDING PAGE (Sudah termasuk pt-20) */}
        <LandingPage />

        {/* SECTION 2: ABOUT US (Bagian dari Halaman Home) */}
        <AboutUsSection />

        {/* Section Home lainnya akan ditambahkan di sini */}
      </main>
      {/* Footer (Fixed Navigation) */}
      <Footer />
    </div>
  );
}

export default App;
