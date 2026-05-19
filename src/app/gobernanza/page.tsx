"use client";

import { 
  Users, 
  Vote, 
  Plus, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck,
  Zap,
  TrendingUp,
  Globe,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { governanceApi } from "@/lib/api";

interface Proposal {
    id: string;
    title: string;
    description: string;
    status: "active" | "passed" | "rejected";
    votesFor: number;
    votesAgainst: number;
    createdAt: string;
    tenant: {
        name: string;
        reputation: number;
    };
}

export default function GovernancePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [showNewModal, setShowNewModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");

    useEffect(() => {
        fetchProposals();
    }, []);

    const fetchProposals = async () => {
        try {
            const data = await governanceApi.getProposals();
            setProposals(data);
        } catch (error) {
            console.error("Error fetching proposals:", error);
            // Mock data if API fails or empty
            if (proposals.length === 0) {
                setProposals([
                    {
                        id: "1",
                        title: "Actualización de Protocolo Synapse v2.5",
                        description: "Propuesta para aumentar la eficiencia de la IA en un 20% reduciendo el peso de sinapsis muertas.",
                        status: "active",
                        votesFor: 450,
                        votesAgainst: 120,
                        createdAt: new Date().toISOString(),
                        tenant: { name: "System Admin", reputation: 100 }
                    }
                ]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleVote = async (id: string, vote: 'for' | 'against') => {
        try {
            await governanceApi.vote(id, vote);
            fetchProposals();
        } catch (error) {
            console.error("Error voting:", error);
        }
    };

    const handleCreateProposal = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await governanceApi.createProposal({ title: newTitle, description: newDescription });
            setNewTitle("");
            setNewDescription("");
            setShowNewModal(false);
            fetchProposals();
        } catch (error) {
            console.error("Error creating proposal:", error);
        }
    };

    const statusConfig = {
        active: { label: "Activa", icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10" },
        passed: { label: "Aprobada", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
        rejected: { label: "Rechazada", icon: XCircle, color: "text-red-400", bg: "bg-red-400/10" },
    };

    return (
        <div className={cn("space-y-12 pb-20 transition-all duration-700", isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0")}>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8">
                <div>
                    <h1 className="text-5xl font-black tracking-tight uppercase italic leading-none">
                        <span className="gradient-text">Gobernanza</span> <span className="text-primary neon-glow-primary">DAO</span>
                    </h1>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mt-2">
                        Decentralized Autonomous Organization — Protocol Consensus
                    </p>
                </div>
                <button 
                    onClick={() => setShowNewModal(true)}
                    className="btn-premium-primary px-8 py-4 group"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-bold">Nueva Propuesta</span>
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Nodos Votantes", value: "1,245", icon: Users, color: "text-primary" },
                    { label: "Quórum Requerido", value: "65%", icon: ShieldCheck, color: "text-emerald-400" },
                    { label: "Propuestas Totales", value: proposals.length, icon: Globe, color: "text-secondary" },
                ].map((stat) => (
                    <div key={stat.label} className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-all">
                        <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                            <stat.icon className="w-40 h-40" />
                        </div>
                        <div className="flex justify-between items-start mb-6">
                            <div className={cn("p-3 rounded-xl bg-white/5 border border-white/10", stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">{stat.label}</p>
                        <p className="text-3xl font-black text-white tracking-tighter mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Proposals List */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 px-4">
                    <Vote className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white/80 italic">Propuestas Activas</h2>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {proposals.map((prop) => {
                        const totalVotes = prop.votesFor + prop.votesAgainst;
                        const forPct = totalVotes > 0 ? (prop.votesFor / totalVotes) * 100 : 50;
                        const st = statusConfig[prop.status];
                        
                        return (
                            <div key={prop.id} className="glass-panel rounded-[2rem] p-10 border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:scale-110 transition-transform">
                                    {prop.status === "active" ? <Clock className="w-32 h-32" /> : <ShieldCheck className="w-32 h-32" />}
                                </div>
                                
                                <div className="flex flex-col lg:flex-row gap-10 relative z-10">
                                    <div className="flex-1 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <span className={cn("px-4 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest border", st.color, st.bg, "border-current/20")}>
                                                {st.label}
                                            </span>
                                            <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
                                                ID: {prop.id.slice(0, 8)} • {new Date(prop.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
                                                {prop.title}
                                            </h3>
                                            <p className="text-sm text-white/50 leading-relaxed max-w-2xl">
                                                {prop.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-8 pt-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-xs text-primary">
                                                    {prop.tenant.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Propuesta por</p>
                                                    <p className="text-xs font-bold text-white/80">{prop.tenant.name}</p>
                                                </div>
                                            </div>
                                            <div className="h-8 w-px bg-white/5" />
                                            <div>
                                                <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Reputación Autor</p>
                                                <p className="text-xs font-bold text-emerald-400">{prop.tenant.reputation}%</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:w-80 space-y-8 bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-md">
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-[10px] font-mono uppercase">
                                                <span className="text-emerald-400 font-black">A Favor</span>
                                                <span className="text-white/60">{prop.votesFor}</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-400 transition-all duration-1000" style={{ width: `${forPct}%` }} />
                                            </div>
                                            <div className="flex justify-between text-[10px] font-mono uppercase">
                                                <span className="text-red-400 font-black">En Contra</span>
                                                <span className="text-white/60">{prop.votesAgainst}</span>
                                            </div>
                                        </div>

                                        {prop.status === "active" && (
                                            <div className="grid grid-cols-2 gap-4">
                                                <button 
                                                    onClick={() => handleVote(prop.id, 'for')}
                                                    className="py-4 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 hover:text-black transition-all"
                                                >
                                                    Votar Sí
                                                </button>
                                                <button 
                                                    onClick={() => handleVote(prop.id, 'against')}
                                                    className="py-4 rounded-2xl bg-red-400/10 border border-red-400/20 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-400 hover:text-black transition-all"
                                                >
                                                    Votar No
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal Nueva Propuesta */}
            {showNewModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="glass-panel p-12 rounded-[2.5rem] w-full max-w-xl border-primary/20 space-y-8 animate-in zoom-in-95 duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <Plus className="w-48 h-48 text-primary" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black uppercase italic tracking-tight text-white">Nueva Propuesta DAO</h2>
                                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Protocolo de Gobernanza Neural Iniciado</p>
                            </div>
                            
                            <form onSubmit={handleCreateProposal} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-mono uppercase tracking-widest text-primary font-black">Título de la Propuesta</label>
                                    <input 
                                        type="text" 
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        placeholder="Ej. Optimización de Memoria Backbone"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm text-white focus:outline-none focus:border-primary/40 focus:bg-white/[0.08] transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-mono uppercase tracking-widest text-primary font-black">Descripción Detallada</label>
                                    <textarea 
                                        value={newDescription}
                                        onChange={(e) => setNewDescription(e.target.value)}
                                        placeholder="Explica el impacto neural de tu propuesta..."
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm text-white focus:outline-none focus:border-primary/40 focus:bg-white/[0.08] transition-all resize-none"
                                        required
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button 
                                        type="button"
                                        onClick={() => setShowNewModal(false)}
                                        className="flex-1 btn-premium-secondary py-5 text-[10px] uppercase font-black tracking-widest"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-1 btn-premium-primary py-5 text-[10px] uppercase font-black tracking-widest"
                                    >
                                        Emitir Propuesta
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
