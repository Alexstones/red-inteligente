"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { 
  Fingerprint, 
  ShieldCheck, 
  UserCircle, 
  Key, 
  Share2,
  Lock,
  Globe
} from "lucide-react";

export default function IdentityPage() {
  const [user, setUser] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
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

  if (isLoading) return <div className="text-white font-mono p-10">Sincronizando Identidad...</div>;

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white uppercase neon-text">
            Identidad Neural (DID)
          </h1>
          <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.2em] mt-2">
            Protocolo de Identidad Descentralizada v1.0
          </p>
        </div>
        <button className="btn-secondary px-6 text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
          <Share2 className="w-4 h-4" /> Exportar Identidad
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ID Card */}
        <div className="lg:col-span-1">
          <div className="glass-card border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="w-24 h-24 rounded-full border-2 border-primary/40 p-1">
                <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center">
                  <Fingerprint className="w-12 h-12 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">{user?.name || 'NODE_ADMIN'}</h2>
                <p className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">{user?.role || 'ROOT_ACCESS'}</p>
              </div>
            </div>

            <div className="mt-10 space-y-4 border-t border-white/5 pt-6">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-white/20 uppercase">DID Neural</span>
                <span className="text-white/60">{wallet?.address?.substring(0, 20)}...</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-white/20 uppercase">Antigüedad</span>
                <span className="text-white/60">Ciclo 1.0.2</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-white/20 uppercase">Reputación</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials & Security */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8">
            <h3 className="text-sm font-mono uppercase tracking-widest text-white/60 mb-8 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Credenciales Verificadas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase">Nodo Público</p>
                  <p className="text-[10px] font-mono text-white/40">Verificado por Red P2P</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase">Auditado</p>
                  <p className="text-[10px] font-mono text-white/40">Cumple Criptografía Proteica</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-sm font-mono uppercase tracking-widest text-white/60 mb-8 flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-400" /> Llaves de Acceso
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserCircle className="w-5 h-5 text-white/40" />
                  <span className="text-xs font-mono text-white/60">Master Private Key</span>
                </div>
                <button className="text-[10px] font-mono text-primary hover:underline uppercase">Revelar</button>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between opacity-40">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-white/40" />
                  <span className="text-xs font-mono text-white/60">Quantum Encryption Key</span>
                </div>
                <span className="text-[10px] font-mono text-white/20 uppercase">Inactivo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
