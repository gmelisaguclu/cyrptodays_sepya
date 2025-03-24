"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import links from "@/lib/links";

const About = () => {
  // Canvas referansı
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas'ı tam ekran boyutunda ayarla
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2.5; // Daha uzun yaparak tüm içeriği kapsamasını sağlıyoruz
    };

    window.addEventListener("resize", setCanvasSize);
    setCanvasSize();

    // Kripto sembolleri
    const symbols = ["₿", "Ξ", "Ł", "Đ", "₳", "◎", "⚡", "🔗", "$", "€"];

    // Particle type tanımı
    type Particle = {
      x: number;
      y: number;
      size: number;
      speed: number;
      symbol: string;
      opacity: number;
      rotate: number;
      rotateSpeed: number;
    };

    // Arkaplan sembol parçacıkları
    const particles: Particle[] = [];

    // Grid sistemi için yardımcı fonksiyon
    const createGridPosition = () => {
      const gridSize = 150; // Grid hücre boyutu
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      const x =
        Math.floor(Math.random() * cols) * gridSize +
        Math.random() * gridSize * 0.6;
      const y =
        Math.floor(Math.random() * rows) * gridSize +
        Math.random() * gridSize * 0.6;

      return { x, y };
    };

    // Rastgele semboller oluştur
    const createParticles = () => {
      const density = 0.8; // Yoğunluk faktörü
      const gridSize = 150; // Grid hücre boyutu
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);
      const particleCount = Math.floor(cols * rows * density);

      for (let i = 0; i < particleCount; i++) {
        const position = createGridPosition();
        particles.push({
          x: position.x,
          y: position.y,
          size: Math.random() * 15 + 8, // Biraz daha küçük semboller
          speed: Math.random() * 0.15 + 0.05, // Daha yavaş hareket
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          opacity: Math.random() * 0.12 + 0.03, // Daha subtle opaklık
          rotate: Math.random() * 360,
          rotateSpeed: (Math.random() - 0.5) * 0.3, // Daha yavaş dönme
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
        ctx.fillStyle = `rgba(0, 240, 255, ${particle.opacity})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(particle.symbol, 0, 0);
        ctx.restore();

        // Daha yumuşak hareket için sinüs dalgası ekleyelim
        particle.y += particle.speed * (1 + Math.sin(Date.now() * 0.001) * 0.2);
        particle.rotate += particle.rotateSpeed;
        particle.x += Math.sin(Date.now() * 0.001 + particle.y * 0.01) * 0.2; // Hafif yatay salınım

        // Ekrandan çıkan parçacıkları yeniden konumlandır
        if (particle.y > canvas.height) {
          const newPosition = createGridPosition();
          particle.y = -particle.size;
          particle.x = newPosition.x;
        }
        // Yatay sınırları kontrol et
        if (particle.x < -particle.size)
          particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size)
          particle.x = -particle.size;
      });

      requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  // Etkinlik kartları
  const eventCards = [
    {
      id: 1,
      title: "Panels",
      image: "/images/panels.jpg",
      alt: "Blockchain panels with speakers",
    },
    {
      id: 2,
      title: "Workshops",
      image: "/images/workshops.jpg",
      alt: "Blockchain workshops",
    },
    {
      id: 3,
      title: "Web3 Networking Event",
      image: "/images/networking.jpg",
      alt: "Web3 networking event",
    },
    {
      id: 4,
      title: "And More",
      image: "/images/more.jpg",
      alt: "More blockchain events",
    },
  ];

  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden bg-black"
    >
      {/* Animasyonlu Arkaplan */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          background: "black",
        }}
      />

      {/* About başlığı ve açıklaması */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6 md:gap-8">
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#00f0ff] md:w-1/4 tracking-wider"
          >
            ABOUT
          </motion.h2>

          <motion.div variants={itemVariants} className="md:w-3/4">
            <p className="text-gray-400 text-base sm:text-lg">
              {links.about.description}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Etkinlik Kartları */}
      <motion.div
        className="relative z-10 mt-10 sm:mt-12 md:mt-16 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {eventCards.map((card) => (
            <motion.div
              key={card.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-xl h-60 sm:h-72 md:h-80 group border border-gray-800 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20"
              >
                <h3 className="text-white text-xl sm:text-2xl font-semibold">
                  {card.title}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
