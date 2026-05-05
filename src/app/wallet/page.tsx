"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Copy, 
  ShieldCheck,
  Zap
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function WalletPage() {
  const [wallet, setWallet] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transferData, setTransferData] = useState({ address: '', amount: 0 });

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const data = await apiFetch('/governance/balance');
      setWallet(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar transferencia en lib/api.ts primero
    alert("Iniciando transferencia criptográfica...");
  };

  if (isLoading) return <div className="text-white font-mono p-10">Sincronizando Billetera...</div>;

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white uppercase neon-text">
            Billetera Digital Neural
          </h1>
          <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.2em] mt-2">
            Identidad Descentralizada: {wallet?.address || 'NO_DID_DETECTED'}
          </p>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary px-6 text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
            <ArrowDownLeft className="w-4 h-4" /> Recibir
          </button>
          <button className="btn-primary px-6 text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4" /> Enviar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <div className="lg:col-span-1 glass-card border-primary/20 bg-primary/[0.02] p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <WalletIcon className="w-32 h-32" />
          </div>
          
          <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
            <Zap className="w-3 h-3" /> Balance Disponible
          </p>
          <h2 className="text-5xl font-bold text-white tracking-tighter mb-2">
            {wallet?.balance.toFixed(2)} <span className="text-xl text-primary/60">RI</span>
          </h2>
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
            Tokens de Red Inteligente (Mining Rewards)
          </p>
          
          <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-white/40 uppercase">Estado de Red</span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Protegido
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-white/40 uppercase">Hash de Billetera</span>
              <button className="text-[10px] font-mono text-primary/60 hover:text-primary transition-colors flex items-center gap-1">
                {wallet?.id.substring(0, 12)}... <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Transfer Form */}
        <div className="lg:col-span-2 glass-card p-8">
          <h3 className="text-sm font-mono uppercase tracking-widest text-white/60 mb-8">Nueva Transferencia</h3>
          
          <form onSubmit={handleTransfer} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-white/40 ml-1">Dirección de Destino (DID)</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="did:neural:..."
                value={transferData.address}
                onChange={e => setTransferData({...transferData, address: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-white/40 ml-1">Monto a Enviar (RI)</label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="0.00"
                  value={transferData.amount}
                  onChange={e => setTransferData({...transferData, amount: parseFloat(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-white/40 ml-1">Prioridad de Sinapsis</label>
                <select className="input-field">
                  <option>ESTÁNDAR (1 RI FEE)</option>
                  <option>ALTA (5 RI FEE)</option>
                  <option>INSTANTÁNEA (10 RI FEE)</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full py-4 mt-4">
              Firmar y Ejecutar Transferencia
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
