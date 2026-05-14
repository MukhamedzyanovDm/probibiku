"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Mouse } from 'lucide-react';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const mouseOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Using a state to handle client-side media query to avoid hydration mismatch
  const [isDesktop, setIsDesktop] = React.useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 769px)").matches);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    
    if (!isDesktop) return;

    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.currentTime = 0.001;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.readyState >= 1) handleLoadedMetadata();

    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (video.duration && video.readyState >= 2) {
        const targetTime = latest * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.01) {
          video.currentTime = targetTime;
        }
      }
    });

    return () => {
      window.removeEventListener('resize', checkIsDesktop);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      unsubscribe();
    };
  }, [smoothProgress, isDesktop]);

return (
  <section 
    ref={containerRef}
    className="relative h-[200vh] w-full"
  >
    <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden bg-[#F2F2F2]">
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#F2F2F2]">
        {isDesktop ? (
          <video
            ref={videoRef}
            src="https://storage.yandexcloud.net/autolog-docs/assets/hero-video.mp4"
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
        ) : (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/assets/hero-poster.png)',
              transform: 'scaleX(-1)'
            }}
          />
        )}
      </div>

        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="max-w-[1320px] mx-auto h-full px-6 flex flex-col justify-end pb-10 md:pb-40">
            <div className="max-w-2xl pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-[#1A2233] bg-white/50 backdrop-blur-sm rounded-full border border-gray-200"
              >
                <Sparkles className="w-4 h-4 text-[#1A2233]" />
                <span>ИИ-ассистент для автовладельцев</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[24px] xs:text-[30px] md:text-5xl lg:text-6xl font-bold font-display text-[#1A2233] mb-4 xs:mb-6 leading-[1.1]"
              >
                Прозрачная история вашего автомобиля
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[13px] xs:text-[14px] md:text-xl text-[#1A2233]/70 mb-6 xs:mb-8 leading-relaxed max-w-2xl"
              >
                Загрузите чеки из сервиса и превратите хаос в безупречную цифровую историю
                обслуживания, которой доверяют покупатели и которую приятно вести
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full md:w-auto"
              >
                <Link href="/login" className="block w-full h-full">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#c89f87] w-full md:w-auto px-5 xs:px-6 sm:px-10 py-3 xs:py-4 rounded-xl shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] transition-all duration-200 hover:bg-[#b88f77] pointer-events-auto flex items-center justify-center"
                  >
                    <p className="font-sans font-semibold text-[13px] xs:text-sm sm:text-base text-white leading-6 whitespace-nowrap">
                      Добавить первый автомобиль →
                    </p>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div 
          style={{ opacity: mouseOpacity }}
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#1A2233]/40 w-full"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Mouse className="w-6 h-6" />
          </motion.div>
          <span className="text-[10px] font-medium uppercase tracking-widest whitespace-nowrap">Листайте вниз ↓</span>
        </motion.div>
      </div>
    </section>
  );
};
