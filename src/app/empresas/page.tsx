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
    Boxes,
    Package,
    CreditCard,
    History,
    ArrowLeft,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { tenantsApi, nodesApi } from "@/lib/api";

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
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [showNewModal, setShowNewModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newRFC, setNewRFC] = useState("");
    const [newSector, setNewSector] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [viewMode, setViewMode] = useState<"directory" | "detail">("directory");
    const [inventory, setInventory] = useState<any[]>([]);
    const [sales, setSales] = useState<any[]>([]);

    const handleCreateEmpresa = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await tenantsApi.createTenant({ 
                name: newName, 
                type: "empresa",
                rfc: newRFC,
                sector: newSector,
                location: newLocation
            });
            setNewName("");
            setNewRFC("");
            setNewSector("");
            setNewLocation("");
            setShowNewModal(false);
            fetchEmpresas();
        } catch (error) {
            console.error("Error creating tenant:", error);
        }
    };

    const enterDetailMode = async (empresa: Empresa) => {
        setSelectedEmpresa(empresa);
        setViewMode("detail");
        try {
            const [inv, sls] = await Promise.all([
                nodesApi.getInventory(),
                nodesApi.getSales()
            ]);
            setInventory(inv);
            setSales(sls);
        } catch (error) {
            console.error("Error fetching detail data:", error);
        }
    };

    const fetchEmpresas = async () => {
        setIsLoading(true);
        try {
            const data = await tenantsApi.getTenants();
            const transformed = data.map((t: any) => ({
                id: t.id,
                name: t.name,
                rfc: t.rfc || "N/A",
                sector: t.sector || "General",
                location: t.location || "Global",
                status: "activa",
                nodos: t._count?.nodes || 0,
                sinapsisActivas: Math.floor(Math.random() * 1000), // Todavía simulado
                ingresoMensual: Math.floor(Math.random() * 1000000), // Todavía simulado
                fechaRegistro: t.createdAt,
                reputacion: t.reputation,
                did: `did:neural:${t.id.slice(0, 8)}`,
            }));
            setEmpresas(transformed);
        } catch (error) {
            console.error("Error fetching tenants:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEmpresas();
    }, []);

    const filteredEmpresas = empresas.filter((emp) => {
        const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.rfc.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "todos" || emp.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const totalEmpresas = empresas.length;
    const empresasActivas = empresas.filter((e) => e.status === "activa").length;
    const totalNodos = empresas.reduce((sum, e) => sum + e.nodos, 0);
    const ingresoTotal = empresas.reduce((sum, e) => sum + e.ingresoMensual, 0);

    const formatNumber = (n: number) =>
        new Intl.NumberFormat("es-MX").format(n);

    const formatCurrency = (n: number) =>
        new Intl.NumberFormat("es-MX", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);

    return (
        <div className={cn("space-y-12 pb-20 transition-all duration-700", isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0")}>
            {viewMode === "directory" ? (
                <>
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
                    <button 
                        onClick={() => setShowNewModal(true)}
                        className="btn-premium-primary px-8 group"
                    >
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                        <span className="text-xs uppercase tracking-widest">Nueva Empresa</span>
                    </button>
                </div>
            </div>

            {/* --- Modal Nueva Empresa --- */}
            {showNewModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="glass-panel p-10 rounded-3xl w-full max-w-md border-primary/20 space-y-8 animate-in zoom-in-95 duration-300">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black uppercase italic tracking-tight text-white">Registrar Nodo Empresarial</h2>
                            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Inicializando protocolo de identidad Nexus</p>
                        </div>
                        
                        <form onSubmit={handleCreateEmpresa} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold">Nombre de la Entidad</label>
                                    <input 
                                        type="text" 
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        placeholder="Ej. Cyberdyne Systems"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/40 transition-all"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 font-bold">RFC</label>
                                        <input 
                                            type="text" 
                                            value={newRFC}
                                            onChange={(e) => setNewRFC(e.target.value)}
                                            placeholder="AAA-000000-XX0"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/40 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 font-bold">Sector</label>
                                        <input 
                                            type="text" 
                                            value={newSector}
                                            onChange={(e) => setNewSector(e.target.value)}
                                            placeholder="Ej. Tecnología"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/40 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 font-bold">Ubicación</label>
                                    <input 
                                        type="text" 
                                        value={newLocation}
                                        onChange={(e) => setNewLocation(e.target.value)}
                                        placeholder="Ej. Querétaro, MX"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/40 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button 
                                    type="button"
                                    onClick={() => setShowNewModal(false)}
                                    className="flex-1 btn-premium-secondary py-4 text-[10px] uppercase font-bold tracking-widest"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 btn-premium-primary py-4 text-[10px] uppercase font-bold tracking-widest"
                                >
                                    Crear Nodo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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

                                <button 
                                    onClick={() => enterDetailMode(selectedEmpresa)}
                                    className="w-full btn-premium-primary py-4 justify-center group"
                                >
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
                            {Array.from(new Set(empresas.map((e) => e.sector))).map((sector) => {
                                const count = empresas.filter((e) => e.sector === sector).length;
                                const pct = totalEmpresas > 0 ? Math.round((count / totalEmpresas) * 100) : 0;
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
                </>
            ) : (
                <div className="space-y-12 animate-in slide-in-from-right-10 duration-700">
                    {/* Detail View Header */}
                    <div className="flex items-center justify-between">
                        <button 
                            onClick={() => setViewMode("directory")}
                            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Volver al Directorio</span>
                        </button>
                        <div className="text-right">
                            <h2 className="text-3xl font-black uppercase italic text-white">{selectedEmpresa?.name}</h2>
                            <p className="text-[10px] font-mono text-primary uppercase tracking-widest">Dashboard de Nodo Empresarial</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Neural Insights Card */}
                        <div className="glass-panel p-8 rounded-3xl border-primary/40 bg-primary/5 space-y-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                                <Sparkles className="w-12 h-12 text-primary" />
                            </div>
                            <div className="flex items-center gap-3 relative z-10">
                                <Zap className="w-6 h-6 text-primary animate-pulse" />
                                <h3 className="text-lg font-black uppercase italic text-white">Neural Insights</h3>
                            </div>
                            <div className="space-y-4 relative z-10">
                                <div className="p-4 rounded-2xl bg-black/40 border border-primary/20 space-y-2">
                                    <p className="text-[10px] font-mono text-primary uppercase font-bold">Optimización Detectada</p>
                                    <p className="text-xs text-white/70 leading-relaxed italic">
                                        "El flujo de ventas sugiere mover el nodo de inventario a la periferia (LIMB) para reducir la latencia de sincronización en un 15%."
                                    </p>
                                </div>
                                <div className="p-4 rounded-2xl bg-black/40 border border-emerald-400/20 space-y-2">
                                    <p className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Salud del Nodo</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-white/70">Coherencia Global</span>
                                        <span className="text-xs font-black text-white">{selectedEmpresa?.reputacion}%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-400" style={{ width: `${selectedEmpresa?.reputacion}%` }} />
                                    </div>
                                </div>
                            </div>
                            <button className="w-full btn-premium-primary py-3 text-[10px] uppercase font-bold tracking-widest relative z-10">
                                Aplicar Recomendación
                            </button>
                        </div>

                        {/* Inventory Card */}
                        <div className="glass-panel p-8 rounded-3xl border-primary/20 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Boxes className="w-6 h-6 text-primary" />
                                    <h3 className="text-lg font-black uppercase italic text-white">Inventario</h3>
                                </div>
                                <button className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {inventory.length > 0 ? inventory.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <div>
                                            <p className="text-xs font-bold text-white uppercase">{item.data.name}</p>
                                            <p className="text-[9px] font-mono text-white/40">Stock: {item.data.stock} uds.</p>
                                        </div>
                                        <p className="text-sm font-black text-primary">{formatCurrency(item.data.price)}</p>
                                    </div>
                                )) : (
                                    <p className="text-[10px] font-mono text-white/20 uppercase text-center py-8 italic">No hay productos registrados</p>
                                )}
                            </div>
                        </div>

                        {/* Sales History */}
                        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl border-secondary/20 space-y-6">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <History className="w-6 h-6 text-secondary" />
                                    <h3 className="text-lg font-black uppercase italic text-white">Flujo de Ventas</h3>
                                </div>
                                <button className="btn-premium-secondary px-6 py-2 text-[10px] uppercase font-bold tracking-widest">
                                    Registrar Venta
                                </button>
                            </div>
                            <div className="overflow-hidden rounded-2xl border border-white/5">
                                <table className="w-full text-left">
                                    <thead className="bg-white/[0.03] text-[9px] font-mono uppercase tracking-widest text-white/40">
                                        <tr>
                                            <th className="px-6 py-4">ID Transacción</th>
                                            <th className="px-6 py-4">Cantidad</th>
                                            <th className="px-6 py-4 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {sales.length > 0 ? sales.map((sale) => (
                                            <tr key={sale.id} className="text-[11px] hover:bg-white/[0.01] transition-colors">
                                                <td className="px-6 py-4 font-mono text-white/60">{sale.id.slice(0, 8)}...</td>
                                                <td className="px-6 py-4 text-white font-bold">{sale.data.quantity}</td>
                                                <td className="px-6 py-4 text-right text-emerald-400 font-black">{formatCurrency(sale.data.total)}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={3} className="px-6 py-12 text-center text-[10px] font-mono text-white/20 uppercase italic">Esperando primera sinapsis de venta...</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
