"use client";

import { XCircle, Camera, Calendar } from "lucide-react";
import Portal from "@/components/Portal";
import React, { useState, useEffect } from "react";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  mileage: number;
  purchaseDate?: string;
  imageUrl?: string;
  insuranceExpiry?: string;
}

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  carToEdit?: Car | null;
}

// Client-side image compression helper
function compressImage(file: File, maxWidth = 1200, quality = 0.85): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Canvas toBlob failed"));
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export default function AddCarModal({ isOpen, onClose, onSave, carToEdit }: AddCarModalProps) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | "">(new Date().getFullYear());
  const [licensePlate, setLicensePlate] = useState("");
  const [mileage, setMileage] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [insuranceExpiry, setInsuranceExpiry] = useState("");
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ make?: string; model?: string; year?: string }>({});

  useEffect(() => {
    if (isOpen) {
      setSelectedFile(null);
      if (carToEdit) {
        setMake(carToEdit.make);
        setModel(carToEdit.model);
        setYear(carToEdit.year);
        setLicensePlate(carToEdit.licensePlate);
        setMileage(carToEdit.mileage);
        setPurchaseDate(carToEdit.purchaseDate || "");
        setPreviewUrl(carToEdit.imageUrl || "");
        setInsuranceExpiry(carToEdit.insuranceExpiry || "");
      } else {
        setMake("");
        setModel("");
        setYear(new Date().getFullYear());
        setLicensePlate("");
        setMileage(0);
        setPurchaseDate(new Date().toISOString().split("T")[0]);
        setPreviewUrl("");
        setInsuranceExpiry("");
      }
      setErrors({});
    }
  }, [carToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { make?: string; model?: string; year?: string } = {};
    if (!make.trim()) {
      newErrors.make = "Пожалуйста, введите марку автомобиля";
    }
    if (!model.trim()) {
      newErrors.model = "Пожалуйста, введите модель автомобиля";
    }

    const currentYear = new Date().getFullYear();
    const yearNum = Number(year);
    if (year !== "" && (isNaN(yearNum) || yearNum < 1950 || yearNum > currentYear)) {
      newErrors.year = `Год выпуска должен быть от 1950 до ${currentYear}`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      let uploadedUrl = previewUrl || null;

      // 1. If a new file is selected, compress and upload to S3
      if (selectedFile) {
        // Compress image client-side to keep file small (typically 200-400KB)
        const compressedBlob = await compressImage(selectedFile);
        
        // Request presigned URL from API
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contentType: "image/jpeg",
            fileName: selectedFile.name,
          }),
        });

        if (!uploadRes.ok) throw new Error("Failed to request upload URL");
        
        const { uploadUrl, publicUrl } = await uploadRes.json();

        // Upload directly to Yandex S3 via PUT request
        const s3Res = await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": "image/jpeg" },
          body: compressedBlob,
        });

        if (!s3Res.ok) throw new Error("Failed to upload image to S3");
        
        uploadedUrl = publicUrl;
      }

      // 2. Submit vehicle payload to our database endpoints
      const body = {
        id: carToEdit?.id,
        make,
        model,
        year: year ? year.toString() : new Date().getFullYear().toString(),
        plateNumber: licensePlate || null,
        currentMileage: mileage ? mileage.toString() : "0",
        imageUrl: uploadedUrl,
        insuranceExpiry: insuranceExpiry || null,
      };

      const method = carToEdit ? "PATCH" : "POST";

      const res = await fetch("/api/vehicles", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save vehicle payload");

      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving vehicle:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
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
    <Portal>
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.3)] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-medium text-slate-900">
            {carToEdit ? "Редактировать автомобиль" : "Добавить автомобиль в гараж"}
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center"
          >
            <XCircle className="w-7 h-7" />
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
                onChange={(e) => {
                  const val = e.target.value;
                  setYear(val === "" ? "" : Number(val));
                  if (errors.year) setErrors((prev) => ({ ...prev, year: undefined }));
                }}
                onFocus={(e) => {
                  try {
                    e.target.select();
                  } catch (err) {
                    if (year === new Date().getFullYear() || (carToEdit && year === carToEdit.year)) {
                      setYear("");
                    }
                  }
                }}
                onBlur={() => {
                  if (year === "" || year < 1900 || year > new Date().getFullYear()) {
                    setYear(carToEdit ? carToEdit.year : new Date().getFullYear());
                  }
                }}
                min={1950}
                max={new Date().getFullYear()}
                className="w-full text-base sm:text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all"
              />
              {errors.year && (
                <p className="text-red-500 text-[10px] mt-1 font-light">{errors.year}</p>
              )}
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
              <div className="relative">
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="w-full min-w-0 text-base sm:text-sm border border-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all"
                />
                <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 font-light mb-1">Дата окончания ОСАГО</label>
              <div className="relative">
                <input
                  type="date"
                  value={insuranceExpiry}
                  onChange={(e) => setInsuranceExpiry(e.target.value)}
                  className="w-full min-w-0 text-base sm:text-sm border border-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all"
                />
                <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-500 font-light mb-1.5">Фото автомобиля</label>
            <div className="flex items-center gap-4">
              {previewUrl && (
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img src={previewUrl} alt="Превью" className="w-full h-full object-cover" />
                </div>
              )}
              <label className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/10 rounded-xl py-3 cursor-pointer transition-colors">
                <Camera className="w-5 h-5 text-slate-400 mb-1" />
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
              disabled={isLoading}
              className="flex-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-700 text-white text-sm font-normal py-3 shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
            >
              {isLoading ? "Сохранение..." : carToEdit ? "Сохранить изменения" : "Создать автомобиль"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </Portal>
  );
}
