"use client";

import { useState } from "react";
import { 
  Zap, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search,
  Filter,
  Coins,
  FileCode,
  Image as ImageIcon,
  Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TransactionsManagementPage() {
  const [activeType, setActiveType] = useState("all");

  const transactions = [
    { id: "TX-9281", type: "CURRENCY", amount: "+2,500 NEX", desc: "Sincronización de Saldo", status: "Success", date: "Hoy, 14:20" },
    { id: "TX-9282", type: "CONTRACT", amount: "Gas: 0.002", desc: "Ejecución Smart Contract #42", status: "Success", date: "Hoy, 13:45" },
    { id: "TX-9283", type: "NFT", amount: "ID: #902", desc: "Transferencia de Activo Digital", status: "Success", date: "Hoy, 12:10" },
    { id: "TX-9284", type: "ERP", amount: "Value: High", desc: "Integración Sistema ERP -> Blockchain", status: "Processing", date: "Hoy, 11:55" },
  ];

  const types = [
    { id: "all", label: "Todos", icon: Zap },
    { id: "CURRENCY", label: "Moneda", icon: Coins },
    { id: "CONTRACT", label: "Contratos", icon: FileCode },
    { id: "NFT", label: "NFTs", icon: ImageIcon },
    { id: "ERP", label: "ERP Integrado", icon: Building2 },
  ];

  const filteredTxs = activeType === "all" ? transactions : transactions.filter(t => t.type === activeType);

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white uppercase neon-text">
            Gestión de Transacciones
          </h1>
          <p className="text-amber-400/60 text-[10px] font-mono uppercase tracking-[0.2em] mt-2">
            Cadena de Procesos - Registro de Flujos Neurales
          </p>
        </div>
        <div className="flex gap-2">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input type="text" className="input-field pl-10 w-64 h-10 text-[10px]" placeholder="BUSCAR TRANSACCIÓN..." />
            </div>
            <button className="p-2 rounded-xl glass border-white/5 text-white/40 hover:text-white transition-all">
                <Filter className="w-5 h-5" />
            </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {types.map((type) => {
            const Icon = type.icon;
            return (
                <button
                    key={type.id}
                    onClick={() => setActiveType(type.id)}
                    className={cn(
                        "flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-mono uppercase tracking-widest transition-all whitespace-nowrap",
                        activeType === type.id 
                            ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.2)]" 
                            : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5"
                    )}
                >
                    <Icon className="w-4 h-4" />
                    {type.label}
                </button>
            )
        })}
      </div>

      <div className="glass-card overflow-hidden p-0 border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] border-b border-white/5 bg-white/[0.01]">
              <th className="px-8 py-5">Naturaleza</th>
              <th className="px-8 py-5">Descripción del Proceso</th>
              <th className="px-8 py-5">Identificador</th>
              <th className="px-8 py-5">Masa/Valor</th>
              <th className="px-8 py-5 text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {filteredTxs.map((tx) => (
              <tr key={tx.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                        "p-2 rounded-lg bg-white/5",
                        tx.type === 'CURRENCY' ? 'text-primary' : 
                        tx.type === 'CONTRACT' ? 'text-secondary' : 
                        tx.type === 'NFT' ? 'text-emerald-400' : 'text-amber-400'
                    )}>
                        {tx.type === 'CURRENCY' && <Coins className="w-4 h-4" />}
                        {tx.type === 'CONTRACT' && <FileCode className="w-4 h-4" />}
                        {tx.type === 'NFT' && <ImageIcon className="w-4 h-4" />}
                        {tx.type === 'ERP' && <Building2 className="w-4 h-4" />}
                    </div>
                    <span className="text-[10px] font-mono text-white/60 uppercase">{tx.type}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <p className="text-sm font-bold text-white uppercase italic tracking-tight">{tx.desc}</p>
                  <p className="text-[10px] font-mono text-white/20 mt-1">{tx.date}</p>
                </td>
                <td className="px-8 py-6">
                  <span className="text-[10px] font-mono text-white/40">{tx.id}</span>
                </td>
                <td className="px-8 py-6">
                  <span className={cn(
                    "text-sm font-black tracking-tight",
                    tx.amount.startsWith('+') ? 'text-primary' : 'text-white'
                  )}>
                    {tx.amount}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className={cn(
                        "w-2 h-2 rounded-full",
                        tx.status === 'Success' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-pulse'
                    )} />
                    <span className={cn(
                        "text-[9px] font-mono uppercase tracking-widest",
                        tx.status === 'Success' ? 'text-emerald-400' : 'text-amber-400'
                    )}>
                        {tx.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
