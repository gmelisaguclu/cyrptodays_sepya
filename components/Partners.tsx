"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const Partners = () => {
  // Referans yılı (isteğe bağlı olarak değiştirilebilir)
  const year = "2025";

  // Ana sponsor
  const mainSponsor = {
    id: "main",
    name: "Main Sponsor",
    logo: null,
    // logo: "/images/sponsors/main-sponsor.png", // Logo ekleneceği zaman
  };

  // Diamond sponsorlar (4 adet)
  const diamondSponsors = [
    {
      id: "diamond-1",
      name: "Diamond Sponsor 1",
      logo: null,
      // logo: "/images/sponsors/diamond-1.png", // Logo ekleneceği zaman
    },
    {
      id: "diamond-2",
      name: "Diamond Sponsor 2",
      logo: null,
      // logo: "/images/sponsors/diamond-2.png", // Logo ekleneceği zaman
    },
    {
      id: "diamond-3",
      name: "Diamond Sponsor 3",
      logo: null,
      // logo: "/images/sponsors/diamond-3.png", // Logo ekleneceği zaman
    },
    {
      id: "diamond-4",
      name: "Diamond Sponsor 4",
      logo: null,
      // logo: "/images/sponsors/diamond-4.png", // Logo ekleneceği zaman
    },
  ];

  // Canvas animasyonu için referans
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas'ı tam ekran boyutunda ayarla
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2; // Daha uzun yaparak tüm içeriği kapsamasını sağlıyoruz
    };

    window.addEventListener("resize", setCanvasSize);
    setCanvasSize();

    // Kripto sembolleri
    const symbols = ["₿", "Ξ", "Ł", "Đ", "₳", "◎", "⚡", "🔗", "$", "€"];

    // Arkaplan sembol parçacıkları
    const particles: {
      x: number;
      y: number;
      size: number;
      speed: number;
      symbol: string;
      opacity: number;
      rotate: number;
      rotateSpeed: number;
    }[] = [];

    // Rastgele semboller oluştur
    const createParticles = () => {
      // Ekran boyutuna göre parçacık sayısı
      const particleCount = Math.floor((canvas.width * canvas.height) / 25000);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 20 + 10, // 10-30px arası
          speed: Math.random() * 0.2 + 0.1, // Daha yavaş hareket etsin
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          opacity: Math.random() * 0.15 + 0.05, // Biraz daha görünür (siyah arka planda)
          rotate: Math.random() * 360,
          rotateSpeed: (Math.random() - 0.5) * 0.5, // Yavaş dönme
        });
      }
    };

    // Animasyon
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotate * Math.PI) / 180);
        ctx.font = `${particle.size}px sans-serif`;
        ctx.fillStyle = `rgba(0, 240, 255, ${particle.opacity})`; // Neon mavi/yeşil
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(particle.symbol, 0, 0);
        ctx.restore();

        // Aşağı doğru yavaşça hareket ettir
        particle.y += particle.speed;
        particle.rotate += particle.rotateSpeed;

        // Ekrandan çıkınca yukarıdan başlat
        if (particle.y > canvas.height) {
          particle.y = -particle.size;
          particle.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <section className="relative pt-16 md:pt-20 pb-16 md:pb-24 overflow-hidden min-h-screen">
      {/* Arka plan canvas - siyah gradient ile */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          background: "black",
        }}
      />

      {/* Partners İçeriği */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#00ff9d] mb-4">
            {year} PARTNERS
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
            Discover the valued collaborators supporting Blockchain Days
            success...
          </p>
        </div>

        {/* Main Sponsor */}
        <div className="mt-12 md:mt-20">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white text-center mb-8">
            Main Sponsor
          </h3>
          <div className="border border-gray-800 hover:border-[#00f0ff] rounded-xl p-8 md:p-12 lg:p-16 bg-black bg-opacity-60 backdrop-blur-sm transition-colors">
            <div className="flex items-center justify-center h-40 sm:h-48 md:h-60">
              {mainSponsor.logo ? (
                <Image
                  src={mainSponsor.logo}
                  alt={mainSponsor.name}
                  width={300}
                  height={150}
                  className="max-h-full w-auto object-contain"
                />
              ) : (
                <div className="border border-dashed border-gray-700 rounded-lg h-full w-full flex items-center justify-center group-hover:border-[#00f0ff]">
                  <span className="text-gray-600">Logo gelecek</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Diamond Sponsors */}
        <div className="mt-16 md:mt-24">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white text-center mb-8">
            Diamond Sponsors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {diamondSponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="border border-gray-800 hover:border-[#00f0ff] rounded-xl p-6 md:p-8 bg-black bg-opacity-60 backdrop-blur-sm transition-colors group"
              >
                <div className="flex items-center justify-center h-28 sm:h-32 md:h-40">
                  {sponsor.logo ? (
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={200}
                      height={100}
                      className="max-h-full w-auto object-contain"
                    />
                  ) : (
                    <div className="border border-dashed border-gray-700 rounded-lg h-full w-full flex items-center justify-center group-hover:border-[#00f0ff]">
                      <span className="text-gray-600">Logo gelecek</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Become a Partner Button */}
        <div className="mt-16 md:mt-24 text-center">
          <button className="bg-gradient-to-r from-[#00ff9d] to-[#00f0ff] text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg hover:scale-105 transition-transform">
            Become a Partner
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;
