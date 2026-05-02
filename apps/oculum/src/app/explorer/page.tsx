"use client";

import { useState, useEffect } from "react";
import { 
  Database, 
  Hash, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  Cpu,
  Link as LinkIcon
} from "lucide-react";

export default function ExplorerPage() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);

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
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-white uppercase neon-text">
          Explorador de Bloques Neurales
        </h1>
        <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.2em] mt-2">
          Libro Mayor en Tiempo Real de la Red Inteligente
        </p>
      </div>

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div key={block.hash} className="glass-card p-0 overflow-hidden border-white/5 hover:border-primary/20 transition-all">
            <div 
              className="p-6 flex items-center justify-between cursor-pointer group"
              onClick={() => setExpandedBlock(expandedBlock === index ? null : index)}
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl glass border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-primary uppercase">Bloque #{block.index}</span>
                    <span className="text-[10px] font-mono text-white/20">|</span>
                    <span className="text-[10px] font-mono text-white/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(block.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-white font-bold tracking-tight truncate max-w-md mt-1">
                    {block.hash}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-[10px] font-mono text-white/40 uppercase">Sinapsis</p>
                  <p className="text-sm font-bold text-white">{block.synapses.length}</p>
                </div>
                <div className="text-primary/40 group-hover:text-primary transition-colors">
                  {expandedBlock === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>
            </div>

            {expandedBlock === index && (
              <div className="p-6 bg-white/[0.01] border-t border-white/5 animate-slide-down">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/20 mb-4 flex items-center gap-2">
                  <LinkIcon className="w-3 h-3" /> Contenido del Bloque
                </h4>
                <div className="space-y-3">
                  {block.synapses.map((s: any) => (
                    <div key={s.hash} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary/40 shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
                        <span className="text-[10px] font-mono text-white/60">{s.hash.substring(0, 16)}...</span>
                      </div>
                      <span className="text-[10px] font-mono text-primary uppercase bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                        {s.payload.action || 'TRANSACTION'}
                      </span>
                    </div>
                  ))}
                  {block.synapses.length === 0 && (
                    <p className="text-[10px] font-mono text-white/20 italic">Bloque de Sistema (Génesis o Vacío)</p>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 flex justify-between">
                  <div className="flex gap-4">
                    <div className="text-[10px] font-mono">
                      <span className="text-white/20 uppercase mr-2">Prev Hash:</span>
                      <span className="text-white/40">{block.prevHash.substring(0, 12)}...</span>
                    </div>
                    <div className="text-[10px] font-mono">
                      <span className="text-white/20 uppercase mr-2">Nonce:</span>
                      <span className="text-white/40">{block.nonce}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400/60 uppercase">
                    <Cpu className="w-3 h-3" /> Validado por Consenso Neural
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
