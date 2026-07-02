"use client"

import React, { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
import { 
  Loader2, 
  X, 
  Plus, 
  Trash2, 
  Calendar as CalendarIcon,
  Wrench,
  Receipt
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { cn } from "@/components/ui/utils"

const workItemSchema = z.object({
  description: z.string().min(1, "Обязательно"),
  cost: z.string().min(1, "Обязательно"),
  quantity: z.string(),
})

const formSchema = z.object({
  vehicleId: z.string().min(1, "Выберите автомобиль"),
  date: z.date(),
  odometer: z.string().min(1, "Укажите пробег"),
  serviceCenterName: z.string().optional(),
  items: z.array(workItemSchema).min(1, "Добавьте хотя бы одну работу"),
})

type FormValues = z.infer<typeof formSchema>

interface AddServiceRecordModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  vehicles: { id: string; make: string; model: string }[]
  initialVehicleId?: string
}

export function AddServiceRecordModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  vehicles,
  initialVehicleId 
}: AddServiceRecordModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleId: initialVehicleId || "",
      date: new Date(),
      odometer: "",
      serviceCenterName: "",
      items: [{ description: "", cost: "", quantity: "1" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  const watchItems = watch("items")
  const totalAmount = watchItems.reduce((acc, item) => {
    const cost = parseFloat(item.cost) || 0
    const quantity = parseFloat(item.quantity) || 0
    return acc + cost * quantity
  }, 0)

  useEffect(() => {
    if (isOpen) {
      reset({
        vehicleId: initialVehicleId || (vehicles.length === 1 ? vehicles[0].id : ""),
        date: new Date(),
        odometer: "",
        serviceCenterName: "",
        items: [{ description: "", cost: "", quantity: "1" }],
      })
    }
  }, [isOpen, initialVehicleId, vehicles, reset])

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      console.log("Saving service record:", { ...data, totalAmount })
      
      const response = await fetch("/api/service-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, totalAmount }),
      })

      if (!response.ok) throw new Error("Failed to save record")
      
      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving record:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedDate = watch("date")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] rounded-[32px] p-8 [&>button:last-child]:hidden overflow-y-auto max-h-[90vh]">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 text-left">
          <DialogTitle className="text-2xl font-bold text-slate-900">Добавить запись</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="h-10 w-10 rounded-xl bg-slate-50 p-0 hover:bg-slate-100 transition-all">
              <X className="h-5 w-5 text-slate-500" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vehicle Selection */}
            <div className="grid gap-2">
              <Label className="text-xs font-bold text-slate-400 tracking-widest">Автомобиль</Label>
              <Select 
                onValueChange={(value) => setValue("vehicleId", value)}
                value={watch("vehicleId")}
              >
                <SelectTrigger className="!h-12 rounded-xl border-slate-200">
                  <SelectValue placeholder="Выберите авто" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.make} {v.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vehicleId && <p className="text-xs text-red-500">{errors.vehicleId.message}</p>}
            </div>

            {/* Date Picker */}
            <div className="grid gap-2">
              <Label className="text-xs font-bold text-slate-400 tracking-widest">Дата</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full h-12 rounded-xl border-slate-200 justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP", { locale: ru }) : <span>Выберите дату</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setValue("date", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Odometer */}
            <div className="grid gap-2">
              <Label className="text-xs font-bold text-slate-400 tracking-widest">Пробег (км)</Label>
              <Input 
                type="number" 
                placeholder="0" 
                min="0"
                className="h-12 rounded-xl border-slate-200 no-spinner"
                {...register("odometer")}
              />
              {errors.odometer && <p className="text-xs text-red-500">{errors.odometer.message}</p>}
            </div>

            {/* Service Center */}
            <div className="grid gap-2">
              <Label className="text-xs font-bold text-slate-400 tracking-widest">Техцентр</Label>
              <Input 
                placeholder="Название сервиса" 
                className="h-12 rounded-xl border-slate-200"
                {...register("serviceCenterName")}
              />
            </div>
          </div>

          {/* Work Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-slate-400 tracking-widest flex items-center gap-2">
                <Wrench className="w-3 h-3" /> Работы и запчасти
              </Label>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => append({ description: "", cost: "", quantity: "1" })}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold text-xs"
              >
                <Plus className="w-3 h-3 mr-1" /> Добавить
              </Button>
            </div>

            <div className="space-y-3 md:space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col md:flex-row gap-3 md:items-center animate-in fade-in slide-in-from-top-2 relative">
                  {/* Description */}
                  <div className="flex-1">
                    <Input 
                      placeholder="Напр: Замена масла" 
                      className="h-11 rounded-xl border-slate-200 bg-white text-slate-900 font-medium focus-visible:ring-slate-900 focus-visible:border-slate-900"
                      {...register(`items.${index}.description` as const)}
                    />
                  </div>

                  <div className="flex gap-3 items-center">
                    {/* Price */}
                    <div className="relative flex-1 md:w-28">
                      <Input 
                        type="number"
                        placeholder="Цена" 
                        className="h-11 rounded-xl border-slate-200 bg-white text-left md:text-right no-spinner text-slate-900 font-bold pr-7 focus-visible:ring-slate-900 focus-visible:border-slate-900"
                        {...register(`items.${index}.cost` as const)}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">₽</span>
                    </div>

                    {/* Quantity */}
                    <div className="w-16 md:w-16">
                      <Input 
                        type="number"
                        placeholder="1" 
                        className="h-11 rounded-xl border-slate-200 bg-white text-center no-spinner text-slate-900 font-bold focus-visible:ring-slate-900 focus-visible:border-slate-900"
                        {...register(`items.${index}.quantity` as const)}
                      />
                    </div>

                    {/* Remove Button */}
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => remove(index)}
                      className="h-11 w-11 text-slate-200 hover:text-red-500 hover:bg-red-50 transition-all"
                      disabled={fields.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer with Total */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                  <Receipt className="w-4 h-4 text-slate-400" />
                </div>
                <span className="text-sm font-bold text-slate-500">Итого</span>
              </div>
              <span className="text-2xl font-black text-slate-900">
                {totalAmount.toLocaleString("ru-RU")} ₽
              </span>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-12 rounded-xl border-slate-200 font-bold">
                Отмена
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1 h-12 rounded-xl bg-slate-900 font-bold hover:bg-slate-800 transition-all">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Сохранить запись"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
