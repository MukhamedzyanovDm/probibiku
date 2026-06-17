"use client";
import { Icon } from "@iconify/react";

import React, { useState } from "react";

const REVIEWS = [
  {
    author: "Екатерина В.",
    car: "Kia Rio",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    text: "Честно, скачала из-за подруги. Но теперь реально фотографирую каждый чек. Реально быстрее чем саой забивать",
  },
  {
    author: "Мария К.",
    car: "Toyota RAV4",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    text: "Всегда забывала что и когда меняли в машине. В бардачке лежала стопка бумажек — и всё. Теперь хотя бы знаю, что вообще делали с машиной",
  },
  {
    author: "Анна С.",
    car: "Mini Cooper",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    text: "Не люблю подписки, поэтому обрадовалась что можно просто купить сколько надо. Загрузила все чеки за два года — заняло минут двадцать и понятный, никаких лишних сложностей.",
  },
];

export default function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [carName, setCarName] = useState("");
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setFeedbackSubmitted(false);
      setName("");
      setCarName("");
      setReviewText("");
    }, 3000);
  };

  return (
    <section id="testimonials" className="max-w-7xl mx-auto px-6 py-20 font-sans relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[50%] h-[40%] rounded-full bg-gradient-to-tr from-blue-100/20 via-indigo-100/10 to-transparent blur-[120px] pointer-events-none" />

      {/* Section Intro */}
      <div className="text-center max-w-5xl mx-auto mb-16">
        <p className="font-mono text-xs font-medium tracking-[-0.04em] text-blue-500 mb-4">
          Отзывы
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-[1.05] max-w-5xl mx-auto">
          Что говорят автовладельцы
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-medium">о сервисе Пробибику.</span>
        </h2>
        <p className="mt-6 text-base md:text-lg leading-8 text-slate-600 font-light max-w-3xl mx-auto">
         Те, кто пользуется Пробибику, знают сколько потратили на машину за последние три года. Остальные примерно догадываются
        </p>
      </div>

      {/* Grid of Reviews */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        {REVIEWS.map((rev, idx) => (
          <div
            key={idx}
            className="group relative rounded-[2rem] bg-white/60 border border-slate-200/60 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.05),inset_0_1px_0_white] p-6 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.1),inset_0_1px_0_white] transition-all duration-500 flex flex-col justify-between"
          >
            <div>
              {/* Star Rating */}
              <div className="flex gap-1 mb-5">
                {[...Array(rev.rating)].map((_, i) => (
                  <Icon
                    key={i}
                    icon="solar:star-bold"
                    className="text-amber-400 text-sm"
                  />
                ))}
              </div>
              
              {/* Review Text */}
              <p className="text-xs text-slate-600 font-light leading-relaxed font-sans mb-6">
                “{rev.text}”
              </p>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <img
                src={rev.avatar}
                alt={rev.author}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
              />
              <div>
                <h4 className="text-xs font-semibold text-slate-800">{rev.author}</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{rev.car}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-gradient-to-b from-white to-slate-50 border border-slate-200 text-slate-700 text-xs font-normal shadow-[0_4px_12px_rgba(15,23,42,0.05),inset_0_1px_0_white] hover:from-slate-50 hover:to-slate-100 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        >
          <Icon icon="solar:pen-linear" className="text-base text-blue-500" />
          Оставить отзыв
        </button>
      </div>

      {/* Interactive Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setModalOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Card */}
          <div className="relative rounded-[2.25rem] bg-white border border-slate-200 p-6 md:p-8 max-w-md w-full shadow-2xl z-10 overflow-hidden">
            {feedbackSubmitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 mx-auto mb-4 animate-bounce">
                  <Icon icon="solar:check-circle-linear" className="text-2xl" />
                </div>
                <h4 className="text-base font-semibold text-slate-900">Спасибо за отзыв!</h4>
                <p className="text-xs text-slate-500 font-light mt-2">
                  Ваш отзыв успешно отправлен и появится на сайте после модерации.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Ваш отзыв о Пробибику</h3>
                    <p className="text-xs text-slate-400 font-light mt-1">Поделитесь вашим честным мнением о сервисе</p>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center"
                  >
                    <Icon icon="solar:close-circle-linear" className="text-[28px]" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-500 font-light mb-1">Ваше имя *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all"
                      placeholder="Елена К."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-slate-500 font-light mb-1">Марка и модель автомобиля</label>
                    <input
                      type="text"
                      value={carName}
                      onChange={(e) => setCarName(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all"
                      placeholder="Hyundai Solaris"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 font-light mb-1">Отзыв *</label>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all min-h-[80px] resize-none"
                      placeholder="Напишите, что вам больше всего понравилось в сервисе..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-700 text-white font-normal text-xs shadow-[0_4px_10px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] hover:from-blue-400 hover:to-blue-500 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] transition-all cursor-pointer"
                  >
                    Отправить отзыв
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
