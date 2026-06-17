"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

// Define a type for UnicornStudio on the window object
interface WindowWithUnicorn extends Window {
  UnicornStudio?: {
    isInitialized: boolean;
    init: () => void;
  };
}

export default function Background() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const initUnicorn = () => {
      const win = window as WindowWithUnicorn;
      if (win.UnicornStudio) {
        // Force reset and re-initialize on route changes
        win.UnicornStudio.isInitialized = false;
        win.UnicornStudio.init();
        win.UnicornStudio.isInitialized = true;
      }
    };

    // Try initiating if script is already loaded
    initUnicorn();

    // Add event listener for script load just in case
    window.addEventListener("unicorn-studio-loaded", initUnicorn);
    return () => {
      window.removeEventListener("unicorn-studio-loaded", initUnicorn);
    };
  }, [mounted, pathname]);

  return (
    <>
      {/* Script Loader for Unicorn Studio */}
      <Script
        src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
        strategy="lazyOnload"
        onLoad={() => {
          const win = window as WindowWithUnicorn;
          if (win.UnicornStudio) {
            win.UnicornStudio.init();
            win.UnicornStudio.isInitialized = true;
            window.dispatchEvent(new Event("unicorn-studio-loaded"));
          }
        }}
      />

      {/* WebGL background component */}
      {mounted && (
        <div 
          key={pathname}
          className="aura-background-component fixed top-0 w-full h-screen -z-10 opacity-30 sm:opacity-50 md:opacity-80 pointer-events-none overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)"
          }}
        >
          <div className="aura-background-component top-0 w-full -z-10 absolute h-full overflow-hidden">
            <div 
              data-us-project="ty3N7ZPaIU7KlWixQFIc" 
              className="absolute w-full h-full left-0 top-0 -z-10"
            />
          </div>
        </div>
      )}

      {/* CSS Ambient Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft blue ambient glow */}
        <div className="aura-bg-blob-one absolute top-[-12%] left-[-12%] w-[100vw] h-[100vw] md:w-[52vw] md:h-[52vw] rounded-full bg-blue-200/20 md:bg-blue-200/35 blur-[7.5rem] will-change-transform" />

        {/* Soft sky/silver glow */}
        <div className="aura-bg-blob-two absolute bottom-[-18%] right-[-10%] w-[120vw] h-[120vw] md:w-[62vw] md:h-[62vw] rounded-full bg-sky-200/15 md:bg-sky-200/22 blur-[8.75rem] will-change-transform" />

        {/* White glassy light wash */}
        <div className="aura-bg-blob-three absolute top-[36%] left-[36%] w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] rounded-full bg-white/55 blur-[5rem] will-change-transform" />

        {/* Subtle moving dot texture */}
        <div 
          className="aura-bg-dots absolute inset-0 opacity-[0.22]" 
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.09) 1px, transparent 0)",
            backgroundSize: "2rem 2rem"
          }}
        />
      </div>
    </>
  );
}
