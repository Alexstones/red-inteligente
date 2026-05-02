"use client";

import { useState } from "react";
import { 
  Cpu, 
  Send, 
  Zap, 
  ShieldCheck,
  BrainCircuit,
  MessageSquare
} from "lucide-react";

export default function OraculoPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : { tenantId: 'DEMO' };

      const res = await fetch('http://localhost:8000/reason', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt,
          tenant_id: user.tenantId
        })
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-4">
          <Cpu className="w-10 h-10 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter text-white uppercase neon-text">
          Oráculo AI
        </h1>
        <p className="text-white/40 text-sm font-mono uppercase tracking-widest">
          Motor de Razonamiento Neural y Predicción
        </p>
      </div>

      <div className="glass-card p-8 border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        
        <form onSubmit={handleAsk} className="space-y-6">
          <div className="relative">
            <textarea 
              className="input-field min-h-[120px] pt-4 pr-12 text-lg"
              placeholder="¿Cuál es el estado de mi red neural hoy?"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button 
              type="submit" 
              disabled={isLoading || !prompt}
              className="absolute bottom-4 right-4 p-3 rounded-xl bg-primary text-primary-foreground hover:scale-105 transition-all disabled:opacity-30"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>

        {response && (
          <div className="mt-10 space-y-6 animate-slide-up">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 relative">
              <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-[10px] font-mono text-primary uppercase">
                Respuesta del Oráculo
              </div>
              <p className="text-lg text-white/90 leading-relaxed font-medium">
                {response.answer}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center gap-3">
                <Zap className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="text-[8px] font-mono text-white/20 uppercase">Confianza</p>
                  <p className="text-xs font-bold text-white">{(response.confidence * 100).toFixed(0)}% Accurate</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="text-[8px] font-mono text-white/20 uppercase">Fuentes</p>
                  <p className="text-xs font-bold text-white">{response.sources.join(", ")}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center gap-3">
                <BrainCircuit className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-[8px] font-mono text-white/20 uppercase">Proceso</p>
                  <p className="text-xs font-bold text-white">RAG + NeuralDB</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!response && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-40">
          <button onClick={() => setPrompt("Analiza mis ventas recientes")} className="p-4 rounded-xl border border-white/10 text-left hover:border-primary/40 transition-colors">
            <p className="text-[10px] font-mono uppercase text-primary">Sugerencia</p>
            <p className="text-sm text-white">Analiza mis ventas recientes</p>
          </button>
          <button onClick={() => setPrompt("¿Cuál es mi balance de tokens RI?")} className="p-4 rounded-xl border border-white/10 text-left hover:border-primary/40 transition-colors">
            <p className="text-[10px] font-mono uppercase text-primary">Sugerencia</p>
            <p className="text-sm text-white">¿Cuál es mi balance de tokens RI?</p>
          </button>
        </div>
      )}
    </div>
  );
}
