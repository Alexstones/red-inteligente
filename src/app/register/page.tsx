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
    User,
} from "lucide-react";

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

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState("empresa");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const name = (e.target as any).name.value;
            const organizationName = (e.target as any).org.value;
            const email = (e.target as any).email.value;
            const password = (e.target as any).password.value;
            
            await authApi.register({ 
                name, 
                organizationName, 
                email, 
                password,
                tenantType: selectedTenant 
            });
            
            router.push("/login");
        } catch (error) {
            console.error("Error en registro:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-md relative animate-fade-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-4">
                        <Hexagon className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Crear Cuenta</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Únete a la Red Inteligente
                    </p>
                </div>

                {/* Register Card */}
                <div className="glass-card rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Tenant Type */}
                        <div>
                            <label className="block text-sm font-medium mb-3 text-muted-foreground">
                                Tipo de Entidad
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {tenantTypes.map((type) => {
                                    const Icon = type.icon;
                                    return (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => setSelectedTenant(type.value)}
                                            className={`
                        flex flex-col items-center gap-1.5 p-3 rounded-xl text-xs transition-all duration-200 cursor-pointer
                        ${selectedTenant === type.value
                                                    ? "bg-indigo-500/15 border border-indigo-500/40 text-indigo-300"
                                                    : "bg-muted/50 border border-border hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground"
                                                }
                      `}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="font-medium">{type.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-foreground">
                                Nombre Completo
                            </label>
                            <div className="relative">
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Tu nombre"
                                    className="input-field pl-10"
                                    required
                                />
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            </div>
                        </div>

                        {/* Organization Name */}
                        <div>
                            <label htmlFor="org" className="block text-sm font-medium mb-2 text-muted-foreground">
                                Nombre de Organización
                            </label>
                            <input
                                id="org"
                                type="text"
                                placeholder="Mi Empresa S.A."
                                className="input-field"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="admin@miempresa.com"
                                className="input-field"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2 text-muted-foreground">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mínimo 8 caracteres"
                                    className="input-field pr-10"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 cursor-pointer"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Crear Cuenta
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            ¿Ya tienes cuenta?{" "}
                            <Link
                                href="/login"
                                className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                            >
                                Iniciar Sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
