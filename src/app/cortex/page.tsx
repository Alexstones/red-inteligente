"use client";

import { 
  Globe, 
  Zap, 
  Layers, 
  Maximize2, 
  Minimize2, 
  Compass,
  Cpu,
  Boxes,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

export default function CortexPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [zoom, setZoom] = useState(1);
    const [activeNodes, setActiveNodes] = useState<any[]>([]);

    useEffect(() => {
        // Generar nodos aleatorios para la visualización del mapa neural
        const nodes = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            type: ['HEAD', 'BACKBONE', 'LIMB'][Math.floor(Math.random() * 3)],
            opacity: Math.random() * 0.5 + 0.2
        }));
        setActiveNodes(nodes);
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    return (
        <div className="h-[calc(100vh-12rem)] relative overflow-hidden rounded-[3rem] border border-white/5 bg-black/40 backdrop-blur-3xl animate-in fade-in duration-1000">
            {/* Neural Web Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                <div className="grid grid-cols-12 h-full w-full">
                    {Array.from({ length: 144 }).map((_, i) => (
                        <div key={i} className="border-[0.5px] border-white/5" />
                    ))}
                </div>
            </div>

            {/* Neural Map Layer */}
            <div 
                className="absolute inset-0 transition-transform duration-1000 flex items-center justify-center"
                style={{ transform: `scale(${zoom})` }}
            >
                {activeNodes.map((node) => (
                    <div 
                        key={node.id}
                        className={cn(
                            "absolute rounded-full transition-all duration-1000 animate-pulse cursor-pointer group",
                            node.type === 'HEAD' ? 'bg-primary shadow-[0_0_20px_rgba(6,182,212,0.8)]' :
                            node.type === 'BACKBONE' ? 'bg-secondary shadow-[0_0_20px_rgba(236,72,153,0.8)]' :
                            'bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.8)]'
                        )}
                        style={{ 
                            left: `${node.x}%`, 
                            top: `${node.y}%`,
                            width: `${node.size}px`,
                            height: `${node.size}px`,
                            opacity: node.opacity,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    >
                        {/* Hover Info */}
                        <div className="absolute top-4 left-4 w-48 glass-panel p-4 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 scale-75 group-hover:scale-100 origin-top-left">
                            <p className="text-[10px] font-mono text-primary uppercase tracking-widest font-black">Nodo #{node.id}</p>
                            <p className="text-[9px] text-white/60 font-mono mt-1">Clasificación: {node.type}</p>
                            <div className="h-px bg-white/10 my-2" />
                            <p className="text-[8px] text-white/40 italic">"Estabilidad del enlace garantizada por el backbone."</p>
                        </div>
                    </div>
                ))}

                {/* Synapse Lines (Mockup using SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    {activeNodes.slice(0, 15).map((node, i) => {
                        const nextNode = activeNodes[(i + 1) % activeNodes.length];
                        return (
                            <line 
                                key={i}
                                x1={`${node.x}%`} y1={`${node.y}%`}
                                x2={`${nextNode.x}%`} y2={`${nextNode.y}%`}
                                stroke="white"
                                strokeWidth="0.5"
                                strokeOpacity="0.1"
                                className="animate-pulse"
                            />
                        );
                    })}
                </svg>
            </div>

            {/* Interface Overlay - HUD */}
            <div className="absolute inset-0 pointer-events-none p-12 flex flex-col justify-between">
                {/* HUD Top */}
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
                            <Globe className="w-8 h-8 text-primary animate-spin-slow" />
                            Cortex <span className="gradient-text">Visualizer</span>
                        </h2>
                        <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">Real-time Neural Network Mapping</p>
                    </div>
                    <div className="flex gap-4 pointer-events-auto">
                        <div className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-4 border-white/10">
                            <span className="text-[10px] font-mono text-white/40 uppercase">Filtros:</span>
                            <div className="flex gap-2">
                                {['HEAD', 'BACKBONE', 'LIMB'].map(t => (
                                    <button key={t} className="text-[9px] font-mono text-white/60 hover:text-primary uppercase tracking-widest transition-colors">{t}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* HUD Bottom */}
                <div className="flex justify-between items-end">
                    <div className="space-y-6 pointer-events-auto">
                        <div className="flex flex-col gap-2">
                            <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-3 glass-panel rounded-xl hover:bg-white/10 transition-colors"><Maximize2 className="w-4 h-4 text-white" /></button>
                            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-3 glass-panel rounded-xl hover:bg-white/10 transition-colors"><Minimize2 className="w-4 h-4 text-white" /></button>
                        </div>
                        <div className="glass-panel p-6 rounded-[2rem] border-primary/20 space-y-4 w-72">
                            <div className="flex items-center gap-3">
                                <Compass className="w-5 h-5 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white italic">Coordenadas Neurales</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[9px] font-mono">
                                    <span className="text-white/40">Latitud Synapse</span>
                                    <span className="text-white">19.4326° N</span>
                                </div>
                                <div className="flex justify-between text-[9px] font-mono">
                                    <span className="text-white/40">Longitud Vector</span>
                                    <span className="text-white">99.1332° W</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6 pointer-events-auto">
                        {[
                            { label: "Sinapsis Activas", value: "4,285", icon: Share2, color: "text-primary" },
                            { label: "Nodos Conectados", value: "1,245", icon: Boxes, color: "text-secondary" },
                            { label: "Carga de Red", value: "12%", icon: Cpu, color: "text-emerald-400" },
                        ].map(stat => (
                            <div key={stat.label} className="glass-panel p-6 rounded-3xl border-white/5 space-y-2 min-w-[160px]">
                                <p className="text-[8px] font-mono uppercase tracking-widest text-white/20">{stat.label}</p>
                                <p className={cn("text-xl font-black italic tracking-tighter", stat.color)}>{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scanning Effect Overlay */}
            <div className="absolute inset-x-0 h-32 bg-gradient-to-b from-primary/10 to-transparent animate-scan pointer-events-none" />
        </div>
    );
}
