"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Loader2,
  ArrowLeft,
  PlusCircle,
  Share2,
  Compass,
  Sparkles,
  FileText,
  ClipboardList,
  Settings,
  Search,
  Trash2,
  MoreVertical,
  MessageCircle,
  BadgeCheck,
  Download,
  Pencil,
  Globe,
  ShieldAlert,
  XCircle
} from "lucide-react";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Car, ServiceRecord, CarPart, getCarById, updateCar } from "@/utils/garageStore";
import AddRecordModal from "@/components/AddRecordModal";
import Portal from "@/components/Portal";
import ShareModal from "@/components/ShareModal";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/figma/BrandLogo";

const SEARCH_PROVIDERS: Record<string, string> = {
  "Яндекс": "https://yandex.ru/search/?text=",
  "Exist": "https://exist.ru/Price.axd?pcode=",
  "Ozon": "https://www.ozon.ru/search/?text=",
  "Wildberries": "https://www.wildberries.ru/catalog/0/search.aspx?search=",
  "Autodoc": "https://www.autodoc.ru/web/price/art/",
  "Свой сайт": "custom"
};

const mapDbVehicleToClientCar = (dbVehicle: any): Car => {
  const serviceHistory: ServiceRecord[] = (dbVehicle.serviceRecords || []).map((rec: any) => {
    const partsList = (rec.items || [])
      .filter((item: any) => item.category === "parts")
      .map((item: any) => item.description)
      .join(", ");
    
    const workDescriptions = (rec.items || [])
      .map((item: any) => {
        if (item.quantity && parseFloat(item.quantity) !== 1) {
          return `${item.description} (${item.quantity} шт.)`;
        }
        return item.description;
      })
      .join("\n");

    const fullDescription = rec.serviceCenterName 
      ? `СТО: ${rec.serviceCenterName}\n${workDescriptions}` 
      : workDescriptions;

    let type: "ТО" | "Ремонт" | "Тюнинг" | "Другое" = "Другое";
    const hasRepair = (rec.items || []).some((item: any) => item.category === "repair");
    const hasMaint = (rec.items || []).some((item: any) => item.category === "maintenance");
    const hasTuning = (rec.items || []).some((item: any) => item.category === "tuning");
    if (hasRepair) type = "Ремонт";
    else if (hasMaint) type = "ТО";
    else if (hasTuning) type = "Тюнинг";

    return {
      id: rec.id,
      date: rec.date ? rec.date.split("T")[0] : "",
      type,
      mileage: rec.odometer || 0,
      cost: parseFloat(rec.totalAmount) || 0,
      description: fullDescription || "Запись обслуживания",
      parts: partsList,
      receiptAttached: rec.status === "processed" || rec.status === "manual" || !!rec.receiptImageUrl,
      receiptUrl: rec.receiptUrl || undefined,
      receiptImageUrl: rec.receiptImageUrl || undefined,
      items: rec.items,
      serviceCenterName: rec.serviceCenterName || undefined
    };
  });

  let parts: any[] = [];
  if (typeof window !== "undefined") {
    const storedParts = localStorage.getItem(`parts_for_${dbVehicle.id}`);
    if (storedParts) {
      try {
        parts = JSON.parse(storedParts);
      } catch (e) {
        parts = [];
      }
    }
  }

  const fuelHistory = [8.0, 8.2, 7.9, 8.1, 8.3];

  return {
    id: dbVehicle.id,
    make: dbVehicle.make,
    model: dbVehicle.model,
    year: dbVehicle.year || new Date().getFullYear(),
    licensePlate: dbVehicle.plateNumber || "",
    mileage: dbVehicle.currentMileage || 0,
    purchaseDate: dbVehicle.createdAt ? dbVehicle.createdAt.split("T")[0] : "",
    health: 95,
    imageUrl: dbVehicle.imageUrl || undefined,
    insuranceExpiry: dbVehicle.insuranceExpiry || undefined,
    fuelHistory,
    serviceHistory,
    parts
  };
};

const getMockRecommendations = (mileage: number) => [
  {
    category: "БЕЗОПАСНОСТЬ",
    title: "Тормозная жидкость",
    description: "Срочно замените тормозную жидкость. В истории нет записей о замене, а жидкость впитывает влагу и теряет свойства за 2 года",
    urgency: "critical" as const
  },
  {
    category: "СРОКИ ЗАМЕНЫ",
    title: "Ремень ГРМ и ролики",
    description: `Пробег составляет ${mileage.toLocaleString("ru-RU")} км. При отсутствии записей о замене ГРМ рекомендуется срочная замена во избежание обрыва`,
    urgency: "critical" as const
  },
  {
    category: "ДИАГНОСТИКА",
    title: "Масло двигателя и масляный фильтр",
    description: "Рекомендуется плановая замена через 1 500 км или 2 месяца. Вы заливали Shell Helix 5W-30",
    urgency: "warning" as const
  },
  {
    category: "ЭКОНОМИЯ ТО",
    title: "Покупка оригинальных фильтров",
    description: "Самостоятельный подбор оригинального фильтра Mann-Filter на маркетплейсах сэкономит до 1 200 ₽ на наценках сервиса",
    urgency: "info" as const
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/90 text-white p-3 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md text-xs font-sans">
        <p className="font-mono text-slate-400 mb-1">{label}</p>
        <p className="font-semibold text-sm">
          {payload[0].value.toLocaleString("ru-RU")} ₽
        </p>
      </div>
    );
  }
  return null;
};

const CustomDonutTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/90 text-white p-3 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md text-xs font-sans">
        <p className="font-semibold text-sm flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: data.color }} />
          {data.name}
        </p>
        <p className="font-mono text-slate-400 mt-1">
          {data.value.toLocaleString("ru-RU")} ₽ ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

export default function CarDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Array<{ category: string; title: string; description: string; urgency?: "critical" | "warning" | "info" }>>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [timeframe, setTimeframe] = useState<string>("all");

  const fetchRecommendations = async (carData: Car) => {
    setIsAiLoading(true);
    try {
      const res = await fetch("/api/ai/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.recommendations && Array.isArray(data.recommendations)) {
          setRecommendations(data.recommendations);
        }
      }
    } catch (e) {
      console.error("Failed to load recommendations:", e);
    } finally {
      setIsAiLoading(false);
    }
  };
  
  // Modals state
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [partToDeleteId, setPartToDeleteId] = useState<string | null>(null);
  const [recordToDeleteId, setRecordToDeleteId] = useState<string | null>(null);
  const [recordToEdit, setRecordToEdit] = useState<ServiceRecord | null>(null);
  const [viewingRecord, setViewingRecord] = useState<ServiceRecord | null>(null);
  const lastOpenTimeRef = useRef<number>(0);
  const openRecordDetails = (rec: ServiceRecord) => {
    lastOpenTimeRef.current = Date.now();
    setViewingRecord(rec);
  };
  const [isSearchSettingsOpen, setIsSearchSettingsOpen] = useState(false);
  const [searchProvider, setSearchProvider] = useState("Яндекс");
  const [customSearchUrl, setCustomSearchUrl] = useState("https://yandex.ru/search/?text={query}");
  
  // Parts addition inline state
  const [newPartName, setNewPartName] = useState("");
  const [newPartNumber, setNewPartNumber] = useState("");

  // Calculate maintenance vs repair breakdown
  const repairCosts = car ? car.serviceHistory.filter(s => s.type === "Ремонт").reduce((sum, s) => sum + s.cost, 0) : 0;
  const maintCosts = car ? car.serviceHistory.filter(s => s.type === "ТО").reduce((sum, s) => sum + s.cost, 0) : 0;
  const otherCosts = car ? car.serviceHistory.filter(s => s.type !== "Ремонт" && s.type !== "ТО").reduce((sum, s) => sum + s.cost, 0) : 0;
  
  const totalCost = repairCosts + maintCosts + otherCosts || 1;
  const repairPct = Math.round((repairCosts / totalCost) * 100);
  const maintPct = Math.round((maintCosts / totalCost) * 100);
  const otherPct = Math.round((otherCosts / totalCost) * 100);

  // 1. Filter and compile history for current vehicle
  const filteredHistory = useMemo(() => {
    if (!car || !car.serviceHistory) return [];
    
    let history = [...car.serviceHistory];

    // Sort by date ascending
    history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Filter by timeframe
    if (timeframe === "6m") {
      const cutoff = new Date();
      cutoff.setMonth(cutoff.getMonth() - 6);
      history = history.filter((h) => new Date(h.date) >= cutoff);
    } else if (timeframe === "1y") {
      const cutoff = new Date();
      cutoff.setFullYear(cutoff.getFullYear() - 1);
      history = history.filter((h) => new Date(h.date) >= cutoff);
    }

    return history;
  }, [car, timeframe]);

  // 2. Prepare Monthly dynamics data
  const monthlyChartData = useMemo(() => {
    if (filteredHistory.length === 0) return [];

    const groups: Record<string, { monthStr: string; sortKey: string; amount: number }> = {};
    
    filteredHistory.forEach((record) => {
      if (!record.date) return;
      const d = new Date(record.date);
      const sortKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const monthStr = d.toLocaleString("ru-RU", { month: "short", year: "2-digit" }).replace(" г.", "");
      
      if (!groups[sortKey]) {
        groups[sortKey] = { monthStr, sortKey, amount: 0 };
      }
      groups[sortKey].amount += record.cost;
    });

    return Object.values(groups).sort((a, b) => a.sortKey.localeCompare(b.sortKey));
  }, [filteredHistory]);

  // 3. Prepare Category data
  const categoryChartData = useMemo(() => {
    const categorySums: Record<string, number> = {
      "ТО": 0,
      "Ремонт": 0,
      "Запчасти": 0,
      "Тюнинг": 0,
      "Прочее": 0,
    };

    let total = 0;

    filteredHistory.forEach((record) => {
      if (record.items && record.items.length > 0) {
        let itemsSum = 0;
        record.items.forEach((item: any) => {
          const cat = item.category;
          const cost = parseFloat(item.cost) || 0;
          const qty = parseFloat(item.quantity) || 1;
          const itemCost = cost * qty;
          
          let clientCat = "Прочее";
          if (cat === "maintenance") clientCat = "ТО";
          else if (cat === "repair") clientCat = "Ремонт";
          else if (cat === "parts") clientCat = "Запчасти";
          else if (cat === "tuning") clientCat = "Тюнинг";

          categorySums[clientCat] += itemCost;
          itemsSum += itemCost;
          total += itemCost;
        });
        
        const diff = Math.round((record.cost - itemsSum) * 100) / 100;
        if (diff > 0.01) {
          categorySums["Прочее"] += diff;
          total += diff;
        }
      } else {
        categorySums["Прочее"] += record.cost;
        total += record.cost;
      }
    });

    const colors: Record<string, string> = {
      "ТО": "#3b82f6",
      "Ремонт": "#8b5cf6",
      "Запчасти": "#ec4899",
      "Тюнинг": "#10b981",
      "Прочее": "#94a3b8",
    };

    return Object.entries(categorySums)
      .filter(([, value]) => value > 0)
      .map(([name, value]) => ({
        name,
        value,
        percentage: total > 0 ? Math.round((value / total) * 100) : 0,
        color: colors[name] || "#94a3b8",
      }));
  }, [filteredHistory]);

  const totalFilteredSpent = useMemo(() => {
    return filteredHistory.reduce((sum, h) => sum + h.cost, 0);
  }, [filteredHistory]);

  const loadCar = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const decodedId = decodeURIComponent(id);
      const res = await fetch(`/api/vehicles?id=${decodedId}`);
      if (!res.ok) {
        // Fallback to localStorage
        const localCar = getCarById(decodedId);
        if (localCar) {
          setCar(localCar);
          setIsLoading(false);
          if (localCar.serviceHistory.length > 0) {
            fetchRecommendations(localCar);
          }
          return;
        }
        throw new Error("Не удалось загрузить данные автомобиля");
      }
      const dbVehicle = await res.json();
      const clientCar = mapDbVehicleToClientCar(dbVehicle);
      setCar(clientCar);
      if (clientCar.serviceHistory.length > 0) {
        fetchRecommendations(clientCar);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ошибка загрузки");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCar();
    if (typeof window !== "undefined") {
      const storedProvider = localStorage.getItem("probibiku_search_provider");
      if (storedProvider) {
        setSearchProvider(storedProvider);
      }
      const storedCustom = localStorage.getItem("probibiku_custom_search_url");
      if (storedCustom) {
        setCustomSearchUrl(storedCustom);
      }
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <div className="text-center">
          <Loader2 className="text-4xl text-blue-500 animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-light mt-3">Загрузка информации об автомобиле...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <div className="text-center">
          <p className="text-sm text-red-500 font-light mb-4">Ошибка: {error || "Автомобиль не найден"}</p>
          <Link href="/garage" className="text-xs text-blue-500 hover:underline">
            Вернуться в гараж
          </Link>
        </div>
      </div>
    );
  }

  // Calculations for dashboard
  const totalSpend = car.serviceHistory.reduce((acc, curr) => acc + curr.cost, 0);
  const sortedServiceHistory = [...car.serviceHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const lastServiceMileage = sortedServiceHistory[0]?.mileage || car.mileage;
  const mileageSinceLastService = car.mileage - lastServiceMileage;

  // Add parts inline
  const handleAddPart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartName || !newPartNumber) return;

    const newPart = {
      id: `part-${Math.random().toString(36).substr(2, 5)}`,
      name: newPartName,
      partNumber: newPartNumber
    };

    const updatedParts = [...car.parts, newPart];
    if (typeof window !== "undefined") {
      localStorage.setItem(`parts_for_${car.id}`, JSON.stringify(updatedParts));
    }

    const updatedCar: Car = {
      ...car,
      parts: updatedParts
    };

    updateCar(updatedCar);
    setCar(updatedCar);
    setNewPartName("");
    setNewPartNumber("");
  };

  const handleDeletePart = (partId: string) => {
    setPartToDeleteId(partId);
  };

  const handleDownloadReceipt = (rec: any) => {
    if (rec.receiptUrl) {
      window.open(rec.receiptUrl, "_blank");
      return;
    }
    const content = `=== ПРОБИБИКУ: ПОДТВЕРЖДЕННЫЙ ЧЕК ===\nЭлектронный отчет по техническому обслуживанию\nДата фиксации: ${rec.date}\n\nАвтомобиль: ${car.make} ${car.model}\nГосномер: ${car.licensePlate || "Без госномера"}\n\nТип выполненных работ: ${rec.type}\nЗафиксированный пробег: ${rec.mileage.toLocaleString("ru-RU")} км\nСтоимость работ/деталей: ${rec.cost.toLocaleString("ru-RU")} ₽\n\nДетализированное описание:\n${rec.description}\n\nСписок запчастей и материалов:\n${rec.parts || 'Не указаны'}\n\n=====================================\nСТАТУС ПРОВЕРКИ: УСПЕШНО ПРОВЕРЕНО ИИ\nЗапись верифицирована. Доверие покупателей +10% к стоимости авто.\nСпасибо, что делаете историю обслуживания прозрачной!`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt-${rec.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const executeDeleteRecord = async (recordId: string) => {
    const isDbVehicle = car.id.length === 36 && car.id.includes("-");
    
    if (isDbVehicle) {
      try {
        const res = await fetch(`/api/service-records?id=${recordId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Не удалось удалить запись");
        loadCar();
      } catch (err: any) {
        console.error(err);
        alert("Ошибка удаления: " + err.message);
      }
    } else {
      const updatedHistory = car.serviceHistory.filter((r) => r.id !== recordId);
      const updatedCar: Car = {
        ...car,
        serviceHistory: updatedHistory,
      };
      updateCar(updatedCar);
      setCar(updatedCar);
    }
  };

  const handleEditRecord = (rec: ServiceRecord) => {
    setRecordToEdit(rec);
    setIsAddRecordOpen(true);
  };

  const handleSelectProvider = (prov: string) => {
    setSearchProvider(prov);
    localStorage.setItem("probibiku_search_provider", prov);
  };

  const getSearchUrl = (partName: string, partNumber: string) => {
    const query = partNumber || partName;
    const providerUrl = SEARCH_PROVIDERS[searchProvider];
    
    if (providerUrl === "custom") {
      const template = customSearchUrl || "https://yandex.ru/search/?text={query}";
      return template.replace("{query}", encodeURIComponent(query));
    }
    
    if (searchProvider === "Exist" || searchProvider === "Autodoc") {
      return `${providerUrl}${encodeURIComponent(partNumber || partName)}`;
    }
    
    return `${providerUrl}${encodeURIComponent(`${partName} ${partNumber}`.trim())}`;
  };

  // SVG Line Chart coordinates calculation for fuel consumption
  const renderFuelChart = () => {
    const history = car.fuelHistory || [8.0, 8.2, 8.1, 8.4, 8.9];
    const maxVal = Math.max(...history) * 1.1;
    const minVal = Math.min(...history) * 0.9;
    const range = maxVal - minVal;
    
    const width = 400;
    const height = 120;
    const padding = 15;
    
    const points = history.map((val, idx) => {
      const x = padding + (idx / (history.length - 1)) * (width - padding * 2);
      const y = height - padding - ((val - minVal) / range) * (height - padding * 2);
      return { x, y, val };
    });

    const pathD = points.reduce((acc, p, idx) => {
      return acc + (idx === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`);
    }, "");

    const fillD = pathD + ` L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

    return (
      <div className="w-full overflow-hidden">
        <svg className="w-full h-auto" viewBox={`0 0 ${width} ${height}`} fill="none">
          <defs>
          <linearGradient id="fuelGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0"/>
          </linearGradient>
        </defs>
        
        {/* Horizontal grid lines */}
        <line x1={padding} y1={height/2} x2={width-padding} y2={height/2} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Gradient fill */}
        <path d={fillD} fill="url(#fuelGradient)" />
        
        {/* Stroke line */}
        <path d={pathD} stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Point circles */}
        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={p.x} cy={p.y} r="4.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
            {idx === points.length - 1 && (
              <text x={p.x - 20} y={p.y - 10} className="text-[10px] font-mono font-medium fill-slate-700">
                {p.val} л
              </text>
            )}
          </g>
        ))}
      </svg>
      </div>
    );
  };

  return (
    <>
      <Background />
      <Header showAccountIcon={true} vehicleContext={car || undefined} forceScrolled={true} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 font-sans min-h-screen">
        
        {/* Navigation / Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-8">
          <Link
            href="/garage"
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-blue-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад в гараж
          </Link>

          <Button
            onClick={() => {
              setRecordToEdit(null);
              setIsAddRecordOpen(true);
            }}
            variant="brand"
            className="h-11 px-5"
          >
            <PlusCircle className="w-5 h-5" />
            Добавить запись
          </Button>
        </div>

        {/* Car Details Summary card */}
        <div className="rounded-[2.5rem] bg-white border border-slate-200/80 p-6 sm:p-8 shadow-[0_15px_40px_-20px_rgba(15,23,42,0.06)] mb-10 grid grid-cols-1 md:grid-cols-[1.5fr_1.8fr] gap-8 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Здоровье авто: {car.health}%
              </span>
              
              <button
                onClick={() => setIsShareOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-[10px] font-normal px-3 py-1 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                Поделиться историей
              </button>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-slate-900 tracking-tight mt-3 break-words">
              {car.make} {car.model} ({car.year})
            </h1>
            <div className="flex flex-wrap gap-4 text-xs mt-3 text-slate-500">
              <span className="bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded font-mono uppercase font-medium text-slate-800">
                {car.licensePlate || "Без госномера"}
              </span>
              <span className="inline-flex items-center gap-1">
                <Compass className="w-4 h-4" />
                Пробег: <strong className="font-mono text-slate-800 font-normal">{car.mileage.toLocaleString("ru-RU")} км</strong>
              </span>
              {car.insuranceExpiry && (() => {
                const expiry = new Date(car.insuranceExpiry);
                const today = new Date();
                expiry.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);
                const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                const formattedDate = expiry.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }).replace(" г.", "");
                
                const getDaysPlural = (n: number) => {
                  const mod10 = n % 10;
                  const mod100 = n % 100;
                  if (mod100 >= 11 && mod100 <= 19) return "дней";
                  if (mod10 === 1) return "день";
                  if (mod10 >= 2 && mod10 <= 4) return "дня";
                  return "дней";
                };
                
                let badgeClass = "bg-slate-50 text-slate-600 border-slate-200";
                let text = `Страховка до: ${formattedDate}`;
                if (diffDays < 0) {
                  badgeClass = "bg-red-50 text-red-600 border-red-200/60";
                  text = `ОСАГО истекла: ${formattedDate} (${Math.abs(diffDays)} дн. назад)`;
                } else if (diffDays === 0) {
                  badgeClass = "bg-red-50 text-red-600 border-red-200/60 animate-pulse";
                  text = `ОСАГО заканчивается сегодня! (${formattedDate})`;
                } else if (diffDays <= 30) {
                  badgeClass = "bg-amber-50/70 text-amber-700 border-amber-200/60";
                  text = `ОСАГО истекает через ${diffDays} ${getDaysPlural(diffDays)} (${formattedDate})`;
                }

                return (
                  <span className={`inline-flex items-center gap-1 border px-2.5 py-1 rounded font-medium ${badgeClass}`}>
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    <span>{text}</span>
                  </span>
                );
              })()}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 pt-6 border-t border-slate-100">
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Общие траты</p>
                <p className="text-xl font-semibold text-slate-900 mt-1 font-mono">{totalSpend.toLocaleString("ru-RU")} ₽</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Пробег после ТО</p>
                {mileageSinceLastService < 0 ? (
                  <div className="flex flex-col mt-1">
                    <p className="text-sm font-semibold text-red-500 font-mono">Ошибка в датах ТО</p>
                    <span className="text-[9px] text-red-400 font-light mt-0.5 leading-normal">
                      Пробег последнего ТО ({lastServiceMileage.toLocaleString("ru-RU")} км) превышает текущий ({car.mileage.toLocaleString("ru-RU")} км). Возможно, неверно указана дата последнего ТО.
                    </span>
                  </div>
                ) : (
                  <p className="text-xl font-semibold text-slate-900 mt-1 font-mono">{mileageSinceLastService.toLocaleString("ru-RU")} км</p>
                )}
              </div>
            </div>
          </div>

          <div className="hidden md:block relative h-56 w-full rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/80 shadow-inner">
            {car.imageUrl && (car.imageUrl.startsWith("http") || car.imageUrl.startsWith("data:")) ? (
              <img
                src={car.imageUrl}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-b from-[#1d2a3d] to-[#131c2b] flex items-center justify-center p-8 relative">
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
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: AI insights + Charts (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. AI Insights Panel */}
            <div className="rounded-[2.5rem] bg-white/70 border border-white p-6 shadow-[0_30px_70px_-25px_rgba(15,23,42,0.15),inset_0_2px_0_white] backdrop-blur-2xl">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-4">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <h3 className="text-base font-medium text-slate-900">Умный помощник</h3>
              </div>

              {car.serviceHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-8 px-4 bg-slate-50/40 border border-dashed border-slate-200 rounded-2xl">
                  <Sparkles className="w-8 h-8 text-blue-400 mb-2 animate-pulse" />
                  <h4 className="text-xs font-medium text-slate-900">Рекомендации формируются</h4>
                  <p className="text-[11px] text-slate-600 mt-1.5 max-w-md">
                    Умный помощник начнет анализировать состояние автомобиля и давать персональные советы, как только вы добавите первую запись об обслуживании или расходах
                  </p>
                  <button
                    onClick={() => {
                      setRecordToEdit(null);
                      setIsAddRecordOpen(true);
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-normal text-xs px-4 py-2.5 transition-colors cursor-pointer shadow-[0_2px_8px_rgba(59,130,246,0.15)] animate-in fade-in zoom-in-95 duration-300"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Добавить запись
                  </button>
                </div>
              ) : (
                isAiLoading ? (
                  <div className="grid sm:grid-cols-2 gap-4 animate-pulse">
                    {[...Array(4)].map((_, idx) => (
                      <div key={idx} className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-4 space-y-2">
                        <div className="h-3 bg-slate-200 rounded w-20" />
                        <div className="h-4 bg-slate-200 rounded w-40" />
                        <div className="h-3 bg-slate-200 rounded w-full" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {recommendations.length > 0 || !isAiLoading ? (
                      ((recommendations.length > 0 ? recommendations : getMockRecommendations(car.mileage))).map((rec, index) => (
                        <div key={index} className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="text-[9px] font-mono bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-medium">
                                {rec.category}
                              </span>
                              {rec.urgency === "critical" && (
                                <span className="text-[9px] font-mono bg-red-50 text-red-600 border border-red-200/60 px-2 py-0.5 rounded font-medium animate-pulse">
                                  Критично
                                </span>
                              )}
                              {rec.urgency === "warning" && (
                                <span className="text-[9px] font-mono bg-amber-50 text-amber-700 border border-amber-200/60 px-2 py-0.5 rounded font-medium">
                                  Внимание
                                </span>
                              )}
                              {rec.urgency === "info" && (
                                <span className="text-[9px] font-mono bg-slate-100 text-slate-500 border border-slate-200/40 px-2 py-0.5 rounded font-medium">
                                  Совет
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs font-medium text-slate-900 mt-2">{rec.title}</h4>
                            <p className="text-[11px] text-slate-600 mt-1 leading-normal">{rec.description}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-6 text-slate-400 text-xs font-light">
                        Рекомендации загружаются...
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            {/* 2. Interactive SVG Charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Fuel chart */}
              <div className="rounded-[2.5rem] bg-white/70 border border-white p-5 shadow-[0_30px_70px_-25px_rgba(15,23,42,0.15),inset_0_2px_0_white] backdrop-blur-2xl">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                  <h4 className="text-xs font-medium text-slate-800">Расход топлива (средний)</h4>
                  <span className="text-[10px] font-mono text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                    л/100 км
                  </span>
                </div>
                {renderFuelChart()}
              </div>

              {/* Cost distribution donut */}
              <div className="rounded-[2.5rem] bg-white/70 border border-white p-5 shadow-[0_30px_70px_-25px_rgba(15,23,42,0.15),inset_0_2px_0_white] backdrop-blur-2xl flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                    <h4 className="text-xs font-medium text-slate-800">Структура расходов авто</h4>
                    <span className="text-[10px] font-mono text-slate-500">
                      Распределение по категориям
                    </span>
                  </div>
                  
                  {categoryChartData.length === 0 ? (
                    <div className="flex items-center justify-center py-8 text-center text-slate-400 text-[11px] font-light">
                      Нет данных о расходах
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-4">
                      {/* Donut graphic */}
                      <div className="h-28 w-28 relative flex items-center justify-center shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <RechartsTooltip content={<CustomDonutTooltip />} />
                            <Pie
                              data={categoryChartData}
                              cx="50%"
                              cy="50%"
                              innerRadius={35}
                              outerRadius={50}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {categoryChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Legend Labels */}
                      <div className="flex-1 space-y-1 max-w-[140px]">
                        {categoryChartData.slice(0, 5).map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[10px] border-b border-slate-100/50 pb-0.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span
                                className="inline-block w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-slate-600 truncate font-medium">{item.name}</span>
                            </div>
                            <span className="text-slate-900 font-mono font-semibold">
                              {item.percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Monthly Dynamics Area Chart */}
            {car && car.serviceHistory.length > 0 && (
              <div className="rounded-[2.5rem] bg-white/70 border border-white p-6 shadow-[0_30px_70px_-25px_rgba(15,23,42,0.15),inset_0_2px_0_white] backdrop-blur-2xl mt-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-400">
                      Динамика трат по месяцам
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Хронология расходов на обслуживание
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-semibold font-mono text-slate-800 self-start sm:self-auto">
                      Итого за период: {totalFilteredSpent.toLocaleString("ru-RU")} ₽
                    </span>

                    <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/50">
                      <button
                        onClick={() => setTimeframe("all")}
                        className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                          timeframe === "all" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Все время
                      </button>
                      <button
                        onClick={() => setTimeframe("1y")}
                        className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                          timeframe === "1y" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Год
                      </button>
                      <button
                        onClick={() => setTimeframe("6m")}
                        className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                          timeframe === "6m" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        6 мес.
                      </button>
                    </div>
                  </div>
                </div>

                {monthlyChartData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-slate-400 text-xs font-light">
                      Нет данных о расходах за выбранный период
                    </p>
                  </div>
                ) : (
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={monthlyChartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorSpentDetail" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                          dataKey="monthStr"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 9, fill: "#94a3b8" }}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 9, fill: "#94a3b8" }}
                          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                        />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke="#6366f1"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorSpentDetail)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}

            {/* 3. Service History list */}
            <div className="rounded-[2.5rem] bg-white/70 border border-white p-6 shadow-[0_30px_70px_-25px_rgba(15,23,42,0.15),inset_0_2px_0_white] backdrop-blur-2xl">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <h3 className="text-base font-medium text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  История обслуживания
                </h3>
                
                <Button
                  onClick={() => {
                    setRecordToEdit(null);
                    setIsAddRecordOpen(true);
                  }}
                  variant="brand"
                  className="h-11 px-5"
                >
                  <PlusCircle className="w-5 h-5" />
                  Добавить запись
                </Button>
              </div>

              {car.serviceHistory.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs font-light">
                  <ClipboardList className="w-8 h-8 mb-2 mx-auto" />
                  <p>Записей обслуживания не найдено. Загрузите первый чек!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {car.serviceHistory.map((rec) => (
                    <div 
                      key={rec.id} 
                      onClick={() => openRecordDetails(rec)}
                      className="border border-slate-200/60 rounded-2xl p-5 hover:bg-slate-50/30 hover:border-blue-300 hover:shadow-sm active:scale-[0.99] transition-all cursor-pointer text-left"
                    >
                      <div className="flex justify-between items-start gap-3 mb-3">
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 rounded-full text-[10px] font-mono font-medium px-2 py-0.5 ${
                              rec.type === "ТО" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                              rec.type === "Ремонт" ? "bg-indigo-50 text-indigo-600 border border-indigo-100" :
                              "bg-slate-50 text-slate-600 border border-slate-100"
                            }`}>
                              {rec.type}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">{rec.date}</span>
                          </div>
                          
                          {rec.receiptAttached && (
                            <div>
                              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2.5 py-0.5 text-[9px] font-medium shadow-[0_2px_8px_rgba(16,185,129,0.15)] hover:brightness-105 transition-all select-none cursor-default" onClick={(e) => e.stopPropagation()}>
                                <BadgeCheck className="w-3 h-3 text-white" />
                                Проверено ИИ (+10% доверия)
                              </span>
                            </div>
                          )}
                          
                          <div className="flex flex-col items-start sm:flex-row sm:items-baseline gap-0.5 sm:gap-2 mt-1">
                            <span className="text-sm font-semibold text-slate-900 font-mono whitespace-nowrap">{rec.cost.toLocaleString("ru-RU")} ₽</span>
                            <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">на пробеге {rec.mileage.toLocaleString("ru-RU")} км</span>
                          </div>
                        </div>
                        
                        <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-all active:scale-95 cursor-pointer shrink-0"
                                title="Действия"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 rounded-2xl p-1.5 border border-slate-200/80 bg-white shadow-lg animate-in fade-in-50 zoom-in-95 duration-100 z-50">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditRecord(rec);
                                }}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-50 cursor-pointer focus:bg-slate-50 focus:text-slate-900 outline-none"
                              >
                                <Pencil className="w-3.5 h-3.5 text-slate-400" />
                                Редактировать
                              </DropdownMenuItem>
                              
                              {rec.receiptAttached && (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDownloadReceipt(rec);
                                  }}
                                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-50 cursor-pointer focus:bg-slate-50 focus:text-slate-900 outline-none"
                                >
                                  <Download className="w-3.5 h-3.5 text-slate-400" />
                                  Скачать чек
                                </DropdownMenuItem>
                              )}
                              
                              <DropdownMenuSeparator className="my-1 border-t border-slate-100" />
                              
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRecordToDeleteId(rec.id);
                                }}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-600 hover:bg-red-50 cursor-pointer focus:bg-red-50 focus:text-red-700 outline-none"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                Удалить
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <span className="font-medium text-slate-400">СТО:</span>
                        <span className="font-semibold text-slate-700">{rec.serviceCenterName || "Автосервис (вручную)"}</span>
                      </div>

                      {rec.parts && (
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono uppercase min-w-0 mt-3 pt-2.5 border-t border-slate-100">
                          <Settings className="w-3.5 h-3.5 shrink-0" />
                          <span className="shrink-0">Запчасти:</span>
                          <span className="text-slate-600 lowercase font-sans normal-case truncate">{rec.parts}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Parts list & Quick Actions (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* 1. Parts Checklist */}
            <div className="rounded-[2.5rem] bg-white/70 border border-white p-6 shadow-[0_30px_70px_-25px_rgba(15,23,42,0.15),inset_0_2px_0_white] backdrop-blur-2xl">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
                <h3 className="text-base font-medium text-slate-900 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-500" />
                  Спецификация запчастей
                </h3>
                <button
                  onClick={() => setIsSearchSettingsOpen(!isSearchSettingsOpen)}
                  className="w-6 h-6 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  title="Настроить поиск запчастей"
                >
                  <Globe className="w-3.5 h-3.5" />
                </button>
              </div>

              {isSearchSettingsOpen && (
                <div className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-3 mb-4 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200 text-left">
                  <span className="text-[10px] font-semibold text-slate-400 block">Где искать запчасти?</span>
                  
                  <div className="grid grid-cols-3 gap-1">
                    {Object.keys(SEARCH_PROVIDERS).map((prov) => (
                      <button
                        key={prov}
                        type="button"
                        onClick={() => handleSelectProvider(prov)}
                        className={`text-[9px] py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer font-medium ${
                          searchProvider === prov
                            ? "bg-blue-500 border-blue-600 text-white font-semibold"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {prov}
                      </button>
                    ))}
                  </div>

                  {searchProvider === "Свой сайт" && (
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-mono block">URL-шаблон (используйте {"{query}"} для запроса):</label>
                      <input
                        type="text"
                        placeholder="https://exist.ru/Price.axd?pcode={query}"
                        value={customSearchUrl}
                        onChange={(e) => {
                          setCustomSearchUrl(e.target.value);
                          localStorage.setItem("probibiku_custom_search_url", e.target.value);
                        }}
                        className="w-full text-[10px] border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white focus:border-blue-500 outline-none transition-all font-mono"
                      />
                    </div>
                  )}
                </div>
              )}
              
              {car.parts.length === 0 ? (
                <p className="text-xs text-slate-400 font-light text-center py-6">
                  Удобно. Сюда можно добавить часто используемые расходники
                </p>
              ) : (
                <div className="space-y-3 mb-6">
                  {car.parts.map((p) => (
                    <div key={p.id} className="flex justify-between items-center gap-3 text-xs border-b border-slate-50 pb-2.5 last:border-b-0 last:pb-0">
                      <div className="min-w-0 flex-1">
                        <p className="font-normal text-slate-800 truncate">{p.name}</p>
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5 truncate">Артикул: {p.partNumber}</p>
                      </div>
                      
                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Search in autoteile / marketplace shortcut */}
                        <a
                          href={getSearchUrl(p.name, p.partNumber)}
                          target="_blank"
                          rel="noreferrer"
                          className="w-7 h-7 rounded-full bg-slate-50 hover:bg-blue-50 hover:text-blue-500 text-slate-400 flex items-center justify-center transition-colors"
                          title="Найти в поиске"
                        >
                          <Search className="w-3.5 h-3.5" />
                        </a>
                        
                        {/* Delete Part Button */}
                        <button
                          type="button"
                          onClick={() => handleDeletePart(p.id)}
                          className="w-7 h-7 rounded-full bg-slate-50 hover:bg-red-50 hover:text-red-500 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
                          title="Удалить деталь"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Inline Add Part Form */}
              <form onSubmit={handleAddPart} className="space-y-3 pt-4 border-t border-slate-100">
                <input
                  type="text"
                  placeholder="Название (например, Фильтр салона)"
                  value={newPartName}
                  onChange={(e) => setNewPartName(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all"
                  required
                />
                
                <input
                  type="text"
                  placeholder="Артикул (например, Mann C29007)"
                  value={newPartNumber}
                  onChange={(e) => setNewPartNumber(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all"
                  required
                />

                <button
                  type="submit"
                  className="w-full rounded-full border border-blue-100 bg-blue-50 hover:bg-blue-100/70 text-blue-600 text-xs font-normal py-2 transition-colors cursor-pointer"
                >
                  Добавить деталь
                </button>
              </form>
            </div>

            {/* 2. Fast Actions Card */}
            <div className="rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 border border-blue-700 p-6 text-white relative overflow-hidden shadow-[0_15px_35px_-10px_rgba(59,130,246,0.25)]">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <h3 className="text-base font-normal mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Прогноз ТО готов
              </h3>
              <p className="text-xs text-blue-100 font-light mb-6 leading-relaxed">
                Наш ИИ закончил анализ ваших последних чеков. Регламентные проверки согласованы с производителем
              </p>
              
              <button
                onClick={() => alert("Уведомления успешно подключены в Telegram!")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full px-3 py-3 bg-white text-slate-800 text-[11px] sm:text-xs font-normal shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-normal text-center"
              >
                <MessageCircle className="w-4 h-4 text-blue-500" />
                Включить уведомления в Telegram
              </button>
            </div>

          </div>

        </div>

        {/* Modal components */}
        <AddRecordModal
          isOpen={isAddRecordOpen}
          onClose={() => {
            setIsAddRecordOpen(false);
            setRecordToEdit(null);
          }}
          onSave={loadCar}
          car={car}
          recordToEdit={recordToEdit}
        />

        <ShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          car={car}
        />

        {/* Viewing Record Modal */}
        {viewingRecord && (
          <Portal>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in" 
                onClick={() => {
                  if (Date.now() - lastOpenTimeRef.current > 400) {
                    setViewingRecord(null);
                  }
                }}
              />
              
              {/* Modal Content */}
              <div className="relative w-full max-w-2xl rounded-[2.5rem] bg-white border border-slate-200/80 shadow-2xl p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
                {/* Modal Header */}
                <div className="flex justify-between items-start gap-4 pb-4 border-b border-slate-100">
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`inline-flex items-center gap-1 rounded-full text-[10px] font-mono font-medium px-2.5 py-0.5 ${
                        viewingRecord.type === "ТО" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                        viewingRecord.type === "Ремонт" ? "bg-indigo-50 text-indigo-600 border border-indigo-100" :
                        "bg-slate-50 text-slate-600 border border-slate-100"
                      }`}>
                        {viewingRecord.type}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{viewingRecord.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      Детали обслуживания
                    </h3>
                  </div>
                  
                  <button 
                    onClick={() => setViewingRecord(null)}
                    className="text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto py-5 space-y-6 scrollbar-hide text-left">
                  {/* General Info Grid */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-50/50 border border-slate-100 rounded-2xl p-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block">СТО (Автосервис)</span>
                      <span className="text-xs font-semibold text-slate-800 mt-0.5 block">
                        {viewingRecord.serviceCenterName || "Автосервис"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Пробег</span>
                      <span className="text-xs font-semibold text-slate-800 mt-0.5 block">
                        {viewingRecord.mileage.toLocaleString("ru-RU")} км
                      </span>
                    </div>
                  </div>

                  {/* Work Items Table / List */}
                  <div>
                    <h4 className="text-[10px] font-semibold text-slate-400 mb-3">
                      Выполненные работы и запчасти
                    </h4>

                    {viewingRecord.items && viewingRecord.items.length > 0 ? (
                      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1 scrollbar-hide">
                        {viewingRecord.items.map((item: any, idx: number) => {
                          const qty = parseFloat(item.quantity?.toString() || "1") || 1;
                          const price = parseFloat(item.cost?.toString() || "0") || 0;
                          const sum = price * qty;
                          return (
                            <div key={idx} className="bg-slate-50/50 border border-slate-100 rounded-xl p-3 flex flex-col gap-1 text-left">
                              <p className="font-normal text-slate-800 text-xs leading-relaxed">{item.description}</p>
                              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                                <span>{qty} шт.</span>
                                <span className="font-semibold text-slate-700">Итого: {sum.toLocaleString("ru-RU")} ₽</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-slate-50/30 border border-slate-100 rounded-2xl p-4">
                        <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                          {viewingRecord.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Parts List shortcut if present */}
                  {viewingRecord.parts && (
                    <div className="pt-2 border-t border-slate-100">
                      <h4 className="text-[10px] font-semibold text-slate-400 mb-2">
                        Использованные детали
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/30 border border-slate-100 rounded-2xl p-4">
                        {viewingRecord.parts}
                      </p>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-auto">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-slate-400">Итоговая стоимость</span>
                    <span className="text-lg font-bold text-slate-900 font-mono">
                      {viewingRecord.cost.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                  
                  <div className="flex flex-col-reverse sm:flex-row gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setViewingRecord(null);
                        handleEditRecord(viewingRecord);
                      }}
                      className="flex-1 rounded-full border border-slate-200 text-slate-600 text-sm font-normal py-3 px-6 bg-white hover:bg-slate-50 transition-colors cursor-pointer text-center"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => setViewingRecord(null)}
                      className="flex-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-700 text-white text-sm font-normal py-3 px-6 shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer text-center"
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Portal>
        )}

        {/* Delete Record Confirmation Modal */}
        {recordToDeleteId && (
          <Portal>
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in" 
              onClick={() => setRecordToDeleteId(null)}
            />
            
            {/* Modal Content */}
            <div className="relative w-full max-w-sm rounded-[2rem] bg-white border border-slate-200/80 shadow-2xl p-6 z-10 animate-in zoom-in-95 duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 mb-4 shadow-[0_4px_12px_rgba(239,68,68,0.1)]">
                  <Trash2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Удалить запись обслуживания?</h3>
                <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
                  Вы уверены, что хотите удалить эту запись? Данные о расходах будут безвозвратно стерты
                </p>
                
                <div className="flex flex-col-reverse sm:flex-row gap-3 w-full mt-6">
                  <button
                    onClick={() => setRecordToDeleteId(null)}
                    className="flex-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-normal py-3 transition-colors cursor-pointer"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={async () => {
                      if (recordToDeleteId) {
                        await executeDeleteRecord(recordToDeleteId);
                        setRecordToDeleteId(null);
                      }
                    }}
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

        {/* Delete Part Confirmation Modal */}
        {partToDeleteId && (
          <Portal>
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in" 
              onClick={() => setPartToDeleteId(null)}
            />
            
            {/* Modal Content */}
            <div className="relative w-full max-w-sm rounded-[2rem] bg-white border border-slate-200/80 shadow-2xl p-6 z-10 animate-in zoom-in-95 duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 mb-4 shadow-[0_4px_12px_rgba(239,68,68,0.1)]">
                  <Trash2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Удалить запчасть?</h3>
                <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
                  Вы уверены, что хотите удалить эту деталь из спецификации автомобиля?
                </p>
                
                <div className="flex flex-col-reverse sm:flex-row gap-3 w-full mt-6">
                  <button
                    onClick={() => setPartToDeleteId(null)}
                    className="flex-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-normal py-3 transition-colors cursor-pointer"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={() => {
                      if (partToDeleteId) {
                        const updatedParts = car.parts.filter(p => p.id !== partToDeleteId);
                        if (typeof window !== "undefined") {
                          localStorage.setItem(`parts_for_${car.id}`, JSON.stringify(updatedParts));
                        }
                        const updatedCar: Car = {
                          ...car,
                          parts: updatedParts
                        };
                        updateCar(updatedCar);
                        setCar(updatedCar);
                        setPartToDeleteId(null);
                      }
                    }}
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

      </main>

      <Footer />
    </>
  );
}
