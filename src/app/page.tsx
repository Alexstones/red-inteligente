"use client";

import Link from "next/link";
import { 
  Hexagon, 
  ArrowRight, 
  BrainCircuit, 
  Globe, 
  Zap, 
  ShieldCheck,
  ChevronRight,
  Monitor,
  Cpu,
  Boxes
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black overflow-hidden selection:bg-primary selection:text-black">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 inset-x-0 h-24 border-b border-white/5 backdrop-blur-xl z-50 flex items-center justify-between px-12">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
                        <Hexagon className="w-6 h-6 fill-current" />
                    </div>
                    <span className="font-black text-xl tracking-tighter uppercase italic">Nexus</span>
                </div>
                <div className="hidden md:flex items-center gap-12 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
                    <a href="#vision" className="hover:text-primary transition-colors">Visión</a>
                    <a href="#ecosistema" className="hover:text-primary transition-colors">Ecosistema</a>
                    <a href="#tecnologia" className="hover:text-primary transition-colors">Tecnología</a>
                </div>
                <Link 
                    href="/dashboard"
                    className="btn-premium-primary px-8 py-3 group"
                >
                    <span className="text-xs uppercase tracking-widest font-bold">Entrar al Nodo</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 px-12 flex flex-col items-center text-center space-y-12">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md animate-in slide-in-from-top-4 duration-1000">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] font-black">Protocolo Nexus v4.0 Activo</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] animate-in zoom-in-95 duration-1000">
                        La Evolución <br /> 
                        <span className="gradient-text">Inteligente</span>
                    </h1>
                    <p className="text-sm md:text-xl text-white/40 font-mono uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed pt-6">
                        Descentralizando el futuro del comercio, la IA y la gobernanza a través de una red neural distribuida.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 pt-8">
                    <Link href="/dashboard" className="px-12 py-6 rounded-2xl bg-white text-black font-black uppercase italic tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        Lanzar Dashboard
                    </Link>
                    <Link href="/mineria" className="px-12 py-6 rounded-2xl border border-white/10 hover:bg-white/5 font-black uppercase italic tracking-widest transition-all">
                        Convertirse en Nodo
                    </Link>
                </div>

                {/* Floating Elements Mockup */}
                <div className="relative w-full max-w-5xl h-96 mt-20 perspective-1000">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[600px] h-[400px] glass-panel rounded-[3rem] border-white/10 shadow-2xl rotate-y-[-10deg] rotate-x-[5deg] animate-float relative overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
                             <div className="p-12 space-y-8">
                                <div className="flex justify-between items-start">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                        <BrainCircuit className="w-8 h-8 text-primary" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-mono text-white/20 uppercase">Sinapsis Globales</p>
                                        <p className="text-3xl font-black text-white italic">4.2M+</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[75%] animate-pulse" />
                                    </div>
                                    <div className="flex justify-between text-[10px] font-mono text-white/30 uppercase">
                                        <span>Eficiencia de Red</span>
                                        <span>99.98%</span>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="ecosistema" className="px-12 py-32 space-y-20 relative z-10">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter">Ecosistema <span className="text-primary">Neural</span></h2>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">Cinco pilares de la nueva economía digital</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {[
                        { title: "Arquitectura", icon: Boxes, desc: "Estructura HEAD/BACKBONE/LIMB para escalabilidad infinita." },
                        { title: "Economía RI", icon: Zap, desc: "Tokenomics basados en actividad real y minería de hardware." },
                        { title: "Oráculo IA", icon: BrainCircuit, desc: "Análisis predictivo y forense integrado en cada sinapsis." },
                        { title: "Gobernanza", icon: Globe, desc: "Decisiones democráticas pesadas por reputación y mérito." },
                        { title: "Seguridad", icon: ShieldCheck, desc: "Sentinel Defense: Auditoría continua y encriptación neural." },
                    ].map((f, i) => (
                        <div key={f.title} className="glass-panel p-8 rounded-[2rem] border-white/5 hover:border-primary/20 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <f.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-sm font-black uppercase italic text-white mb-3 tracking-widest">{f.title}</h3>
                            <p className="text-xs text-white/40 leading-relaxed font-mono uppercase text-[10px] tracking-tight">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-12 py-32">
                <div className="max-w-7xl mx-auto rounded-[4rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-20 flex flex-col items-center text-center space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-20 opacity-5">
                        <Monitor className="w-64 h-64 text-white" />
                    </div>
                    <h2 className="text-5xl font-black uppercase italic tracking-tighter max-w-2xl leading-tight">
                        ¿Listo para formar parte de la <span className="text-primary">Red Inteligente</span>?
                    </h2>
                    <p className="text-sm text-white/40 font-mono uppercase tracking-[0.3em] max-w-xl">
                        Únete a miles de nodos que ya están transformando el tejido digital del mañana.
                    </p>
                    <Link href="/dashboard" className="px-16 py-8 rounded-2xl bg-primary text-black font-black uppercase italic tracking-[0.2em] text-lg hover:scale-105 transition-all shadow-[0_0_50px_rgba(0,255,255,0.4)]">
                        Acceder Ahora
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-12 py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-4 opacity-40">
                    <Hexagon className="w-5 h-5" />
                    <span className="text-[10px] font-mono uppercase tracking-widest">© 2026 Nexus Protocol. Todos los derechos reservados.</span>
                </div>
                <div className="flex gap-12 text-[9px] font-mono uppercase tracking-widest text-white/20">
                    <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                    <a href="#" className="hover:text-white transition-colors">Términos</a>
                    <a href="#" className="hover:text-white transition-colors">Github</a>
                </div>
            </footer>
        </div>
    );
}
