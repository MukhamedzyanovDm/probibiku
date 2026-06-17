"use client";
import { Icon } from "@iconify/react";

import React, { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_PROMPTS = [
  "Как Пробибику оцифровывает чеки?",
  "Когда нужно менять моторное масло?",
  "На сколько хватает 10 кредитов?",
  "Как работает ИИ-анализ смет сервиса?",
];

const KNOWLEDGE_BASE = [
  {
    keywords: ["чек", "оцифр", "скан", "фото"],
    answer: "Пробибику использует оптическое распознавание символов (OCR) совместно с искусственным интеллектом для мгновенного анализа чеков и заказ-нарядов. Вы просто фотографируете бумажный чек или загружаете PDF, а ИИ автоматически вычленеет стоимость работ, запчастей, ГСМ и заносит в сервисную книжку вашего автомобиля.",
  },
  {
    keywords: ["масл", "то", "замен", "регламент", "срок"],
    answer: "Интервал замены моторного масла зависит от автомобиля, но в среднем рекомендуется менять его каждые 7 500 – 10 000 км пробега или раз в год. Пробибику высчитывает индивидуальный износ расходников на основе вашего пробега и условий эксплуатации, напоминая о необходимости ТО заранее.",
  },
  {
    keywords: ["кредит", "цен", "плат", "подписк", "сколько"],
    answer: "В Пробибику нет ежемесячных подписок. Мы используем систему разовых кредитов, которые никогда не сгорают. 1 кредит списывается за оцифровку одного чека или одну ИИ-проверку сметы автосервиса. При регистрации мы дарим 10 бесплатных кредитов, чтобы вы могли оценить все возможности сервиса.",
  },
  {
    keywords: ["смет", "анализ", "сервис", "ремонт", "оценка"],
    answer: "Наша ИИ-проверка смет позволяет загрузить калькуляцию или заказ-наряд перед ремонтом. ИИ анализирует стоимость запчастей и нормо-часов, сравнивает их со средними рыночными ценами в вашем регионе и подсказывает, не завысил ли автосервис цену и не навязал ли лишние услуги.",
  },
  {
    keywords: ["привет", "здравствуй", "кто ты", "начать"],
    answer: "Привет! Я умный ИИ-помощник Пробибику. Помогаю автовладельцам планировать расходы на авто, разбираться в регламентах ТО, проверять сметы из автосервисов и эффективно вести сервисную историю. Задайте мне любой вопрос об обслуживании вашего авто!",
  },
];

export default function AIChat({ isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message on client mount to avoid hydration time mismatch
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "ai",
        text: "Привет! Я ИИ-ассистент Пробибику. Помогу разобраться в расходах на авто, подскажу сроки обслуживания или отвечу на вопросы по работе сервиса. Чем могу помочь?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto scroll to bottom when message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap and lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const generateAIResponse = (userText: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const normalizedText = userText.toLowerCase();
      let matchedAnswer = "";

      for (const entry of KNOWLEDGE_BASE) {
        if (entry.keywords.some((keyword) => normalizedText.includes(keyword))) {
          matchedAnswer = entry.answer;
          break;
        }
      }

      if (!matchedAnswer) {
        matchedAnswer = "Отличный вопрос! Чтобы дать точный ответ, мне нужно чуть больше контекста о марке вашего авто, годе выпуска или текущем пробеге. В целом, с Пробибику вы можете оцифровать любой чек ремонта, вести учет ГСМ и получать подсказки от ИИ о состоянии систем машины.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "ai",
          text: matchedAnswer,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    generateAIResponse(text);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Chat Drawer */}
      <div
        ref={chatRef}
        className="relative w-full max-w-md h-full bg-white/95 backdrop-blur-2xl border-l border-slate-200/80 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
              <img src="/Probibiku_small_logo.svg" alt="Пробибику" className="w-6 h-6 object-contain" />
              {/* Online indicator */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-900">ИИ Ассистент</h3>
              <p className="text-[10px] text-slate-400 font-light mt-0.5">В сети • Помощник Пробибику</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl p-1.5 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Закрыть чат"
          >
            <Icon icon="solar:close-circle-linear" className="text-2xl" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${
                msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
              }`}
            >
              <div
                className={`rounded-[1.5rem] px-4 py-3 text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/10 rounded-tr-none"
                    : "bg-white border border-slate-200/60 text-slate-800 shadow-sm rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-slate-400 font-light font-mono mt-1 px-1">
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex flex-col items-start max-w-[85%] mr-auto">
              <div className="rounded-[1.5rem] rounded-tl-none px-4 py-3 bg-white border border-slate-200/60 text-slate-500 shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-white/30 backdrop-blur-sm">
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2.5">Частые вопросы</p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-left text-xs text-slate-600 hover:text-blue-600 bg-white hover:bg-blue-50/50 border border-slate-200/60 hover:border-blue-200 rounded-xl px-3.5 py-2.5 transition-all shadow-sm hover:shadow-md cursor-pointer font-light"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-slate-100 bg-white sticky bottom-0 z-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Спросите ассистента..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="flex items-center justify-center w-10 h-10 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white disabled:bg-slate-100 disabled:text-slate-400 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 disabled:scale-100 transition-all cursor-pointer"
              aria-label="Отправить сообщение"
            >
              <Icon icon="solar:send-bold" className="text-lg" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
