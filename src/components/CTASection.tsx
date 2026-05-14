"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import svgPaths from "@/imports/1920X1080/svg-acf38vze5p";

export function CTASection() {
  return (
    <section className="relative w-full py-24 bg-gradient-to-b from-white to-[#f8fafc]">
      <div className="mx-auto max-w-[1320px] px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-6"
        >
          {/* Badge */}
          <div className="bg-white border border-[#94a3b8] rounded-[24px] px-4 py-2 flex items-center gap-1">
            <div className="size-4">
              <svg
                className="block size-full"
                fill="none"
                viewBox="0 0 10.6633 13.33"
              >
                <path
                  d={svgPaths.p10f40970}
                  stroke="#475569"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.33"
                />
              </svg>
            </div>
            <p className="font-display font-medium text-sm text-[#475569] leading-[14px]">
              Начните сегодня
            </p>
          </div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display font-bold text-5xl lg:text-[64px] text-[#1e293b] tracking-[-0.768px] leading-tight max-w-[745px]"
          >
            Готовы навести порядок в истории вашего автомобиля?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display text-xl text-[#334155] leading-7 max-w-[745px]"
          >
            Начните вести цифровую историю своего автомобиля сегодня. Это
            бесплатно, надежно и навсегда
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full md:w-auto mt-4"
          >
            <Link href="/login" className="block w-full h-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#c89f87] w-full md:w-auto px-6 xs:px-10 py-4 rounded-xl shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] transition-all duration-200 hover:bg-[#b88f77] flex items-center justify-center"
              >
                <p className="font-sans font-semibold text-[13px] xs:text-sm sm:text-base text-white leading-6 whitespace-nowrap">
                  Создать бесплатный аккаунт
                </p>
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Badge 
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-[#94a3b8] mt-4"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-display">
              Не требуется кредитная карта
            </span>
          </motion.div>*/}
        </motion.div>
      </div>
    </section>
  );
}
