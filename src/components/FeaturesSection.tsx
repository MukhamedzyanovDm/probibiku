"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import svgPaths from "@/imports/1920X1080/svg-acf38vze5p";

const features = [
  {
    icon: svgPaths.p16262100,
    color: "#c89f87",
    label: "Порядок в документах",
    title: "Оцифровка чеков",
    bullets: [
      "Автоматический импорт работ и цен",
      "Распознавание запчастей и дат",
      "Освобождение бардачка от бумаг"
    ],
  },
  {
    icon: svgPaths.p24817980,
    color: "#c89f87",
    label: "Ответы под рукой",
    title: "Контроль регламента",
    bullets: [
      "Прогноз даты следующего ТО",
      "Напоминания о масле и ГРМ",
      "Точные ответы для мастеров"
    ],
  },
  {
    icon: svgPaths.p3c3de00,
    color: "#c89f87",
    label: "Продажа авто",
    title: "Ваша ликвидность",
    bullets: [
      "Подтвержденная история сервиса",
      "Больше доверия покупателей",
      "Выше цена при перепродаже"
    ],
  },
  {
    icon: svgPaths.p3c3de00,
    color: "#c89f87",
    label: "Передача данных",
    title: "Удобная сделка",
    bullets: [
      "Передача базы через QR-код",
      "Аргумент ответственного владения",
      "Полная прозрачность для покупателя"
    ],
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative w-full py-24 bg-white overflow-hidden"
    >
      <div className="mx-auto max-w-[1320px] px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-[#94a3b8] rounded-[24px] px-4 py-2 flex items-center gap-1"
          >
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
              Возможности
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display font-bold text-5xl lg:text-[64px] text-[#1e293b] text-center tracking-[-0.768px] leading-tight max-w-[957px]"
          >
            Полный контроль над состоянием автомобиля
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display font-semibold text-xl text-[#45556c] text-center tracking-[-0.1px] leading-7 max-w-[1044px]"
          >
            Мы объединили современные технологии и ваш комфорт, чтобы владение автомобилем стало предсказуемым
          </motion.p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[24px] p-6 flex flex-col gap-4 h-full min-h-[320px] transition-all duration-300 hover:shadow-lg"
              >
                {/* Icon & Label */}
                <div className="flex items-center gap-1.5">
                  <div className="size-4 shrink-0">
                    <svg
                      className="block size-full"
                      fill="none"
                      viewBox="0 0 14.6633 14.6633"
                    >
                      <path
                        d={feature.icon}
                        stroke={feature.color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.33"
                      />
                    </svg>
                  </div>
                  <p className="font-display text-sm text-[#c89f87] leading-6 font-bold uppercase tracking-wider">
                    {feature.label}
                  </p>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-2xl text-[#1e293b] tracking-[-0.144px] leading-tight">
                  {feature.title}
                </h3>

                {/* Bullet Points */}
                <ul className="flex flex-col gap-2.5 mt-2">
                  {feature.bullets.map((bullet, bIndex) => (
                    <li key={bIndex} className="flex items-start gap-2 text-sm text-[#475569] leading-tight">
                      <Check className="w-4 h-4 text-[#c89f87] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
