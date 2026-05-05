"use client";

import {
    Building2,
    Globe,
    Users,
    TrendingUp,
    Search,
    Plus,
    MoreHorizontal,
    ArrowUpRight,
    ShieldCheck,
    Zap,
    MapPin,
    Calendar,
    CheckCircle2,
    Clock,
    XCircle,
    Filter,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Empresa {
    id: string;
    name: string;
    rfc: string;
    sector: string;
    location: string;
    status: "activa" | "pendiente" | "suspendida";
    nodos: number;
    sinapsisActivas: number;
    ingresoMensual: number;
    fechaRegistro: string;
    reputacion: number;
    did: string;
}

const mockEmpresas: Empresa[] = [
    {
        id: "emp_001",
        name: "Red Inteligente Corp",
        rfc: "RIC-260501-XX1",
        sector: "Tecnología",
        location: "Monterrey, MX",
        status: "activa",
        nodos: 12,
        sinapsisActivas: 1284,
        ingresoMensual: 2_450_320,
        fechaRegistro: "2025-08-15T00:00:00Z",
        reputacion: 98,
        did: "did:neural:0x8f2e...a6b1",
    },
    {
        id: "emp_002",
        name: "Nexus Industries",
        rfc: "NIN-251203-AB2",
        sector: "Manufactura",
        location: "CDMX, MX",
        status: "activa",
        nodos: 8,
        sinapsisActivas: 856,
        ingresoMensual: 1_850_000,
        fechaRegistro: "2025-11-02T00:00:00Z",
        reputacion: 95,
        did: "did:neural:0x3c7d...9e1f",
    },
    {
        id: "emp_003",
        name: "Quantum Solutions SA",
        rfc: "QSS-260115-CD3",
        sector: "Consultoría",
        location: "Guadalajara, MX",
        status: "activa",
        nodos: 5,
        sinapsisActivas: 432,
        ingresoMensual: 980_500,
        fechaRegistro: "2026-01-15T00:00:00Z",
        reputacion: 91,
        did: "did:neural:0xa1b2...c3d4",
    },
    {
        id: "emp_004",
        name: "BlockTrade MX",
        rfc: "BTM-260220-EF4",
        sector: "Fintech",
        location: "Querétaro, MX",
        status: "pendiente",
        nodos: 3,
        sinapsisActivas: 128,
        ingresoMensual: 450_000,
        fechaRegistro: "2026-02-20T00:00:00Z",
        reputacion: 78,
        did: "did:neural:0xd5e6...f7a8",
    },
    {
        id: "emp_005",
        name: "CryptoVerse Labs",
        rfc: "CVL-260310-GH5",
        sector: "Blockchain",
        location: "Puebla, MX",
        status: "activa",
        nodos: 6,
        sinapsisActivas: 567,
        ingresoMensual: 1_200_750,
        fechaRegistro: "2026-03-10T00:00:00Z",
        reputacion: 88,
        did: "did:neural:0xb9c0...d1e2",
    },
    {
        id: "emp_006",
        name: "DataMind Corp",
        rfc: "DMC-260401-IJ6",
        sector: "IA / ML",
        location: "Tijuana, MX",
        status: "suspendida",
        nodos: 0,
        sinapsisActivas: 0,
        ingresoMensual: 0,
        fechaRegistro: "2026-04-01T00:00:00Z",
        reputacion: 45,
        did: "did:neural:0xf3a4...b5c6",
    },
    {
        id: "emp_007",
        name: "Neural Commerce",
        rfc: "NCO-260412-KL7",
        sector: "E-Commerce",
        location: "León, MX",
        status: "activa",
        nodos: 4,
        sinapsisActivas: 312,
        ingresoMensual: 780_000,
        fechaRegistro: "2026-04-12T00:00:00Z",
        reputacion: 85,
        did: "did:neural:0xd7e8...f9a0",
    },
    {
        id: "emp_008",
        name: "Orbital Systems",
        rfc: "OSY-260425-MN8",
        sector: "Aeroespacial",
        location: "Chihuahua, MX",
        status: "pendiente",
        nodos: 2,
        sinapsisActivas: 64,
        ingresoMensual: 320_000,
        fechaRegistro: "2026-04-25T00:00:00Z",
        reputacion: 72,
        did: "did:neural:0x1b2c...3d4e",
    },
];

const statusConfig = {
    activa: { label: "Activa", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
    pendiente: { label: "Pendiente", icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
    suspendida: { label: "Suspendida", icon: XCircle, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
};

export default function EmpresasPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("todos");
    const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 500);
    }, []);

    const filteredEmpresas = mockEmpresas.filter((emp) => {
        const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.rfc.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "todos" || emp.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const totalEmpresas = mockEmpresas.length;
    const empresasActivas = mockEmpresas.filter((e) => e.status === "activa").length;
    const totalNodos = mockEmpresas.reduce((sum, e) => sum + e.nodos, 0);
    const ingresoTotal = mockEmpresas.reduce((sum, e) => sum + e.ingresoMensual, 0);

    const formatNumber = (n: number) =>
        new Intl.NumberFormat("es-MX").format(n);

    const formatCurrency = (n: number) =>
        new Intl.NumberFormat("es-MX", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);

    return (
        <div className={cn("space-y-12 pb-20 transition-all duration-700", isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0")}>
            {/* --- Hero Header --- */}
            <div className="relative pt-8">
                <div className="space-y-2">
                    <h1 className="text-5xl font-black tracking-tight uppercase italic leading-none">
                        <span className="gradient-text">Directorio</span> <span className="text-primary neon-glow-primary">Empresas</span>
                    </h1>
                    <p className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.3em]">
                        Entidades registradas en la Red Inteligente — Nodos empresariales sincronizados
                    </p>
                </div>

                {/* Right Actions */}
                <div className="absolute top-8 right-0 flex gap-4">
                    <button className="btn-premium-secondary px-6 group">
                        <Filter className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        <span className="text-xs uppercase tracking-widest">Filtrar</span>
                    </button>
                    <button className="btn-premium-primary px-8 group">
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                        <span className="text-xs uppercase tracking-widest">Nueva Empresa</span>
                    </button>
                </div>
            </div>

            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Empresas", value: totalEmpresas, icon: Building2, color: "text-primary", subtext: "Nodos Registrados" },
                    { label: "Empresas Activas", value: empresasActivas, icon: ShieldCheck, color: "text-emerald-400", subtext: `${Math.round((empresasActivas / totalEmpresas) * 100)}% operativas` },
                    { label: "Nodos Conectados", value: totalNodos, icon: Globe, color: "text-secondary", subtext: "Sincronización P2P" },
                    { label: "Ingreso Mensual Red", value: formatCurrency(ingresoTotal), icon: TrendingUp, color: "text-amber-400", subtext: "Flujo neural consolidado" },
                ].map((stat, i) => {
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
                                <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">EM-00{i + 1}</span>
                            </div>
                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-1">{stat.label}</p>
                            <p className="text-4xl font-black text-white tracking-tighter mb-4">{stat.value}</p>
                            <p className="text-[10px] font-mono text-primary/60">{stat.subtext}</p>
                        </div>
                    );
                })}
            </div>

            {/* --- Search & Filters --- */}
            <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                        type="text"
                        placeholder="Buscar empresa, sector o RFC..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl pl-12 pr-6 py-4 text-xs font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    {["todos", "activa", "pendiente", "suspendida"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={cn(
                                "px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border",
                                filterStatus === status
                                    ? "bg-primary/10 text-primary border-primary/30"
                                    : "bg-white/[0.03] text-white/40 border-white/[0.05] hover:text-white hover:bg-white/[0.06]"
                            )}
                        >
                            {status === "todos" ? "Todos" : statusConfig[status as keyof typeof statusConfig]?.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Main Content Grid --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Empresas Table */}
                <div className="lg:col-span-8 glass-panel rounded-3xl overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                        <div className="flex items-center gap-3">
                            <Building2 className="w-5 h-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-white/80 italic text-shadow-sm">
                                Registro de Empresas
                            </h2>
                        </div>
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                            {filteredEmpresas.length} de {totalEmpresas} entidades
                        </span>
                    </div>

                    <div className="divide-y divide-white/[0.03]">
                        {filteredEmpresas.map((empresa) => {
                            const st = statusConfig[empresa.status];
                            const StatusIcon = st.icon;
                            return (
                                <div
                                    key={empresa.id}
                                    onClick={() => setSelectedEmpresa(empresa)}
                                    className={cn(
                                        "px-8 py-6 flex items-center gap-6 group hover:bg-white/[0.02] transition-all cursor-pointer",
                                        selectedEmpresa?.id === empresa.id && "bg-white/[0.04] border-l-2 border-primary"
                                    )}
                                >
                                    {/* Avatar */}
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center font-black text-sm text-primary shrink-0">
                                        {empresa.name.charAt(0)}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <p className="text-sm font-bold text-white/90 group-hover:text-white transition-colors truncate uppercase italic">
                                                {empresa.name}
                                            </p>
                                            <span className={cn(
                                                "text-[8px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider border flex items-center gap-1",
                                                st.color, st.bg, st.border
                                            )}>
                                                <StatusIcon className="w-2.5 h-2.5" />
                                                {st.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-[10px] font-mono text-white/30">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {empresa.location}
                                            </span>
                                            <span>{empresa.sector}</span>
                                            <span className="text-white/15">RFC: {empresa.rfc}</span>
                                        </div>
                                    </div>

                                    {/* Metrics */}
                                    <div className="hidden xl:flex items-center gap-8 shrink-0">
                                        <div className="text-right">
                                            <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Nodos</p>
                                            <p className="text-sm font-black text-white/80">{empresa.nodos}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Sinapsis</p>
                                            <p className="text-sm font-black text-cyan-400">{formatNumber(empresa.sinapsisActivas)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Ingreso</p>
                                            <p className="text-sm font-black text-primary">{formatCurrency(empresa.ingresoMensual)}</p>
                                        </div>
                                    </div>

                                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/40 transition-colors shrink-0" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Detail Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Selected Company Detail */}
                    <div className="glass-panel rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                        {selectedEmpresa ? (
                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 flex items-center justify-center">
                                        <Building2 className="w-8 h-8 text-primary" />
                                    </div>
                                    <button className="p-2 rounded-xl hover:bg-white/5 transition-colors">
                                        <MoreHorizontal className="w-5 h-5 text-white/30" />
                                    </button>
                                </div>

                                <div>
                                    <h3 className="text-lg font-black uppercase italic tracking-tight mb-1">{selectedEmpresa.name}</h3>
                                    <p className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">{selectedEmpresa.sector}</p>
                                </div>

                                <div className="h-px bg-white/5" />

                                <div className="space-y-4">
                                    {[
                                        { label: "DID Neural", value: selectedEmpresa.did },
                                        { label: "RFC", value: selectedEmpresa.rfc },
                                        { label: "Ubicación", value: selectedEmpresa.location },
                                        { label: "Nodos Activos", value: selectedEmpresa.nodos.toString() },
                                        { label: "Reputación", value: `${selectedEmpresa.reputacion}%` },
                                    ].map((item) => (
                                        <div key={item.label} className="flex justify-between items-center">
                                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{item.label}</span>
                                            <span className="text-xs font-bold text-white/70">{item.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="h-px bg-white/5" />

                                {/* Reputation Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest text-white/40">
                                        <span>Índice de Confianza</span>
                                        <span className={cn(
                                            selectedEmpresa.reputacion >= 90 ? "text-emerald-400" :
                                            selectedEmpresa.reputacion >= 70 ? "text-amber-400" : "text-red-400"
                                        )}>
                                            {selectedEmpresa.reputacion}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className={cn(
                                                "h-full rounded-full transition-all duration-1000",
                                                selectedEmpresa.reputacion >= 90 ? "bg-emerald-400" :
                                                selectedEmpresa.reputacion >= 70 ? "bg-amber-400" : "bg-red-400"
                                            )}
                                            style={{ width: `${selectedEmpresa.reputacion}%` }}
                                        />
                                    </div>
                                </div>

                                <button className="w-full btn-premium-primary py-4 justify-center group">
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    <span className="text-xs uppercase tracking-widest">Ver Panel Completo</span>
                                </button>
                            </div>
                        ) : (
                            <div className="relative z-10 flex flex-col items-center justify-center py-12 text-center space-y-4">
                                <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center">
                                    <Building2 className="w-8 h-8 text-white/10" />
                                </div>
                                <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                                    Selecciona una empresa<br />para ver detalles
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Network Distribution */}
                    <div className="glass-panel rounded-3xl p-8 space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/60 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-secondary" />
                            Distribución por Sector
                        </h3>
                        <div className="space-y-4">
                            {Array.from(new Set(mockEmpresas.map((e) => e.sector))).map((sector) => {
                                const count = mockEmpresas.filter((e) => e.sector === sector).length;
                                const pct = Math.round((count / totalEmpresas) * 100);
                                return (
                                    <div key={sector} className="space-y-1.5">
                                        <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest text-white/40">
                                            <span>{sector}</span>
                                            <span className="text-white/60">{count} ({pct}%)</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all duration-1000 rounded-full"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="glass-panel rounded-3xl p-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/60 mb-4 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-400" />
                            Acciones Rápidas
                        </h3>
                        <div className="space-y-2">
                            {[
                                { label: "Auditoría Global", icon: ShieldCheck },
                                { label: "Sincronizar Nodos", icon: Globe },
                                { label: "Reporte Financiero", icon: TrendingUp },
                            ].map((action) => {
                                const Icon = action.icon;
                                return (
                                    <button
                                        key={action.label}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.04] text-white/40 hover:text-white transition-all group"
                                    >
                                        <Icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                                        <span className="text-[10px] font-mono uppercase tracking-widest">{action.label}</span>
                                        <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
