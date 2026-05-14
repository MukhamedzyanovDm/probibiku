"use client";
import { motion } from "framer-motion";
import svgPaths from "@/imports/1920X1080/svg-acf38vze5p";

const securityFeatures = [
  {
    title: "Шифрование на уровне банка",
    description:
      "Ни один посторонний не увидит ваши документы. Все данные шифруются по стандарту AES-256",
    badge: "AES-256",
  },
  {
    title: "Ваши данные — только ваши",
    description:
      "Мы не передаем данные третьим лицам. Вы можете экспортировать историю в PDF или JSON в любой момент",
    badge: "100%",
  },
  {
    title: "Оригиналы чеков хранятся вечно",
    description:
      "Облачное хранилище в Yandex Cloud с регулярным бэкапом. Даже если телефон потерян — данные в безопасности",
    badge: "YANDEX CLOUD",
  },
];

export function SafetySection() {
  return (
    <section id="safety" className="relative w-full py-24 bg-white">
      <div className="mx-auto max-w-[1320px] px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <div className="bg-white border border-[#94a3b8] rounded-[24px] px-4 py-2 flex items-center gap-1 w-fit">
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
                Безопасность
              </p>
            </div>

            {/* Heading */}
            <h2 className="font-display font-bold text-5xl lg:text-[64px] text-[#1e293b] tracking-[-0.768px] leading-tight">
              Ваши документы надёжнее сейфа
            </h2>

            {/* Description */}
            <p className="font-display font-semibold text-xl text-[#94a3b8] tracking-[-0.1px] leading-7 max-w-[409px]">
              Пробибику соответствует требованиям 152-ФЗ. Мы используем
              инфраструктуру Yandex Cloud для максимальной защиты ваших данных
            </p>
          </motion.div>

          {/* Right Side - Security Features */}
          <div className="flex flex-col gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3 },
                }}
                className="bg-[#f1f5f9] rounded-[24px] p-8 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col gap-3">
                  <h3 className="font-display font-semibold text-2xl text-[#1e293b] tracking-[-0.144px] leading-8">
                    {feature.title}
                  </h3>

                  <p className="font-display text-base text-[#94a3b8] leading-7">
                    {feature.description}
                  </p>

                  <div className="bg-[#b91c1c] px-2.5 py-0.5 rounded-md shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] w-fit">
                    <p className="font-sans font-semibold text-xs text-[#fafafa] leading-4">
                      {feature.badge}
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
