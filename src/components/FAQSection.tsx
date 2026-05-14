"use client";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import svgPaths from "@/imports/1920X1080/svg-acf38vze5p";

const faqs = [
  {
    question: "Как добавить чек в систему?",
    answer:
      "Просто сфотографируйте чек с помощью мобильного приложения или загрузите скан-копию через веб-интерфейс. Наш ИИ автоматически распознает все данные: работы, запчасти, цены и дату обслуживания.",
  },
  {
    question: "Безопасны ли мои данные?",
    answer:
      "Да, абсолютно. Мы используем шифрование данных на уровне банков, регулярно проходим аудит безопасности и соответствуем требованиям 152-ФЗ о персональных данных. Ваши данные хранятся на защищенных серверах в России.",
  },
  {
    question: "Могу ли я передать историю новому владельцу?",
    answer:
      "Конечно! Вы можете сгенерировать QR-код или отправить ссылку новому владельцу. Он получит полный доступ ко всей истории обслуживания автомобиля. Это значительно повышает доверие при продаже.",
  },
  {
    question: "Сколько это стоит?",
    answer:
      "Базовый функционал полностью бесплатен и включает хранение истории обслуживания, распознавание чеков и прогнозирование ТО. Премиум-подписка дает доступ к расширенной аналитике, экспорту в различные форматы и приоритетной поддержке.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="relative w-full py-24 bg-white">
      <div className="mx-auto max-w-[1000px] px-4">
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
              Частые вопросы
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display font-bold text-5xl lg:text-[64px] text-[#1e293b] text-center tracking-[-0.768px] leading-tight"
          >
            Частые вопросы
          </motion.h2>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full mt-6"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-[#e2e8f0] rounded-xl px-6 bg-white hover:shadow-md transition-all duration-200"
                >
                  <AccordionTrigger className="font-display font-semibold text-lg text-[#1e293b] hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-display text-base text-[#475569] leading-6 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
