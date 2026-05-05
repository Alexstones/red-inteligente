"use client";

import { 
  Wallet, 
  Activity, 
  Shield, 
  Menu,
  Bell,
  Zap
} from "lucide-react";

export default function MobileDashboard() {
  return (
    <div className="min-h-screen bg-black text-white font-sans p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Menu className="w-5 h-5" />
        </div>
        <div className="text-center">
            <p className="text-[10px] font-mono text-primary uppercase tracking-[0.3em]">Nexus</p>
            <p className="font-black text-sm uppercase italic">Mobile</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center relative">
            <Bell className="w-5 h-5" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </div>
      </div>

      {/* Wallet Card */}
      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[2rem] p-8 border border-white/10 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 opacity-10">
            <Wallet className="w-40 h-40" />
        </div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-2">Balance Total</p>
        <h2 className="text-4xl font-black tracking-tight mb-8">12.840 <span className="text-sm font-normal text-primary">NEX</span></h2>
        
        <div className="flex gap-4">
            <button className="flex-1 bg-white text-black rounded-2xl py-4 font-bold text-xs uppercase tracking-widest">Enviar</button>
            <button className="flex-1 bg-white/10 rounded-2xl py-4 font-bold text-xs uppercase tracking-widest backdrop-blur-md">Recibir</button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">
            <Activity className="w-5 h-5 text-secondary mb-4" />
            <p className="text-[8px] font-mono text-white/40 uppercase mb-1">Masa Neural</p>
            <p className="text-lg font-bold">98.5%</p>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">
            <Shield className="w-5 h-5 text-emerald-400 mb-4" />
            <p className="text-[8px] font-mono text-white/40 uppercase mb-1">Protección</p>
            <p className="text-lg font-bold">QKD Activa</p>
        </div>
      </div>

      {/* Activity */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">Actividad Reciente</h3>
        {[
            { label: "Sincronización ERP", val: "+2.5 NEX", icon: Zap, color: "text-primary" },
            { label: "Validación de Bloque", val: "Success", icon: Shield, color: "text-emerald-400" },
        ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <item.icon className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold uppercase">{item.label}</p>
                </div>
                <p className={`text-xs font-mono ${item.color}`}>{item.val}</p>
            </div>
        ))}
      </div>
    </div>
  );
}
