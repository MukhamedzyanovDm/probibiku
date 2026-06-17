"use client"

import {
  ArrowRight,
  TrendingUp,
  Wrench,
  Camera,
  Search,
  History,
  Wallet,
  ShieldAlert,
  Gauge,
  Calendar,
  Receipt,
  Plus
} from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { BrandLogo } from "@/components/figma/BrandLogo"
import { OCRModal } from "@/components/OCRModal"
import { AddVehicleModal } from "@/components/AddVehicleModal"
import { AddServiceRecordModal } from "@/components/AddServiceRecordModal"

interface Vehicle {
  id: string
  make: string
  model: string
  plateNumber: string | null
  currentMileage: number | null
  health?: number
  status?: string
  statusType?: 'healthy' | 'warning'
  lastService?: string
}

interface GarageClientProps {
  vehicles: Vehicle[]
  stats: {
    totalSpent: string
    totalRecords: string
    nextService: string
  }
  recentRecords: any[]
  userName?: string
}

export function GarageClient({ vehicles, stats, recentRecords, userName = "Дмитрий" }: GarageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOCRModalOpen, setIsOCRModalOpen] = useState(false)
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false)
  const [isAddServiceRecordModalOpen, setIsAddServiceRecordModalOpen] = useState(false)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return "Доброе утро"
    if (hour >= 12 && hour < 18) return "Добрый день"
    if (hour >= 18 && hour < 23) return "Добрый вечер"
    return "Доброй ночи"
  }

  const pluralizeVehicles = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "машин";
    if (lastDigit === 1) return "машина";
    if (lastDigit >= 2 && lastDigit <= 4) return "машины";
    return "машин";
  }

  const filteredVehicles = vehicles.filter(v => 
    v.make.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (v.plateNumber && v.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const displayStats = [
    {
      title: "Всего потрачено",
      value: stats.totalSpent,
      description: "За все время",
      icon: Wallet,
    },
    {
      title: "Записей в истории",
      value: stats.totalRecords,
      description: "Всего событий",
      icon: History,
    },
    {
      title: "Ближайшее ТО",
      value: stats.nextService,
      description: vehicles.length > 0 ? `${vehicles[0].make} ${vehicles[0].model}` : "Нет данных",
      icon: Wrench,
    },
  ]

  return (
    <div className="space-y-10">
      {/* Welcome & Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {getGreeting()}, {userName}
          </h1>
          <p className="text-slate-500 mt-1.5 font-medium">Управляйте своим автопарком и расходами</p>
        </div>
      </div>

      {/* Quick Actions: Add Receipt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className="rounded-2xl border-slate-200 bg-white border hover:border-slate-300 transition-all group cursor-pointer"
          onClick={() => setIsOCRModalOpen(true)}
        >
          <CardContent className="p-8 flex items-center gap-6">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera className="h-7 w-7 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Добавить чек по фото</h3>
              <p className="text-sm text-slate-500">Автоматическая оцифровка данных через AI</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="rounded-2xl border-slate-200 bg-white border hover:border-slate-300 transition-all group cursor-pointer"
          onClick={() => setIsAddServiceRecordModalOpen(true)}
        >
          <CardContent className="p-8 flex items-center gap-6">
            <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="h-7 w-7 text-slate-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Добавить запись вручную</h3>
              <p className="text-sm text-slate-500">Внесите данные о расходах самостоятельно</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <OCRModal 
        isOpen={isOCRModalOpen} 
        onClose={() => setIsOCRModalOpen(false)} 
        onSuccess={(data) => {
          console.log("OCR Success:", data)
          setIsOCRModalOpen(false)
        }}
        vehicles={vehicles}
      />

      <AddVehicleModal 
        isOpen={isAddVehicleModalOpen} 
        onClose={() => setIsAddVehicleModalOpen(false)} 
        onSuccess={() => {
          console.log("Vehicle added")
          setIsAddVehicleModalOpen(false)
        }}
      />

      <AddServiceRecordModal 
        isOpen={isAddServiceRecordModalOpen}
        onClose={() => setIsAddServiceRecordModalOpen(false)}
        onSuccess={() => {
          console.log("Service record added")
          setIsAddServiceRecordModalOpen(false)
        }}
        vehicles={vehicles}
      />

      {/* Main Grid: Cars & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Vehicle List (Span 2) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Гараж</h2>
              <Badge variant="outline" className="mt-2 rounded-full px-3 py-1 font-bold text-slate-400 border-slate-200">
                {filteredVehicles.length === 0 
                  ? "В гараже пусто" 
                  : `${filteredVehicles.length} ${pluralizeVehicles(filteredVehicles.length)}`}
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Поиск по марке или номеру" 
                  className="pl-10 h-10 bg-white border-slate-200 rounded-xl focus-visible:ring-slate-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                size="sm"
                className="w-full sm:w-auto h-10 rounded-xl bg-slate-900 px-5 font-bold hover:bg-slate-800 transition-all"
                onClick={() => setIsAddVehicleModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Добавить авто
              </Button>
            </div>
          </div>

          {/* Stats Inline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {displayStats.map((stat, i) => (
              <Card key={i} className="rounded-2xl border-slate-200 bg-white">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="w-4 h-4 text-slate-400" />
                    <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{stat.title}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-slate-900 leading-none">{stat.value}</span>
                    <span className="text-[10px] text-slate-400 mt-1.5 font-medium">{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((car) => (
                <Card key={car.id} className="rounded-2xl border-slate-200 bg-white overflow-hidden hover:border-slate-900 transition-colors">
                  <div className="flex flex-col sm:flex-row">
                    <div className="p-6 pb-0 sm:pb-6 flex items-center justify-center bg-slate-50/50">
                      <BrandLogo make={car.make} className="w-24 h-24 sm:w-28 sm:h-28" />
                    </div>
                    <div className="flex-1 p-8">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-2xl font-bold text-slate-900">{car.make} {car.model}</h4>
                          <p className="text-slate-400 text-sm font-bold mt-1 tracking-tight">{car.plateNumber || "Без номера"}</p>
                        </div>
                        <Badge className={(car.statusType || 'healthy') === 'warning' ? 'bg-orange-100 text-orange-700 border-none' : 'bg-green-100 text-green-700 border-none'}>
                          {car.status || "В норме"}
                        </Badge>
                      </div>
                      
                      <div className="mt-8 grid grid-cols-2 gap-8">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-slate-50 text-slate-400">
                            <Gauge className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 tracking-widest leading-none">Пробег</span>
                            <span className="text-sm font-bold text-slate-700 mt-1">{car.currentMileage?.toLocaleString("ru-RU")} км</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-slate-50 text-slate-400">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 tracking-widest leading-none">Последнее ТО</span>
                            <span className="text-sm font-bold text-slate-700 mt-1">{car.lastService || "Нет записей"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 space-y-2.5">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                            <span className="text-slate-400">Состояние узлов</span>
                            <span className="text-slate-900">{car.health || 100}%</span>
                        </div>
                        <Progress value={car.health || 100} className="h-1.5 bg-slate-100" />
                      </div>
                    </div>
                  </div>
                  <CardFooter className="border-t border-slate-100 bg-slate-50/30 px-8 py-3">
                    <Button variant="link" className="ml-auto h-auto p-0 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors group" asChild>
                      <Link href={`/dashboard/garage/${car.id}`} className="flex items-center gap-1.5">
                        Детальный отчет <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">В гараже пока пусто. Добавьте свой первый автомобиль!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Important & Activity */}
        <div className="space-y-8">
           <h3 className="text-xl font-bold text-slate-900 tracking-tight">Важное</h3>
           
           <Card className="rounded-2xl border-slate-200 bg-white overflow-hidden">
             <div className="p-6 bg-orange-50 border-b border-orange-100/50">
                <div className="flex items-center gap-2 text-orange-700">
                   <ShieldAlert className="w-5 h-5" />
                   <span className="font-bold text-sm">Внимание</span>
                </div>
             </div>
             <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                   У вас пока нет критических уведомлений. Мы сообщим, когда придет время ТО или страховки.
                </p>
             </CardContent>
           </Card>

           <Card className="rounded-2xl bg-slate-900 text-white border-none relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="w-20 h-24" />
             </div>
             <CardHeader>
               <CardTitle className="text-lg">Инсайт недели</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-sm opacity-80 leading-relaxed font-medium">
                 Оцифруйте больше чеков, чтобы AI смог точнее прогнозировать износ узлов вашего авто.
               </p>
             </CardContent>
           </Card>

           {/* Quick History Preview */}
           <Card className="rounded-2xl border-slate-200 bg-white">
              <CardHeader className="pb-3">
                 <CardTitle className="text-sm font-bold text-slate-900">Последние чеки</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-2">
                 {recentRecords.length > 0 ? (
                   recentRecords.map((record, i) => (
                    <div key={record.id} className="px-6 py-4 flex items-center justify-between border-t border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-white transition-colors">
                             <Receipt className="w-5 h-5 text-slate-400" />
                          </div>
                          <div>
                             <p className="text-[13px] font-bold text-slate-900 leading-tight">{record.serviceCenterName || "Запись ТО"}</p>
                             <p className="text-[11px] text-slate-400 mt-0.5">{record.vehicleMake} • {new Date(record.date).toLocaleDateString("ru-RU", { day: 'numeric', month: 'long' })}</p>
                          </div>
                       </div>
                       <p className="text-sm font-bold text-slate-900">{Number(record.totalAmount).toLocaleString("ru-RU")} ₽</p>
                    </div>
                   ))
                 ) : (
                   <div className="px-6 py-8 text-center">
                     <p className="text-xs text-slate-400 font-medium">Нет недавних чеков</p>
                   </div>
                 )}
              </CardContent>
              <CardFooter className="pt-2">
                 <Button variant="ghost" size="sm" className="w-full rounded-xl text-xs font-bold text-slate-400 hover:text-slate-900" asChild>
                    <Link href="/dashboard/history">Смотреть все</Link>
                 </Button>
              </CardFooter>
           </Card>
        </div>
      </div>
    </div>
  )
}
