"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import svgPaths from "@/imports/1920X1080/svg-acf38vze5p";

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-8 left-0 right-0 z-50 mx-auto max-w-[1320px] px-4"
    >
      <div className="backdrop-blur-[5.85px] bg-white/30 rounded-[20px] shadow-[0px_13px_26.7px_0px_rgba(117,85,71,0.1)]">
        <div className="flex items-center justify-between px-4 xs:px-8 lg:px-[60px] py-4 xs:py-5">
          {/* Logo */}
          <div className="h-auto w-[140px] xs:w-[198.092px] shrink-0">
            <svg
              className="block size-full"
              fill="none"
              viewBox="0 0 198.092 32.076"
              preserveAspectRatio="xMinYMin meet"
            >
              <g>
                <path d={svgPaths.p36766480} fill="#C89F87" />
                <path d={svgPaths.p274cc40} fill="#C89F87" />
                <path d={svgPaths.p23ac0b00} fill="#C89F87" />
                <path d={svgPaths.p2aba1400} fill="#314158" />
                <path d={svgPaths.p180e4300} fill="#314158" />
                <path d={svgPaths.p3eb54470} fill="#314158" />
                <path d={svgPaths.pead7070} fill="#314158" />
                <path d={svgPaths.p179bfa00} fill="#314158" />
                <path d={svgPaths.p169d1200} fill="#314158" />
              </g>
            </svg>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {[
              { label: "Возможности", id: "features" },
              { label: "Как работает", id: "how-it-works" },
              { label: "Безопасность", id: "safety" },
              { label: "FAQ", id: "faq" },
              { label: "Цены", id: "pricing" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-2 py-2.5 rounded-md font-sans font-medium text-sm text-[#1e293b] transition-all duration-200 hover:bg-white/40"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#334155] px-4 py-2 rounded-md shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] transition-all duration-200 hover:bg-[#475569] flex items-center justify-center"
            >
              <p className="font-sans font-medium text-sm text-[#f8fafc] leading-5">
                Войти
              </p>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
