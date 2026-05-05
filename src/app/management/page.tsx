"use client";

import Link from "next/link";
import { 
  BrainCircuit, 
  Boxes, 
  Zap, 
  Settings,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ManagementOverviewPage() {
  const chains = [
    { 
        title: "Gestión Neutral", 
        subtitle: "Cadena de Patrones", 
        href: "/management/neutral", 
        icon: BrainCircuit, 
        color: "text-primary",
        desc: "Sincronización de simetrías y fractales neurales."
    },
    { 
        title: "Gestión de Bloques", 
        subtitle: "Cadena de Bloques", 
        href: "/management/blocks", 
        icon: Boxes, 
        color: "text-secondary",
        desc: "Validación de integridad y libro mayor descentralizado."
    },
    { 
        title: "Gestión de Transacciones", 
        subtitle: "Cadena de Procesos", 
        href: "/management/transactions", 
        icon: Zap, 
        color: "text-amber-400",
        desc: "Registro de flujos, contratos y activos digitales."
    },
    { 
        title: "Gestión del Sistema", 
        subtitle: "Cadena del Sistema", 
        href: "/management/system", 
        icon: Settings, 
        color: "text-cyan-400",
        desc: "Control del backbone Nexus y nodos globales."
    },
  ];

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase neon-text">
            Centro de Gestión Nexus
        </h1>
        <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.3em]">
            Arquitectura de Procesos entre Simetrías
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {chains.map((chain) => {
            const Icon = chain.icon;
            return (
                <Link 
                    key={chain.href} 
                    href={chain.href}
                    className="glass-card group hover:border-white/20 transition-all duration-500 overflow-hidden relative"
                >
                    <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Icon className="w-48 h-48" />
                    </div>
                    
                    <div className="flex items-start gap-6 relative z-10">
                        <div className={cn("p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500", chain.color)}>
                            <Icon className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">{chain.subtitle}</p>
                            <h3 className="text-xl font-bold text-white uppercase italic">{chain.title}</h3>
                            <p className="text-xs text-white/60 leading-relaxed max-w-[240px]">{chain.desc}</p>
                            <div className="pt-4 flex items-center gap-2 text-[10px] font-mono text-primary uppercase tracking-widest font-bold group-hover:gap-4 transition-all">
                                Acceder al Index <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </div>
                </Link>
            )
        })}
      </div>

      <div className="max-w-5xl mx-auto p-8 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-between">
        <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <div>
                <p className="text-xs font-bold text-white uppercase">Sincronización Multi-Cadena Activa</p>
                <p className="text-[10px] font-mono text-white/40 uppercase">Latencia Global: 14ms | Coherencia: 99.9%</p>
            </div>
        </div>
        <button className="btn-premium-primary py-3 px-8 text-[10px]">REPORTE GLOBAL</button>
      </div>
    </div>
  );
}
