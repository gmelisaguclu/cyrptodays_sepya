"use client";

import Link from "next/link";
import Image from "next/image";
import links from "@/lib/links";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Event",
      links: [
        { name: "About", href: "/#about" },
        { name: "Speakers", href: "/#speakers" },
        {
          name: "Venue",
          href: links.venue,
          target: true,
        },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "Partners", href: "/#partners" },
        { name: "Team", href: "/team" },
        { name: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Social",
      links: [
        { name: "Twitter", href: "https://twitter.com" },
        { name: "Instagram", href: "https://instagram.com" },
        { name: "LinkedIn", href: "https://linkedin.com" },
      ],
    },
  ];

  return (
    <footer className="relative bg-black bg-opacity-90 backdrop-blur-sm border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo ve Açıklama */}
          <div className="col-span-2 md:col-span-1">
            <div className="relative w-[220px] h-[70px] mb-4">
              <Image
                src="/images/Crypto Days.png"
                alt="Crypto Days Logo"
                fill
                className="object-contain"
              />
            </div>
            {/* <p className="text-gray-400 text-sm">
              Join us for the most innovative blockchain and crypto event of the
              year.
            </p> */}
          </div>

          {/* Footer Linkleri */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4 text-lg">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      target={link.target ? "_blank" : undefined}
                      className="text-gray-400 hover:text-[#00ff9d] transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Alt Bilgi */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Crypto Days. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-[#00ff9d] transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-[#00ff9d] transition-colors duration-300 text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Gradient Border Effect */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ff9d] to-[#00f0ff] opacity-30" />
      </div>
    </footer>
  );
};

export default Footer;
