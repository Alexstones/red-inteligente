"use client";

import { useState } from "react";
import { 
  Cpu, 
  Send, 
  Zap, 
  ShieldCheck,
  BrainCircuit,
  Database,
  Search,
  Activity,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function OraculoPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("oraculo"); // oraculo | ia | inteligente | datos

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulación de respuesta para demostración visual de alta calidad
    setTimeout(() => {
      setResponse({
        answer: "El comportamiento de la red muestra una estabilización del 98.4% en los nodos periféricos. Se recomienda una inyección de masa neural en la Cadena de Patrones para optimizar la latencia en el sector ERP.",
        confidence: 0.99,
        sources: ["Blockchain", "Neural DB", "ERP Sync"],
        timestamp: new Date().toLocaleTimeString()
      });
      setIsLoading(false);
    }, 1500);
  };

  const tabs = [
    { id: "oraculo", label: "Oráculo", icon: Cpu },
    { id: "ia", label: "IA", icon: BrainCircuit },
    { id: "inteligente", label: "Sistema Inteligente", icon: Bot },
    { id: "datos", label: "Sistema de Datos", icon: Database },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in pb-20">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-4">
          <BrainCircuit className="w-10 h-10 animate-pulse" />
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-white uppercase neon-text">
          Comportamiento de la IA
        </h1>
        <p className="text-primary/40 text-xs font-mono uppercase tracking-[0.4em]">
          Nexus Cognitive Engine
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center gap-4">
        {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                        "flex items-center gap-3 px-8 py-4 rounded-2xl text-xs font-bold transition-all duration-500 uppercase tracking-widest border",
                        activeTab === tab.id 
                            ? "bg-white/10 text-white border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]" 
                            : "bg-white/[0.02] text-white/40 border-white/5 hover:border-white/10"
                    )}
                >
                    <Icon className={cn("w-5 h-5", activeTab === tab.id ? "text-primary" : "text-white/20")} />
                    {tab.label}
                </button>
            )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Interaction Area */}
        <div className="lg:col-span-8 space-y-8">
            {activeTab === 'oraculo' && (
                <div className="glass-card p-10 border-primary/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Cpu className="w-32 h-32" />
                    </div>
                    
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-8 italic">Motor de Razonamiento</h2>
                    
                    <form onSubmit={handleAsk} className="space-y-6 relative z-10">
                        <div className="relative">
                            <textarea 
                                className="input-field min-h-[160px] pt-6 pr-14 text-lg bg-black/40"
                                placeholder="Consultar al Oráculo sobre el estado del sistema..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                            <button 
                                type="submit" 
                                disabled={isLoading || !prompt}
                                className="absolute bottom-6 right-6 p-4 rounded-2xl bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all disabled:opacity-30 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                            >
                                <Send className="w-6 h-6" />
                            </button>
                        </div>
                    </form>

                    {response && (
                        <div className="mt-12 space-y-8 animate-slide-up">
                            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 relative backdrop-blur-xl">
                                <div className="absolute -top-3 left-8 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-[10px] font-mono text-primary uppercase tracking-widest font-bold">
                                    Respuesta Neural
                                </div>
                                <p className="text-xl text-white/90 leading-relaxed font-medium italic">
                                    "{response.answer}"
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: "Confianza", val: "99.8%", icon: Zap, color: "text-amber-400" },
                                    { label: "Fuentes", val: "NeuralDB", icon: ShieldCheck, color: "text-emerald-400" },
                                    { label: "Latencia", val: "12ms", icon: Activity, color: "text-primary" },
                                ].map((stat) => (
                                    <div key={stat.label} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                                        <stat.icon className={cn("w-5 h-5", stat.color)} />
                                        <div>
                                            <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">{stat.label}</p>
                                            <p className="text-xs font-bold text-white">{stat.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab !== 'oraculo' && (
                <div className="glass-card p-20 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center animate-pulse">
                        <Activity className="w-10 h-10 text-white/20" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white uppercase tracking-widest">Sección en Sincronización</h3>
                        <p className="text-white/40 text-sm font-mono mt-2">Accediendo a la Cadena de {activeTab.toUpperCase()}...</p>
                    </div>
                </div>
            )}
        </div>

        {/* Sidebar Context */}
        <div className="lg:col-span-4 space-y-8">
            <div className="glass-card border-white/5 bg-white/[0.01]">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/80 mb-8 border-b border-white/5 pb-4">Actividad Cognitiva</h3>
                <div className="space-y-6">
                    {[
                        { label: "Procesamiento IA", val: "88%", color: "bg-primary" },
                        { label: "Análisis de Datos", val: "72%", color: "bg-secondary" },
                        { label: "Decisiones Auto", val: "94%", color: "bg-emerald-400" },
                    ].map((item) => (
                        <div key={item.label} className="space-y-3">
                            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-white/40">
                                <span>{item.label}</span>
                                <span className="text-white">{item.val}</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className={cn("h-full transition-all duration-1000", item.color)} style={{ width: item.val }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass-card bg-primary/5 border-primary/10">
                <div className="flex items-center gap-3 mb-6">
                    <Search className="w-4 h-4 text-primary" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Últimas Consultas</h3>
                </div>
                <div className="space-y-3">
                    {["Estado del ERP", "Predicción de Stock", "Balance Neural"].map((q) => (
                        <div key={q} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-mono text-white/60 hover:text-white hover:bg-white/10 cursor-pointer transition-all">
                            &gt; {q}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
