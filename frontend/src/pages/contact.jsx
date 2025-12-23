import React from "react";

const Contact = () => {
  const primaryColor = "#3d2269";
  const goldColor = "#d3a847";

  const contacts = [
    {
      type: "WhatsApp",
      value: "+62 851 8322 0443",
      link: "https://wa.me/6285183220443",
      description: "Hubungi kami via WhatsApp untuk konsultasi cepat",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      type: "Email",
      value: "aksaracitapustaka@gmail.com",
      link: "mailto:aksaracitapustaka@gmail.com",
      description: "Kirimkan pertanyaan atau proposal Anda via email",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      )
    },
    {
      type: "Instagram",
      value: "@aksaracitapustaka",
      link: "https://www.instagram.com/aksaracitapustaka",
      description: "Ikuti update dan karya terbaru kami di Instagram",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      type: "Alamat",
      value: "Jl. Bareng Tengah V No.788, Bareng, Kec. Klojen, Kota Malang, Jawa Timur 65116",
      link: "https://maps.google.com/?q=Jl.+Bareng+Tengah+V+No.788+Bareng+Klojen+Malang",
      description: "Kunjungi kantor kami di Malang",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  const mapUrl = "https://maps.google.com/?q=Jl.+Bareng+Tengah+V+No.788+Bareng+Klojen+Malang&output=embed";

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: primaryColor }}
          >
            HUBUNGI KAMI
          </h1>
          
          <div className="w-20 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Kami siap membantu mewujudkan karya Anda. Hubungi kami melalui berbagai cara di bawah ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT COLUMN - CONTACT INFO */}
          <div className="flex flex-col">
            <div className="space-y-6 flex-grow">
              {contacts.map((contact, index) => (
                <div 
                  key={index}
                  className="border border-gray-100 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div 
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <div className="text-white">
                        {contact.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="font-bold mb-2"
                        style={{ color: primaryColor }}
                      >
                        {contact.type}
                      </h3>
                      <a 
                        href={contact.link}
                        target={contact.type !== "Alamat" ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="block text-gray-700 hover:text-gray-900 transition-colors mb-2"
                      >
                        {contact.value}
                      </a>
                      <p className="text-sm text-gray-500">
                        {contact.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* WORKING HOURS */}
            <div className="mt-10 border border-gray-100 rounded-lg p-6 bg-white shadow-sm">
              <div className="flex items-start mb-4">
                <div 
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                  style={{ backgroundColor: primaryColor }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 
                  className="font-bold pt-2"
                  style={{ color: primaryColor }}
                >
                  Jam Operasional
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Senin - Jumat</span>
                  <span className="font-medium">08:00 - 17:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sabtu</span>
                  <span className="font-medium">08:00 - 15:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Minggu</span>
                  <span className="font-medium text-gray-400">Libur</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - MAP YANG MEMANJANG KE BAWAH */}
          <div className="flex flex-col h-full">
            <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm flex-grow flex flex-col">
              {/* MAP TINGGI PENUH */}
              <div className="flex-grow">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Aksara Cita Pustaka"
                  className="w-full h-full min-h-[400px]"
                />
              </div>
              
              {/* ALAMAT DI BAWAH MAP */}
              <div className="p-6 border-t border-gray-100 bg-white">
                <div className="flex items-start mb-3">
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 
                      className="font-bold mb-2"
                      style={{ color: primaryColor }}
                    >
                      Lokasi Kantor
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Jl. Bareng Tengah V No.788, Bareng, Kec. Klojen, Kota Malang, Jawa Timur 65116
                    </p>
                    <a 
                      href="https://maps.google.com/?q=Jl.+Bareng+Tengah+V+No.788+Bareng+Klojen+Malang"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-white transition-all hover:scale-[1.02]"
                      style={{ backgroundColor: goldColor }}
                    >
                      Buka di Google Maps
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-2">
                        <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Siap berkonsultasi tentang penerbitan buku Anda?
          </p>
          <a
            href="https://wa.me/6285183220443"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-bold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
            style={{ backgroundColor: goldColor }}
          >
            Chat WhatsApp Sekarang
            <span className="ml-2">→</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Contact;