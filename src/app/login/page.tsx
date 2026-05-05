"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Eye,
    EyeOff,
    Building2,
    Users,
    Globe,
    ArrowRight,
    Hexagon,
    Shield
} from "lucide-react";
import { authApi } from "@/lib/api";
import { cn } from "@/lib/utils";

const tenantTypes = [
    { value: "empresa", label: "Empresa", icon: Building2 },
    { value: "sociedad", label: "Sociedad", icon: Users },
    { value: "publico", label: "Público", icon: Globe },
];

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState("empresa");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const email = (e.target as any).email.value;
            const password = (e.target as any).password.value;
            const response = await authApi.login({ email, password });
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('user', JSON.stringify(response.user));
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Error al conectar con el Nodo Neural");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden neural-bg">
            <div className="fixed inset-0 neural-grid opacity-20 pointer-events-none" />
            
            <div className={cn(
                "w-full max-w-lg relative z-10 space-y-12 transition-all duration-1000",
                isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
                {/* Logo Section */}
                <div className="text-center space-y-6">
                    <div className="inline-flex p-5 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl animate-pulse-slow">
                        <Hexagon className="w-16 h-16 text-white" strokeWidth={1} />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic leading-none gradient-text">
                            Oculum
                        </h1>
                        <p className="text-primary font-mono text-[10px] tracking-[0.5em] uppercase font-bold">
                            Neural Intelligence System
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="glass-panel p-10 rounded-[3rem] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
                    
                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Tenant Selection */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-2">
                                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Tipo de Identidad</label>
                                <span className="text-[10px] font-mono text-primary/40 uppercase">P2P-Identity</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {tenantTypes.map((type) => {
                                    const Icon = type.icon;
                                    const isSelected = selectedTenant === type.value;
                                    return (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => setSelectedTenant(type.value)}
                                            className={cn(
                                                "flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-500 border relative overflow-hidden",
                                                isSelected 
                                                    ? "bg-white/10 border-white/20 text-white shadow-2xl scale-[1.02]" 
                                                    : "bg-white/[0.02] border-white/[0.05] text-white/20 hover:border-white/10 hover:text-white/40"
                                            )}
                                        >
                                            {isSelected && <div className="absolute inset-0 bg-primary/5 animate-pulse" />}
                                            <Icon className={cn("w-6 h-6 relative z-10 transition-transform duration-500", isSelected && "scale-110")} />
                                            <span className="text-[9px] font-black uppercase tracking-widest relative z-10">{type.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Inputs */}
                        <div className="space-y-6">
                            <div className="relative group">
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="USUARIO@RED.NEURAL"
                                    className="input-premium uppercase italic font-bold"
                                    required
                                />
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary transition-colors">
                                    <Shield className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="relative group">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="input-premium"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/10 hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/10 text-destructive text-[10px] font-mono text-center uppercase tracking-widest animate-shake">
                                [SYNC_ERROR]: {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-premium-primary w-full group shadow-2xl"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span className="tracking-[0.3em] uppercase text-xs italic">Sincronizar Nodo</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-white/[0.05] text-center">
                        <Link
                            href="/register"
                            className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/20 hover:text-primary transition-all duration-500 hover:tracking-[0.4em]"
                        >
                            Crear Nueva Credencial Descentralizada
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 opacity-40">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,255,255,1)]" />
                        <span className="text-[8px] font-mono text-white uppercase tracking-widest">Global Mesh: Active</span>
                    </div>
                    <span className="text-[8px] font-mono text-white uppercase tracking-widest">Protocol v4.0.2</span>
                </div>
            </div>
        </div>
    );
}

