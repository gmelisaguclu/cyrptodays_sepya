"use client";

import links from "@/lib/links";
import Link from "next/link";
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
              CRYPTODAYS
            </h2>
          </div>

          <p className="text-gray-400 mt-4 md:mt-6 text-base sm:text-lg md:text-xl max-w-2xl">
            powered by Sepya Network
          </p>

          <div className="mt-8 md:mt-12 lg:mt-16 space-y-2">
            <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
              May 8, Selcuk University Museum
            </p>
          </div>

          <div className="mt-8 md:mt-10 lg:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href={links.actionButton.link}
              target="_blank"
              className="bg-gradient-to-r from-[#00ff9d] to-[#00f0ff] text-black font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base hover:scale-105 transition-transform"
            >
              {links.actionButton.title}
            </Link>

            <div className="sm:ml-8">
              <p className="text-gray-400 text-sm sm:text-base uppercase tracking-wider mb-2">
                Social
              </p>
              <div className="flex gap-4">
                <a
                  href={links.socials.instagram}
                  className="text-gray-400 hover:text-[#00ff9d] transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={links.socials.twitter}
                  className="text-gray-400 hover:text-[#00ff9d] transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
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
