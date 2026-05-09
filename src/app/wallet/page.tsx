"use client";

import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCcw, 
  ShieldCheck, 
  TrendingUp,
  Zap,
  History,
  CreditCard,
  Copy,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

import { walletApi } from "@/lib/api";

export default function WalletPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [address, setAddress] = useState("0x0000...0000");
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const data = await walletApi.getWallet();
                setBalance(data.balance);
                setAddress(data.address);
                setTransactions(data.transactions || []);
            } catch (error) {
                console.error("Error fetching wallet:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWallet();
    }, []);

    const formatCurrency = (n: number) =>
        new Intl.NumberFormat("es-MX", { minimumFractionDigits: 2 }).format(n);

    return (
        <div className={cn("space-y-12 pb-20 transition-all duration-700", isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0")}>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white flex items-center gap-4">
                        <Wallet className="w-8 h-8 text-primary" />
                        Billetera <span className="gradient-text">Neural</span>
                    </h1>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mt-2">
                        RI Token Asset Management & Neural Mining Rewards
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="btn-premium-secondary px-6 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                        <RefreshCcw className="w-4 h-4" /> Actualizar
                    </button>
                    <button className="btn-premium-primary px-8 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                        <Zap className="w-4 h-4" /> Minar Ahora
                    </button>
                </div>
            </div>

            {/* Main Wallet Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <div className="glass-panel rounded-[2rem] p-12 border-primary/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                            <Zap className="w-64 h-64 text-primary" />
                        </div>
                        <div className="relative z-10 space-y-10">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-mono text-primary uppercase tracking-[0.4em] font-black">Saldo Disponible</p>
                                    <div className="flex items-baseline gap-4">
                                        <h2 className="text-7xl font-black text-white tracking-tighter italic">
                                            {formatCurrency(balance)}
                                        </h2>
                                        <span className="text-2xl font-black text-primary italic uppercase tracking-tighter">RI</span>
                                    </div>
                                    <p className="text-xs text-white/30 font-mono">≈ $ {formatCurrency(balance * 0.85)} USD</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                                    <ShieldCheck className="w-8 h-8 text-emerald-400" />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-8 pt-4">
                                <div className="flex items-center gap-4 group/item cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center group-hover/item:bg-emerald-400 group-hover/item:text-black transition-all">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Enviar</p>
                                        <p className="text-[10px] font-black text-white uppercase group-hover/item:text-emerald-400 transition-colors">Transferir RI</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group/item cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-black transition-all">
                                        <ArrowDownLeft className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Recibir</p>
                                        <p className="text-[10px] font-black text-white uppercase group-hover/item:text-primary transition-colors">Depositar Assets</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group/item cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center group-hover/item:bg-secondary group-hover/item:text-black transition-all">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Staking</p>
                                        <p className="text-[10px] font-black text-white uppercase group-hover/item:text-secondary transition-colors">Ganar Interés</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Dirección Neural</p>
                                    <div className="flex items-center gap-3">
                                        <code className="text-[10px] text-white/60 font-mono bg-white/5 px-3 py-1 rounded-lg border border-white/10">{address}</code>
                                        <button className="text-white/20 hover:text-white transition-colors"><Copy className="w-4 h-4" /></button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Estado de Conexión</p>
                                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2 justify-end">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Sincronizado
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* History */}
                    <div className="glass-panel rounded-[2rem] p-10 border-white/5 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3">
                                <History className="w-5 h-5 text-secondary" /> Historial de Sinapsis Financieras
                            </h3>
                            <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Últimas 30 días</span>
                        </div>

                        <div className="space-y-2">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between p-6 rounded-2xl hover:bg-white/[0.02] transition-all group border border-transparent hover:border-white/5">
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center border",
                                            tx.type === "REWARD" ? "bg-emerald-400/5 border-emerald-400/10 text-emerald-400" : "bg-primary/5 border-primary/10 text-primary"
                                        )}>
                                            {tx.type === "REWARD" ? <Zap className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white uppercase tracking-tight">
                                                {tx.metadata?.reason || (tx.type === "TRANSFER" ? "Transferencia" : "Recompensa Neural")}
                                            </p>
                                            <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                                                {new Date(tx.createdAt).toLocaleDateString()} • {tx.id.toUpperCase().slice(0, 12)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={cn(
                                            "text-sm font-black tracking-tighter",
                                            tx.amount > 0 ? "text-emerald-400" : "text-white"
                                        )}>
                                            {tx.amount > 0 ? "+" : ""}{formatCurrency(tx.amount)} RI
                                        </p>
                                        <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">{tx.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 text-[9px] font-mono uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors border-t border-white/5">
                            Ver todas las transacciones
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    {/* Security Card */}
                    <div className="glass-panel rounded-[2rem] p-8 border-secondary/20 bg-secondary/5 space-y-6">
                        <div className="flex items-center gap-3">
                            <CreditCard className="w-6 h-6 text-secondary" />
                            <h4 className="text-xs font-black text-white uppercase italic tracking-widest">Seguridad Neural</h4>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed italic">
                            "Tu llave privada está encriptada localmente. El oráculo detecta un entorno seguro para transacciones de alta velocidad."
                        </p>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-[10px] font-mono uppercase">
                                <span className="text-white/40">2FA Activado</span>
                                <span className="text-emerald-400">Verificado</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-secondary w-full" />
                            </div>
                        </div>
                    </div>

                    {/* Mining Stats */}
                    <div className="glass-panel rounded-[2rem] p-8 border-white/5 space-y-8">
                        <h4 className="text-xs font-black text-white uppercase italic tracking-widest">Estadísticas de Minería</h4>
                        <div className="space-y-6">
                            {[
                                { label: "Hashrate Neural", value: "85.2 GH/s", pct: 75, color: "bg-primary" },
                                { label: "Eficiencia Synapse", value: "99.4%", pct: 99, color: "bg-emerald-400" },
                                { label: "Carga de Red", value: "Moderada", pct: 45, color: "bg-secondary" },
                            ].map((stat) => (
                                <div key={stat.label} className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest text-white/40">
                                        <span>{stat.label}</span>
                                        <span className="text-white">{stat.value}</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className={cn("h-full rounded-full transition-all duration-1000", stat.color)} style={{ width: `${stat.pct}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4">
                            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group">
                                <span className="text-[10px] font-black uppercase italic text-white/60 group-hover:text-white transition-colors">Configurar Nodos</span>
                                <ChevronRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary to-secondary relative overflow-hidden group cursor-pointer">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 transition-transform duration-500">
                            <TrendingUp className="w-12 h-12 text-white" />
                        </div>
                        <p className="text-[10px] font-black text-white/80 uppercase tracking-widest mb-2 relative z-10">Neural Staking v2</p>
                        <p className="text-xs font-bold text-white leading-snug relative z-10">
                            Bloquea tus RI por 30 días para obtener un +15% de poder minero en el Backbone.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
