import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicleDetail } from "@/db/queries";
import { BrandLogo } from "@/components/figma/BrandLogo";
import { Calendar, Gauge, ShieldCheck, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

interface SharePageProps {
  params: Promise<{ id: string }>;
}

export default async function SharePage({ params }: SharePageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const vehicle = await getVehicleDetail(decodedId);

  if (!vehicle) {
    notFound();
  }

  const totalSpent = vehicle.serviceRecords?.reduce((sum, rec) => sum + parseFloat(rec.totalAmount), 0) || 0;
  const sortedRecords = [...(vehicle.serviceRecords || [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800 antialiased selection:bg-blue-100 pb-20">
      {/* Mini header with logo */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/Probibiku_main_logo.svg" alt="Пробибику" className="h-6 w-auto" />
          </Link>
          <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100/50">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>История подтверждена</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-8">
        {/* Vehicle Card summary */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-8">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center shrink-0">
            <BrandLogo make={vehicle.make} className="w-20 h-20 sm:w-24 sm:h-24" />
          </div>
          
          <div className="flex-1 text-center sm:text-left space-y-3 w-full">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 leading-tight">
              {vehicle.make} {vehicle.model}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1.5 text-xs text-slate-500">
              <span className="bg-slate-100 text-slate-800 border border-slate-200/60 px-2.5 py-1 rounded-lg font-mono font-medium uppercase">
                {vehicle.plateNumber || "Без госномера"}
              </span>
              <span>•</span>
              <span>{vehicle.year} год выпуска</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 mt-4 text-left">
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Текущий пробег</p>
                <p className="text-lg font-semibold text-slate-800 mt-0.5 font-mono">
                  {vehicle.currentMileage?.toLocaleString("ru-RU") || 0} км
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Общие расходы</p>
                <p className="text-lg font-semibold text-slate-800 mt-0.5 font-mono">
                  {totalSpent.toLocaleString("ru-RU")} ₽
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* History timeline title */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">История обслуживания</h2>
          <span className="text-xs text-slate-500 font-light">
            Записей: {sortedRecords.length}
          </span>
        </div>

        {/* Timeline list */}
        {sortedRecords.length === 0 ? (
          <div className="bg-white border border-slate-200/60 rounded-3xl p-12 text-center">
            <p className="text-slate-400 text-sm font-light">
              История обслуживания этого автомобиля пока не заполнена
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedRecords.map((record) => {
              const formattedDate = new Date(record.date).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).replace(" г.", "");

              // Determine record type based on items
              const hasRepair = (record.items || []).some((item: any) => item.category === "repair");
              const hasMaint = (record.items || []).some((item: any) => item.category === "maintenance");
              
              let typeText = "Обслуживание";
              let typeClass = "bg-slate-50 text-slate-600 border-slate-200/50";
              if (hasRepair) {
                typeText = "Ремонт";
                typeClass = "bg-rose-50/70 text-rose-700 border-rose-100/50";
              } else if (hasMaint) {
                typeText = "Регламентное ТО";
                typeClass = "bg-blue-50/70 text-blue-700 border-blue-100/50";
              }

              return (
                <div key={record.id} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-[0_4px_20px_-10px_rgba(15,23,42,0.06)] transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100/80 pb-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-medium border px-2 py-0.5 rounded-md ${typeClass}`}>
                          {typeText}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 font-mono">
                          {record.totalAmount ? parseFloat(record.totalAmount).toLocaleString("ru-RU") : 0} ₽
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-light">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {formattedDate}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Gauge className="w-3.5 h-3.5 text-slate-400" />
                          {record.odometer ? record.odometer.toLocaleString("ru-RU") : 0} км
                        </span>
                        {record.serviceCenterName && (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {record.serviceCenterName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Record content description / items */}
                  {record.items && record.items.length > 0 ? (
                    <div className="space-y-2.5">
                      {record.items.map((item: any, idx: number) => {
                        const qty = parseFloat(item.quantity?.toString() || "1") || 1;
                        const cost = parseFloat(item.cost?.toString() || "0") || 0;
                        const total = cost * qty;
                        return (
                          <div key={idx} className="flex justify-between items-start gap-4 text-xs">
                            <div className="space-y-0.5 pr-2">
                              <p className="text-slate-700 font-normal leading-relaxed">{item.description}</p>
                              {item.category === "parts" && (
                                <span className="text-[10px] text-slate-400 font-light">Запасная деталь</span>
                              )}
                            </div>
                            <div className="text-right shrink-0 text-slate-500 font-mono">
                              {qty > 1 && <span className="text-[10px] text-slate-400 block">{qty} шт. × {cost.toLocaleString("ru-RU")} ₽</span>}
                              <span className="font-medium text-slate-700">{total.toLocaleString("ru-RU")} ₽</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 font-light italic">
                      Детали обслуживания не указаны
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
