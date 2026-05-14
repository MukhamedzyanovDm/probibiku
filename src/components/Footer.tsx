"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import svgPaths from "@/imports/1920X1080/svg-acf38vze5p";

export function Footer() {
  return (
    <footer className="relative w-full bg-[#f8fafc] border-t border-[#e2e8f0]">
      <div className="mx-auto max-w-[1320px] px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <div className="h-[32.076px] w-[198.092px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 198.092 32.076"
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

            <p className="font-display font-regular text-l text-[#94a3b8] tracking-[-0.1px] leading-7">
              Ваш персональный ИИ-ассистент для безупречной истории обслуживания
              автомобиля
            </p>

            {/* Compliance Badge */}
            <div className="bg-[#f1f5f9] rounded-xl px-5 py-5 flex items-center gap-1 w-fit">
              <div className="size-4">
                <svg
                  className="block size-full"
                  fill="none"
                  viewBox="0 0 11.9967 14.6656"
                >
                  <path
                    d={svgPaths.p2f53e380}
                    stroke="#475569"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.33"
                  />
                </svg>
              </div>
              <p className="font-display font-medium text-sm text-[#475569] leading-[14px]">
                Соответствует 152-ФЗ
              </p>
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-lg text-[#1e293b]">
              Продукт
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Возможности", href: "#features" },
                { label: "Безопасность", href: "#safety" },
                { label: "Цены", href: "#pricing" },
                { label: "Обновления", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-display text-base text-[#475569] hover:text-[#1e293b] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-lg text-[#1e293b]">
              Компания
            </h3>
            <ul className="space-y-3">
              {[
                { label: "О нас", href: "#" },
                { label: "Блог", href: "#" },
                { label: "Контакты", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-display text-base text-[#475569] hover:text-[#1e293b] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-lg text-[#1e293b]">
              Правовая информация
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Политика конфиденциальности", href: "/privacy" },
                { label: "Условия использования", href: "/terms" },
                { label: "Обработка данных", href: "/data" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-display text-base text-[#475569] hover:text-[#1e293b] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#e2e8f0] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-sm text-[#94a3b8]">
            © 2026 Пробибику. Все права защищены.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {["ВКонтакте", "Дзен"].map((social) => (
              <motion.a
                key={social}
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-[#94a3b8] hover:text-[#1e293b] transition-colors duration-200"
              >
                <span className="font-display text-sm">{social}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
