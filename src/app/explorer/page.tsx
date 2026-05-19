"use client";

import { useState, useEffect } from "react";
import { 
  Database, 
  Hash, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  Cpu,
  Link as LinkIcon,
  Globe,
  Share2,
  Zap,
  TowerControl,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ExplorerPage() {
  const router = useRouter();
  const [blocks, setBlocks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  useEffect(() => {
    fetchBlocks();
    const interval = setInterval(fetchBlocks, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchBlocks = async () => {
    try {
      const response = await fetch('http://localhost:3002/blocks');
      const data = await response.json();
      setBlocks(data.reverse()); // Los más nuevos primero
    } catch (err) {
      console.error("Error fetching blocks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20 text-black">
      <div className="flex justify-between items-end">
        <div>
          <button 
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-black border-2 border-black/10 px-4 py-2 rounded-xl hover:bg-black hover:text-white mb-6 transition-all uppercase font-black text-[11px] tracking-widest group shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver al Sistema
          </button>
          <div className="flex items-center gap-2 mb-2">
            <TowerControl className="w-5 h-5 text-black" />
            <span className="text-[11px] font-mono font-black uppercase tracking-[0.4em] text-black italic underline decoration-2">Protocolo Obelisco</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-black uppercase italic">
            Explorador <span className="underline decoration-black/20 decoration-8">Neural</span>
          </h1>
          <p className="text-black text-[12px] font-mono uppercase tracking-[0.3em] mt-3 font-black">
            Registro Inmutable de Complejo entre Unidades
          </p>
        </div>
        <div className="flex p-2 bg-black/5 rounded-[2rem] border-2 border-black shadow-lg">
          <button 
            onClick={() => setViewMode('list')}
            className={cn(
              "px-8 py-4 rounded-[1.5rem] text-[11px] font-black font-mono uppercase tracking-widest transition-all italic",
              viewMode === 'list' ? "bg-black text-white shadow-xl scale-105" : "text-black hover:bg-black/10"
            )}
          >
            Lista
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={cn(
              "px-8 py-4 rounded-[1.5rem] text-[11px] font-black font-mono uppercase tracking-widest transition-all italic",
              viewMode === 'map' ? "bg-black text-white shadow-xl scale-105" : "text-black hover:bg-black/10"
            )}
          >
            Mapa Obelisco
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <div className="glass-panel h-[700px] rounded-[4rem] relative overflow-hidden flex items-center justify-center border-2 border-black shadow-2xl group bg-white">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
          <div className="relative w-full h-full p-20">
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                   <div className="w-40 h-40 rounded-full bg-black text-white border-4 border-black animate-pulse flex items-center justify-center relative z-20 shadow-2xl">
                      <TowerControl className="w-16 h-16" />
                   </div>
                   {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                      <div 
                        key={i}
                        className="absolute top-1/2 left-1/2 w-12 h-12 rounded-2xl bg-white border-2 border-black flex items-center justify-center transition-all duration-1000 group-hover:scale-125 shadow-xl"
                        style={{ 
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translate(220px) rotate(-${angle}deg)` 
                        }}
                      >
                         <Database className="w-6 h-6 text-black" />
                      </div>
                   ))}
                </div>
             </div>
             <div className="absolute bottom-16 left-16 space-y-4">
                <div className="flex items-center gap-4">
                   <div className="w-3 h-3 bg-black rounded-full" />
                   <p className="text-[13px] font-mono uppercase tracking-[0.2em] text-black font-black italic underline decoration-2">Eje Central: Obelisco v5</p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-3 h-3 border-2 border-black rounded-full" />
                   <p className="text-[13px] font-mono uppercase tracking-[0.2em] text-black font-black italic">Bloques Sincronizados: {blocks.length}</p>
                </div>
             </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {blocks.map((block, index) => (
            <div key={block.hash} className="glass-panel p-0 overflow-hidden border-2 border-black/10 hover:border-black transition-all group rounded-[3rem] bg-white">
              <div 
                className="p-12 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedBlock(expandedBlock === index ? null : index)}
              >
                <div className="flex items-center gap-12">
                  <div className="w-24 h-24 rounded-[2rem] bg-black text-white flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-700 shadow-xl">
                    <Database className="w-12 h-12" />
                  </div>
                  <div>
                    <div className="flex items-center gap-6">
                      <span className="text-[12px] font-black font-mono text-white bg-black px-5 py-2 rounded-full uppercase tracking-widest shadow-md">Bloque #{block.index}</span>
                      <span className="text-[12px] font-mono text-black flex items-center gap-2 uppercase tracking-[0.2em] font-black italic underline decoration-1">
                        <Clock className="w-5 h-5" /> {new Date(block.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-2xl font-black text-black italic tracking-tighter truncate max-w-xl mt-5">
                      {block.hash}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-20">
                  <div className="text-right">
                    <p className="text-[11px] font-mono text-black uppercase tracking-[0.3em] font-black underline">Masa Unidades</p>
                    <p className="text-4xl font-black text-black italic mt-1">{block.synapses.length}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all shadow-md">
                    {expandedBlock === index ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
                  </div>
                </div>
              </div>

              {expandedBlock === index && (
                <div className="p-12 bg-black/5 border-t-2 border-black animate-in slide-in-from-top-6 duration-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-10">
                       <h4 className="text-[12px] font-black font-mono uppercase tracking-[0.4em] text-black flex items-center gap-4 italic underline decoration-2">
                        <Share2 className="w-5 h-5" /> Sinapsis en Complejo
                      </h4>
                      <div className="space-y-5">
                        {block.synapses.map((s: any) => (
                          <div key={s.hash} className="p-8 rounded-[2.5rem] bg-white border-2 border-black flex items-center justify-between group/item hover:bg-black hover:text-white transition-all shadow-lg">
                            <div className="flex items-center gap-6">
                              <div className="w-3 h-3 rounded-full bg-black group-hover/item:bg-white transition-all" />
                              <div>
                                <p className="text-[12px] font-mono font-black tracking-tighter uppercase">{s.hash.substring(0, 32)}...</p>
                                <p className="text-[10px] font-mono uppercase mt-2 font-black italic tracking-widest underline decoration-1">Peso Obelisco: {s.weight || '1.00'}</p>
                              </div>
                            </div>
                            <span className="text-[11px] font-black font-mono text-white bg-black px-5 py-2 rounded-xl italic shadow-md">
                              {s.payload.type || s.payload.action || 'UNIT'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-10">
                       <h4 className="text-[12px] font-black font-mono uppercase tracking-[0.4em] text-black flex items-center gap-4 italic underline decoration-2">
                        <Database className="w-5 h-5" /> Metadatos Obelisco
                      </h4>
                      <div className="glass-panel p-10 rounded-[3.5rem] border-2 border-black space-y-8 bg-white shadow-xl">
                        <div className="flex justify-between items-center pb-6 border-b-2 border-black/5">
                           <span className="text-[11px] font-mono text-black uppercase font-black tracking-widest">Prev Hash</span>
                           <span className="text-[11px] font-mono text-black font-black underline">{block.prevHash.substring(0, 32)}...</span>
                        </div>
                        <div className="flex justify-between items-center pb-6 border-b-2 border-black/5">
                           <span className="text-[11px] font-mono text-black uppercase font-black tracking-widest">Nonce</span>
                           <span className="text-lg font-black font-mono text-black italic underline decoration-primary/40">{block.nonce}</span>
                        </div>
                        <div className="flex justify-between items-center pb-6 border-b-2 border-black/5">
                           <span className="text-[11px] font-mono text-black uppercase font-black tracking-widest">Consenso</span>
                           <span className="text-[11px] font-mono text-black font-black italic uppercase underline">Neural Proactive</span>
                        </div>
                        <div className="flex items-center gap-6 pt-6">
                           <div className="px-6 py-3 rounded-2xl bg-black text-white flex items-center gap-3 shadow-lg">
                              <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Verificado</span>
                           </div>
                           <div className="px-6 py-3 rounded-2xl bg-white border-2 border-black flex items-center gap-3 shadow-lg">
                              <Globe className="w-4 h-4 text-black" />
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black italic">Global</span>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
