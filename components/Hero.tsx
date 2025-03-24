"use client";

import { useEffect, useRef } from "react";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas'ı tam ekran boyutunda ayarla
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Pencere boyutu değiştiğinde canvas'ı yeniden boyutlandır
    window.addEventListener("resize", setCanvasSize);
    setCanvasSize();

    // Kripto sembolleri
    const symbols = ["₿", "Ξ", "Ł", "Đ", "₳", "◎", "⚡", "🔗", "$", "€"];

    // Düşen sembol nesneleri
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
      // Ekran boyutuna göre sembol sayısını ayarla
      let particleCount;
      if (window.innerWidth < 768) {
        particleCount = Math.floor(window.innerWidth / 40); // Mobil için daha az
      } else {
        particleCount = Math.floor(window.innerWidth / 30); // Masaüstü için daha çok
      }

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 24 + 12, // 12px ile 36px arası boyut
          speed: Math.random() * 1 + 0.5, // 0.5 ile 1.5 arası hız
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          opacity: Math.random() * 0.3 + 0.1, // 0.1 ile 0.4 arası opaklık
          rotate: Math.random() * 360,
          rotateSpeed: (Math.random() - 0.5) * 2, // -1 ile 1 arasında dönüş hızı
        });
      }
    };

    // Animasyon
    const animate = () => {
      // Canvas'ı temizle
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Her sembol için
      particles.forEach((particle) => {
        // Sembolü çiz
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotate * Math.PI) / 180);
        ctx.font = `${particle.size}px sans-serif`;
        ctx.fillStyle = `rgba(0, 240, 255, ${particle.opacity})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(particle.symbol, 0, 0);
        ctx.restore();

        // Sembolü aşağı doğru hareket ettir
        particle.y += particle.speed;
        particle.rotate += particle.rotateSpeed;

        // Ekrandan çıktıysa tekrar yukarıdan başlat
        if (particle.y > canvas.height + particle.size) {
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
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16 md:pt-20">
      {/* Arka plan canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ background: "black" }}
      />

      {/* İçerik */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-left">
          <div className="space-y-4">
            <h2 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">
              SEPYA
            </h2>
            <h2 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">
              CYRPTODAYS
            </h2>
          </div>

          <p className="text-gray-400 mt-4 md:mt-6 text-base sm:text-lg md:text-xl max-w-2xl">
            powered by Sepya Blockchain
          </p>

          <div className="mt-8 md:mt-12 lg:mt-16 space-y-2">
            <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
              May 8, Selcuk University Museum
            </p>
          </div>

          <div className="mt-8 md:mt-10 lg:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button className="bg-gradient-to-r from-[#00ff9d] to-[#00f0ff] text-black font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-base sm:text-lg md:text-xl hover:scale-105 transition-transform">
              Become Partner
            </button>

            <div className="sm:ml-8">
              <p className="text-gray-400 text-sm sm:text-base md:text-lg uppercase tracking-wider mb-2">
                Social
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00ff9d] transition-colors text-sm sm:text-base"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00ff9d] transition-colors text-sm sm:text-base"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
