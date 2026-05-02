"use client";

import { Shield, Users, Settings, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
    {
        name: "Administrador",
        slug: "admin",
        description: "Acceso total al sistema, gestión de usuarios y configuración.",
        permissions: ["Crear", "Leer", "Actualizar", "Eliminar", "Configurar"],
        color: "from-indigo-500 to-violet-500",
        users: 2,
    },
    {
        name: "Operador",
        slug: "operador",
        description: "Gestión de transacciones y operaciones del día a día.",
        permissions: ["Crear", "Leer", "Actualizar"],
        color: "from-blue-500 to-cyan-500",
        users: 8,
    },
    {
        name: "Viewer",
        slug: "viewer",
        description: "Acceso de solo lectura a dashboards y reportes.",
        permissions: ["Leer"],
        color: "from-emerald-500 to-teal-500",
        users: 15,
    },
];

export default function RolesPage() {
    return (
        <div className="space-y-6">
            <div className="animate-fade-in">
                <h1 className="text-2xl font-bold tracking-tight">Permisos y Roles</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Sistema RBAC — Control de acceso basado en roles
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roles.map((role, i) => (
                    <div
                        key={role.slug}
                        className={cn(
                            "glass-card rounded-2xl p-6 opacity-0 animate-fade-in",
                            `stagger-${i + 1}`
                        )}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center",
                                    role.color
                                )}
                            >
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Users className="w-3 h-3" />
                                {role.users} usuarios
                            </div>
                        </div>

                        <h3 className="font-semibold mb-1">{role.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

                        <div className="flex flex-wrap gap-1.5">
                            {role.permissions.map((perm) => (
                                <span
                                    key={perm}
                                    className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-muted border border-border text-muted-foreground"
                                >
                                    {perm}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card rounded-2xl p-5 border-l-4 border-l-amber-500 animate-fade-in stagger-4">
                <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium">Próximamente</span>
                </div>
                <p className="text-sm text-muted-foreground">
                    La gestión completa de roles se activará con el módulo Arquetipo. Actualmente se muestran los roles predefinidos del sistema.
                </p>
            </div>
        </div>
    );
}
