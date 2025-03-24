"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const Speakers = () => {
  // Örnek konuşmacılar (8 adet)
  const speakers = [
    {
      id: "speaker-1",
      name: "Alex Thompson",
      title: "Blockchain Architect",

      image: null,
      twitter: "https://twitter.com/alexthompson",
      linkedin: "https://linkedin.com/in/alexthompson",
    },
    {
      id: "speaker-2",
      name: "Sarah Johnson",
      title: "Web3 Developer",

      image: null,
      twitter: "https://twitter.com/sarahjohnson",
      linkedin: "https://linkedin.com/in/sarahjohnson",
    },
    {
      id: "speaker-3",
      name: "Michael Chen",
      title: "Crypto Investment Expert",

      image: null,
      twitter: "https://twitter.com/michaelchen",
      linkedin: "https://linkedin.com/in/michaelchen",
    },
    {
      id: "speaker-4",
      name: "Emily Rodriguez",
      title: "DeFi Researcher",

      image: null,
      twitter: "https://twitter.com/emilyrodriguez",
      linkedin: "https://linkedin.com/in/emilyrodriguez",
    },
    {
      id: "speaker-5",
      name: "David Kim",
      title: "NFT Specialist",

      image: null,
      twitter: "https://twitter.com/davidkim",
      linkedin: "https://linkedin.com/in/davidkim",
    },
    {
      id: "speaker-6",
      name: "Olivia Martinez",
      title: "DAO Governance Expert",

      image: null,
      twitter: "https://twitter.com/oliviamartinez",
      linkedin: "https://linkedin.com/in/oliviamartinez",
    },
    {
      id: "speaker-7",
      name: "James Wilson",
      title: "Crypto Security Advisor",

      image: null,
      twitter: "https://twitter.com/jameswilson",
      linkedin: "https://linkedin.com/in/jameswilson",
    },
    {
      id: "speaker-8",
      name: "Sophia Lee",
      title: "Metaverse Architect",

      image: null,
      twitter: "https://twitter.com/sophialee",
      linkedin: "https://linkedin.com/in/sophialee",
    },
  ];

  // Canvas animasyonu için referans
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2;
    };

    window.addEventListener("resize", setCanvasSize);
    setCanvasSize();

    // Kripto sembolleri
    const symbols = ["₿", "Ξ", "Ł", "Đ", "₳", "◎", "⚡", "🔗"];

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      symbol: string;
      opacity: number;
      rotate: number;
      rotateSpeed: number;
      hue: number;
      connections: number[];
    };

    const particles: Particle[] = [];
    const connectionDistance = 150;
    const particleCount = Math.min(
      40,
      Math.floor((canvas.width * canvas.height) / 35000)
    );

    // Mouse takibi için
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimeout: NodeJS.Timeout;

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top + window.scrollY;
      isMouseMoving = true;

      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    });

    // Parçacık oluşturma
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 20 + 15,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        opacity: Math.random() * 0.3 + 0.1,
        rotate: Math.random() * 360,
        rotateSpeed: (Math.random() - 0.5) * 0.5,
        hue: Math.random() * 60 + 160, // 160-220 arası (mavi-yeşil tonları)
        connections: [],
      });
    }

    // İki nokta arasındaki mesafeyi hesapla
    const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Bağlantıları güncelle
      particles.forEach((p, i) => {
        p.connections = [];
        particles.forEach((p2, j) => {
          if (i !== j) {
            const distance = getDistance(p.x, p.y, p2.x, p2.y);
            if (distance < connectionDistance) {
              p.connections.push(j);
            }
          }
        });
      });

      // Bağlantıları çiz
      particles.forEach((p) => {
        p.connections.forEach((j) => {
          const p2 = particles[j];
          const distance = getDistance(p.x, p.y, p2.x, p2.y);
          const opacity = 1 - distance / connectionDistance;

          ctx.beginPath();
          ctx.strokeStyle = `hsla(${(p.hue + p2.hue) / 2}, 100%, 50%, ${
            opacity * 0.2
          })`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });
      });

      // Parçacıkları çiz ve hareket ettir
      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotate * Math.PI) / 180);

        // Gradient efekti
        const gradient = ctx.createLinearGradient(
          0,
          -p.size / 2,
          0,
          p.size / 2
        );
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 50%, ${p.opacity})`);
        gradient.addColorStop(
          1,
          `hsla(${p.hue + 30}, 100%, 50%, ${p.opacity})`
        );

        ctx.font = `${p.size}px sans-serif`;
        ctx.fillStyle = gradient;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, 0, 0);

        ctx.restore();

        // Mouse etkileşimi
        if (isMouseMoving) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const force = Math.min(500 / (distance * distance), 5);

          if (distance < 200) {
            p.vx -= (dx / distance) * force;
            p.vy -= (dy / distance) * force;
          }
        }

        // Hareket ve sınırlar
        p.x += p.vx;
        p.y += p.vy;
        p.rotate += p.rotateSpeed;
        p.hue += 0.1; // Renk değişimi
        if (p.hue > 220) p.hue = 160;

        // Sürtünme
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Ekran sınırları
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        }
        if (p.x > canvas.width) {
          p.x = canvas.width;
          p.vx *= -1;
        }
        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        }
        if (p.y > canvas.height) {
          p.y = canvas.height;
          p.vy *= -1;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      canvas.removeEventListener("mousemove", () => {});
    };
  }, []);

  return (
    <section
      id="speakers"
      className="relative pt-16 md:pt-20 pb-16 md:pb-24 overflow-hidden min-h-screen"
    >
      {/* Arka plan canvas - siyah gradient ile */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          background: "black",
        }}
      />

      {/* Speakers İçeriği */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#00f0ff] mb-4">
            SPEAKERS
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
            Meet our industry-leading experts who will share insights and vision
            on blockchain technology
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="mt-12 md:mt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {speakers.map((speaker) => (
              <div
                key={speaker.id}
                className="border border-gray-800 hover:border-white rounded-xl bg-black bg-opacity-60 backdrop-blur-sm transition-all duration-300 group hover:-translate-y-2 relative"
              >
                <div className="aspect-[4/5] relative overflow-hidden rounded-t-xl bg-gray-900">
                  {speaker.image ? (
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-800 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <span className="text-2xl sm:text-3xl md:text-4xl text-gray-600">
                          {speaker.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                </div>

                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold  transition-colors duration-300">
                    {speaker.name}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base mt-1">
                    {speaker.title}
                  </p>

                  {/* Sosyal Medya İkonları */}
                  <div className="flex items-center gap-3 mt-3">
                    <a
                      href={speaker.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-gray-500  transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-gray-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 00.1.47V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
      </div>
    </section>
  );
};

export default Speakers;
