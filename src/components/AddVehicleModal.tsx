"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, X } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface AddVehicleModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddVehicleModal({ isOpen, onClose, onSuccess }: AddVehicleModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    plateNumber: "",
    currentMileage: "",
    vin: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to add vehicle")
      }

      toast.success("Автомобиль успешно добавлен")
      router.refresh()
      onSuccess()
      onClose()
      
      // Reset form
      setFormData({
        make: "",
        model: "",
        year: "",
        plateNumber: "",
        currentMileage: "",
        vin: "",
      })
    } catch (error) {
      console.error("Failed to add vehicle:", error)
      toast.error("Не удалось добавить автомобиль. Проверьте подключение к базе данных.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-[32px] p-8 [&>button:last-child]:hidden">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 text-left">
          <DialogTitle className="text-2xl font-bold text-slate-900">Добавить автомобиль</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="h-10 w-10 rounded-xl bg-slate-50 p-0 hover:bg-slate-100 transition-all">
              <X className="h-5 w-5 text-slate-500" />
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="make" className="text-xs font-bold text-slate-400 tracking-widest">Марка</Label>
              <Input 
                id="make" 
                placeholder="Напр: BMW" 
                required 
                className="h-12 rounded-xl border-slate-200"
                value={formData.make}
                onChange={e => setFormData({...formData, make: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model" className="text-xs font-bold text-slate-400 tracking-widest">Модель</Label>
              <Input 
                id="model" 
                placeholder="Напр: X5" 
                required 
                className="h-12 rounded-xl border-slate-200"
                value={formData.model}
                onChange={e => setFormData({...formData, model: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="year" className="text-xs font-bold text-slate-400 tracking-widest">Год</Label>
                <Input 
                  id="year" 
                  type="number" 
                  placeholder="2024" 
                  className="h-12 rounded-xl border-slate-200"
                  value={formData.year}
                  onChange={e => setFormData({...formData, year: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mileage" className="text-xs font-bold text-slate-400 tracking-widest">Пробег</Label>
                <Input 
                  id="mileage" 
                  type="number" 
                  placeholder="0" 
                  min="0"
                  className="h-12 rounded-xl border-slate-200"
                  value={formData.currentMileage}
                  onChange={e => {
                    const val = parseInt(e.target.value);
                    if (val < 0) return;
                    setFormData({...formData, currentMileage: e.target.value})
                  }}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="plate" className="text-xs font-bold text-slate-400 tracking-widest">Госномер</Label>
              <Input 
                id="plate" 
                placeholder="X000XX 777" 
                className="h-12 rounded-xl border-slate-200"
                value={formData.plateNumber}
                onChange={e => setFormData({...formData, plateNumber: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="vin" className="text-xs font-bold text-slate-400 tracking-widest">VIN-номер</Label>
              <Input 
                id="vin" 
                placeholder="17 знаков (буквы и цифры)" 
                className="h-12 rounded-xl border-slate-200"
                value={formData.vin}
                onChange={e => setFormData({...formData, vin: e.target.value.toUpperCase()})}
                maxLength={17}
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-12 rounded-xl border-slate-200 font-bold">
              Отмена
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 h-12 rounded-xl bg-slate-900 font-bold hover:bg-slate-800 transition-all">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Сохранить"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
