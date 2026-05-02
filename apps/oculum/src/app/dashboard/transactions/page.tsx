"use client";

import { useState } from "react";
import {
    ArrowUpRight,
    ArrowDownRight,
    ArrowLeftRight,
    Hash,
    Search,
    Filter,
} from "lucide-react";
import { mockTransactions } from "@/lib/mock-data";
import { formatCurrency, formatDate, getStatusColor, cn } from "@/lib/utils";

const filters = ["todos", "pendiente", "confirmado", "validado", "rechazado"];

function getTypeIcon(type: string) {
    switch (type) {
        case "ingreso":
            return <ArrowUpRight className="w-4 h-4 text-emerald-400" />;
        case "egreso":
            return <ArrowDownRight className="w-4 h-4 text-rose-400" />;
        case "transferencia":
            return <ArrowLeftRight className="w-4 h-4 text-blue-400" />;
        default:
            return null;
    }
}

export default function TransactionsPage() {
    const [activeFilter, setActiveFilter] = useState("todos");
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = mockTransactions.filter((tx) => {
        const matchesFilter =
            activeFilter === "todos" || tx.status === activeFilter;
        const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="animate-fade-in">
                <h1 className="text-2xl font-bold tracking-tight">Transacciones</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Historial completo de movimientos financieros
                </p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in stagger-1">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar transacción..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-field pl-10"
                    />
                </div>

                {/* Status Filters */}
                <div className="flex items-center gap-1.5 overflow-x-auto">
                    <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize whitespace-nowrap cursor-pointer",
                                activeFilter === filter
                                    ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-transparent"
                            )}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="glass-card rounded-2xl overflow-hidden animate-fade-in stagger-2">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Tipo
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Descripción
                                </th>
                                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Monto
                                </th>
                                <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Fecha
                                </th>
                                <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Hash
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((tx) => (
                                <tr
                                    key={tx.id}
                                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                                >
                                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                                        {tx.id}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            {getTypeIcon(tx.type)}
                                            <span className="capitalize text-xs">{tx.type}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-foreground max-w-[250px] truncate">
                                        {tx.description}
                                    </td>
                                    <td className="py-3 px-4 text-right font-mono font-medium">
                                        <span
                                            className={
                                                tx.type === "ingreso"
                                                    ? "text-emerald-400"
                                                    : tx.type === "egreso"
                                                        ? "text-rose-400"
                                                        : "text-blue-400"
                                            }
                                        >
                                            {tx.type === "egreso" ? "-" : "+"}
                                            {formatCurrency(tx.amount)}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={cn("badge", getStatusColor(tx.status))}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right text-muted-foreground text-xs">
                                        {formatDate(tx.createdAt)}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        {tx.hash ? (
                                            <span className="inline-flex items-center gap-1 text-xs text-indigo-400 font-mono">
                                                <Hash className="w-3 h-3" />
                                                {tx.hash}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">—</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <div className="py-12 text-center text-muted-foreground text-sm">
                            No se encontraron transacciones.
                        </div>
                    )}
                </div>
            </div>

            {/* Summary */}
            <div className="text-xs text-muted-foreground text-right animate-fade-in stagger-3">
                Mostrando {filtered.length} de {mockTransactions.length} transacciones
            </div>
        </div>
    );
}
