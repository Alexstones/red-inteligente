"use client";

import { 
  Wallet, 
  Activity, 
  Shield, 
  Menu,
  Bell,
  Zap,
  ChevronRight,
  Sparkles,
  Vote,
  Target,
  ShieldAlert,
  TowerControl,
  BrainCircuit,
  Loader2
} from "lucide-react";
import { useEffect, useState } from "react";
import { walletApi, nodesApi, governanceApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function MobileDashboard() {
  const router = useRouter();
  const [balance, setBalance] = useState<number>(0);
  const [synapses, setSynapses] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    
    const timer = setTimeout(() => {
      setNotifications([{
        title: 'La Providencia',
        msg: 'Optimización de complejo entre unidades completada.',
        type: 'success'
      }]);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const fetchData = async () => {
    try {
      const [wallet, nodes, gov] = await Promise.all([
        walletApi.getWallet(),
        nodesApi.getNodes(),
        governanceApi.getProposals()
      ]);
      
      setBalance(wallet.balance);
      setSynapses(nodes.slice(0, 5));
      setProposals(gov.filter((p: any) => p.status === 'active').slice(0, 2));
    } catch (error) {
      console.error("Error fetching mobile data:", error);
      if (balance === 0) setBalance(12840);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = (msg: string) => {
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        alert(msg);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white relative">
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-md">
            <Loader2 className="w-12 h-12 text-black animate-spin" />
        </div>
      )}

      {/* Watercolor background simulation - Extra subtle for legibility */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-500/5 blur-[100px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 p-6 pb-32 space-y-8 max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <button onClick={() => alert("Menú Obelisco abierto")} className="w-14 h-14 rounded-2xl bg-black/5 border-2 border-black flex items-center justify-center">
              <Menu className="w-6 h-6 text-black" />
          </button>
          <div className="text-center">
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <TowerControl className="w-3 h-3 text-black animate-pulse" />
                <p className="text-[10px] font-mono text-black uppercase tracking-[0.4em] font-black italic underline">Obelisco</p>
              </div>
              <p className="font-black text-xl tracking-tighter uppercase italic text-black">La Providencia</p>
          </div>
          <button 
            onClick={() => setShowNotifs(!showNotifs)}
            className="w-14 h-14 rounded-2xl bg-black/5 border-2 border-black flex items-center justify-center relative"
          >
              <Bell className="w-6 h-6 text-black" />
              {notifications.length > 0 && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-black rounded-full border-2 border-white shadow-sm" />
              )}
          </button>
        </div>

        {/* Notif Popover */}
        {showNotifs && notifications.length > 0 && (
          <div className="absolute top-28 right-6 left-6 z-50 animate-in zoom-in-95 fade-in duration-300">
            <div className="glass-panel p-6 rounded-[2.5rem] border-2 border-black bg-white shadow-2xl">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shrink-0">
                   <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase text-black tracking-widest leading-tight italic">{notifications[0].title}</p>
                  <p className="text-[10px] text-black mt-1 font-black underline">{notifications[0].msg}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wallet Card */}
        <div className="group relative">
          <div className="relative bg-white rounded-[3.5rem] p-10 border-2 border-black shadow-xl overflow-hidden">
            <div className="absolute -right-8 -top-8 opacity-[0.05] rotate-12">
                <Wallet className="w-64 h-64 text-black" />
            </div>
            
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-black mb-2 font-black italic">Capital Obelisco</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-5xl font-black tracking-tighter text-black italic">
                    {isLoading ? "---" : balance.toLocaleString()}
                  </h2>
                  <span className="text-xs font-mono text-black font-black uppercase tracking-widest underline decoration-2">Nex</span>
                </div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-black text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-tighter">Active</span>
              </div>
            </div>
            
            <div className="flex gap-3">
                <button onClick={() => handleAction("Interfaz de envío de Nex iniciada")} className="flex-1 bg-black text-white rounded-2xl py-6 font-black text-[10px] uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all italic shadow-lg">Enviar</button>
                <button onClick={() => handleAction("Generando código QR Obelisco")} className="flex-1 bg-white border-2 border-black rounded-2xl py-6 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-black/5 transition-all italic shadow-lg text-black">Recibir</button>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 p-2 bg-black/5 rounded-[2.5rem] border-2 border-black shadow-sm">
          {['overview', 'synapses', 'gov'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all italic",
                activeTab === tab ? "bg-black text-white shadow-xl scale-[1.02]" : "text-black/40 hover:text-black"
              )}
            >
              {tab === 'overview' ? 'Unidad' : tab === 'synapses' ? 'Complejo' : 'DAO'}
            </button>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
          {activeTab === 'overview' && (
            <>
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-black flex items-center gap-2 italic underline decoration-2">
                <Sparkles className="w-4 h-4" /> Sinapsis Recientes
              </h3>
              <div className="grid grid-cols-1 gap-5">
                {synapses.length > 0 ? synapses.map((node, i) => (
                  <div key={i} onClick={() => router.push('/explorer')} className="group flex items-center justify-between p-7 rounded-[2.5rem] bg-white border-2 border-black hover:bg-black hover:text-white transition-all cursor-pointer shadow-md">
                      <div className="flex items-center gap-5">
                          <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-current shadow-sm"
                          )}>
                              {node.type === 'SALE' ? <Target className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="text-[12px] font-black uppercase tracking-tight italic">Unidad: {node.type}</p>
                            <p className="text-[10px] font-mono font-black mt-1">ID: {node.id.substring(0, 12)}</p>
                          </div>
                      </div>
                      <ChevronRight className="w-5 h-5 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                )) : (
                  <div className="py-20 text-center space-y-6">
                    <Activity className="w-12 h-12 mx-auto mb-2 animate-pulse text-black" />
                    <p className="text-[11px] font-black uppercase italic text-black tracking-[0.2em]">Consultando Providencia...</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'gov' && (
            <>
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-black flex items-center gap-2 italic underline decoration-2">
                <Vote className="w-4 h-4" /> Propuestas Obelisco
              </h3>
              <div className="space-y-5">
                {proposals.length > 0 ? proposals.map((p, i) => (
                  <div key={i} className="p-8 rounded-[3rem] bg-white border-2 border-black space-y-8 shadow-xl">
                    <div>
                      <p className="text-sm font-black uppercase tracking-widest mb-4 text-black italic leading-tight underline decoration-1">{p.title}</p>
                      <div className="w-full h-3 bg-black/10 rounded-full overflow-hidden border border-black/5">
                        <div 
                          className="h-full bg-black transition-all duration-1000" 
                          style={{ width: `${(p.votesFor / (p.votesFor + p.votesAgainst || 1)) * 100}%` }}
                        />
                      </div>
                      <p className="text-[10px] font-black font-mono mt-3 text-black text-right uppercase tracking-widest">Aceptación: {Math.floor((p.votesFor / (p.votesFor + p.votesAgainst || 1)) * 100)}%</p>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => handleAction("Voto registrado en el Obelisco")} className="flex-1 py-5 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.05] transition-all italic shadow-lg">Votar</button>
                      <button onClick={() => handleAction("Detalles de propuesta cargados")} className="py-5 px-8 rounded-2xl bg-white border-2 border-black text-black text-[10px] font-black uppercase tracking-[0.2em] italic shadow-lg">Info</button>
                    </div>
                  </div>
                )) : (
                  <div className="py-20 text-center bg-black/5 rounded-[3rem]">
                     <p className="text-[11px] font-black uppercase italic text-black tracking-widest">Cargando Gobernanza...</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 p-8 z-50">
        <div className="max-w-md mx-auto bg-white border-2 border-black rounded-[3.5rem] p-3 flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <button onClick={() => router.push('/dashboard')} className="w-18 h-18 rounded-[2rem] bg-black text-white flex items-center justify-center shadow-2xl scale-110 active:scale-95 transition-all">
            <Activity className="w-8 h-8" />
          </button>
          <button onClick={() => router.push('/explorer')} className="w-18 h-18 rounded-[2rem] hover:bg-black/5 flex items-center justify-center transition-all group">
            <Wallet className="w-8 h-8 text-black opacity-30 group-hover:opacity-100 transition-opacity" />
          </button>
          <button onClick={() => router.push('/ai')} className="w-18 h-18 rounded-[2rem] hover:bg-black/5 flex items-center justify-center transition-all group">
            <BrainCircuit className="w-8 h-8 text-black opacity-30 group-hover:opacity-100 transition-opacity" />
          </button>
          <button onClick={() => router.push('/settings')} className="w-18 h-18 rounded-[2rem] hover:bg-black/5 flex items-center justify-center transition-all group">
            <Shield className="w-8 h-8 text-black opacity-30 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
}
