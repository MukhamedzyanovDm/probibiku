"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import imgRectangle1 from "@/imports/1920X1080/f6d043f9b140ad1ed6fa3f43db4f8c1ca7513401.png";

export function ExcelImportSection() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-[1320px] px-4">
        {/* Mobile Layout: Stacked (Visible only on mobile) */}
        <div className="flex flex-col md:hidden space-y-8">
          <div className="relative aspect-square w-full rounded-[24px] overflow-hidden">
            <Image
              src={imgRectangle1}
              alt="Excel Import"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="font-display font-bold text-3xl text-[#1e293b] leading-tight">
              Уже есть история в Excel?
            </h2>
            <p className="font-display font-semibold text-lg text-[#475569] leading-relaxed">
              Так даже лучше. Просто загрузите данные из таблицы
            </p>
            <Link href="/login" className="w-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#334155] w-full px-4 py-4 rounded-xl shadow-md transition-all hover:bg-[#475569] flex items-center justify-center"
              >
                <p className="font-sans font-medium text-sm text-[#f8fafc] leading-5">
                  Попробовать импорт
                </p>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Desktop Layout: Side-by-Side (Hidden on mobile) */}
        <div className="hidden md:flex flex-row items-center justify-center gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square h-[400px] rounded-[24px] overflow-hidden flex-shrink-0"
          >
            <Image
              src={imgRectangle1}
              alt="Excel Import"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-[585px] space-y-6"
          >
            <h2 className="font-display font-bold text-4xl lg:text-[48px] text-[#1e293b] tracking-[-0.36px] leading-tight">
              Уже есть история в Excel?
            </h2>

            <p className="font-display font-semibold text-xl text-[#475569] tracking-[-0.1px] leading-relaxed">
              Так даже лучше. Просто загрузите данные из таблицы
            </p>

            <Link href="/login" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#334155] px-8 py-4 rounded-xl shadow-md transition-all duration-200 hover:bg-[#475569]"
              >
                <p className="font-sans font-medium text-sm text-[#f8fafc] leading-5">
                  Попробовать импорт
                </p>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
