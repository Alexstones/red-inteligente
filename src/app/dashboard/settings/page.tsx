"use client";

import { Settings, Bell, Palette, Globe, Database, Lock } from "lucide-react";
import { mockUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const settingSections = [
    {
        icon: Globe,
        title: "General",
        description: "Información del tenant, idioma y zona horaria.",
    },
    {
        icon: Bell,
        title: "Notificaciones",
        description: "Configurar alertas por correo y en tiempo real.",
    },
    {
        icon: Palette,
        title: "Apariencia",
        description: "Tema, colores y personalización de la interfaz.",
    },
    {
        icon: Database,
        title: "Integraciones",
        description: "Conexiones con servicios externos y APIs.",
    },
];

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div className="animate-fade-in">
                <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Ajustes generales del sistema
                </p>
            </div>

            {/* User Info */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in stagger-1">
                <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    Perfil Actual
                </h2>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold">
                        {mockUser.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-semibold">{mockUser.name}</p>
                        <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="badge text-indigo-400 bg-indigo-400/10 border-indigo-400/20 text-[10px]">
                                {mockUser.role}
                            </span>
                            <span className="badge text-violet-400 bg-violet-400/10 border-violet-400/20 text-[10px]">
                                {mockUser.tenantType}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {settingSections.map((section, i) => {
                    const Icon = section.icon;
                    return (
                        <div
                            key={section.title}
                            className={cn(
                                "glass-card rounded-2xl p-5 flex items-start gap-4 opacity-0 animate-fade-in cursor-pointer group",
                                `stagger-${i + 2}`
                            )}
                        >
                            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-indigo-500/15 transition-colors">
                                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-indigo-400 transition-colors" />
                            </div>
                            <div>
                                <h3 className="font-medium text-sm">{section.title}</h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {section.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="glass-card rounded-2xl p-5 border-l-4 border-l-amber-500 animate-fade-in stagger-6">
                <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium">Próximamente</span>
                </div>
                <p className="text-sm text-muted-foreground">
                    Las configuraciones completas se habilitarán con la integración del módulo Arquetipo (Fase 2).
                </p>
            </div>
        </div>
    );
}
