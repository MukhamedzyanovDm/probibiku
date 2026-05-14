import React, { ReactNode } from "react";
import Link from "next/link";
import { 
  Car, 
  LayoutDashboard, 
  History, 
  Settings, 
  LogOut, 
  PlusCircle,
  BarChart3
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

function SidebarItem({ icon: Icon, label, href, active }: SidebarItemProps) {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? "bg-[#334155] text-white shadow-sm" 
          : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#1e293b]"
      }`}>
        <Icon className={`w-5 h-5 ${active ? "text-white" : "text-[#94a3b8] group-hover:text-[#64748b]"}`} />
        <span className="font-sans font-medium text-sm">{label}</span>
      </div>
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#e2e8f0] flex flex-col p-4">
        <div className="flex items-center gap-2 px-4 py-6 mb-4">
          <div className="w-8 h-8 bg-[#334155] rounded-lg flex items-center justify-center">
            <Car className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl text-[#1e293b] tracking-tight">АвтоЛог</span>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Гараж" href="/dashboard/garage" active />
          <SidebarItem icon={History} label="История" href="/dashboard/history" />
          <SidebarItem icon={BarChart3} label="Аналитика" href="/dashboard/analytics" />
          <SidebarItem icon={Settings} label="Настройки" href="/dashboard/settings" />
        </nav>

        <div className="mt-auto pt-4 border-t border-[#f1f5f9]">
          <SidebarItem icon={LogOut} label="Выйти" href="/login" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="font-display font-bold text-xl text-[#1e293b]">Мой гараж</h1>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-[#334155] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#475569] transition-all">
              <PlusCircle className="w-4 h-4" />
              Добавить авто
            </button>
            <div className="w-8 h-8 rounded-full bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#94a3b8] to-[#64748b]"></div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
