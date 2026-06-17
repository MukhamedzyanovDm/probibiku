import React from "react";
import Image from "next/image";
import { Car } from "lucide-react";

interface BrandLogoProps {
  make: string;
  className?: string;
}

const AVAILABLE_LOGOS = [
  "audi", "avatr", "bmw", "byd", "cadillac", "changan", "chery", "chevrolet", 
  "chrysler", "citroen", "dongfeng", "faw", "fiat", "ford", "gac", "geely", 
  "genesis", "haval", "honda", "hyundai", "infiniti", "jac", "kaiyi", "kia", 
  "land_rover", "lexus", "lixiang", "mazda", "mercedes", "mitsubishi", "nissan", 
  "opel", "peugeot", "porsche", "renault", "skoda", "subaru", "suzuki", "tank", 
  "tesla", "toyota", "volkswagen", "volvo", "zeekr"
];

export function BrandLogo({ make, className = "" }: BrandLogoProps) {
  const slug = make.toLowerCase().replace(/\s+/g, "_");
  const hasLogo = AVAILABLE_LOGOS.includes(slug);

  if (hasLogo) {
    return (
      <div className={`relative flex items-center justify-center bg-white rounded-xl p-2 ${className}`}>
        <img
          src={`/assets/logos/${slug}.svg`}
          alt={`${make} logo`}
          className="w-full h-full object-contain filter transition-all duration-300 group-hover:scale-110"
        />
      </div>
    );
  }

  // Fallback: Styled placeholder with Initials
  const initials = make.slice(0, 2).toUpperCase();

  return (
    <div className={`flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-white transition-colors duration-300 ${className}`}>
      <span className="text-xl font-black text-slate-300 mb-1 tracking-tighter">{initials}</span>
      <Car className="w-5 h-5 text-slate-200" />
    </div>
  );
}
