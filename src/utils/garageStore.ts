export interface ServiceRecord {
  id: string;
  date: string;
  type: "ТО" | "Ремонт" | "Тюнинг" | "Другое";
  mileage: number;
  cost: number;
  description: string;
  parts: string;
  receiptAttached?: boolean;
  receiptUrl?: string;
  receiptImageUrl?: string;
  items?: any[];
  serviceCenterName?: string;
  ocrRawData?: any;
}

export interface CarPart {
  id: string;
  name: string;
  partNumber: string;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  mileage: number;
  purchaseDate: string;
  health: number;
  imageUrl?: string;
  insuranceExpiry?: string;
  fuelHistory: number[]; // Fuel consumption history
  serviceHistory: ServiceRecord[];
  parts: CarPart[];
}

const DEFAULT_CARS: Car[] = [
  {
    id: "kia-sportage",
    make: "Kia",
    model: "Sportage",
    year: 2019,
    licensePlate: "У777ХХ777",
    mileage: 84320,
    purchaseDate: "2019-05-15",
    health: 92,
    imageUrl: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=600&q=80",
    fuelHistory: [8.2, 8.5, 8.1, 8.4, 8.9, 8.3, 8.6, 8.4],
    serviceHistory: [
      {
        id: "rec-1",
        date: "2026-06-11",
        type: "ТО",
        mileage: 84320,
        cost: 13250,
        description: "Плановое ТО: замена моторного масла, масляного фильтра и передних тормозных колодок Brembo.",
        parts: "Масло Shell Helix 5W-30, Фильтр Mann-Filter W 811/80, Колодки Brembo SP1399",
        receiptAttached: true
      },
      {
        id: "rec-2",
        date: "2025-11-15",
        type: "Ремонт",
        mileage: 78200,
        cost: 3500,
        description: "Регулировка углов установки колес (сход-развал) после сезонной смены шин.",
        parts: "Расходные материалы сход-развала"
      },
      {
        id: "rec-3",
        date: "2025-05-10",
        type: "ТО",
        mileage: 72100,
        cost: 18200,
        description: "Большое ТО-75000: масло двигателя, все фильтры, свечи зажигания, тормозная жидкость.",
        parts: "Масло, фильтр масляный, воздушный, салонный, свечи NGK LFR5A-11"
      }
    ],
    parts: [
      { id: "part-1", name: "Фильтр масляный", partNumber: "Mann W 811/80" },
      { id: "part-2", name: "Колодки передние", partNumber: "Brembo P 30 018" },
      { id: "part-3", name: "Свечи зажигания", partNumber: "NGK LFR5A-11" }
    ]
  },
  {
    id: "tesla-3",
    make: "Tesla",
    model: "Model 3",
    year: 2021,
    licensePlate: "Е001КХ797",
    mileage: 42150,
    purchaseDate: "2021-09-22",
    health: 96,
    imageUrl: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=600&q=80",
    fuelHistory: [15.2, 14.8, 16.1, 15.4, 15.8, 14.9, 15.1, 15.3],
    serviceHistory: [
      {
        id: "rec-4",
        date: "2026-04-04",
        type: "ТО",
        mileage: 42150,
        cost: 6200,
        description: "Замена салонного угольного фильтра, диагностика высоковольтной батареи, проверка тормозной системы.",
        parts: "Фильтр салонный угольный Tesla 1102289"
      },
      {
        id: "rec-5",
        date: "2025-09-12",
        type: "Другое",
        mileage: 35000,
        cost: 4000,
        description: "Сезонный шиномонтаж, балансировка колес и проверка развала.",
        parts: "Грузики балансировочные"
      }
    ],
    parts: [
      { id: "part-4", name: "Фильтр салонный угольный", partNumber: "Tesla 1102289" },
      { id: "part-5", name: "Щетки стеклоочистителя", partNumber: "Bosch Aerotwin A102S" }
    ]
  },
  {
    id: "bmw-5",
    make: "BMW",
    model: "5 Series",
    year: 2020,
    licensePlate: "Х005АМ777",
    mileage: 62000,
    purchaseDate: "2020-11-10",
    health: 94,
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80",
    fuelHistory: [9.2, 9.5, 9.1, 9.8, 9.3],
    serviceHistory: [
      {
        id: "rec-b1",
        date: "2026-05-12",
        type: "ТО",
        mileage: 62000,
        cost: 18500,
        description: "Замена моторного масла BMW TwinPower Turbo 5W-30, масляного, воздушного и салонного фильтров.",
        parts: "Масло BMW 5W-30, Фильтр Mann C 30 005"
      }
    ],
    parts: [
      { id: "part-b1", name: "Фильтр воздушный", partNumber: "Mann C 30 005" }
    ]
  },
  {
    id: "toyota-rav4",
    make: "Toyota",
    model: "RAV4",
    year: 2018,
    licensePlate: "Т444УУ799",
    mileage: 115000,
    purchaseDate: "2018-07-20",
    health: 88,
    imageUrl: "https://images.unsplash.com/photo-1621259182978-f09e5e2b07ae?auto=format&fit=crop&w=600&q=80",
    fuelHistory: [9.5, 9.8, 9.4, 9.6, 10.1],
    serviceHistory: [
      {
        id: "rec-t1",
        date: "2026-03-15",
        type: "Ремонт",
        mileage: 112000,
        cost: 24500,
        description: "Замена втулок и стоек переднего стабилизатора, замена передних тормозных дисков и колодок.",
        parts: "Диски Brembo, стойки стабилизатора Toyota"
      }
    ],
    parts: [
      { id: "part-t1", name: "Диски тормозные передние", partNumber: "Brembo 09.C420.11" }
    ]
  },
  {
    id: "porsche-911",
    make: "Porsche",
    model: "911 Carrera",
    year: 2022,
    licensePlate: "М911ММ77",
    mileage: 18500,
    purchaseDate: "2022-04-05",
    health: 98,
    imageUrl: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80",
    fuelHistory: [12.5, 12.8, 12.1, 13.4, 11.9],
    serviceHistory: [
      {
        id: "rec-p1",
        date: "2026-05-20",
        type: "ТО",
        mileage: 18000,
        cost: 45000,
        description: "Плановое годовое обслуживание у официального дилера Porsche, проверка всех систем.",
        parts: "Масло Mobil 1 0W-40, Фильтр масляный Porsche"
      }
    ],
    parts: [
      { id: "part-p1", name: "Фильтр масляный", partNumber: "Porsche 9A110722400" }
    ]
  },
  {
    id: "hyundai-solaris",
    make: "Hyundai",
    model: "Solaris",
    year: 2017,
    licensePlate: "К789ОТ777",
    mileage: 145000,
    purchaseDate: "2017-02-14",
    health: 85,
    imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80",
    fuelHistory: [7.2, 7.5, 7.1, 7.4, 7.9],
    serviceHistory: [
      {
        id: "rec-s1",
        date: "2026-02-10",
        type: "ТО",
        mileage: 142000,
        cost: 8500,
        description: "Регулярное ТО, замена масла в двигателе и свечей зажигания.",
        parts: "Масло Hyundai Turbo Syn, свечи NGK"
      }
    ],
    parts: [
      { id: "part-s1", name: "Свечи зажигания", partNumber: "NGK LZKR6B-10E" }
    ]
  }
];

export const getCars = (): Car[] => {
  if (typeof window === "undefined") return DEFAULT_CARS;
  
  // One-time initialization flag to load 6 cars
  const isV2Initialized = localStorage.getItem("probibiku_cars_v2_initialized");
  if (!isV2Initialized) {
    localStorage.setItem("probibiku_cars", JSON.stringify(DEFAULT_CARS));
    localStorage.setItem("probibiku_cars_v2_initialized", "true");
    return DEFAULT_CARS;
  }

  const stored = localStorage.getItem("probibiku_cars");
  if (!stored) {
    localStorage.setItem("probibiku_cars", JSON.stringify(DEFAULT_CARS));
    return DEFAULT_CARS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_CARS;
  }
};

export const saveCars = (cars: Car[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("probibiku_cars", JSON.stringify(cars));
};

export const getCarById = (id: string): Car | undefined => {
  const cars = getCars();
  return cars.find(c => c.id === id);
};

export const addCar = (car: Omit<Car, "id" | "health" | "fuelHistory" | "serviceHistory" | "parts">): Car => {
  const cars = getCars();
  const newCar: Car = {
    ...car,
    id: `${car.make.toLowerCase()}-${car.model.toLowerCase()}-${Math.random().toString(36).substr(2, 4)}`,
    health: 100,
    fuelHistory: [8.0, 8.2, 7.9, 8.1, 8.3],
    serviceHistory: [],
    parts: []
  };
  cars.push(newCar);
  saveCars(cars);
  return newCar;
};

export const updateCar = (updated: Car): void => {
  const cars = getCars();
  const idx = cars.findIndex(c => c.id === updated.id);
  if (idx !== -1) {
    cars[idx] = updated;
    saveCars(cars);
  }
};

export const deleteCar = (id: string): void => {
  const cars = getCars();
  const filtered = cars.filter(c => c.id !== id);
  saveCars(filtered);
};
