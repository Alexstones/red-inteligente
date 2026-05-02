"use client";

import {
    Database,
    BrainCircuit,
    Sparkles,
    Cpu,
    Link,
    Layers,
    Lock,
    ArrowRight,
} from "lucide-react";
import { mockModules } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Database,
    BrainCircuit,
    Sparkles,
    Cpu,
    Link,
    Layers,
};

function getStatusBadge(status: string) {
    switch (status) {
        case "activo":
            return (
                <span className="badge text-emerald-400 bg-emerald-400/10 border-emerald-400/20">
                    Activo
                </span>
            );
        case "proximo":
            return (
                <span className="badge text-amber-400 bg-amber-400/10 border-amber-400/20">
                    Próximamente
                </span>
            );
        case "deshabilitado":
            return (
                <span className="badge text-gray-500 bg-gray-500/10 border-gray-500/20">
                    <Lock className="w-3 h-3" />
                    Fase Futura
                </span>
            );
        default:
            return null;
    }
}

export default function ModulesPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="animate-fade-in">
                <h1 className="text-2xl font-bold tracking-tight">Módulos</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Componentes del ecosistema Red Inteligente
                </p>
            </div>

            {/* Architecture Diagram */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in stagger-1">
                <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    Arquitectura del Sistema
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium">
                    {["Oculum", "→", "Arquetipo", "→", "Albedrío", "→", "Oráculo", "→", "Módulo IA", "→", "Blockchain"].map(
                        (item, i) =>
                            item === "→" ? (
                                <ArrowRight
                                    key={i}
                                    className="w-4 h-4 text-indigo-500/50"
                                />
                            ) : (
                                <span
                                    key={i}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg border",
                                        item === "Oculum"
                                            ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-300"
                                            : "bg-muted/50 border-border text-muted-foreground"
                                    )}
                                >
                                    {item}
                                </span>
                            )
                    )}
                </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockModules.map((mod, i) => {
                    const Icon = iconMap[mod.icon] || Database;
                    const isDisabled = mod.status === "deshabilitado";

                    return (
                        <div
                            key={mod.id}
                            className={cn(
                                "glass-card rounded-2xl p-6 opacity-0 animate-fade-in transition-all duration-300 group",
                                `stagger-${i + 1}`,
                                isDisabled && "opacity-60"
                            )}
                        >
                            {/* Module Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                                        mod.color,
                                        isDisabled && "grayscale"
                                    )}
                                >
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                {getStatusBadge(mod.status)}
                            </div>

                            {/* Module Info */}
                            <h3 className="text-lg font-semibold mb-1">{mod.name}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                {mod.description}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                {mod.version && (
                                    <span className="text-xs font-mono text-muted-foreground">
                                        v{mod.version}
                                    </span>
                                )}
                                {mod.status === "activo" ? (
                                    <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer">
                                        Configurar →
                                    </button>
                                ) : (
                                    <span className="text-xs text-muted-foreground italic">
                                        {mod.status === "proximo"
                                            ? "En desarrollo"
                                            : "No disponible"}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Info Banner */}
            <div className="glass-card rounded-2xl p-5 border-l-4 border-l-indigo-500 animate-fade-in stagger-6">
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Arquitectura modular:</span>{" "}
                    Cada módulo se activa independientemente y se comunica vía eventos.
                    La blockchain actúa como capa de consenso y auditoría inmutable.
                </p>
            </div>
        </div>
    );
}
