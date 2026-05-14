import { 
  Plus, 
  Car, 
  Search, 
  ChevronRight, 
  Calendar,
  Gauge,
  Receipt
} from "lucide-react";
import Link from "next/link";

export default function GaragePage() {
  // Mock data for initial design
  const vehicles = [
    {
      id: "1",
      make: "Toyota",
      model: "Camry",
      year: 2021,
      plate: "A777AA 77",
      mileage: "45,200 км",
      status: "Все в порядке",
      lastService: "12 мая 2024",
      image: null
    },
    {
      id: "2",
      make: "BMW",
      model: "X5",
      year: 2019,
      plate: "O001OO 99",
      mileage: "82,150 км",
      status: "Пора на ТО",
      lastService: "15 янв 2024",
      image: null
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[24px] border border-[#e2e8f0] shadow-sm">
          <p className="text-[#64748b] text-sm font-medium mb-1">Всего автомобилей</p>
          <p className="text-3xl font-display font-bold text-[#1e293b]">2</p>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-[#e2e8f0] shadow-sm">
          <p className="text-[#64748b] text-sm font-medium mb-1">Записей в истории</p>
          <p className="text-3xl font-display font-bold text-[#1e293b]">24</p>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-[#e2e8f0] shadow-sm">
          <p className="text-[#64748b] text-sm font-medium mb-1">Общие расходы</p>
          <p className="text-3xl font-display font-bold text-[#1e293b]">142 500 ₽</p>
        </div>
      </div>

      {/* Grid of Vehicles */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-2xl text-[#1e293b]">Ваши автомобили</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input 
              type="text" 
              placeholder="Поиск по марке или номеру" 
              className="bg-white border border-[#e2e8f0] rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#334155]/10 w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vehicles.map((vehicle) => (
            <Link key={vehicle.id} href={`/dashboard/garage/${vehicle.id}`}>
              <div className="bg-white rounded-[24px] border border-[#e2e8f0] overflow-hidden hover:border-[#334155] transition-all group shadow-sm">
                <div className="p-6 flex gap-6">
                  {/* Vehicle Icon/Image Placeholder */}
                  <div className="w-24 h-24 bg-[#f1f5f9] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#f8fafc] transition-colors">
                    <Car className="w-10 h-10 text-[#94a3b8]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display font-bold text-xl text-[#1e293b] leading-tight">
                          {vehicle.make} {vehicle.model}
                        </h3>
                        <p className="text-[#64748b] text-sm font-medium">{vehicle.year} год • {vehicle.plate}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        vehicle.status === "Все в порядке" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-orange-100 text-orange-700"
                      }`}>
                        {vehicle.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-[#94a3b8]" />
                        <span className="text-sm text-[#475569] font-medium">{vehicle.mileage}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#94a3b8]" />
                        <span className="text-sm text-[#475569] font-medium">{vehicle.lastService}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-[#cbd5e1] group-hover:text-[#334155] transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Add New Car Card */}
          <button className="border-2 border-dashed border-[#e2e8f0] rounded-[24px] p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#f1f5f9] hover:border-[#cbd5e1] transition-all group min-h-[160px]">
            <div className="w-12 h-12 bg-[#f8fafc] rounded-full flex items-center justify-center border border-[#e2e8f0] group-hover:bg-white">
              <Plus className="w-6 h-6 text-[#94a3b8] group-hover:text-[#334155]" />
            </div>
            <p className="font-sans font-semibold text-[#64748b] group-hover:text-[#1e293b]">Добавить автомобиль</p>
          </button>
        </div>
      </div>

      {/* Recent Activity Mini-Section */}
      <div className="bg-white rounded-[24px] border border-[#e2e8f0] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-[#1e293b]">Последние чеки</h2>
          <Link href="/dashboard/history" className="text-sm font-medium text-[#64748b] hover:text-[#1e293b]">
            Смотреть все
          </Link>
        </div>
        
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-[#f1f5f9] last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#f8fafc] rounded-lg flex items-center justify-center border border-[#e2e8f0]">
                  <Receipt className="w-5 h-5 text-[#94a3b8]" />
                </div>
                <div>
                  <p className="font-sans font-bold text-[#1e293b] text-sm">Замена масла и фильтров</p>
                  <p className="text-[12px] text-[#94a3b8]">Toyota Camry • 12 мая 2024</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-sans font-bold text-[#1e293b] text-sm">8 400 ₽</p>
                <p className="text-[10px] font-bold text-green-600 uppercase">Оцифровано</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
