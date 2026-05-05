"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Boxes,
    Hexagon,
    LogOut,
    Settings,
    Shield,
    ChevronLeft,
    ChevronRight,
    Wallet,
    BrainCircuit,
    Zap,
    Cpu,
    Network,
    Building2
} from "lucide-react";

import { useState } from "react";
import { mockUser } from "@/lib/mock-data";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Empresas", href: "/empresas", icon: Building2 },
    { label: "Billetera", href: "/wallet", icon: Wallet },
    { label: "Gestión Neutral", href: "/management/neutral", icon: BrainCircuit },
    { label: "Gestión de Bloques", href: "/management/blocks", icon: Boxes },
    { label: "Gestión de Transacciones", href: "/management/transactions", icon: Zap },
    { label: "Gestión del Sistema", href: "/management/system", icon: Settings },
    { label: "Oráculo IA", href: "/ai", icon: Cpu },
    { label: "Index de Extremidades", href: "/explorer", icon: Network },
    { label: "Identidad", href: "/identity", icon: Shield },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "h-screen flex flex-col glass-panel border-r-0 border-white/[0.05] transition-all duration-500 sticky top-0 z-50",
                collapsed ? "w-[88px]" : "w-72"
            )}
        >
            {/* Logo */}
            <div className="flex items-center gap-4 px-6 h-24 shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-white text-background flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <Hexagon className="w-6 h-6 fill-current" />
                </div>
                {!collapsed && (
                    <div className="overflow-hidden">
                        <p className="font-black text-lg tracking-tighter uppercase italic leading-none">Nexus</p>
                        <p className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] mt-1">Red Inteligente</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
                {navItems.map((item: any) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.disabled ? "#" : item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-4 rounded-2xl text-xs font-bold transition-all duration-300 group relative overflow-hidden uppercase tracking-widest",
                                isActive
                                    ? "bg-white/10 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] border border-white/10"
                                    : "text-white/40 hover:text-white hover:bg-white/[0.03]",
                                item.disabled && "opacity-20 cursor-not-allowed"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 w-1 h-full bg-primary shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
                            )}
                            <Icon
                                className={cn(
                                    "w-5 h-5 shrink-0 transition-all duration-300",
                                    isActive ? "text-primary scale-110" : "group-hover:scale-110"
                                )}
                            />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="p-6 shrink-0">
                <div className={cn(
                    "rounded-2xl bg-white/[0.03] border border-white/[0.05] p-3 flex items-center gap-3 transition-all duration-300",
                    collapsed ? "justify-center" : ""
                )}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center font-black text-xs">
                        {mockUser.name.charAt(0)}
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black uppercase tracking-tight truncate">{mockUser.name}</p>
                            <p className="text-[8px] font-mono text-white/30 uppercase tracking-widest truncate">{mockUser.tenantName}</p>
                        </div>
                    )}
                    {!collapsed && (
                        <Link href="/login" className="text-white/20 hover:text-destructive transition-colors p-2">
                            <LogOut className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-24 w-7 h-7 rounded-full bg-white text-background flex items-center justify-center hover:scale-110 transition-all cursor-pointer z-[60] shadow-xl"
            >
                {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
        </aside>
    );
}

