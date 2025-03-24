"use client";

import { useState, useEffect, useRef } from "react";

const FAQ = () => {
  // Canvas referansı
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Soru listesi
  const questions = [
    {
      id: "q1",
      question: "When and where will Blockchain Days 2025 take place?",
      answer:
        "Blockchain Days 2025 will be held in Ankara, Turkey at the prestigious Middle East Technical University (METU) Conference Center. The event is scheduled for May 15-16, 2025.",
    },
    {
      id: "q2",
      question: "What else will be happening besides panels at the event?",
      answer:
        "Beyond the panels, attendees can look forward to interactive workshops, networking sessions, startup pitches, and hands-on blockchain development tutorials. We'll also feature a blockchain hackathon and NFT exhibition.",
    },
    {
      id: "q3",
      question:
        "I don't live in Ankara, and I cannot attend the event in person. Can I watch the event live or later?",
      answer:
        "Yes! We offer comprehensive virtual attendance options. All main stage presentations and selected workshops will be livestreamed. Additionally, recordings will be available post-event for ticket holders.",
    },
  ];

  // Her sorunun açık/kapalı durumunu takip eden state - varsayılan olarak hepsi kapalı
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Soru açma/kapama fonksiyonu
  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
      const particleCount = Math.floor((canvas.width * canvas.height) / 25000);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 20 + 10,
          speed: Math.random() * 0.2 + 0.1,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          opacity: Math.random() * 0.15 + 0.05,
          rotate: Math.random() * 360,
          rotateSpeed: (Math.random() - 0.5) * 0.5,
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

        particle.y += particle.speed;
        particle.rotate += particle.rotateSpeed;

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
    <section
      id="faq"
      className="relative pt-16 md:pt-20 pb-16 md:pb-24 overflow-hidden min-h-screen"
    >
      {/* Animasyonlu Arkaplan */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          background: "black",
        }}
      />

      {/* FAQ İçeriği */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#00f0ff] mb-4">
            FAQ
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Frequently Asked Questions
          </p>
        </div>

        {/* Sorular Listesi */}
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="border border-gray-800  rounded-xl bg-black bg-opacity-60 backdrop-blur-sm transition-all duration-300 overflow-hidden relative group"
            >
              {/* Soru Başlığı */}
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full text-left p-5 md:p-6 flex items-center justify-between focus:outline-none group-[.active]:border-[#00f0ff] cursor-pointer relative z-10"
                aria-expanded={activeIndex === index}
                aria-controls={`answer-${q.id}`}
              >
                <span className="text-white text-base sm:text-lg font-medium pr-8 group-hover:text-[#00ff9d] transition-colors">
                  {q.question}
                </span>
                <span
                  className={`transform transition-transform duration-300 text-[#00f0ff] ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Cevap */}
              <div
                id={`answer-${q.id}`}
                className={`transition-all duration-300 ease-in-out relative z-10 ${
                  activeIndex === index ? "block" : "hidden"
                }`}
              >
                <div className="p-5 md:p-6 text-gray-400 text-sm sm:text-base border-t border-gray-800">
                  {q.answer}
                </div>
              </div>

              {/* Neon glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-[#00f0ff] blur-xl transition-opacity rounded-xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
