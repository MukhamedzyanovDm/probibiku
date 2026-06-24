"use client";

import {
  PlusCircle,
  ShieldAlert,
  Car as CarIcon,
  ArrowRight,
  Pencil,
  Trash2
} from "lucide-react";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import AddCarModal from "@/components/AddCarModal";
import GarageLoader from "@/components/GarageLoader";
import Portal from "@/components/Portal";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/figma/BrandLogo";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  mileage: number;
  health: number;
  imageUrl?: string;
  carExpenses: number;
  purchaseDate?: string;
  insuranceExpiry?: string;
}

interface GarageDashboardClientProps {
  cars: Car[];
  stats: {
    totalSpent: string;
    totalRecords: string;
    nextService: string;
  };
}

export function GarageDashboardClient({ cars, stats }: GarageDashboardClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState<Car | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const alerts: string[] = [];
  cars.forEach((car) => {
    if (car.insuranceExpiry) {
      const expiry = new Date(car.insuranceExpiry);
      const today = new Date();
      expiry.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      const diffTime = expiry.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      const formattedDate = new Date(car.insuranceExpiry).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });

      if (diffDays < 0) {
        alerts.push(`Внимание! Страховка ОСАГО для ${car.make} ${car.model} истекла ${Math.abs(diffDays)} дн. назад (${formattedDate.replace(" г.", "")})`);
      } else if (diffDays === 0) {
        alerts.push(`Внимание! Страховка ОСАГО для ${car.make} ${car.model} заканчивается сегодня (${formattedDate.replace(" г.", "")})`);
      } else if (diffDays <= 30) {
        const getDaysPlural = (n: number) => {
          const mod10 = n % 10;
          const mod100 = n % 100;
          if (mod100 >= 11 && mod100 <= 19) return "дней";
          if (mod10 === 1) return "день";
          if (mod10 >= 2 && mod10 <= 4) return "дня";
          return "дней";
        };
        const daysWord = getDaysPlural(diffDays);
        alerts.push(`Страховка ОСАГО для ${car.make} ${car.model} заканчивается через ${diffDays} ${daysWord} (${formattedDate.replace(" г.", "")})`);
      }
    }
  });

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

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        const res = await fetch(`/api/vehicles?id=${deleteConfirmId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete vehicle");
        
        setDeleteConfirmId(null);
        startTransition(() => {
          router.refresh();
        });
      } catch (err) {
        console.error("Error deleting vehicle:", err);
      }
    }
  };

  const activeCars = cars.length;

  return (
    <div className={isPending ? "opacity-75 transition-opacity" : ""}>
      {/* Dashboard Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-normal tracking-tight text-slate-900">Мой гараж</h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">
            Обзор личного автопарка и расходов
          </p>
        </div>
        
        <Button
          onClick={handleOpenAddModal}
          variant="brand"
          className="h-11 px-5"
        >
          <PlusCircle className="w-5 h-5" />
          Добавить автомобиль
        </Button>
      </div>

      {/* Global Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: Expenses */}
        <div className="rounded-[2.5rem] bg-white/70 border border-white p-5 shadow-[0_30px_70px_-25px_rgba(15,23,42,0.15),inset_0_2px_0_white] backdrop-blur-2xl">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-mono">Суммарные расходы</p>
          <p className="text-2xl font-semibold text-slate-900 mt-2 font-mono">
            {stats.totalSpent}
          </p>
          <p className="text-[10px] text-slate-600 mt-1">Включая все ТО, ремонтные работы и запчасти</p>
        </div>

        {/* Card 2: Active Cars */}
        <div className="rounded-[2.5rem] bg-white/70 border border-white p-5 shadow-[0_30px_70px_-25px_rgba(15,23,42,0.15),inset_0_2px_0_white] backdrop-blur-2xl">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-mono">Активные автомобили</p>
          <p className="text-2xl font-semibold text-slate-900 mt-2 font-mono">{activeCars}</p>
          <p className="text-[10px] text-slate-600 mt-1">Доступно слотов в личном кабинете: 5</p>
        </div>

        {/* Card 3: Days to Maintenance */}
        <div className="rounded-[2.5rem] bg-white/70 border border-white p-5 shadow-[0_30px_70px_-25px_rgba(15,23,42,0.15),inset_0_2px_0_white] backdrop-blur-2xl">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-mono">До ближайшего ТО</p>
          <p className="text-2xl font-semibold text-blue-600 mt-2 font-mono">
            {stats.nextService}
          </p>
          <p className="text-[10px] text-slate-600 mt-1">
            {activeCars > 0 ? "По расчетам ИИ на основе пробега" : "Добавьте автомобиль"}
          </p>
        </div>

      </div>

      {/* Critical Alerts / Notifications */}
      {alerts.length > 0 && (
        <div className="rounded-2xl border bg-amber-50/50 border-amber-100 p-4 mb-10 flex gap-4 text-xs">
          <ShieldAlert className="w-6 h-6 text-amber-500 shrink-0" />
          <div className="space-y-1.5">
            <strong className="block text-slate-800">Обратите внимание ({alerts.length}):</strong>
            {alerts.map((alert, idx) => (
              <p key={idx} className="text-slate-600">
                • {alert}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Cars List Grid */}
      {cars.length === 0 ? (
        <div className="text-center py-20 bg-white/50 border border-slate-200 rounded-[2rem] p-10">
          <CarIcon className="w-12 h-12 text-slate-300 mb-4 mx-auto" />
          <h3 className="text-lg font-medium text-slate-900">В вашем гараже пусто</h3>
          <p className="text-sm text-slate-600 max-w-sm mx-auto mt-2 mb-6">
            Добавьте ваш первый автомобиль, чтобы начать отслеживать его расходы и прогнозировать регламент обслуживания
          </p>
          <Button
            onClick={handleOpenAddModal}
            variant="brand"
            size="sm"
          >
            Добавить первый автомобиль
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cars.map((car) => {
            return (
              <div
                key={car.id}
                onClick={() => router.push(`/garage/${car.id}`)}
                className="group relative block overflow-hidden rounded-[2.5rem] bg-white/70 border border-white shadow-[0_30px_70px_-25px_rgba(15,23,42,0.15),inset_0_2px_0_white] backdrop-blur-2xl hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.22),inset_0_2px_0_white] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Aspect Ratio Box for Image */}
                <div className="relative h-48 w-full bg-slate-50 flex items-center justify-center border-b border-slate-100 overflow-hidden">
                  {car.imageUrl && (car.imageUrl.startsWith("http") || car.imageUrl.startsWith("data:")) ? (
                    <img
                      src={car.imageUrl}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-[#1d2a3d] to-[#131c2b] flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-500 relative">
                      <div
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                          backgroundSize: "24px 24px",
                        }}
                      />
                      <BrandLogo make={car.make} className="w-32 h-32 border border-white/10 shadow-lg relative z-10 p-4" />
                    </div>
                  )}
                  
                  {/* Floating Health Badge */}
                  <div className="absolute top-4 left-4 rounded-xl bg-white/90 backdrop-blur border border-white px-3 py-1.5 shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono font-medium text-slate-800">Состояние: {car.health}%</span>
                  </div>

                  {/* Floating Insurance Badge if expiring soon */}
                  {car.insuranceExpiry && (() => {
                    const expiry = new Date(car.insuranceExpiry);
                    const today = new Date();
                    expiry.setHours(0, 0, 0, 0);
                    today.setHours(0, 0, 0, 0);
                    const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    if (diffDays <= 30) {
                      return (
                        <div className="absolute top-4 right-4 rounded-xl bg-red-50/95 backdrop-blur border border-red-100 px-3 py-1.5 shadow-md flex items-center gap-1.5 animate-pulse">
                          <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                          <span className="text-[10px] font-mono font-medium text-red-700">
                            ОСАГО: {diffDays < 0 ? "Истекла" : `${diffDays} дн.`}
                          </span>
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  
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
                      <p className="text-slate-400">Пробег</p>
                      <p className="text-sm font-semibold text-slate-900 font-mono mt-1">
                        {car.mileage.toLocaleString("ru-RU")} км
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">Расходы на СТО</p>
                      <p className="text-sm font-semibold text-slate-900 font-mono mt-1">
                        {car.carExpenses.toLocaleString("ru-RU")} ₽
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
                        className="w-8 h-8 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-500 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                        title="Редактировать"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(car.id, e)}
                        className="w-8 h-8 rounded-full bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
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
        onSave={() => {
          startTransition(() => {
            router.refresh();
          });
        }}
        carToEdit={carToEdit}
      />

      {/* Garage Loader overlay when database / server transition is pending */}
      <GarageLoader isOpen={isPending} />

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <Portal>
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
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
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
                    onClick={handleDeleteConfirm}
                    className="flex-1 rounded-full bg-red-600 hover:bg-red-500 border border-red-700 text-white text-xs font-normal py-3 shadow-[0_4px_12px_rgba(239,68,68,0.2)] transition-all active:scale-95 cursor-pointer"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
