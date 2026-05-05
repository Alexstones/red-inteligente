"use client";

import {
    Wallet,
    Hash,
    Hexagon,
    Activity,
    Zap,
    Cpu,
    Settings,
    BrainCircuit,
    Network,
    ShieldCheck
} from "lucide-react";
import { mockDashboardStats, mockTransactions } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 500);
    }, []);

    const statCards = [
        { label: "Saldo Total", value: mockDashboardStats.balance, icon: Wallet, color: "text-primary", subtext: "+12.4% vs mes ant." },
        { label: "Sinapsis Activas", value: 1284, icon: Zap, color: "text-secondary", subtext: "Sincronización al 99%" },
        { label: "Index Sistema Cabeza", value: "98.5%", icon: BrainCircuit, color: "text-amber-400", subtext: "Columna Vertebral" },
        { label: "Index Extremidades", value: "94.2%", icon: Network, color: "text-cyan-400", subtext: "Nodos Periféricos" },
        { label: "Nodos Neurales", value: 8, icon: Activity, color: "text-emerald-400", subtext: "8/8 Operativos" },
    ];

    return (
        <div className={cn("space-y-12 pb-20 transition-all duration-700", isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0")}>
            {/* --- Hero Header --- */}
            <div className="relative pt-8">
                <div className="space-y-2">
                    <h1 className="text-5xl font-black tracking-tight uppercase italic leading-none">
                        <span className="gradient-text">Sistema</span> <span className="text-primary neon-glow-primary">Nervioso Central</span>
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase">Core Online</span>
                        </div>
                        <span className="text-white/30 text-[10px] font-mono tracking-widest uppercase">ID: 0x82...F4-SYSTEM</span>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="absolute top-8 right-0 flex gap-4">
                    <button className="btn-premium-secondary px-6 group">
                        <Hash className="w-4 h-4 group-hover:rotate-12 transition-transform" /> 
                        <span className="text-xs uppercase tracking-widest">Explorer</span>
                    </button>
                    <button className="btn-premium-primary px-8 group">
                        <Zap className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" /> 
                        <span className="text-xs uppercase tracking-widest">Nueva Sinapsis</span>
                    </button>
                </div>
            </div>

            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div 
                            key={stat.label} 
                            className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-500"
                        >
                            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                <Icon className="w-40 h-40" />
                            </div>
                            <div className="flex justify-between items-start mb-8">
                                <div className={cn("p-3 rounded-xl bg-white/5 border border-white/10", stat.color)}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">RT-00{i+1}</span>
                            </div>
                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-1">{stat.label}</p>
                            <p className="text-4xl font-black text-white tracking-tighter mb-4">
                                {typeof stat.value === "number" && stat.label.includes("Saldo") ? formatCurrency(stat.value) : stat.value}
                            </p>
                            <p className="text-[10px] font-mono text-primary/60">{stat.subtext}</p>
                        </div>
                    );
                })}
            </div>

            {/* --- Secondary Content Grid --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Synapse Flow List */}
                <div className="lg:col-span-8 glass-panel rounded-3xl overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                        <div className="flex items-center gap-3">
                            <Activity className="w-5 h-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-white/80 italic text-shadow-sm">Actividad Neural Reciente</h2>
                        </div>
                        <button className="text-[10px] font-mono text-white/40 hover:text-white transition-colors uppercase tracking-widest">Ver Historial Completo</button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] bg-white/[0.01]">
                                    <th className="px-8 py-4 font-normal">Sincronización</th>
                                    <th className="px-8 py-4 font-normal">Vector de Datos</th>
                                    <th className="px-8 py-4 font-normal">Protocolo</th>
                                    <th className="px-8 py-4 font-normal text-right">Masa Neural</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {mockTransactions.slice(0, 5).map((tx, i) => (
                                    <tr 
                                        key={tx.id} 
                                        className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors neon-glow-primary" />
                                                <span className="text-[10px] font-mono text-white/50 group-hover:text-white transition-colors">
                                                    {tx.hash?.substring(0, 12) || '0xSTABLE-HASH'}
                                                </span>

                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-xs font-bold text-white/80 group-hover:text-white transition-colors uppercase italic">
                                                {tx.description}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={cn(
                                                "text-[9px] font-mono px-3 py-1 rounded-full uppercase tracking-tighter border",
                                                tx.status === 'completado' 
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                            )}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <span className={cn(
                                                "text-sm font-black tracking-tight",
                                                tx.type === 'ingreso' ? 'text-primary' : 'text-secondary'
                                            )}>
                                                {tx.type === 'egreso' ? '-' : '+'}{formatCurrency(tx.amount)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Network Health Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Visualizer */}
                    <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-32 h-32 relative mb-8">
                                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-2 rounded-full border border-secondary/20 animate-[spin_6s_linear_infinite_reverse]" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Hexagon className="w-12 h-12 text-primary neon-glow-primary animate-pulse-slow" />
                                </div>
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/80 mb-2 text-shadow-sm">Carga Neural Periférica</h3>
                            <p className="text-[10px] font-mono text-primary/60">0.02ms Response Delay</p>
                        </div>
                        
                        <div className="mt-8 space-y-4 relative z-10">
                            {[
                                { label: "Neural Load", val: "72%", color: "bg-primary" },
                                { label: "Synapse Sync", val: "99.9%", color: "bg-secondary" },
                                { label: "Encryption", val: "QKD-Active", color: "bg-emerald-400" }
                            ].map((row) => (
                                <div key={row.label} className="space-y-1.5">
                                    <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest text-white/40">
                                        <span>{row.label}</span>
                                        <span className="text-white/80">{row.val}</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div 
                                            className={cn("h-full transition-all duration-1000", row.color)}
                                            style={{ width: row.val.includes("%") ? row.val : "100%" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Launch */}
                    <div className="glass-panel rounded-3xl p-6 flex items-center justify-around">
                        <button className="p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                            <Cpu className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                        </button>
                        <button className="p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                            <ShieldCheck className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                        </button>
                        <button className="p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                            <Settings className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


