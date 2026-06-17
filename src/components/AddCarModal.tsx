"use client";

import { XCircle, Camera } from "lucide-react";

import React, { useState, useEffect } from "react";
import { Car, addCar, updateCar } from "@/utils/garageStore";

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  carToEdit?: Car | null;
}

export default function AddCarModal({ isOpen, onClose, onSave, carToEdit }: AddCarModalProps) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [licensePlate, setLicensePlate] = useState("");
  const [mileage, setMileage] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState<{ make?: string; model?: string }>({});

  useEffect(() => {
    if (isOpen) {
      if (carToEdit) {
        setMake(carToEdit.make);
        setModel(carToEdit.model);
        setYear(carToEdit.year);
        setLicensePlate(carToEdit.licensePlate);
        setMileage(carToEdit.mileage);
        setPurchaseDate(carToEdit.purchaseDate);
        setImageUrl(carToEdit.imageUrl || "");
      } else {
        setMake("");
        setModel("");
        setYear(new Date().getFullYear());
        setLicensePlate("");
        setMileage(0);
        setPurchaseDate(new Date().toISOString().split("T")[0]);
        setImageUrl("");
      }
      setErrors({});
    }
  }, [carToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { make?: string; model?: string } = {};
    if (!make.trim()) {
      newErrors.make = "Пожалуйста, введите марку автомобиля";
    }
    if (!model.trim()) {
      newErrors.model = "Пожалуйста, введите модель автомобиля";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const defaultImg = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80";

    if (carToEdit) {
      updateCar({
        ...carToEdit,
        make,
        model,
        year,
        licensePlate,
        mileage,
        purchaseDate,
        imageUrl: imageUrl || defaultImg
      });
    } else {
      addCar({
        make,
        model,
        year,
        licensePlate,
        mileage,
        purchaseDate,
        imageUrl: imageUrl || defaultImg
      });
    }
    onSave();
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLicensePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    const latinToCyrillicMap: Record<string, string> = {
      'A': 'А', 'B': 'В', 'E': 'Е', 'K': 'К', 'M': 'М', 'H': 'Н', 'O': 'О', 'P': 'Р', 'C': 'С', 'T': 'Т', 'Y': 'У', 'X': 'Х',
      'a': 'А', 'b': 'В', 'e': 'Е', 'k': 'К', 'm': 'М', 'h': 'Н', 'o': 'О', 'p': 'Р', 'c': 'С', 't': 'Т', 'y': 'У', 'x': 'Х'
    };
    
    const processed = inputVal
      .split("")
      .map(char => latinToCyrillicMap[char] || char)
      .join("")
      .replace(/[^а-яА-ЯёЁ0-9\s-]/g, "");
      
    setLicensePlate(processed.toUpperCase());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.3)] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-medium text-slate-900">
            {carToEdit ? "Редактировать автомобиль" : "Добавить автомобиль в гараж"}
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 flex-1" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 font-light mb-1">Марка *</label>
              <input
                type="text"
                value={make}
                onChange={(e) => {
                  setMake(e.target.value);
                  if (errors.make) setErrors((prev) => ({ ...prev, make: undefined }));
                }}
                placeholder="Например, Kia, Toyota"
                className={`w-full text-base sm:text-sm border rounded-xl px-3.5 py-2.5 bg-slate-50/50 focus:bg-white outline-none transition-all ${
                  errors.make ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100" : "border-slate-200 focus:border-blue-500"
                }`}
                required
              />
              {errors.make && (
                <p className="text-[11px] text-red-500 font-light mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                  {errors.make}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-xs text-slate-500 font-light mb-1">Модель *</label>
              <input
                type="text"
                value={model}
                onChange={(e) => {
                  setModel(e.target.value);
                  if (errors.model) setErrors((prev) => ({ ...prev, model: undefined }));
                }}
                placeholder="Например, Sportage, RAV4"
                className={`w-full text-base sm:text-sm border rounded-xl px-3.5 py-2.5 bg-slate-50/50 focus:bg-white outline-none transition-all ${
                  errors.model ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100" : "border-slate-200 focus:border-blue-500"
                }`}
                required
              />
              {errors.model && (
                <p className="text-[11px] text-red-500 font-light mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                  {errors.model}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 font-light mb-1">Год выпуска</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                min={1950}
                max={new Date().getFullYear() + 1}
                className="w-full text-base sm:text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-500 font-light mb-1">Госномер</label>
              <input
                type="text"
                value={licensePlate}
                onChange={handleLicensePlateChange}
                placeholder="А000АА777"
                className="w-full text-base sm:text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 font-light mb-1">Текущий пробег (км)</label>
              <input
                type="number"
                value={mileage || ""}
                onChange={(e) => setMileage(Number(e.target.value))}
                min={0}
                placeholder="100 000"
                className="w-full text-base sm:text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-500 font-light mb-1">Дата покупки</label>
              <input
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="w-full min-w-0 text-base sm:text-sm border border-slate-200 rounded-xl pl-3 pr-2 py-2.5 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-500 font-light mb-1.5">Фото автомобиля</label>
            <div className="flex items-center gap-4">
              {imageUrl && (
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt="Превью" className="w-full h-full object-cover" />
                </div>
              )}
              <label className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/10 rounded-xl py-3 cursor-pointer transition-colors">
                <Camera className="w-[18px] h-[18px] text-slate-400 mb-1" />
                <span className="text-xs text-slate-600 font-normal">Выбрать файл с компьютера</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-slate-200 text-slate-600 text-sm font-normal py-3 bg-white hover:bg-slate-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-700 text-white text-sm font-normal py-3 shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              {carToEdit ? "Сохранить изменения" : "Создать автомобиль"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
