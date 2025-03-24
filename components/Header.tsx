"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import links from "@/lib/links";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Dışa tıklama işleyicisi
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Tıklanan element menu veya menu butonu değilse menüyü kapat
      if (
        menuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    // Olay dinleyicisi ekle
    document.addEventListener("mousedown", handleOutsideClick);

    // Temizlik fonksiyonu
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <header className="fixed w-full top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="relative w-[180px] sm:w-[150px] h-[40px] sm:h-[50px]">
            <Image
              src="/images/sepya-logo.png"
              alt="Sepya  Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-10">
            <Link
              href="/#speakers"
              className="text-white hover:text-[#00ff9d] transition-colors text-sm lg:text-base"
            >
              SPEAKERS
            </Link>
            <Link
              href="/#partners"
              className="text-white hover:text-[#00ff9d] transition-colors text-sm lg:text-base"
            >
              PARTNERS
            </Link>
            <Link
              href="/team"
              className="text-white hover:text-[#00ff9d] transition-colors text-sm lg:text-base"
            >
              TEAM
            </Link>
            <Link
              href={links.venue}
              target="_blank"
              className="text-white hover:text-[#00ff9d] transition-colors text-sm lg:text-base"
            >
              VENUE
            </Link>
          </nav>

          {/* Desktop Button - Sadece masaüstünde görünecek */}
          <button className="hidden md:block bg-gradient-to-r from-[#00ff9d] to-[#00f0ff] text-black font-semibold px-4 lg:px-6 py-2 rounded-full text-sm lg:text-base hover:scale-105 transition-transform">
            Join the Event
          </button>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            className="md:hidden text-white p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-black bg-opacity-95 border-t border-gray-800"
        >
          <nav className="flex flex-col py-4 px-4">
            <Link
              href="/#speakers"
              className="text-white hover:text-[#00ff9d] transition-colors py-3 border-b border-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              SPEAKERS
            </Link>
            <Link
              href="/#partners"
              className="text-white hover:text-[#00ff9d] transition-colors py-3 border-b border-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              PARTNERS
            </Link>
            <Link
              href="/team"
              className="text-white hover:text-[#00ff9d] transition-colors py-3 border-b border-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              TEAM
            </Link>
            <Link
              href="/venue"
              className="text-white hover:text-[#00ff9d] transition-colors py-3 border-b border-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              VENUE
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
