"use client";

import { useState } from "react";
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
} from "lucide-react";
import { authApi } from "@/lib/api";

const tenantTypes = [
    {
        value: "empresa",
        label: "Empresa",
        description: "Organización privada",
        icon: Building2,
    },
    {
        value: "sociedad",
        label: "Sociedad",
        description: "Sociedad o cooperativa",
        icon: Users,
    },
    {
        value: "publico",
        label: "Público",
        description: "Entidad pública",
        icon: Globe,
    },
];

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState("empresa");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#050505]">
            {/* Neural Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
            </div>

            <div className="w-full max-w-md relative z-10 space-y-10">
                {/* Logo Section */}
                <div className="text-center space-y-4">
                    <div className="inline-flex p-4 rounded-3xl bg-primary/10 border border-primary/20 backdrop-blur-xl animate-pulse-neon mb-4">
                        <Hexagon className="w-12 h-12 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-5xl font-black tracking-tighter text-white uppercase neon-text">
                            Oculum
                        </h1>
                        <p className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase">
                            Red Inteligente Modular
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-mono text-center animate-shake">
                        [ERROR_NEURAL]: {error.toUpperCase()}
                    </div>
                )}

                {/* Login Form Card */}
                <div className="glass-card border-primary/10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Tenant Selection */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block ml-1">
                                Identidad de Nodo
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {tenantTypes.map((type) => {
                                    const Icon = type.icon;
                                    const isSelected = selectedTenant === type.value;
                                    return (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => setSelectedTenant(type.value)}
                                            className={`
                                                flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-500 group/btn
                                                ${isSelected 
                                                    ? "bg-primary/10 border border-primary/30 text-primary shadow-[0_0_20px_rgba(0,255,255,0.1)]" 
                                                    : "bg-white/[0.02] border border-white/5 text-white/40 hover:border-white/20 hover:text-white/60"}
                                            `}
                                        >
                                            <Icon className={`w-5 h-5 transition-transform duration-500 ${isSelected ? 'scale-110' : 'group-hover/btn:scale-110'}`} />
                                            <span className="text-[10px] font-bold uppercase tracking-tight">{type.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Input Group */}
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block ml-1">
                                    Credencial de Acceso
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="USUARIO@RED.INTELIGENTE"
                                    className="input-field border-white/5 focus:border-primary/30 uppercase placeholder:text-white/10"
                                    required
                                />
                            </div>

                            <div className="space-y-2 relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="input-field border-white/5 focus:border-primary/30 pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary group/submit"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span className="tracking-widest uppercase text-xs">Sincronizar Nodo</span>
                                    <ArrowRight className="w-4 h-4 group-hover/submit:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Secondary Actions */}
                    <div className="mt-10 pt-6 border-t border-white/5 text-center">
                        <Link
                            href="/register"
                            className="text-[10px] font-mono uppercase tracking-widest text-white/30 hover:text-primary transition-all duration-300"
                        >
                            Solicitar Nueva Identidad Descentralizada
                        </Link>
                    </div>
                </div>

                {/* System Status Footer */}
                <div className="mt-8 flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,255,255,1)]" />
                        <span className="text-[8px] font-mono text-primary/50 uppercase tracking-[0.2em]">Red Activa: 124 Nodos</span>
                    </div>
                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">v1.0.4-NEURAL</span>
                </div>
            </div>
        </div>
    );
}
