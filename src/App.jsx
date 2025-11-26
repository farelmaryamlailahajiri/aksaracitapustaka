import React, { useEffect } from "react";
import Header from "./components/header"; 
import LandingPage from "./sections/landingpage";
import AboutUsSection from "./sections/aboutUs"; 
import ReviewSection from "./sections/review";
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
    <div className="bg-white min-h-screen text-gray-900 overflow-x-hidden">
      <Header />
      <main>
        <LandingPage />
        <AboutUsSection />
        <ReviewSection />
      </main>
      {/* Footer (Fixed Navigation) */}
      <Footer />
    </div>
  );
}

export default App;
