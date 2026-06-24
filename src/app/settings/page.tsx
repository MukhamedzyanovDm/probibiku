"use client";

import { Loader2, ArrowLeft, CheckCircle2, Star, MessageCircle } from "lucide-react";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ProfileSettings {
  name: string;
  email: string;
  phone: string;
  emailConsent: boolean;
  telegramConnected: boolean;
  telegramUsername: string;
  avatarUrl: string;
}

const DEFAULT_PROFILE: ProfileSettings = {
  name: "Дмитрий",
  email: "dmitry@example.com",
  phone: "+7 (999) 123-45-67",
  emailConsent: true,
  telegramConnected: true,
  telegramUsername: "@dmitry_owner",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileSettings | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [carCount, setCarCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("probibiku_profile");
      if (stored) {
        try {
          setProfile(JSON.parse(stored));
        } catch (e) {
          setProfile(DEFAULT_PROFILE);
        }
      } else {
        localStorage.setItem("probibiku_profile", JSON.stringify(DEFAULT_PROFILE));
        setProfile(DEFAULT_PROFILE);
      }

      // Load cars to calculate gamification status
      const storedCars = localStorage.getItem("probibiku_cars");
      if (storedCars) {
        try {
          const parsed = JSON.parse(storedCars);
          if (Array.isArray(parsed)) {
            setCarCount(parsed.length);
          }
        } catch (e) {}
      }
    }
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <div className="text-center">
          <Loader2 className="text-4xl text-blue-500 animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-light mt-3">Загрузка настроек...</p>
        </div>
      </div>
    );
  }

  // Gamification Status Logic
  let statusText = "Новичок";
  let statusIcon = "";
  let statusColor = "text-slate-600 bg-slate-50 border-slate-200";

  if (carCount === 1) {
    statusText = "Профессионал";
    statusIcon = "/Ikon-set/single-car.png";
    statusColor = "text-blue-700 bg-blue-50/50 border-blue-200/60 shadow-[0_2px_8px_rgba(59,130,246,0.04)]";
  } else if (carCount > 1 && carCount < 4) {
    statusText = "Мастер";
    statusIcon = "/Ikon-set/two-cars.png";
    statusColor = "text-indigo-700 bg-indigo-50/50 border-indigo-200/60 shadow-[0_2px_8px_rgba(99,102,241,0.04)]";
  } else if (carCount >= 4) {
    statusText = "Олигарх";
    statusIcon = "/Ikon-set/trophy-cup.png";
    statusColor = "text-amber-700 bg-amber-50/50 border-amber-200/60 shadow-[0_2px_8px_rgba(245,158,11,0.04)]";
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("probibiku_profile", JSON.stringify(profile));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteAccount = () => {
    if (confirm("Вы уверены, что хотите полностью удалить свой аккаунт? Все данные автомобилей, истории обслуживания и настроек будут удалены безвозвратно.")) {
      localStorage.clear();
      alert("Ваш аккаунт и данные были успешно удалены.");
      router.push("/");
    }
  };

  return (
    <>
      <Background />
      <Header showAccountIcon={true} forceScrolled={true} />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20 font-sans min-h-screen">
        
        {/* Navigation / Actions Bar */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/garage"
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-blue-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            В гараж
          </Link>
        </div>

        <div className="rounded-[2.5rem] bg-white border border-slate-200/80 p-6 sm:p-10 shadow-[0_15px_40px_-20px_rgba(15,23,42,0.06)]">
          <h1 className="text-3xl font-normal tracking-tight text-slate-900 mb-8">Настройки профиля</h1>

          {saveSuccess && (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 mb-8 text-xs text-emerald-800 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Настройки успешно сохранены!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-10">
            {/* Section 1: User Avatar & Basic Data */}
            <div className="space-y-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
                Личные данные
              </h3>

              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border border-slate-200 bg-slate-50 shadow-inner">
                    <img src={profile.avatarUrl} alt="Аватар" className="w-full h-full object-cover" />
                  </div>
                  {/* Gamification Badge */}
                  <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-medium border ${statusColor} select-none transition-all`}>
                    {statusIcon ? (
                      <img src={statusIcon} className="w-3.5 h-3.5 object-contain" alt={statusText} />
                    ) : (
                      <Star className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>{statusText}</span>
                  </div>
                </div>
                <div className="flex-1 space-y-4 w-full">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-500 font-light mb-1">Имя *</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full text-base sm:text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 font-light mb-1">Email *</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full text-base sm:text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 font-light mb-1">Телефон</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full text-base sm:text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Notifications settings */}
            <div className="space-y-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
                Каналы уведомлений
              </h3>

              <div className="space-y-4">
                {/* Email Toggle */}
                <div className="flex items-start justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
                  <div className="space-y-1 pr-4">
                    <h4 className="text-sm font-normal text-slate-800">Напоминания по почте</h4>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      Согласие получать уведомления о приближающемся сроке ТО, окончании страховки ОСАГО и рекомендациях умного помощника на указанный почтовый адрес
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={profile.emailConsent}
                      onChange={(e) => setProfile({ ...profile, emailConsent: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                {/* Telegram Toggle */}
                <div className="flex items-start justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
                  <div className="space-y-1 pr-4">
                    <h4 className="text-sm font-normal text-slate-800">Интеграция с Telegram-ботом</h4>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      Дублировать критически важные напоминания в мессенджер через официального бота ПРОБИБИКУ
                    </p>
                    {profile.telegramConnected && (
                      <div className="pt-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                          <MessageCircle className="w-3.5 h-3.5" />
                          Подключено: {profile.telegramUsername}
                        </span>
                      </div>
                    )}
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={profile.telegramConnected}
                      onChange={(e) => setProfile({ ...profile, telegramConnected: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 3: Billing / Credits info */}
            <div className="space-y-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
                Мой баланс
              </h3>

              <div className="flex items-center justify-between p-5 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 border border-amber-600 shadow-sm text-white">
                <div>
                  <p className="text-[10px] font-mono text-amber-100 uppercase tracking-wider">Доступные кредиты</p>
                  <p className="text-3xl font-semibold mt-1 font-mono">10</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Система пополнения баланса будет доступна в следующей версии.")}
                  className="rounded-full bg-white text-amber-700 hover:bg-slate-50 text-xs font-normal px-4 py-2.5 shadow-sm transition-colors cursor-pointer"
                >
                  Пополнить баланс
                </button>
              </div>
            </div>

            {/* Section 4: Danger zone */}
            <div className="space-y-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-red-500 border-b border-red-100 pb-3">
                Опасная зона
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-red-50/30 border border-red-100/60 rounded-3xl gap-4">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-normal text-slate-800">Удалить аккаунт</h4>
                  <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                    Все ваши данные будут полностью стерты. Действие необратимо
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="rounded-full border border-red-200 hover:border-red-300 bg-white hover:bg-red-50/50 text-red-600 text-xs font-normal px-5 py-3 transition-colors cursor-pointer shrink-0"
                >
                  Удалить профиль
                </button>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="flex justify-end pt-6 border-t border-slate-100">
              <button
                type="submit"
                className="w-full sm:w-auto rounded-full bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-700 text-white text-sm font-normal px-8 py-3 shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer"
              >
                Сохранить настройки
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
