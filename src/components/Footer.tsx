import React from "react";

export function Footer() {
  return (
    <footer className="relative z-10 w-full bg-white/72 border-t border-white shadow-[0_-18px_55px_-40px_rgba(15,23,42,0.45),inset_0_1px_0_white] backdrop-blur-xl">
      {/* Subtle footer glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12 font-sans">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-10 lg:gap-16">
          {/* Brand / Summary */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <a href="#" className="flex items-center gap-3 group">
              <img src="/Probibiku_main_logo.svg" alt="ПРОБИБИКУ" className="h-[22.4px] w-auto" />
            </a>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500 font-light">
            Вся история вашей машины в одном месте
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1.5 text-xs text-blue-600 shadow-[inset_0_1px_0_white]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Создано для автовладельцев
            </div>
          </div>

          {/* Footer Link Groups */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
            {/* Product */}
            <div>
              <p className="font-mono text-[10px] font-medium tracking-[-0.04em] text-slate-400 uppercase mb-4">
                Продукт
              </p>
              <div className="flex flex-col gap-3 text-sm text-slate-500 font-light">
                <a href="#features" className="hover:text-blue-600 transition-colors">
                  Возможности
                </a>
                <a href="#workflow" className="hover:text-blue-600 transition-colors">
                  Процесс
                </a>
                <a href="#built-for" className="hover:text-blue-600 transition-colors">
                  Для кого
                </a>
                <a href="#pricing" className="hover:text-blue-600 transition-colors">
                  Тарифы
                </a>
              </div>
            </div>

            {/* Workflow */}
            <div>
              <p className="font-mono text-[10px] font-medium tracking-[-0.04em] text-slate-400 uppercase mb-4">
                Функции
              </p>
              <div className="flex flex-col gap-3 text-sm text-slate-500 font-light">
                <a href="#workflow" className="hover:text-blue-600 transition-colors">
                  Сканирование чеков
                </a>
                <a href="#features" className="hover:text-blue-600 transition-colors">
                  Распознавание позиций
                </a>
                <a href="#features" className="hover:text-blue-600 transition-colors">
                  ИИ-прогноз ТО
                </a>
                <a href="#features" className="hover:text-blue-600 transition-colors">
                  Анализ расходов
                </a>
              </div>
            </div>

            {/* Trust */}
            <div>
              <p className="font-mono text-[10px] font-medium tracking-[-0.04em] text-slate-400 uppercase mb-4">
                Безопасность
              </p>
              <div className="flex flex-col gap-3 text-sm text-slate-500 font-light">
                <a href="#privacy" className="hover:text-blue-600 transition-colors">
                  Защита данных
                </a>
                <a href="#privacy" className="hover:text-blue-600 transition-colors">
                  Хранение чеков
                </a>
                <a href="#privacy" className="hover:text-blue-600 transition-colors">
                  Управление архивом
                </a>
                <a href="#faq" className="hover:text-blue-600 transition-colors">
                  Вопросы и ответы
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-6 border-t border-slate-200/70 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-light">
            © 2026 ПРОБИБИКУ. Все права защищены
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-400 font-light">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Условия использования
            </a>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <a href="#" className="hover:text-blue-600 transition-colors">
              Конфиденциальность
            </a>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <a href="#" className="hover:text-blue-600 transition-colors">
              Контакты
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
