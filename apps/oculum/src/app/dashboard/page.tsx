"use client";

import {
    Wallet,
    TrendingUp,
    TrendingDown,
    Clock,
    CheckCircle2,
    ShieldCheck,
    ArrowUpRight,
    ArrowDownRight,
    ArrowLeftRight,
    Hash,
} from "lucide-react";
import { mockDashboardStats, mockTransactions } from "@/lib/mock-data";
import { formatCurrency, formatDate, getStatusColor, cn } from "@/lib/utils";

const statCards = [
    {
        label: "Saldo Total",
        value: mockDashboardStats.balance,
        icon: Wallet,
        color: "from-indigo-500 to-violet-500",
        format: "currency",
    },
    {
        label: "Total Ingresos",
        value: mockDashboardStats.totalIngresos,
        icon: TrendingUp,
        color: "from-emerald-500 to-teal-500",
        format: "currency",
    },
    {
        label: "Total Egresos",
        value: mockDashboardStats.totalEgresos,
        icon: TrendingDown,
        color: "from-rose-500 to-pink-500",
        format: "currency",
    },
    {
        label: "Pendientes",
        value: mockDashboardStats.transaccionesPendientes,
        icon: Clock,
        color: "from-amber-500 to-orange-500",
        format: "number",
    },
    {
        label: "Confirmadas",
        value: mockDashboardStats.transaccionesConfirmadas,
        icon: CheckCircle2,
        color: "from-blue-500 to-cyan-500",
        format: "number",
    },
    {
        label: "Validadas",
        value: mockDashboardStats.transaccionesValidadas,
        icon: ShieldCheck,
        color: "from-emerald-500 to-green-500",
        format: "number",
    },
];

function getTypeIcon(type: string) {
    switch (type) {
        case "ingreso":
            return <ArrowUpRight className="w-4 h-4 text-emerald-400" />;
        case "egreso":
            return <ArrowDownRight className="w-4 h-4 text-rose-400" />;
        case "transferencia":
            return <ArrowLeftRight className="w-4 h-4 text-blue-400" />;
        default:
            return null;
    }
}

import { useEffect, useState } from "react";
import { nodesApi } from "@/lib/api";

export default function DashboardPage() {
    const [nodes, setNodes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNodes = async () => {
            try {
                const data = await nodesApi.getNodes();
                setNodes(data);
            } catch (err) {
                console.error("Error fetching nodes:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNodes();
    }, []);

    return (
        <div className="space-y-10 animate-fade-in">
            {/* Header Neural */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter text-white uppercase neon-text">
                        Centro de Control Neural
                    </h1>
                    <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,255,255,1)]" />
                            <span className="text-[10px] font-mono text-primary uppercase tracking-widest">Estado: Sincronizado</span>
                        </div>
                        <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
                            Nodo Local: 0x82...F4
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-secondary px-6 text-[10px] font-mono uppercase tracking-widest">
                        <Hash className="w-3 h-3" /> Ver Bloques
                    </button>
                    <button className="btn-primary px-6 text-[10px] font-mono uppercase tracking-widest">
                        Nueva Sinapsis
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats Columns */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Neural Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {statCards.slice(0, 3).map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <div key={stat.label} className="glass-card p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Icon className="w-12 h-12" />
                                    </div>
                                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-3">{stat.label}</p>
                                    <p className="text-3xl font-bold text-white tracking-tighter">
                                        {stat.format === "currency" ? formatCurrency(stat.value) : stat.value}
                                    </p>
                                    <div className="mt-4 flex items-center gap-2">
                                        <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-2/3 shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
                                        </div>
                                        <span className="text-[10px] font-mono text-primary">+12.4%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Transaction / Synapse List */}
                    <div className="glass-card p-0 overflow-hidden border-white/5">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <h2 className="text-sm font-mono uppercase tracking-widest text-white/60">Flujo de Sinapsis Recientes</h2>
                            <div className="flex gap-2">
                                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Filtro: Todos</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/[0.02]">
                                    <tr className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                                        <th className="p-4 font-normal">Hash</th>
                                        <th className="p-4 font-normal">Descripción</th>
                                        <th className="p-4 font-normal">Impacto</th>
                                        <th className="p-4 font-normal text-right">Valor</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {mockTransactions.slice(0, 6).map((tx) => (
                                        <tr key={tx.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
                                                    <span className="text-[10px] font-mono text-primary/80 group-hover:text-primary transition-colors">
                                                        {tx.hash || '0x' + Math.random().toString(16).slice(2, 10)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <p className="text-xs text-white/70 group-hover:text-white transition-colors uppercase tracking-wide">
                                                    {tx.description}
                                                </p>
                                            </td>
                                            <td className="p-4">
                                                <span className={cn(
                                                    "text-[10px] font-mono px-2 py-0.5 rounded-full",
                                                    tx.status === 'completado' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                                                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                )}>
                                                    {tx.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <span className={cn(
                                                    "text-sm font-bold tracking-tight",
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
                </div>

                {/* Sidebar: Network Map & Bio-metrics */}
                <div className="space-y-8">
                    {/* Network Map Visualization (Simulated) */}
                    <div className="glass-card border-primary/20 bg-primary/[0.02] relative aspect-square flex flex-col items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1)_0%,transparent_70%)]" />
                        
                        {/* Central Node */}
                        <div className="relative z-10 w-24 h-24 rounded-full glass border-primary/40 flex items-center justify-center neural-node">
                            <Hexagon className="w-10 h-10 text-primary" />
                        </div>

                        {/* Orbiting Nodes (Simulated with CSS) */}
                        <div className="absolute w-full h-full animate-[spin_20s_linear_infinite]">
                            <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-secondary/40 shadow-[0_0_10px_rgba(147,51,234,0.5)]" />
                            <div className="absolute bottom-20 right-10 w-3 h-3 rounded-full bg-primary/40 shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
                            <div className="absolute top-1/2 -right-2 w-2 h-2 rounded-full bg-white/20" />
                        </div>

                        <div className="mt-8 text-center relative z-10">
                            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-1">Mapa de Red P2P</p>
                            <p className="text-sm font-bold text-white tracking-tighter">8 Nodos Entrelazados</p>
                        </div>
                    </div>

                    {/* Bio-Metrics */}
                    <div className="glass-card p-6 space-y-6">
                        <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Salud del Sistema</h3>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-mono uppercase">
                                    <span className="text-white/60">Tasa de Sincronización</span>
                                    <span className="text-primary">99.8%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[99.8%] shadow-[0_0_8px_rgba(0,255,255,0.5)]" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-mono uppercase">
                                    <span className="text-white/60">Latencia Sináptica</span>
                                    <span className="text-secondary">42ms</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-secondary w-1/4 shadow-[0_0_8px_rgba(147,51,234,0.5)]" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <div className="flex items-center justify-between">
                                <p className="text-[8px] font-mono uppercase tracking-widest text-white/20">Protocolo: Obelisco v2</p>
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                    <div className="w-1 h-1 rounded-full bg-white/20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
