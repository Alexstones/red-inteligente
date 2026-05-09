"use client";

import { 
  Cpu, 
  Zap, 
  Activity, 
  ShieldAlert, 
  Thermometer, 
  Settings, 
  Play, 
  Square,
  BarChart3,
  Terminal as TerminalIcon,
  ChevronRight,
  HardDrive
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

export default function MiningPage() {
    const [isMining, setIsMining] = useState(false);
    const [hashrate, setHashrate] = useState(0);
    const [temp, setTemp] = useState(42);
    const [shares, setShares] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const logEndRef = useRef<HTMLDivElement>(null);

    const addLog = (msg: string) => {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [...prev.slice(-15), `[${time}] ${msg}`]);
    };

    useEffect(() => {
        let interval: any;
        if (isMining) {
            addLog("Iniciando motor de minería Nexus v4.0...");
            addLog("Conectando con Backbone Neural (Stratum+TCP)...");
            addLog("Hardware detectado: NVIDIA RTX / Tensor Core L40S");
            
            interval = setInterval(() => {
                setHashrate(80 + Math.random() * 15);
                setTemp(55 + Math.random() * 10);
                if (Math.random() > 0.8) {
                    setShares(s => s + 1);
                    addLog("¡Sinapsis Validada! Share aceptado por el Oráculo.");
                }
            }, 2000);
        } else {
            setHashrate(0);
            setTemp(40);
            addLog("Minería detenida. Nodo en modo standby.");
        }
        return () => clearInterval(interval);
    }, [isMining]);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    return (
        <div className="space-y-8 pb-20 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white flex items-center gap-4">
                        <Cpu className={cn("w-10 h-10 transition-all duration-500", isMining ? "text-primary animate-pulse" : "text-white/20")} />
                        Nexus <span className="gradient-text">PC Miner</span>
                    </h1>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mt-2">
                        Hardware Attestation & Neural Compute Mining
                    </p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={() => setIsMining(!isMining)}
                        className={cn(
                            "px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3",
                            isMining 
                                ? "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white" 
                                : "btn-premium-primary"
                        )}
                    >
                        {isMining ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isMining ? "Detener Minería" : "Iniciar Minería"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Stats Grid */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: "Hashrate Actual", value: `${hashrate.toFixed(2)} GH/s`, icon: Activity, color: "text-primary", sub: "Potencia Neural" },
                            { label: "Temperatura GPU", value: `${temp.toFixed(1)}°C`, icon: Thermometer, color: temp > 65 ? "text-red-400" : "text-emerald-400", sub: "Estado Térmico" },
                            { label: "Shares Aceptados", value: shares, icon: ShieldAlert, color: "text-secondary", sub: "Validaciones DAO" },
                        ].map((stat) => (
                            <div key={stat.label} className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
                                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                    <stat.icon className="w-32 h-32" />
                                </div>
                                <stat.icon className={cn("w-6 h-6 mb-4", stat.color)} />
                                <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">{stat.label}</p>
                                <p className="text-3xl font-black text-white tracking-tighter mt-1">{stat.value}</p>
                                <p className="text-[9px] font-mono text-white/20 mt-2">{stat.sub}</p>
                            </div>
                        ))}
                    </div>

                    {/* Chart Area (Visual mockup) */}
                    <div className="glass-panel rounded-[2rem] p-10 border-white/5 h-80 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3">
                                <BarChart3 className="w-5 h-5 text-primary" /> Rendimiento en Tiempo Real
                            </h3>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-mono text-white/40 uppercase">Live Feed</span>
                            </div>
                        </div>
                        
                        <div className="absolute inset-x-0 bottom-0 h-48 flex items-end px-10 gap-2">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div 
                                    key={i} 
                                    className="flex-1 bg-gradient-to-t from-primary/20 to-primary/40 rounded-t-sm transition-all duration-500"
                                    style={{ 
                                        height: isMining ? `${30 + Math.random() * 70}%` : '5%',
                                        opacity: 0.1 + (i / 40)
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Console / Logs */}
                    <div className="glass-panel rounded-[2rem] bg-black/60 border-white/5 p-8 font-mono text-[11px] space-y-4">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div className="flex items-center gap-2">
                                <TerminalIcon className="w-4 h-4 text-emerald-400" />
                                <span className="text-emerald-400 font-bold uppercase tracking-widest">Nexus-Miner-Console v4.0.2</span>
                            </div>
                            <span className="text-white/20">UTF-8 // RI-CORE</span>
                        </div>
                        <div className="h-48 overflow-y-auto space-y-2 scrollbar-hide">
                            {logs.map((log, i) => (
                                <div key={i} className="flex gap-4">
                                    <span className="text-white/20">{i+1}</span>
                                    <span className={cn(
                                        log.includes("¡Sinapsis Validada!") ? "text-emerald-400 font-bold" : "text-white/60"
                                    )}>{log}</span>
                                </div>
                            ))}
                            <div ref={logEndRef} />
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="glass-panel rounded-[2rem] p-8 border-primary/20 bg-primary/5 space-y-6">
                        <h4 className="text-xs font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary" /> Energía Consumida
                        </h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-baseline">
                                <span className="text-3xl font-black text-white italic">0.45</span>
                                <span className="text-xs font-bold text-white/40 uppercase">kWh/h</span>
                            </div>
                            <p className="text-[10px] text-white/30 italic">
                                "Eficiencia energética optimizada por el Oráculo. Tu nodo está en el top 5% de bajo consumo."
                            </p>
                        </div>
                    </div>

                    <div className="glass-panel rounded-[2rem] p-8 border-white/5 space-y-6">
                        <h4 className="text-xs font-black text-white uppercase italic tracking-widest">Configuración de Hardware</h4>
                        <div className="space-y-4">
                            {[
                                { label: "Nodos de Cómputo", value: "128 Cores", icon: Cpu },
                                { label: "Espacio en Disco", value: "2.4 TB", icon: HardDrive },
                                { label: "Ancho de Banda", value: "1.2 Gbps", icon: Zap },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 group cursor-pointer hover:bg-white/[0.08] transition-all">
                                    <div className="flex items-center gap-3">
                                        <item.icon className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
                                        <span className="text-[10px] font-mono text-white/60 uppercase">{item.label}</span>
                                    </div>
                                    <span className="text-[10px] font-black text-white">{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 text-[9px] font-mono uppercase tracking-[0.3em] text-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                            Ajustes Avanzados <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>

                    {/* Mining Pool Card */}
                    <div className="p-10 rounded-[2rem] bg-gradient-to-br from-secondary to-primary relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 p-12 opacity-20 group-hover:rotate-12 transition-transform duration-1000">
                            <Activity className="w-40 h-40 text-white" />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <h4 className="text-lg font-black text-white uppercase italic leading-tight">Pool Global<br/>Nexus-Backbone</h4>
                            <p className="text-xs font-bold text-white/80">
                                Participas en el 12.5% de la validación global de la red.
                            </p>
                            <div className="pt-4">
                                <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-[65%]" />
                                </div>
                                <div className="flex justify-between mt-2 text-[8px] font-mono text-white/60 uppercase tracking-widest">
                                    <span>Tu Aporte</span>
                                    <span>65.2% del Quorum</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
