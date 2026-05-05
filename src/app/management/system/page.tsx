"use client";

import { useState } from "react";
import { 
  Settings, 
  Cpu, 
  Activity, 
  ShieldCheck,
  Server,
  Terminal,
  Zap,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SystemManagementPage() {
  const [activeTab, setActiveTab] = useState("core");

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white uppercase neon-text">
            Gestión del Sistema
          </h1>
          <p className="text-primary/60 text-[10px] font-mono uppercase tracking-[0.2em] mt-2">
            Cadena del Sistema - Backbone Nexus
          </p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setActiveTab('core')}
            className={cn(
                "px-4 py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all",
                activeTab === 'core' ? "bg-primary text-primary-foreground" : "text-white/40"
            )}
          >
            Core
          </button>
          <button 
            onClick={() => setActiveTab('nodes')}
            className={cn(
                "px-4 py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all",
                activeTab === 'nodes' ? "bg-primary text-primary-foreground" : "text-white/40"
            )}
          >
            Nodos
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={cn(
                "px-4 py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all",
                activeTab === 'security' ? "bg-primary text-primary-foreground" : "text-white/40"
            )}
          >
            Seguridad
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Status */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-card overflow-hidden">
            <div className="flex items-center gap-3 mb-10">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Server className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-mono uppercase tracking-widest text-white">Estado del Servidor Neural</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Cpu className="w-4 h-4 text-primary" />
                            <span className="text-xs font-mono text-white/60 uppercase">CPU Usage</span>
                        </div>
                        <span className="text-sm font-bold text-white">42%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[42%] shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Activity className="w-4 h-4 text-secondary" />
                            <span className="text-xs font-mono text-white/60 uppercase">Memory Allocation</span>
                        </div>
                        <span className="text-sm font-bold text-white">2.4 GB / 8 GB</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary w-[30%]" />
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                    <div className="w-24 h-24 relative mb-6">
                        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-spin-slow" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ShieldCheck className="w-10 h-10 text-primary neon-glow-primary" />
                        </div>
                    </div>
                    <p className="text-[10px] font-mono text-primary uppercase tracking-[0.3em]">System Protected</p>
                    <p className="text-2xl font-black text-white mt-2">100% SECURE</p>
                </div>
            </div>
          </div>

          <div className="glass-card">
            <div className="flex items-center gap-3 mb-8">
                <Terminal className="w-5 h-5 text-white/40" />
                <h3 className="text-sm font-mono uppercase tracking-widest text-white/60">Consola de Sistema Nexus</h3>
            </div>
            <div className="bg-black/40 rounded-xl p-6 font-mono text-[10px] space-y-2 border border-white/5">
                <p className="text-emerald-400">[OK] INICIALIZANDO CADENA DEL SISTEMA...</p>
                <p className="text-white/60">[INFO] SINCRONIZANDO NODOS PERIFÉRICOS...</p>
                <p className="text-white/60">[INFO] CARGANDO PROTOCOLO NEXUS-01...</p>
                <p className="text-primary animate-pulse">[SYNC] VERIFICANDO INTEGRIDAD DE BLOQUES...</p>
                <div className="flex gap-1 mt-4">
                    <span className="text-primary">nexus@root:~$</span>
                    <span className="w-2 h-4 bg-primary animate-pulse" />
                </div>
            </div>
          </div>
        </div>

        {/* Sidebar Status */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-card bg-primary/5 border-primary/10">
            <h3 className="text-xs font-mono text-white/60 uppercase mb-8 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" /> Red Global
            </h3>
            <div className="space-y-6">
                {[
                    { label: "Nodo Central", status: "Online", color: "text-emerald-400" },
                    { label: "Nodo Londres", status: "Online", color: "text-emerald-400" },
                    { label: "Nodo Tokyo", status: "Latency High", color: "text-amber-400" },
                    { label: "Nodo NY", status: "Online", color: "text-emerald-400" },
                ].map((node) => (
                    <div key={node.label} className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-white/40 uppercase">{node.label}</span>
                        <span className={cn("text-[9px] font-mono uppercase font-bold", node.color)}>{node.status}</span>
                    </div>
                ))}
            </div>
          </div>

          <div className="glass-card">
            <div className="flex items-center gap-3 mb-6">
                <Zap className="w-4 h-4 text-secondary" />
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/60">Acciones Rápidas</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <button className="btn-premium-secondary w-full py-4 text-[10px]">REINICIAR SERVICIOS</button>
                <button className="btn-premium-primary w-full py-4 text-[10px]">FORZAR RESYNC</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
