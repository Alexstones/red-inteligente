"use client";

import {
    Wallet,
    Hash,
    Hexagon,
    Activity,
    Zap,
    Cpu,
    Settings,
    BrainCircuit,
    Network,
    ShieldCheck,
    Sparkles,
    ChevronRight,
    TrendingUp,
    ShieldAlert,
    Languages,
    TowerControl,
    Plus,
    X,
    Loader2
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { walletApi, nodesApi } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const { t, lang, setLang } = useI18n();
    const [isLoading, setIsLoading] = useState(true);
    const [isCreatingSynapse, setIsCreatingSynapse] = useState(false);
    const [providenciaThinking, setProvidenciaThinking] = useState(false);
    const [stats, setStats] = useState({
        balance: 0,
        synapsesCount: 0,
        nodesCount: 0,
        networkHealth: "98.5%",
    });
    const [recentNodes, setRecentNodes] = useState<any[]>([]);
    const [insights, setInsights] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 15000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            const [wallet, nodes] = await Promise.all([
                walletApi.getWallet(),
                nodesApi.getNodes()
            ]);

            setStats({
                balance: wallet.balance,
                synapsesCount: nodes.filter((n: any) => ['SALE', 'INVENTORY', 'FINANCE', 'SYNAPSE'].includes(n.type)).length,
                nodesCount: nodes.length,
                networkHealth: nodes.length > 5 ? "99.9%" : "94.2%"
            });

            setRecentNodes(nodes.slice(0, 8));
            
            setInsights([
                { type: 'optimization', msg: lang === 'es' ? 'Optimización de flujo por Providencia' : 'Flow optimization by Providencia', time: 'hace 2 min', icon: TrendingUp, color: 'text-black' },
                { type: 'security', msg: lang === 'es' ? 'Protocolo Obelisco: Intrusión bloqueada' : 'Obelisco Protocol: Intrusion blocked', time: 'hace 15 min', icon: ShieldAlert, color: 'text-black' },
                { type: 'economy', msg: lang === 'es' ? 'Incentivos de minería por Providencia (1.5x)' : 'Providencia mining incentives (1.5x)', time: 'hace 1h', icon: Zap, color: 'text-black' }
            ]);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConsultProvidencia = () => {
        setProvidenciaThinking(true);
        setTimeout(() => {
            setProvidenciaThinking(false);
            alert(lang === 'es' 
                ? "La Providencia sugiere: Incrementar la masa neural en el Sector 7 para optimizar el flujo Obelisco."
                : "Providencia suggests: Increase neural mass in Sector 7 to optimize Obelisco flow.");
        }, 2000);
    };

    const handleCreateSynapse = () => {
        setIsCreatingSynapse(true);
        setTimeout(() => {
            setIsCreatingSynapse(false);
            fetchData();
        }, 3000);
    };

    const statCards = [
        { label: "Saldo Nex", value: stats.balance, icon: Wallet, color: "text-black", subtext: "Capital Neural", path: "/wallet" },
        { label: "Sinapsis Activas", value: stats.synapsesCount, icon: Zap, color: "text-black", subtext: "Flujo Obelisco", path: "/explorer" },
        { label: "Cortex 3D", value: stats.networkHealth, icon: BrainCircuit, color: "text-black", subtext: "La Providencia", path: "/cortex" },
        { label: "Unidades Complejas", value: stats.nodesCount, icon: Network, color: "text-black", subtext: "Interconexión", path: "/nodes" },
        { label: "Nodos Activos", value: stats.nodesCount, icon: Activity, color: "text-black", subtext: "Sistema Vivo", path: "/status" },
    ];

    return (
        <div className={cn("space-y-12 pb-20 transition-all duration-1000", isLoading ? "opacity-0" : "opacity-100")}>
            {/* --- Modals --- */}
            {isCreatingSynapse && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-md" />
                    <div className="glass-panel p-12 rounded-[3rem] relative z-10 max-w-lg w-full text-center space-y-6 animate-in zoom-in-95 duration-300 shadow-2xl border-black/20">
                        <Loader2 className="w-16 h-16 text-black mx-auto animate-spin" />
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-black">Generando Nueva Sinapsis</h2>
                        <p className="text-black text-xs font-mono uppercase tracking-widest leading-relaxed font-bold">
                            La Providencia está calculando la ruta óptima para la nueva unidad de complejo entre unidades...
                        </p>
                    </div>
                </div>
            )}

            {/* --- Hero Header --- */}
            <div className="relative pt-8 flex justify-between items-start">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 mb-2">
                        <TowerControl className="w-6 h-6 text-black animate-pulse" />
                        <span className="text-[10px] font-mono font-black tracking-[0.5em] text-black uppercase">Protocolo Obelisco</span>
                    </div>
                    <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none text-black">
                        <span>Sistema</span> <span className="text-black underline decoration-primary/40 decoration-8">Providencia</span>
                    </h1>
                    <p className="text-black text-xs font-mono tracking-widest uppercase font-bold">Arquitectura de Complejo entre Unidades v5.0</p>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                        className="p-4 rounded-2xl bg-white border-2 border-black hover:bg-black hover:text-white transition-all flex items-center gap-2 group"
                    >
                        <Languages className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        <span className="text-[10px] font-mono font-black uppercase">{lang}</span>
                    </button>
                    
                    <button onClick={handleCreateSynapse} className="btn-premium-primary px-10 group shadow-lg">
                        <Zap className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" /> 
                        <span className="text-xs uppercase tracking-widest italic">Nueva Sinapsis</span>
                    </button>
                </div>
            </div>

            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div 
                            key={stat.label} 
                            onClick={() => router.push(stat.path)}
                            className="glass-panel p-10 rounded-[2.5rem] relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 cursor-pointer border-2 border-black/5"
                        >
                            <div className="absolute -right-6 -bottom-6 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity rotate-12">
                                <Icon className="w-48 h-48 text-black" />
                            </div>
                            <div className="flex justify-between items-start mb-10">
                                <div className={cn("p-4 rounded-2xl bg-black text-white", stat.color)}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <span className="text-[10px] font-mono text-black tracking-widest uppercase font-black">RT-0{i+1}</span>
                            </div>
                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black mb-2 font-black italic">{stat.label}</p>
                            <p className="text-5xl font-black text-black tracking-tighter mb-4 italic">
                                {typeof stat.value === "number" && stat.label.includes("Saldo") ? formatCurrency(stat.value) : stat.value}
                            </p>
                            <p className="text-[10px] font-mono text-black font-black uppercase tracking-widest underline decoration-2">{stat.subtext}</p>
                        </div>
                    );
                })}
            </div>

            {/* --- Complex Units Grid --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Complejo entre Unidades List */}
                <div className="lg:col-span-8 glass-panel rounded-[3.5rem] overflow-hidden border-2 border-black/5">
                    <div className="p-10 border-b-2 border-black/5 flex items-center justify-between bg-black/[0.02]">
                        <div className="flex items-center gap-4">
                            <Activity className="w-6 h-6 text-black" />
                            <h2 className="text-lg font-black uppercase tracking-widest text-black italic">Complejo entre Unidades</h2>
                        </div>
                        <Link href="/explorer" className="text-[10px] font-mono text-black hover:underline transition-all uppercase font-black tracking-widest">
                            Explorar Obelisco
                        </Link>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-mono text-black uppercase tracking-[0.4em] bg-black/5">
                                    <th className="px-10 py-6 font-black">Identificador</th>
                                    <th className="px-10 py-6 font-black">Tipo Neural</th>
                                    <th className="px-10 py-6 font-black">Estado</th>
                                    <th className="px-10 py-6 font-black text-right">Tiempo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-black/5">
                                {recentNodes.map((node, i) => (
                                    <tr key={node.id} onClick={() => router.push(`/explorer?block=${node.id}`)} className="group hover:bg-black/5 transition-colors cursor-pointer">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-2.5 h-2.5 rounded-full bg-black group-hover:scale-150 transition-transform" />
                                                <span className="text-[10px] font-mono text-black group-hover:font-black transition-all font-bold">{node.id.substring(0, 16)}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 uppercase italic text-xs font-black text-black">{node.type}</td>
                                        <td className="px-10 py-8">
                                            <span className="text-[9px] font-black font-mono px-4 py-1.5 rounded-full bg-black text-white uppercase tracking-widest">Sincronizado</span>
                                        </td>
                                        <td className="px-10 py-8 text-right text-[10px] font-mono text-black font-bold">{new Date(node.createdAt).toLocaleTimeString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    {/* Providencia AI Insights */}
                    <div className="glass-panel rounded-[3.5rem] p-10 border-2 border-black/10 relative overflow-hidden group bg-white">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
                           <Sparkles className="w-24 h-24 text-black" />
                        </div>
                        <div className="flex items-center gap-4 mb-8">
                            <BrainCircuit className="w-6 h-6 text-black" />
                            <h3 className="text-sm font-black uppercase tracking-widest italic text-black">La Providencia</h3>
                        </div>
                        <div className="space-y-6">
                            {insights.map((insight, i) => (
                                <div key={i} className="flex gap-5 p-6 rounded-[2rem] bg-black/5 border-2 border-black/5 hover:border-black/20 transition-all cursor-help">
                                    <div className={cn("w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shrink-0 shadow-md")}>
                                        <insight.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black text-black uppercase italic leading-tight">{insight.msg}</p>
                                        <p className="text-[9px] font-mono text-black uppercase mt-1 font-black tracking-widest">{insight.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={handleConsultProvidencia} 
                            disabled={providenciaThinking}
                            className="w-full mt-8 py-6 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 italic disabled:opacity-50 shadow-xl"
                        >
                           {providenciaThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : "Consultar Providencia"} 
                           {!providenciaThinking && <ChevronRight className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Network Status Visualizer */}
                    <div className="glass-panel rounded-[3.5rem] p-10 relative overflow-hidden group border-2 border-black/10">
                        <div className="flex items-center justify-center mb-8">
                            <div className="w-32 h-32 relative">
                                <div className="absolute inset-0 rounded-full border-4 border-black/10 animate-[spin_12s_linear_infinite]" />
                                <div className="absolute inset-4 rounded-full border-2 border-black/20 animate-[spin_8s_linear_infinite_reverse]" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Hexagon className="w-12 h-12 text-black animate-pulse-slow" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {[
                                { label: "Carga Obelisco", val: "72%", color: "bg-black" },
                                { label: "Sincronía Compleja", val: stats.networkHealth, color: "bg-black" },
                            ].map((row) => (
                                <div key={row.label} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-black font-black italic">
                                        <span>{row.label}</span>
                                        <span>{row.val}</span>
                                    </div>
                                    <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                                        <div 
                                            className={cn("h-full transition-all duration-1000", row.color)}
                                            style={{ width: row.val.includes("%") ? row.val : "100%" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
