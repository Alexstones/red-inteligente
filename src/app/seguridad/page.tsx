"use client";

import { 
  ShieldAlert, 
  ShieldCheck, 
  Eye, 
  Lock, 
  AlertTriangle, 
  Radar,
  Fingerprint,
  Zap,
  Activity,
  History,
  Terminal,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function SecurityPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [threatLevel, setThreatLevel] = useState("BAJO");
    const [incidents, setIncidents] = useState<any[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setIncidents([
                { id: "SEC-001", type: "BRUTE_FORCE", source: "192.168.1.105", target: "Node-Backbone-X", status: "Mitigado", date: "Hace 2h" },
                { id: "SEC-002", type: "ANOMALY", source: "Neural-Did-8f2e", target: "Wallet-Core", status: "Bajo Investigación", date: "Hace 4h" },
                { id: "SEC-003", type: "UNAUTHORIZED_SYNC", source: "Global-Limb-33", target: "System-Head", status: "Bloqueado", date: "Ayer" },
            ]);
            setIsLoading(false);
        }, 800);
    }, []);

    return (
        <div className="space-y-12 pb-20 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-end pt-8">
                <div>
                    <h1 className="text-5xl font-black tracking-tight uppercase italic leading-none">
                        <span className="text-red-500 neon-glow-red">Sentinel</span> <span className="text-white">Forensics</span>
                    </h1>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mt-2">
                        Neural Defense & Synaptic Anomaly Detection
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-4 border-red-500/20 bg-red-500/5">
                        <span className="text-[10px] font-mono text-red-500 uppercase font-black">Nivel de Amenaza:</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-sm font-black text-white italic">{threatLevel}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Security Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sentinel Scanner */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="glass-panel rounded-[2.5rem] p-12 border-red-500/20 bg-red-500/5 relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <Radar className="w-full h-full text-red-500 animate-spin-slow" />
                        </div>
                        <div className="relative z-10 flex flex-col items-center py-12 space-y-8">
                            <div className="w-32 h-32 rounded-full border-2 border-red-500/50 flex items-center justify-center relative">
                                <ShieldAlert className="w-16 h-16 text-red-500 animate-pulse" />
                                <div className="absolute inset-0 border-2 border-red-500 rounded-full animate-ping opacity-20" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-widest">Escaneo de Red Activo</h3>
                                <p className="text-xs text-white/40 font-mono">Protegiendo 1,245 nodos neurales...</p>
                            </div>
                            <div className="grid grid-cols-3 gap-12 pt-8">
                                <div className="text-center">
                                    <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Intentos Bloqueados</p>
                                    <p className="text-2xl font-black text-white tracking-tighter">482</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Integridad Global</p>
                                    <p className="text-2xl font-black text-emerald-400 tracking-tighter">99.98%</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Alertas Críticas</p>
                                    <p className="text-2xl font-black text-amber-400 tracking-tighter">0</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Incident Log */}
                    <div className="glass-panel rounded-[2rem] p-10 border-white/5 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3">
                                <History className="w-5 h-5 text-red-500" /> Registro Forense de Amenazas
                            </h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/20" />
                                <input type="text" placeholder="Buscar incidencia..." className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-[10px] font-mono text-white focus:outline-none focus:border-red-500/40" />
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-white/5">
                            <table className="w-full text-left">
                                <thead className="bg-white/[0.03] text-[9px] font-mono uppercase tracking-widest text-white/40">
                                    <tr>
                                        <th className="px-6 py-4">ID Alerta</th>
                                        <th className="px-6 py-4">Tipo de Ataque</th>
                                        <th className="px-6 py-4">Origen</th>
                                        <th className="px-6 py-4">Estado</th>
                                        <th className="px-6 py-4 text-right">Tiempo</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {incidents.map((inc) => (
                                        <tr key={inc.id} className="text-[11px] hover:bg-red-500/5 transition-colors group">
                                            <td className="px-6 py-4 font-mono text-red-500/60 font-bold">{inc.id}</td>
                                            <td className="px-6 py-4 font-black text-white uppercase italic">{inc.type}</td>
                                            <td className="px-6 py-4 text-white/40 font-mono">{inc.source}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-[9px] font-mono uppercase border",
                                                    inc.status === "Mitigado" ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" : "bg-amber-400/10 text-amber-400 border-amber-400/20"
                                                )}>
                                                    {inc.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-white/20">{inc.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Security Controls */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="glass-panel rounded-[2rem] p-8 border-white/5 space-y-8">
                        <h4 className="text-xs font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                            <Lock className="w-4 h-4 text-primary" /> Protocolos de Encriptación
                        </h4>
                        <div className="space-y-6">
                            {[
                                { label: "AES-256 Neural Sync", status: "ACTIVO", icon: ShieldCheck, color: "text-emerald-400" },
                                { label: "Quantum Defense v1", status: "MODO-TEST", icon: Zap, color: "text-amber-400" },
                                { label: "Cortex Firewall", status: "MAX-SECURITY", icon: Lock, color: "text-primary" },
                            ].map((p) => (
                                <div key={p.label} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 group cursor-pointer hover:border-primary/40 transition-all">
                                    <div className="flex items-center gap-3">
                                        <p.icon className={cn("w-4 h-4", p.color)} />
                                        <span className="text-[10px] font-mono text-white/60 uppercase">{p.label}</span>
                                    </div>
                                    <span className={cn("text-[9px] font-black uppercase tracking-widest", p.color)}>{p.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel rounded-[2rem] p-8 border-red-500/20 bg-red-500/5 space-y-6">
                        <div className="flex items-center gap-3">
                            <Fingerprint className="w-6 h-6 text-red-500" />
                            <h4 className="text-xs font-black text-white uppercase italic tracking-widest">Identidad Neural</h4>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed italic">
                            "Sentinel ha verificado tu patrón de acceso. DID: neural-sentinel-admin-01 está autorizado para purgar nodos maliciosos."
                        </p>
                        <button className="w-full py-4 rounded-2xl bg-red-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                            MODO PURGA ACTIVA
                        </button>
                    </div>

                    {/* Security Tip */}
                    <div className="p-8 rounded-[2rem] bg-black border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <AlertTriangle className="w-12 h-12 text-amber-400" />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <Eye className="w-4 h-4 text-amber-400" />
                            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Alerta de Vigilancia</span>
                        </div>
                        <p className="text-xs text-white/70 leading-snug">
                            Se detectó un nodo inusual en la periferia de la red (LIMB). Sentinel sugiere una auditoría profunda de sus sinapsis financieras.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
