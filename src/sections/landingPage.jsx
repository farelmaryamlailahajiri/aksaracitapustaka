import React from "react";

const LandingPage = () => {
  // Warna Ungu Gelap (Primary Color): #3d2269
  const primaryColor = "#3d2269";

  // Warna Amber/Gold untuk tombol utama
  const buttonColor = "#d3a847";

  // Warna untuk gradasi cahaya di belakang judul (lebih terang dari primaryColor)
  const lightPurple = "rgba(230, 204, 255, 0.6)";

  return (
    <section className="relative flex flex-col items-center justify-center text-center bg-white pt-32 pb-10 sm:pt-36 sm:pb-20">
      {/* EFEK GRADASI UNGU DI LATAR BELAKANG JUDUL */}
      <div
        className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 
				w-[700px] h-[300px] rounded-full blur-3xl z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${lightPurple} 0%, rgba(255, 255, 255, 0) 70%)`,
        }}
      ></div>

      <div className="relative z-10 max-w-4xl px-4">
        {/* JUDUL UTAMA */}
        <h1
          className="font-poppins text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
          style={{ color: primaryColor }}
          data-aos="fade-up"
        >
          Bersama Aksara, Ciptakan Karya Anda!
        </h1>

        {/* SUB-TEKS */}
        <p
          className="font-poppins text-xl md:text-2xl italic font-normal mb-10"
          style={{ color: primaryColor }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          jelajahi koleksi buku kami yang menarik dan wujudkan kisahmu menjadi
          nyata <br className="hidden sm:inline" />
          dengan layanan penerbitan profesional dari kami
        </p>

        {/* KELOMPOK BUTTONS */}
        <div
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          data-aos="fade-up" // Tetap menggunakan fade-up
        >
          {/* BUTTON 1: Publish Your Book Today */}
          <a
            href="https://wa.me/6285183220443"
            target="_blank"
            rel="noopener noreferrer"
            className="font-poppins text-base font-bold uppercase tracking-wider px-8 py-4 rounded-full 
						transition duration-300 transform hover:scale-105 hover:bg-amber-600 
						w-full sm:w-auto text-white"
            style={{
              backgroundColor: buttonColor,
              boxShadow: `0px 6px 15px rgba(0, 0, 0, 0.2), inset 0px -4px 0px rgba(0, 0, 0, 0.25)`,
            }}
          >
            Publish Your Book Today
          </a>

          {/* BUTTON 2: See Our Service (Outline/Secondary) */}
          <a
            href="/service"
            className="font-poppins text-base font-bold uppercase tracking-wider px-8 py-4 rounded-full 
						transition duration-300 transform hover:scale-105 w-full sm:w-auto 
						hover:bg-purple-900 hover:text-white border-2"
            style={{
              color: primaryColor,
              borderColor: primaryColor,
              backgroundColor: "transparent",
              boxShadow: `0px 3px 8px rgba(0, 0, 0, 0.1)`,
            }}
          >
            See Our Service
          </a>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
