"use client";
import { motion } from "framer-motion";
import svgPaths from "@/imports/1920X1080/svg-acf38vze5p";

const personas = [
  {
    icon: svgPaths.p4fb3800,
    title: "Обычный владелец",
    description:
      "Держите всё под контролем — без бумажной возни и сюрпризов в сервисе",
    benefits: [
      "Все документы в одном месте",
      "Напоминания о ТО и расходах",
      "Готовая история для продажи",
    ],
    result: "Спокойствие и порядок",
  },
  {
    icon: svgPaths.p384e4800,
    title: "Энтузиаст",
    description:
      "Документируй каждый апгрейд — стройте историю проекта по кирпичику",
    benefits: [
      "Лог всех модификаций",
      "Документы к каждой детали",
      "Общий бюджет проекта",
    ],
    result: "Историю своего проекта",
  },
  {
    icon: svgPaths.p17917400,
    title: "Мастер / СТО",
    description:
      "Профессиональный учёт клиентов — выглядите как сервис, которому доверяют",
    benefits: [
      "История по каждому клиенту и авто",
      "Цифровой заказ-наряд для клиента",
      "Гарантийная база по всем работам",
    ],
    result: "Доверие и репутацию",
  },
];

export function WhoSection() {
  return (
    <section id="who-for" className="relative w-full py-24 bg-white">
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
              Для кого
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
            Один сервис – разные сценарии
          </motion.h2>

          {/* Persona Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
            {personas.map((persona, index) => (
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
                className="bg-[#f1f5f9] border border-[#e5e5e5] rounded-[24px] p-8 flex flex-col gap-3 transition-all duration-300 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2 w-fit">
                  <div className="size-6">
                    <svg
                      className="block size-full"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d={persona.icon}
                        stroke="#64748B"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-2xl text-[#1e293b] tracking-[-0.144px] leading-8">
                  {persona.title}
                </h3>

                {/* Description */}
                <p className="font-display text-base text-[#475569] leading-7">
                  {persona.description}
                </p>

                {/* Benefits List */}
                <ul className="list-disc ml-5 space-y-1">
                  {persona.benefits.map((benefit, i) => (
                    <li key={i}>
                      <span className="font-display text-sm text-[#475569] leading-6">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Result Badge */}
                <div className="bg-[#f8fafc] rounded-lg p-3 flex items-start gap-2 mt-auto">
                  <div className="size-4 shrink-0 mt-0.5">
                    <svg
                      className="block size-full"
                      fill="none"
                      viewBox="0 0 14.6633 14.6633"
                    >
                      <g>
                        <path
                          d={svgPaths.pc98f00}
                          stroke="#94A3B8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33"
                        />
                        <path
                          d={svgPaths.p3be05280}
                          stroke="#94A3B8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33"
                        />
                        <path
                          d={svgPaths.p2fe1140}
                          stroke="#94A3B8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-display text-sm text-[#94a3b8] leading-5">
                      Вы получаете
                    </p>
                    <p className="font-display font-semibold text-lg text-[#1e293b] leading-7">
                      {persona.result}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
