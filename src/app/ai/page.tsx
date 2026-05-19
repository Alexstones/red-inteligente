"use client";

import { 
  BrainCircuit, 
  Sparkles, 
  Activity, 
  TrendingUp, 
  ShieldAlert,
  Zap,
  Fingerprint,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { oracleApi } from "@/lib/api";

export default function AIDashboardPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [oracleResponse, setOracleResponse] = useState<string>("");
    const [isReasoning, setIsReasoning] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 800);
    }, []);

    const handleOracleReason = async () => {
        setIsReasoning(true);
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const res = await oracleApi.reason("Analiza el estado actual de la red y sugiere optimizaciones.", user.tenantId || "global");
            setOracleResponse(res.answer);
        } catch (error) {
            console.error("Oracle error:", error);
            setOracleResponse("Error de conexión con el Oráculo Neural.");
        } finally {
            setIsReasoning(false);
        }
    };

    const insights = [
        { title: "Densidad Sináptica", value: "84%", trend: "+5%", icon: Zap, color: "text-primary" },
        { title: "Coherencia de Red", value: "99.2%", trend: "Estable", icon: ShieldAlert, color: "text-emerald-400" },
        { title: "Flujo de Datos", value: "1.2 GB/s", trend: "+12%", icon: Activity, color: "text-secondary" },
        { title: "Predicción de Carga", value: "Media", trend: "Baja", icon: TrendingUp, color: "text-amber-400" },
    ];

    return (
        <div className={cn("space-y-12 pb-20 transition-all duration-700", isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0")}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white flex items-center gap-4">
                        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                        AI <span className="gradient-text">Oráculo</span>
                    </h1>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mt-2">
                        Categorización de Comportamiento Neural y Predicciones Globales
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="btn-premium-secondary px-6 text-[10px] uppercase tracking-widest font-bold">Historial de Análisis</button>
                    <button className="btn-premium-primary px-8 text-[10px] uppercase tracking-widest font-bold">Ejecutar Análisis Global</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {insights.map((insight) => {
                    const Icon = insight.icon;
                    return (
                        <div key={insight.title} className="glass-panel p-6 rounded-3xl border-white/5 group hover:-translate-y-1 transition-all duration-500">
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn("p-2 rounded-xl bg-white/5 border border-white/10", insight.color)}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{insight.trend}</span>
                            </div>
                            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">{insight.title}</p>
                            <p className="text-2xl font-black text-white">{insight.value}</p>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Behavioral Mapping */}
                <div className="lg:col-span-8 glass-panel rounded-3xl p-10 border-primary/20 relative overflow-hidden min-h-[500px]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,255,0.05)_0%,transparent_70%)]" />
                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white uppercase italic tracking-tight">Mapeo de Comportamiento</h2>
                            <div className="flex items-center gap-4 text-[9px] font-mono uppercase tracking-widest text-white/40">
                                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary" /> Transaccional</span>
                                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-secondary" /> Operativo</span>
                                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-400" /> Riesgo</span>
                            </div>
                        </div>

                        {/* Visual Mapping Placeholder */}
                        <div className="flex items-center justify-center h-[300px] border border-white/5 rounded-3xl bg-black/20">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full border-4 border-primary/20 animate-spin-slow flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full border border-secondary/40 flex items-center justify-center animate-reverse-spin">
                                        <Fingerprint className="w-8 h-8 text-white/40" />
                                    </div>
                                </div>
                                <div className="absolute -top-10 -left-10 p-2 glass-panel rounded-lg text-[8px] font-mono uppercase text-primary border-primary/40">Retail Flow</div>
                                <div className="absolute -bottom-10 -right-10 p-2 glass-panel rounded-lg text-[8px] font-mono uppercase text-secondary border-secondary/40">Stable Nodes</div>
                                <div className="absolute top-0 -right-24 p-2 glass-panel rounded-lg text-[8px] font-mono uppercase text-amber-400 border-amber-400/40">Risk Detected (Low)</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categorization Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="glass-panel rounded-3xl p-8 space-y-6 border-white/5">
                        <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3">
                            <Layers className="w-5 h-5 text-primary" /> Categorías Detectadas
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: "High Value Tx", pct: 15, color: "bg-primary" },
                                { name: "Regular Commerce", pct: 65, color: "bg-emerald-400" },
                                { name: "System Maintenance", pct: 12, color: "bg-secondary" },
                                { name: "Anomalies", pct: 8, color: "bg-red-400" },
                            ].map((cat) => (
                                <div key={cat.name} className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest text-white/40">
                                        <span>{cat.name}</span>
                                        <span className="text-white/80">{cat.pct}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className={cn("h-full rounded-full transition-all duration-1000", cat.color)} style={{ width: `${cat.pct}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel rounded-3xl p-8 space-y-4 border-primary/20 bg-primary/5">
                        <div className="flex items-center gap-3 text-primary">
                            <BrainCircuit className="w-5 h-5 animate-pulse" />
                            <p className="text-[10px] font-mono font-black uppercase tracking-widest">Sugerencia del Oráculo</p>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed italic">
                            {oracleResponse || '"Iniciando conexión neural... El Oráculo está analizando los bloques actuales."'}
                        </p>
                        <button 
                            onClick={handleOracleReason}
                            disabled={isReasoning}
                            className="w-full btn-premium-primary py-3 text-[10px] uppercase font-bold tracking-widest mt-2 disabled:opacity-50"
                        >
                            {isReasoning ? "Razonando..." : "Consultar Oráculo"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
