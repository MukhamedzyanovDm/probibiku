"use client";
import { motion } from "framer-motion";
import svgPaths from "@/imports/1920X1080/svg-acf38vze5p";

const steps = [
  {
    number: "01",
    title: "Добавьте автомобиль, мотоцикл или байк",
    description:
      "30 секунд – и гараж создан. Система сразу подтянет базовые данные из реестра",
  },
  {
    number: "02",
    title: "Загрузите первый чек",
    description:
      "Прикрепите фото через веб-интерфейс. Подойдёт фото на телефон в любом качестве",
  },
  {
    number: "03",
    title: "ИИ структурирует данные",
    description:
      "Работы, запчасти, даты, пробег – всё разложено по полкам автоматически",
  },
  {
    number: "04",
    title: "Получайте аналитику",
    description:
      "Когда ТО, сколько потрачено, что заменить следующим – всё в одном экране",
  },
];

export function StepsSection() {
  return (
    <section id="how-it-works" className="relative w-full py-24 bg-white">
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
                viewBox="0 0 14.6576 14.6633"
              >
                <path
                  d={svgPaths.p25935c00}
                  stroke="#475569"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.33"
                />
              </svg>
            </div>
            <p className="font-display font-medium text-sm text-[#475569] leading-[14px]">
              Как это работает
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
            Четыре шага к идеальной истории
          </motion.h2>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full mt-12">
            {/* Left Side - Timeline */}
            <div className="flex flex-col gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  className="flex gap-6 items-start"
                >
                  {/* Timeline Column */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                      className="bg-[#f1f5f9] rounded-[32px] w-[60px] h-[60px] flex items-center justify-center shrink-0"
                    >
                      <p className="font-display font-semibold text-2xl text-black tracking-[-0.144px] leading-8">
                        {step.number}
                      </p>
                    </motion.div>
                    
                    {index < steps.length - 1 && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.1 * index + 0.2,
                          duration: 0.4,
                        }}
                        className="w-px h-[40px] mt-4 bg-[#64748b] origin-top"
                      />
                    )}
                  </div>

                  {/* Content Column */}
                  <div className="flex flex-col gap-2 pt-3">
                    <h3 className="font-display font-semibold text-2xl text-[#1e293b] tracking-[-0.144px] leading-8">
                      {step.title}
                    </h3>
                    <p className="font-display text-base text-[#64748b] leading-7">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Side - Animated Example Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0] rounded-3xl h-[559px] flex items-center justify-center overflow-hidden"
            >
              {/* Placeholder Content */}
              <div className="text-center space-y-4 p-8">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-24 h-24 mx-auto bg-[#c89f87]/30 rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-12 h-12 text-[#c89f87]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.div>
                <p className="font-display font-bold text-4xl lg:text-[48px] text-black tracking-[-0.36px] leading-tight">
                  Анимированный пример работы системы
                </p>
                <p className="font-display text-lg text-[#64748b]">
                  Интерактивная демонстрация будет здесь
                </p>
              </div>

              {/* Decorative Elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 right-10 w-20 h-20 bg-[#c89f87]/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-10 left-10 w-24 h-24 bg-[#334155]/20 rounded-full blur-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
