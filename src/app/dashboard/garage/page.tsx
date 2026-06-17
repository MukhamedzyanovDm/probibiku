"use client";

import {
  PlusCircle,
  ShieldAlert,
  Car as CarIcon,
  ArrowRight,
  Pencil,
  Trash2
} from "lucide-react";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Car, getCars, deleteCar } from "@/utils/garageStore";
import AddCarModal from "@/components/AddCarModal";

export default function GaragePage() {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState<Car | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const loadData = () => {
    setCars(getCars());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmId(id);
  };

  const handleEdit = (car: Car, e: React.MouseEvent) => {
    e.stopPropagation();
    setCarToEdit(car);
    setIsAddModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setCarToEdit(null);
    setIsAddModalOpen(true);
  };

  // Calculate metrics
  const totalExpenses = cars.reduce((acc, car) => {
    return acc + car.serviceHistory.reduce((sAcc, s) => sAcc + s.cost, 0);
  }, 0);

  const activeCars = cars.length;

  return (
    <>
      <Background />
      <Header showAccountIcon={true} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 font-sans min-h-screen">
        
        {/* Dashboard Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-normal tracking-tight text-slate-900">Мой гараж</h1>
            <p className="text-xs text-slate-400 font-light mt-1 uppercase tracking-wider font-mono">
              Обзор личного автопарка и расходов
            </p>
          </div>
          
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-700 text-white text-sm font-normal shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer"
          >
            <PlusCircle className="w-5 h-5" />
            Добавить автомобиль
          </button>
        </div>

        {/* Global Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Expenses */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.05)]">
            <p className="text-xs text-slate-400 font-light uppercase tracking-wider font-mono">Суммарные расходы</p>
            <p className="text-2xl font-semibold text-slate-900 mt-2 font-mono">
              {totalExpenses.toLocaleString("ru-RU")} ₽
            </p>
            <p className="text-[10px] text-slate-400 mt-1 font-light">Включая все ТО, ремонтные работы и запчасти</p>
          </div>

          {/* Card 2: Active Cars */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.05)]">
            <p className="text-xs text-slate-400 font-light uppercase tracking-wider font-mono">Активные автомобили</p>
            <p className="text-2xl font-semibold text-slate-900 mt-2 font-mono">{activeCars}</p>
            <p className="text-[10px] text-slate-400 mt-1 font-light">Доступно слотов в личном кабинете: 5</p>
          </div>

          {/* Card 3: Days to Maintenance */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.05)]">
            <p className="text-xs text-slate-400 font-light uppercase tracking-wider font-mono">До ближайшего ТО</p>
            <p className="text-2xl font-semibold text-blue-600 mt-2 font-mono">
              {activeCars > 0 ? "45 дней" : "—"}
            </p>
            <p className="text-[10px] text-slate-400 mt-1 font-light">
              {activeCars > 0 ? "По расчетам ИИ на основе пробега" : "Добавьте автомобиль"}
            </p>
          </div>

        </div>

        {/* Critical Alerts / Notifications */}
        {activeCars > 0 && (
          <div className="rounded-2xl border bg-amber-50/50 border-amber-100 p-4 mb-10 flex gap-4 text-xs">
            <ShieldAlert className="w-6 h-6 text-amber-500 shrink-0" />
            <div className="space-y-1.5">
              <strong className="block text-slate-800">Обратите внимание (2):</strong>
              <p className="text-slate-600 font-light">
                • Страховка ОСАГО для автомобиля <span className="font-medium text-slate-800">Kia Sportage (У777ХХ777)</span> истекает через 14 дней.
              </p>
              <p className="text-slate-600 font-light">
                • Выявлена активная отзывная кампания дилера по обновлению ПО рулевой рейки. Рекомендуется обратиться в СТО
              </p>
            </div>
          </div>
        )}

        {/* Cars List Grid */}
        {cars.length === 0 ? (
          <div className="text-center py-20 bg-white/50 border border-slate-200 rounded-[2rem] p-10">
            <CarIcon className="w-12 h-12 text-slate-300 mb-4 mx-auto" />
            <h3 className="text-lg font-medium text-slate-800">В вашем гараже пусто</h3>
            <p className="text-sm text-slate-500 font-light max-w-sm mx-auto mt-2 mb-6">
              Добавьте ваш первый автомобиль, чтобы начать отслеживать его расходы и прогнозировать регламент обслуживания
            </p>
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 bg-blue-500 text-white text-xs font-normal shadow-[0_4px_12px_rgba(59,130,246,0.15)] hover:bg-blue-600 transition-colors"
            >
              Добавить первый автомобиль
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cars.map((car) => {
              const carExpenses = car.serviceHistory.reduce((sum, s) => sum + s.cost, 0);
              return (
                <div
                  key={car.id}
                  onClick={() => router.push(`/garage/${car.id}`)}
                  className="group relative block overflow-hidden rounded-[2rem] bg-white border border-slate-200/80 shadow-[0_15px_40px_-20px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_50px_-25px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Aspect Ratio Box for Image */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={car.imageUrl || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80"}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Floating Health Badge */}
                    <div className="absolute top-4 left-4 rounded-xl bg-white/90 backdrop-blur border border-white px-3 py-1.5 shadow-md flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs font-mono font-medium text-slate-800">Состояние: {car.health}%</span>
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-4 left-5 right-5 text-white">
                      <h2 className="text-xl font-normal tracking-tight">
                        {car.make} {car.model}
                      </h2>
                      <p className="text-xs text-slate-200 font-light mt-0.5 font-mono uppercase tracking-wider">
                        {car.licensePlate || "Без госномера"}
                      </p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 text-xs mb-6 border-b border-slate-100 pb-5">
                      <div>
                        <p className="text-slate-400 font-light">Пробег</p>
                        <p className="text-sm font-semibold text-slate-800 font-mono mt-1">
                          {car.mileage.toLocaleString("ru-RU")} км
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-400 font-light">Расходы на СТО</p>
                        <p className="text-sm font-semibold text-slate-800 font-mono mt-1">
                          {carExpenses.toLocaleString("ru-RU")} ₽
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span className="text-blue-500 group-hover:underline inline-flex items-center gap-1">
                        Подробнее о машине
                        <ArrowRight className="w-4 h-4" />
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleEdit(car, e)}
                          className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
                          title="Редактировать"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(car.id, e)}
                          className="w-8 h-8 rounded-full border border-slate-200 hover:border-red-200 hover:bg-red-50 flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors"
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Dialog */}
        <AddCarModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={loadData}
          carToEdit={carToEdit}
        />

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in" 
              onClick={() => setDeleteConfirmId(null)}
            />
            
            {/* Modal Content */}
            <div className="relative w-full max-w-sm rounded-[2rem] bg-white border border-slate-200/80 shadow-2xl p-6 z-10 animate-in zoom-in-95 duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 mb-4 shadow-[0_4px_12px_rgba(239,68,68,0.1)]">
                  <Trash2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Удалить автомобиль?</h3>
                <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
                  Вы уверены, что хотите удалить этот автомобиль из базы? Все данные о расходах и истории ТО будут безвозвратно стерты
                </p>
                
                <div className="flex flex-col-reverse sm:flex-row gap-3 w-full mt-6">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-normal py-3 transition-colors cursor-pointer"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={() => {
                      if (deleteConfirmId) {
                        deleteCar(deleteConfirmId);
                        loadData();
                        setDeleteConfirmId(null);
                      }
                    }}
                    className="flex-1 rounded-full bg-red-600 hover:bg-red-500 border border-red-700 text-white text-xs font-normal py-3 shadow-[0_4px_12px_rgba(239,68,68,0.2)] transition-all active:scale-95 cursor-pointer"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}
