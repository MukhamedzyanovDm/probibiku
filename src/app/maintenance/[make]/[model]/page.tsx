import { ArrowLeft, Calendar, Zap, ArrowRight } from "lucide-react";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import Script from "next/script";

interface PageProps {
  params: Promise<{
    make: string;
    model: string;
  }>;
}

// Helper to capitalize words
const capitalize = (str: string) => {
  return str.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};

// Mock data generator for different models
const getMaintenanceData = (make: string, model: string) => {
  const carName = `${capitalize(make)} ${capitalize(model)}`;
  
  // Standard prices varied slightly by make/class
  const isPremium = ["bmw", "mercedes", "audi", "porsche", "lexus"].includes(make.toLowerCase());
  const factor = isPremium ? 1.8 : 1.0;

  return {
    carName,
    intervals: [
      { name: "ТО-1 (15 000 км или 1 год)", items: "Масло моторное, фильтр масляный, салонный фильтр, комплексная диагностика", cost: Math.round(7500 * factor) },
      { name: "ТО-2 (30 000 км или 2 года)", items: "ТО-1 + замена тормозной жидкости, свечи зажигания, воздушный фильтр", cost: Math.round(14500 * factor) },
      { name: "ТО-3 (45 000 км или 3 года)", items: "ТО-1 + замена антифриза, воздушный фильтр двигателя", cost: Math.round(9500 * factor) },
      { name: "ТО-4 (60 000 км или 4 года)", items: "ТО-2 + замена приводных ремней/ГРМ, масло в КПП", cost: Math.round(27000 * factor) }
    ],
    commonIssues: [
      { part: "Передние тормозные колодки", interval: "каждые 30 000 - 45 000 км", avgCost: Math.round(4500 * factor) },
      { part: "Свечи зажигания", interval: "каждые 30 000 км", avgCost: Math.round(3000 * factor) },
      { part: "Стойки стабилизатора", interval: "каждые 50 000 км", avgCost: Math.round(2500 * factor) }
    ]
  };
};

export default async function MaintenancePage({ params }: PageProps) {
  const { make, model } = await params;
  const data = getMaintenanceData(make, model);

  // SEO schema.org markup (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Guide",
    "name": `Регламент ТО и стоимость содержания ${data.carName}`,
    "description": `Детализированный график регламентных работ, стоимость прохождения ТО-1, ТО-2, ТО-3, ТО-4 и типичные расходы на обслуживание автомобиля ${data.carName}.`,
    "publisher": {
      "@type": "Organization",
      "name": "Пробибику",
      "logo": {
        "@type": "ImageObject",
        "url": "https://probibiku.ru/Probibiku_main_logo.svg"
      }
    }
  };

  return (
    <>
      <Background />
      <Header />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20 font-sans">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-blue-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад на главную
          </a>
        </div>

        <div className="bg-white/70 border border-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.1)] rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-xl">
          <span className="font-mono text-xs font-semibold tracking-wider text-blue-500 uppercase bg-blue-50/80 px-3 py-1 rounded-full border border-blue-100">
            Справочник ТО
          </span>
          <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-slate-900 mt-4">
            Регламент ТО и стоимость обслуживания {data.carName}
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            На основе анализа сотен оцифрованных чеков и официальных регламентов дилеров, мы составили актуальную карту расходов на обслуживание {data.carName}. Загрузите чек своего автосервиса в личный кабинет «Пробибику», чтобы автоматически отслеживать износ и получать умные уведомления
          </p>

          {/* Maintenance intervals table */}
          <div className="mt-10">
            <h2 className="text-xl font-normal text-slate-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              График регламентных работ
            </h2>
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white/50">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-medium font-mono text-xs">
                      <th className="p-4">Интервал прохождения</th>
                      <th className="p-4">Список обязательных работ</th>
                      <th className="p-4 text-right">Средняя стоимость</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150">
                    {data.intervals.map((interval, index) => (
                      <tr key={index} className="hover:bg-slate-50/30 transition-colors">
                        <td className="p-4 font-normal text-slate-800">{interval.name}</td>
                        <td className="p-4 text-slate-600 text-xs leading-relaxed">{interval.items}</td>
                        <td className="p-4 text-right font-mono font-medium text-slate-900">{interval.cost.toLocaleString("ru-RU")} ₽</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Frequent wear items */}
          <div className="mt-10">
            <h2 className="text-xl font-normal text-slate-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              Расходные материалы и частые замены
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {data.commonIssues.map((issue, index) => (
                <div key={index} className="bg-white/80 border border-slate-200/60 rounded-2xl p-4 shadow-[0_4px_12px_rgba(15,23,42,0.02)]">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-mono">Деталь</p>
                  <p className="text-sm font-medium text-slate-800 mt-1">{issue.part}</p>
                  <p className="text-xs text-slate-600 mt-2">{issue.interval}</p>
                  <p className="text-base font-mono font-medium text-blue-600 mt-3">~{issue.avgCost.toLocaleString("ru-RU")} ₽</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-12 rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 border border-blue-700 p-6 sm:p-8 text-white relative overflow-hidden shadow-[0_15px_35px_-10px_rgba(59,130,246,0.3)]">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <h3 className="text-xl font-normal mb-2">Начните вести сервисную историю автоматически</h3>
            <p className="text-sm text-blue-100 mb-6 max-w-xl">
              Загрузите ваш первый чек на главной странице. Наш ИИ распознает все позиции, добавит их в историю обслуживания и построит точный прогноз замен
            </p>
            <a
              href="/#demo"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 bg-white text-slate-900 text-sm font-normal shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Оцифровать чек бесплатно
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
