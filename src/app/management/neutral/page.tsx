"use client";

import { useState, useEffect } from "react";
import { 
  BrainCircuit, 
  Activity, 
  Layers,
  Search,
  Share2,
  Workflow
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function NeutralManagementPage() {
  const [patterns, setPatterns] = useState([
    { id: "PAT-001", name: "Simetría Alpha", type: "Fractal", strength: "98%", status: "Active" },
    { id: "PAT-002", name: "Estructura Beta", type: "Recurrent", strength: "94%", status: "Stable" },
    { id: "PAT-003", name: "Red Gamma", type: "Distributed", strength: "89%", status: "Syncing" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white uppercase neon-text">
            Gestión Neutral
          </h1>
          <p className="text-primary/60 text-[10px] font-mono uppercase tracking-[0.2em] mt-2">
            Cadena de Patrones - Sincronización de Simetrías
          </p>
        </div>
        <div className="flex gap-4">
            <div className="glass-card py-2 px-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-mono text-white/60 uppercase">Pattern Sync: 100%</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form/Actions */}
        <div className="lg:col-span-1 space-y-8">
          <div className="glass-card border-primary/20">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Workflow className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-mono uppercase tracking-widest text-white">Inyectar Patrón</h2>
            </div>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-white/40 ml-1">Identificador de Simetría</label>
                <input type="text" className="input-field" placeholder="E.G. SIGMA-9" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-white/40 ml-1">Tipo de Estructura</label>
                <select className="input-field">
                  <option>Fractal Neural</option>
                  <option>Estructura de Bloques</option>
                  <option>Proceso Peer-to-Peer</option>
                </select>
              </div>
              <button type="button" className="btn-primary w-full">
                Sincronizar Patrón
              </button>
            </form>
          </div>

          <div className="glass-card bg-primary/5 border-primary/10">
            <h3 className="text-xs font-mono text-white/60 uppercase mb-4">Métricas de Patrones</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-white/40">Total Patrones</span>
                    <span className="text-sm font-bold text-white">1,284</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-white/40">Sincronía Global</span>
                    <span className="text-sm font-bold text-primary">99.8%</span>
                </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visualizer */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-mono uppercase tracking-widest text-white/60 flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" /> Visualizador de Cadena de Patrones
              </h3>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                    <Search className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                    <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {patterns.map((p) => (
                <div key={p.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:scale-110 transition-transform">
                        <BrainCircuit className={cn("w-6 h-6", p.status === 'Syncing' ? 'text-amber-400 animate-pulse' : 'text-primary/60')} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white uppercase tracking-tight">{p.name}</p>
                        <p className="text-[10px] font-mono text-white/40">{p.id} | {p.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{p.strength}</p>
                      <p className={cn("text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border mt-1", 
                        p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        p.status === 'Stable' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      )}>
                        {p.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
