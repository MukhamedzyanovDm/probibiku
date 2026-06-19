"use client";

import { XCircle, Camera, Pencil, ChevronDown, PlusCircle, Trash2 } from "lucide-react";
import Portal from "@/components/Portal";

import React, { useState, useEffect } from "react";
import { Car, ServiceRecord, updateCar } from "@/utils/garageStore";

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

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  car: Car;
  recordToEdit?: ServiceRecord | null;
}

export default function AddRecordModal({ isOpen, onClose, onSave, car, recordToEdit }: AddRecordModalProps) {
  const [date, setDate] = useState("");
  const [type, setType] = useState<ServiceRecord["type"]>("ТО");
  const [mileage, setMileage] = useState(car.mileage);
  const [activeTab, setActiveTab] = useState<"scan" | "manual">("scan");
  
  // Itemized input states
  const [items, setItems] = useState<{ id: string; name: string; quantity: number; price: number }[]>([
    { id: "item-1", name: "", quantity: 1, price: 0 }
  ]);
  const [note, setNote] = useState("");
  
  const [errors, setErrors] = useState<{
    date?: string;
    mileage?: string;
    description?: string;
  }>({});
  
  // OCR Scan Simulation States
  const [isOcrActive, setIsOcrActive] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrLog, setOcrLog] = useState("");
  const [wasScanned, setWasScanned] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (recordToEdit) {
        setDate(recordToEdit.date);
        setType(recordToEdit.type);
        setMileage(recordToEdit.mileage);
        
        const descriptionLines = recordToEdit.description.split("\n");
        const parsedItems: { id: string; name: string; quantity: number; price: number }[] = [];
        let parsedNote = "";
        let isParsingItems = false;
        
        for (let i = 0; i < descriptionLines.length; i++) {
          const line = descriptionLines[i].trim();
          if (line === "Выполненные работы и запчасти:") {
            isParsingItems = true;
            continue;
          }
          if (isParsingItems) {
            if (line.startsWith("• ")) {
              const match = line.match(/^•\s+(.+?)\s+—\s+(\d+)\s+шт\.\s+x\s+(\d+)\s+₽/);
              if (match) {
                parsedItems.push({
                  id: `item-edit-${i}`,
                  name: match[1],
                  quantity: parseInt(match[2]),
                  price: parseInt(match[3])
                });
              } else {
                parsedItems.push({
                  id: `item-edit-${i}`,
                  name: line.substring(2),
                  quantity: 1,
                  price: 0
                });
              }
            }
          } else {
            if (line) {
              parsedNote += (parsedNote ? "\n" : "") + line;
            }
          }
        }
        
        if (parsedItems.length > 0) {
          setItems(parsedItems);
        } else {
          const cleanDesc = recordToEdit.description
            .replace("Выполненные работы и запчасти:", "")
            .replace(/•\s+/g, "")
            .trim();
          setItems([{
            id: "item-edit-default",
            name: cleanDesc || recordToEdit.type,
            quantity: 1,
            price: recordToEdit.cost
          }]);
        }
        setNote(parsedNote);
        setActiveTab("manual");
        setWasScanned(!!recordToEdit.receiptAttached);
        setErrors({});
      } else {
        setDate(new Date().toISOString().split("T")[0]);
        setType("ТО");
        setMileage(car.mileage);
        setItems([{ id: "item-1", name: "", quantity: 1, price: 0 }]);
        setNote("");
        setActiveTab("scan");
        setIsOcrActive(false);
        setWasScanned(false);
        setErrors({});
      }
    }
  }, [isOpen, car, recordToEdit]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { id: `item-${Math.random().toString(36).substr(2, 5)}`, name: "", quantity: 1, price: 0 }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (index: number, field: "name" | "quantity" | "price", value: any) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    if (errors.description) {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!date) {
      newErrors.date = "Пожалуйста, выберите дату";
    }
    if (mileage === undefined || mileage === null || mileage < 0) {
      newErrors.mileage = "Пробег не может быть пустым или отрицательным";
    }

    const invalidItems = items.some(item => !item.name.trim() || item.quantity <= 0 || item.price < 0);
    if (invalidItems) {
      newErrors.description = "Пожалуйста, заполните название, количество и цену для всех позиций";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const totalCalculatedCost = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    // Form description from items list
    const formattedDescription = (note.trim() ? note.trim() + "\n\n" : "") + 
      "Выполненные работы и запчасти:\n" + 
      items.map(item => `• ${item.name} — ${item.quantity} шт. x ${item.price} ₽`).join('\n');

    // Form parts listing
    const formattedParts = items.map(item => item.name).join(', ');

    const newRecord: ServiceRecord = {
      id: recordToEdit ? recordToEdit.id : `rec-${Math.random().toString(36).substr(2, 9)}`,
      date,
      type,
      mileage: Number(mileage),
      cost: totalCalculatedCost,
      description: formattedDescription,
      parts: formattedParts,
      receiptAttached: wasScanned || activeTab === "scan"
    };

    let updatedHistory = [...car.serviceHistory];
    if (recordToEdit) {
      const idx = updatedHistory.findIndex(r => r.id === recordToEdit.id);
      if (idx !== -1) {
        updatedHistory[idx] = newRecord;
      }
    } else {
      updatedHistory = [newRecord, ...updatedHistory];
    }

    const isDbVehicle = car.id.length === 36 && car.id.includes("-");

    if (isDbVehicle) {
      const dbPayload = {
        id: recordToEdit ? recordToEdit.id : undefined,
        vehicleId: car.id,
        date: new Date(date).toISOString(),
        odometer: Number(mileage),
        serviceCenterName: note.trim() || "Автосервис",
        totalAmount: totalCalculatedCost,
        type,
        items: items.map(item => ({
          description: item.name,
          cost: item.price,
          quantity: item.quantity
        }))
      };

      const method = recordToEdit ? "PATCH" : "POST";

      fetch("/api/service-records", {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dbPayload)
      })
      .then(res => {
        if (!res.ok) throw new Error("Не удалось сохранить запись");
        return res.json();
      })
      .then(() => {
        onSave();
        onClose();
      })
      .catch(err => {
        console.error(err);
        alert("Ошибка при сохранении записи: " + err.message);
      });
    } else {
      const updatedCar: Car = {
        ...car,
        mileage: Math.max(car.mileage, Number(mileage)),
        serviceHistory: updatedHistory
      };

      updateCar(updatedCar);
      onSave();
      onClose();
    }
  };

  const handleRealOcrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    setIsOcrActive(true);
    setOcrProgress(5);
    setOcrLog("Сжатие и подготовка изображения...");

    try {
      // Compress and convert to image/jpeg
      const compressedBlob = await compressImage(rawFile);
      const file = new File([compressedBlob], rawFile.name.replace(/\.[^/.]+$/, "") + ".jpg", {
        type: "image/jpeg"
      });

      setOcrProgress(10);
      setOcrLog("Загрузка файла в облако...");

      // 1. Get presigned URL
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ contentType: file.type, fileName: file.name }),
        headers: { "Content-Type": "application/json" },
      });
      if (!uploadRes.ok) throw new Error("Failed to prepare upload");
      const { uploadUrl, key } = await uploadRes.json();
      setOcrProgress(30);
      setOcrLog("Загрузка чека в S3...");

      // 2. Upload to S3
      const s3Res = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!s3Res.ok) throw new Error("Failed to upload to S3");
      setOcrProgress(50);
      setOcrLog("Распознавание чека искусственным интеллектом...");

      // 3. Analyze via real OCR API
      const analyzeRes = await fetch("/api/ocr/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      if (!analyzeRes.ok) throw new Error("Failed to analyze receipt");
      const { data } = await analyzeRes.json();
      
      setOcrProgress(90);
      setOcrLog("Обработка результатов...");

      // 4. Prefill form fields with real OCR data
      if (data) {
        if (data.date) setDate(data.date);
        if (data.serviceCenterName) setNote(data.serviceCenterName);
        if (data.mileage) setMileage(Number(data.mileage));
        
        // Map items
        if (data.items && Array.isArray(data.items)) {
          const mappedItems = data.items.map((item: any, idx: number) => ({
            id: `item-${Date.now()}-${idx}`,
            name: item.description || item.name || "Работа / Запчасть",
            quantity: Number(item.quantity) || 1,
            price: Number(item.cost) || Number(item.price) || 0
          }));
          setItems(mappedItems);
        }
      }

      setOcrProgress(100);
      setOcrLog("Успешно оцифровано!");
      
      setTimeout(() => {
        setIsOcrActive(false);
        setActiveTab("manual"); // Switch to manual review tab
        setWasScanned(true);
      }, 800);

    } catch (err: any) {
      console.error("OCR process error:", err);
      setOcrLog("Ошибка: " + (err.message || "не удалось распознать"));
      setOcrProgress(0);
      setTimeout(() => {
        setIsOcrActive(false);
      }, 3000);
    }
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
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.3)] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white z-20">
          <h3 className="text-base font-medium text-slate-900">
            {recordToEdit ? "Редактировать запись обслуживания" : "Добавить запись обслуживания"}
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-100 px-4 sm:px-6 bg-slate-50/30 z-20">
          <button
            type="button"
            onClick={() => setActiveTab("scan")}
            className={`flex-1 py-2.5 sm:py-3.5 text-[11px] sm:text-xs font-medium border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "scan"
                ? "border-blue-500 text-blue-600 font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            Скан чека 
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("manual")}
            className={`flex-1 py-2.5 sm:py-3.5 text-[11px] sm:text-xs font-medium border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "manual"
                ? "border-blue-500 text-blue-600 font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Pencil className="w-3.5 h-3.5" />
            Добавить вручную
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 flex-1 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            
            {/* Common Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 font-light mb-1">Дата *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
                  }}
                  className={`w-full min-w-0 text-base sm:text-sm border rounded-xl pl-3 pr-2 py-2.5 bg-slate-50/50 focus:bg-white outline-none transition-all ${
                    errors.date ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100" : "border-slate-200 focus:border-blue-500"
                  }`}
                  required
                />
                {errors.date && (
                  <p className="text-[11px] text-red-500 font-light mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs text-slate-500 font-light mb-1">Тип ремонта *</label>
                <div className="relative">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as ServiceRecord["type"])}
                    className="w-full text-base sm:text-sm border border-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="ТО">ТО</option>
                    <option value="Ремонт">Ремонт</option>
                    <option value="Тюнинг">Тюнинг</option>
                    <option value="Другое">Другое</option>
                  </select>
                  <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs text-slate-500 font-light mb-1">Пробег (км) *</label>
                <input
                  type="number"
                  value={mileage}
                  onChange={(e) => {
                    setMileage(Number(e.target.value));
                    if (errors.mileage) setErrors((prev) => ({ ...prev, mileage: undefined }));
                  }}
                  min={0}
                  className={`w-full text-base sm:text-sm border rounded-xl px-3.5 py-2.5 bg-slate-50/50 focus:bg-white outline-none transition-all ${
                    errors.mileage ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100" : "border-slate-200 focus:border-blue-500"
                  }`}
                  required
                />
                {errors.mileage && (
                  <p className="text-[11px] text-red-500 font-light mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                    {errors.mileage}
                  </p>
                )}
              </div>
            </div>

            {/* FLOW 1: AI SCAN */}
            {activeTab === "scan" && (
              <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/50 p-6 relative overflow-hidden my-4 animate-in fade-in duration-300">
                {isOcrActive ? (
                  <div className="text-center py-4">
                    <p className="text-xs font-mono text-blue-600 mb-3 animate-pulse">{ocrLog}</p>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full transition-all duration-100" style={{ width: `${ocrProgress}%` }} />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center py-4 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-[inset_0_1px_0_white]">
                      <Camera className="w-[21px] h-[21px]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-800">Загрузите или сфотографируйте чек</h4>
                      <p className="text-xs text-slate-500 font-light mt-1 max-w-xs leading-relaxed">
                        Наш искусственный интеллект распознает смету и автоматически заполнит позиции в деталях
                      </p>
                    </div>
                    <label
                      className="rounded-full bg-blue-600 hover:bg-blue-500 border border-blue-700 text-white text-xs font-normal px-5 py-3 shadow-[0_4px_12px_rgba(59,130,246,0.2)] transition-all cursor-pointer text-center inline-block"
                    >
                      Выбрать фото чека
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleRealOcrUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* FLOW 2: MANUAL ENTRY */}
            {activeTab === "manual" && (
              <div className="space-y-4 pt-4 border-t border-slate-100 animate-in fade-in duration-300">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
                      Позиции из чека
                    </p>
                    <span className="text-[10px] text-slate-400 font-light font-mono block mt-0.5">
                      Хотя бы 1 позиция
                    </span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 transition-colors font-medium cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    Добавить позицию
                  </button>
                </div>
                
                <div className="space-y-3 max-h-[215px] overflow-y-auto pr-1">
                  {items.map((item, index) => (
                    <div key={item.id} className="p-3.5 bg-slate-50/70 border border-slate-200/60 rounded-2xl space-y-3 relative group transition-all">
                      {/* Name & Delete button */}
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleItemChange(index, "name", e.target.value)}
                          placeholder="Описание (например, Замена тормозных колодок)"
                          className="flex-1 text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white focus:border-blue-500 outline-none transition-all"
                          required
                        />
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="w-8 h-8 rounded-full border border-slate-200 hover:border-red-200 hover:bg-red-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                            title="Удалить позицию"
                          >
                             <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Quantity, Price & Subtotal */}
                      <div className="flex gap-4 items-center justify-between flex-wrap sm:flex-nowrap">
                        <div className="flex gap-3 items-center">
                          {/* Quantity */}
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-slate-400 font-light font-mono uppercase">Кол-во:</span>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, "quantity", Math.max(1, Number(e.target.value)))}
                              min={1}
                              className="w-14 text-center text-xs border border-slate-200 rounded-xl px-2 py-1.5 bg-white focus:border-blue-500 outline-none transition-all font-mono"
                              required
                            />
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-slate-400 font-light font-mono uppercase">Цена (₽):</span>
                            <input
                              type="number"
                              value={item.price || ""}
                              onChange={(e) => handleItemChange(index, "price", Math.max(0, Number(e.target.value)))}
                              min={0}
                              placeholder="0"
                              className="w-24 text-center text-xs border border-slate-200 rounded-xl px-2 py-1.5 bg-white focus:border-blue-500 outline-none transition-all font-mono"
                              required
                            />
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right shrink-0">
                          <span className="text-[9px] text-slate-400 font-light font-mono uppercase block">Итого:</span>
                          <span className="text-xs font-semibold text-slate-700 font-mono">
                            {(item.quantity * item.price).toLocaleString("ru-RU")} ₽
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>



                {errors.description && (
                  <p className="text-[11px] text-red-500 font-light mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                    {errors.description}
                  </p>
                )}

                {/* Total Calculated Cost Card */}
                <div className="rounded-2xl bg-blue-50/50 border border-blue-100/50 p-4 flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium">Общая стоимость чека:</span>
                  <span className="text-lg font-bold text-blue-600 font-mono">
                    {items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toLocaleString("ru-RU")} ₽
                  </span>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-xs text-slate-500 font-light mb-1">Дополнительные примечания (опционально)</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Например, название СТО или дополнительные комментарии..."
                    rows={2}
                    className="w-full text-base sm:text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {/* Bottom Actions Row */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-slate-100 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-full border border-slate-200 text-slate-600 text-sm font-normal py-3 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Отмена
              </button>
              {activeTab === "scan" ? (
                <button
                  type="button"
                  onClick={() => setActiveTab("manual")}
                  className="flex-1 rounded-full bg-blue-500 hover:bg-blue-600 border border-blue-700 text-white text-sm font-normal py-3 shadow-[0_4px_12px_rgba(59,130,246,0.2)] transition-all cursor-pointer text-center"
                >
                  Ввести вручную
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-700 text-white text-sm font-normal py-3 shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer"
                >
                  {recordToEdit ? "Сохранить изменения" : "Добавить запись"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
    </Portal>
  );
}
