import { Lightbulb, PieChart, Folders, Clock } from "lucide-react";
import React from "react";

const PROBLEM_CARDS = [
  {
    title: "Сфотографировал и забыл",
    icon: Lightbulb,
    desc: "Не надо хранить, сортировать и переживать что выцветет. Сфотографировали накладную и она уже в истории. Навсегда. Даже та, где написано «замена чего-то за 4 800 руб»"
  },
  {
    title: "Куда уходят деньги на машину",
    icon: PieChart,
    desc: "Масло, колодки, «ну и заодно посмотрели подвеску»... Пробибику раскладывает всё по категориям, чтобы вы наконец увидели цифру и не пугались дважды"
  },
  {
    title: "Меняли сервис — история не потерялась",
    icon: Folders,
    desc: "Три мастера за пять лет? Отлично. Все их работы в одном месте, по датам, без пробелов. Как будто вы всё это время были очень организованным человеком"
  },
  {
    title: "ТО не подкрадётся",
    icon: Clock,
    desc: "Пробибику напомнит раньше, чем машина сама об этом сообщит скрипом"
  }
];

export default function WhyItMatters() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col z-10 w-full relative gap-y-16">
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-white/60 border border-white/80 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] backdrop-blur-md text-xs font-semibold text-blue-500 tracking-normal mb-4 select-none">
            Почему это важно
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-[1.05] max-w-5xl mx-auto font-sans">
            Всё про вашу машину
            <span className="block text-slate-950">И ничего лишнего</span>
          </h2>
          <p className="mt-5 text-base md:text-lg leading-8 text-slate-600 font-light max-w-2xl mx-auto font-sans">
          У вас в бардачке стопка чеков за 2014 год? У нас тоже была. Пробибику — это одно место вместо коробки с бумажками,
          заметок в телефоне и «мастер сказал что-то про тормоза, но я не помню»
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 font-sans">
          {PROBLEM_CARDS.map((card, index) => (
            <div
              key={index}
              className="group flex flex-col gap-4 rounded-2xl bg-white/62 border border-white p-6 shadow-[0_10px_28px_-20px_rgba(15,23,42,0.24),inset_0_1px_0_white] hover:-translate-y-1 hover:bg-white/82 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shadow-[inset_0_1px_0_white]">
                <card.icon className="w-[21px] h-[21px]" />
              </div>
              <div>
                <h3 className="text-lg font-normal tracking-tight text-slate-950">
                  {card.title}
                </h3>
                <p className="mt-3 leading-7 text-sm font-light text-slate-600">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
