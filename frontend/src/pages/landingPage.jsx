import React, { useEffect } from 'react';
// Import AOS di LandingPage jika ingin menginisialisasi sekali saja
import AOS from 'aos';
import 'aos/dist/aos.css'; // Pastikan Anda mengimpor CSS AOS

// Import Sections yang membentuk halaman Beranda
import HeroSection from './heroSection';
import AboutUsSection from './aboutUs'; // Komponen yang Anda kirim sebelumnya
import ReviewSection from './review'; // Asumsi nama komponen review

const LandingPage = () => {
    // Inisialisasi AOS hanya sekali saat komponen utama dimuat
    useEffect(() => {
        // Inisialisasi AOS dengan konfigurasi global
        AOS.init({
            duration: 1000,
            once: true, // Animasi hanya terjadi sekali saat scroll ke elemen
        });
    }, []);

    return (
        <div className="landing-page-container">
            {/* 1. Bagian Hero / Jumbotron */}
            <HeroSection />
            
            {/* 2. Section Tentang Kami */}
            <AboutUsSection />
            
            {/* 3. Section Ulasan/Review */}
            <ReviewSection /> 
            
            {/* Anda bisa menambahkan section lain di sini, contoh:
            <ServicesSection />
            <ContactFormSection /> 
            */}
        </div>
    );
};

export default LandingPage;