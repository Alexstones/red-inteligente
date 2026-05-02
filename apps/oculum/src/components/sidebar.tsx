"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    ArrowLeftRight,
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
    Network
} from "lucide-react";

import { useState } from "react";
import { mockUser } from "@/lib/mock-data";

const navItems = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Billetera",
        href: "/wallet",
        icon: Wallet,
    },
    {
        label: "Gestión Neural",
        href: "/management",
        icon: BrainCircuit,
    },
    {
        label: "Albedrío (Reglas)",
        href: "/dashboard/decision",
        icon: Zap,
        disabled: true
    },
    {
        label: "Oráculo (IA)",
        href: "/ai",
        icon: Cpu,
    },
    {
        label: "Red P2P (Explorer)",
        href: "/explorer",
        icon: Network,
    },
    {
        label: "Identidad (DID)",
        href: "/identity",
        icon: Shield,
    },
    {
        label: "Configuración",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "h-screen flex flex-col bg-sidebar border-r border-border transition-all duration-300 sticky top-0",
                collapsed ? "w-[72px]" : "w-64"
            )}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 h-16 border-b border-border shrink-0">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
                    <Hexagon className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                {!collapsed && (
                    <div className="animate-fade-in overflow-hidden">
                        <p className="font-bold text-sm text-foreground tracking-tight">Oculum</p>
                        <p className="text-[10px] text-muted-foreground">Red Inteligente</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item: any) => {
                    const Icon = item.icon;
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/dashboard" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.disabled ? "#" : item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-indigo-500/12 text-indigo-300 border border-indigo-500/20"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-transparent",
                                item.disabled && "opacity-30 pointer-events-none grayscale"
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon
                                className={cn(
                                    "w-[18px] h-[18px] shrink-0 transition-colors",
                                    isActive
                                        ? "text-indigo-400"
                                        : "text-muted-foreground group-hover:text-foreground"
                                )}
                            />
                            {!collapsed && (
                                <div className="flex flex-1 items-center justify-between">
                                    <span>{item.label}</span>
                                    {item.disabled && (
                                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 uppercase">Off</span>
                                    )}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="border-t border-border p-3 shrink-0">
                {!collapsed ? (
                    <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-muted/40">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {mockUser.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{mockUser.name}</p>
                            <p className="text-[10px] text-muted-foreground truncate">
                                {mockUser.tenantName}
                            </p>
                        </div>
                        <Link
                            href="/login"
                            className="text-muted-foreground hover:text-red-400 transition-colors shrink-0"
                            title="Cerrar sesión"
                        >
                            <LogOut className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="flex items-center justify-center py-2 text-muted-foreground hover:text-red-400 transition-colors"
                        title="Cerrar sesión"
                    >
                        <LogOut className="w-4 h-4" />
                    </Link>
                )}
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all cursor-pointer z-10"
            >
                {collapsed ? (
                    <ChevronRight className="w-3 h-3" />
                ) : (
                    <ChevronLeft className="w-3 h-3" />
                )}
            </button>
        </aside>
    );
}
