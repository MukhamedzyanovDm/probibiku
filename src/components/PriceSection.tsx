"use client";
import { motion } from "framer-motion";
import svgPaths from "@/imports/1920X1080/svg-acf38vze5p";

const pricingPlans = [
  {
    tokens: "50",
    price: "50",
    perToken: "1 ₽ / токен",
    isPopular: false,
    bonus: "  ",
  },
  {
    tokens: "500",
    price: "449",
    perToken: "0,9 ₽ / токен",
    isPopular: true,
    bonus: "+50 бесплатно",
  },
  {
    tokens: "1000",
    price: "800",
    perToken: "0,8 ₽ / токен",
    isPopular: false,
    bonus: "+200 бесплатно",
  },
];

export function PriceSection() {
  return (
    <section id="pricing" className="relative w-full py-24 bg-white">
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
                viewBox="0 0 14.6635 13.3367"
              >
                <path
                  d={svgPaths.p1d6da580}
                  stroke="#475569"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.33"
                />
              </svg>
            </div>
            <p className="font-display font-medium text-sm text-[#475569] leading-[14px]">
              Цены
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
            Удобно. Навсегда
          </motion.h2>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8 max-w-[858px]">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className={`relative border ${
                  plan.isPopular
                    ? "bg-[#1e293b] border-[#cbd5e1]"
                    : "bg-white border-[#cbd5e1]"
                } rounded-xl p-6 flex flex-col gap-8 transition-all duration-300 hover:shadow-xl`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#dc2626] px-2.5 py-0.5 rounded-md shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)]">
                    <p className="font-sans font-semibold text-xs text-[#fef2f2] leading-4">
                      Популярное
                    </p>
                  </div>
                )}

                {/* Tokens */}
                <div className="flex items-baseline gap-1.5">
                  <p
                    className={`font-display font-bold text-5xl tracking-[-0.36px] ${
                      plan.isPopular ? "text-[#f8fafc]" : "text-[#1e293b]"
                    }`}
                  >
                    {plan.tokens}
                  </p>
                  <p className="font-display font-semibold text-xl text-[#64748b] tracking-[-0.1px] leading-7">
                    токенов
                  </p>
                </div>

                {/* Bonus Badge */}
                {plan.bonus && (
                  <div
                    className={`${
                      plan.isPopular
                        ? "bg-[#f4f4f5] text-[#18181b]"
                        : "bg-[#1e293b] text-[#fafafa]"
                    } px-2.5 py-0.5 rounded-md shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] w-fit`}
                  >
                    <p className="font-sans font-semibold text-xs leading-4">
                      {plan.bonus}
                    </p>
                  </div>
                )}

                {/* Price */}
                <div>
                  <p
                    className={`font-display font-semibold text-xl tracking-[-0.1px] leading-7 ${
                      plan.isPopular ? "text-[#f8fafc]" : "text-[#1e293b]"
                    }`}
                  >
                    <span>{plan.price}</span>
                    <span className="text-[#64748b]">₽</span>
                  </p>
                </div>

                {/* Per Token */}
                <p className="font-display text-sm text-[#64748b] leading-5">
                  {plan.perToken}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full md:w-auto mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#c89f87] w-full md:w-auto px-10 py-4 rounded-xl shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] transition-all duration-200 hover:bg-[#b88f77] flex items-center justify-center gap-2"
            >
              <p className="font-sans font-medium text-sm text-[#f8fafc] leading-5">
                Пополнить баланс
              </p>
              <div className="size-4">
                <svg
                  className="block size-full"
                  fill="none"
                  viewBox="0 0 10.6633 10.6633"
                >
                  <path
                    d={svgPaths.p205bbc80}
                    stroke="#F8FAFC"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.33"
                  />
                </svg>
              </div>
            </motion.button>
          </motion.div>

          {/* Info */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-display text-sm text-[#94a3b8] text-center mt-4"
          >
            Токены используются только для распознавания чеков с помощью ИИ. Базовый
            функционал бесплатен навсегда
          </motion.p>
        </div>
      </div>
    </section>
  );
}
