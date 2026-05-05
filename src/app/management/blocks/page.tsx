"use client";

import { useState, useEffect } from "react";
import { 
  Boxes, 
  Database, 
  ShieldCheck,
  Cpu,
  RefreshCw,
  Lock,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlocksManagementPage() {
  const [blocks, setBlocks] = useState([
    { height: 124082, hash: "0x82f...a4e1", timestamp: "Hace 2m", status: "Validated", miner: "Node-07" },
    { height: 124081, hash: "0x1a2...b9c0", timestamp: "Hace 5m", status: "Validated", miner: "Node-02" },
    { height: 124080, hash: "0x4d5...e6f7", timestamp: "Hace 8m", status: "Validated", miner: "Node-11" },
  ]);

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white uppercase neon-text">
            Gestión de Bloques
          </h1>
          <p className="text-secondary/60 text-[10px] font-mono uppercase tracking-[0.2em] mt-2">
            Cadena de Bloques - Integridad de la Red Neural
          </p>
        </div>
        <button className="btn-premium-primary group">
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
            <span className="text-xs uppercase tracking-widest">Sincronizar Ledger</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats Summary */}
        {[
            { label: "Altura del Bloque", val: "124,082", icon: Boxes, color: "text-primary" },
            { label: "Tiempo Promedio", val: "12.4s", icon: Cpu, color: "text-secondary" },
            { label: "Seguridad Red", val: "99.9%", icon: ShieldCheck, color: "text-emerald-400" },
            { label: "Hash Rate", val: "4.2 TH/s", icon: Activity, color: "text-amber-400" },
        ].map((stat, i) => {
            const Icon = stat.icon;
            return (
                <div key={i} className="glass-card p-6 border-white/5 hover:border-white/10 transition-all">
                    <div className={cn("p-2 rounded-lg bg-white/5 w-fit mb-4", stat.color)}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-[10px] font-mono text-white/40 uppercase mb-1">{stat.label}</p>
                    <p className="text-xl font-black text-white">{stat.val}</p>
                </div>
            )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-mono uppercase tracking-widest text-white/60 flex items-center gap-2">
                    <Database className="w-4 h-4 text-secondary" /> Registro de Bloques Recientes
                </h3>
            </div>
            
            <div className="space-y-4">
                {blocks.map((block) => (
                    <div key={block.height} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                        <div className="flex items-center gap-6">
                            <div className="text-center w-20">
                                <p className="text-[10px] font-mono text-white/20 uppercase">Altura</p>
                                <p className="text-sm font-bold text-white">{block.height}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-mono text-white/40 uppercase mb-1">Block Hash</p>
                                <p className="text-xs font-mono text-secondary group-hover:text-white transition-colors">{block.hash}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <p className="text-[10px] font-mono text-white/40 uppercase">Miner</p>
                                <p className="text-xs text-white/80">{block.miner}</p>
                            </div>
                            <div className="w-24 text-right">
                                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-full uppercase">
                                    {block.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="glass-card border-secondary/20 bg-secondary/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-mono uppercase tracking-widest text-white">Consenso</h2>
            </div>
            <p className="text-[10px] font-mono text-white/40 mb-6 uppercase leading-relaxed">
                El sistema de bloques utiliza un algoritmo de consenso neural para validar transacciones entre simetrías.
            </p>
            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono uppercase">
                        <span className="text-white/40">Validación de Nodo</span>
                        <span className="text-emerald-400">Activo</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 w-[92%]" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono uppercase">
                        <span className="text-white/40">Sincronía del Ledger</span>
                        <span className="text-secondary">100%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary w-full" />
                    </div>
                </div>
            </div>
            <button className="btn-secondary w-full mt-8 bg-secondary/20 border-secondary/40">
                Ver Detalles de Consenso
            </button>
        </div>
      </div>
    </div>
  );
}
