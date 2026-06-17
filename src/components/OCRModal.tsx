"use client"

import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, AlertCircle, Camera, FileText, ChevronRight, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Step = "idle" | "uploading" | "analyzing" | "review" | "success" | "error"

interface OCRModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (data: any) => void
  vehicles: { id: string; make: string; model: string }[]
}

export function OCRModal({ isOpen, onClose, onSuccess, vehicles }: OCRModalProps) {
  const [step, setStep] = useState<Step>("idle")
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [ocrData, setOcrData] = useState<any>(null)
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setStep("idle")
      setProgress(0)
      setError(null)
      setOcrData(null)
      setIsSaving(false)
    } else if (vehicles.length === 1) {
      setSelectedVehicleId(vehicles[0].id)
    }
  }, [isOpen, vehicles])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setStep("uploading")
    setProgress(10)

    try {
      // 1. Get presigned URL
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ contentType: file.type, fileName: file.name }),
      })
      const { uploadUrl, key } = await res.json()
      setProgress(30)

      // 2. Upload to S3
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      })

      if (!uploadRes.ok) throw new Error("Failed to upload to S3")
      setProgress(60)

      // 3. Analyze
      setStep("analyzing")
      const analyzeRes = await fetch("/api/ocr/analyze", {
        method: "POST",
        body: JSON.stringify({ key }),
      })
      const { data } = await analyzeRes.json()
      
      setOcrData(data)
      setStep("review")
      setProgress(100)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Something went wrong")
      setStep("error")
    }
  }

  const handleConfirm = async () => {
    if (!selectedVehicleId) {
      setError("Выберите автомобиль")
      return
    }

    setIsSaving(true)
    try {
      const res = await fetch("/api/service-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...ocrData,
          vehicleId: selectedVehicleId,
          odometer: ocrData.mileage?.toString() || "0",
        }),
      })

      if (!res.ok) throw new Error("Failed to save record")

      setStep("success")
      onSuccess(ocrData)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to save record")
      setStep("error")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-[32px] p-8 [&>button:last-child]:hidden">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 text-left">
          <DialogTitle className="text-2xl font-bold text-slate-900">
            {step === "idle" && "Добавить чек"}
            {step === "uploading" && "Загрузка..."}
            {step === "analyzing" && "Искусственный интеллект работает"}
            {step === "review" && "Проверка данных"}
            {step === "success" && "Готово!"}
            {step === "error" && "Ошибка"}
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="h-10 w-10 rounded-xl bg-slate-50 p-0 hover:bg-slate-100 transition-all">
              <X className="h-5 w-5 text-slate-500" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="py-10">
          {step === "idle" && (
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center">
                <Camera className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-500 text-center text-sm font-medium leading-relaxed max-w-[300px]">
                Загрузите фото накладной или чека. AI автоматически распознает работы, запчасти и пробег.
              </p>
              <input 
                type="file" 
                id="receipt-upload" 
                className="hidden" 
                accept="image/*"
                onChange={handleFileUpload}
              />
              <Button 
                asChild 
                className="w-full h-12 rounded-xl bg-slate-900 font-bold hover:bg-slate-800"
              >
                <label htmlFor="receipt-upload" className="cursor-pointer">
                  Выбрать фото
                </label>
              </Button>
            </div>
          )}

          {(step === "uploading" || step === "analyzing") && (
            <div className="flex flex-col items-center gap-8">
              <div className="relative w-24 h-24">
                <Loader2 className="w-24 h-24 text-blue-600 animate-spin opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {step === "uploading" ? <FileText className="w-10 h-10 text-blue-600" /> : <div className="text-2xl font-bold text-blue-600">AI</div>}
                </div>
              </div>
              <div className="w-full space-y-4 text-center">
                <p className="text-slate-900 font-bold">
                  {step === "uploading" ? "Загружаем файл в облако..." : "Нейросеть распознает текст..."}
                </p>
                <Progress value={progress} className="h-2 bg-slate-100" />
              </div>
            </div>
          )}

          {step === "review" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 tracking-widest">Привязать к авто</Label>
                <Select onValueChange={setSelectedVehicleId} value={selectedVehicleId}>
                  <SelectTrigger className="!h-12 rounded-xl border-slate-200">
                    <SelectValue placeholder="Выберите автомобиль" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.make} {v.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                   <span className="text-xs font-bold text-slate-400 tracking-widest">Результат распознавания</span>
                   <Badge className="bg-green-100 text-green-700 border-none">98% точность</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Сервис:</span>
                    <span className="text-sm font-bold text-slate-900">{ocrData.serviceCenterName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Дата:</span>
                    <span className="text-sm font-bold text-slate-900">{ocrData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Сумма:</span>
                    <span className="text-sm font-bold text-slate-900">{ocrData.totalAmount} ₽</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} className="flex-1 h-12 rounded-xl border-slate-200 font-bold" disabled={isSaving}>
                  Отмена
                </Button>
                <Button 
                  onClick={handleConfirm} 
                  className="flex-1 h-12 rounded-xl bg-slate-900 font-bold hover:bg-slate-800"
                  disabled={isSaving || !selectedVehicleId}
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Подтвердить"}
                </Button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center gap-6 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Запись успешно добавлена</h3>
                <p className="text-slate-500 text-sm mt-2">Данные оцифрованы и сохранены в историю обслуживания вашего автомобиля.</p>
              </div>
              <Button onClick={onClose} className="w-full h-12 rounded-xl bg-slate-900 font-bold hover:bg-slate-800">
                Вернуться в гараж
              </Button>
            </div>
          )}

          {step === "error" && (
            <div className="flex flex-col items-center gap-6 text-center">
              <AlertCircle className="w-16 h-16 text-red-500" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Ошибка загрузки</h3>
                <p className="text-slate-500 text-sm mt-2">{error}</p>
              </div>
              <Button onClick={() => setStep("idle")} className="w-full h-12 rounded-xl bg-slate-900 font-bold hover:bg-slate-800">
                Попробовать еще раз
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
