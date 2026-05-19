"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { 
  ArrowLeft, BrainCircuit, Activity, Sparkles, RefreshCw
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

// The NeuralNetwork component that runs inside the R3F Canvas
const NeuralNetwork = ({ topology }: { topology: any[] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Use useFrame to rotate the network continuously
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  // Calculate lines between close nodes
  const lines = useMemo(() => {
    const connections: [THREE.Vector3, THREE.Vector3][] = [];
    const maxDist = 200; // Distance threshold for synapses
    for (let i = 0; i < topology.length; i++) {
      for (let j = i + 1; j < Math.min(i + 5, topology.length); j++) {
        const p1 = topology[i];
        const p2 = topology[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = p1.z - p2.z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < maxDist) {
          connections.push([
            new THREE.Vector3(p1.x, p1.y, p1.z),
            new THREE.Vector3(p2.x, p2.y, p2.z)
          ]);
        }
      }
    }
    return connections;
  }, [topology]);

  return (
    <group ref={groupRef}>
      {/* Draw Nodes */}
      {topology.map((node) => (
        <group key={node.id} position={[node.x, node.y, node.z]}>
          <Sphere args={[4, 16, 16]}>
            <meshStandardMaterial 
              color={node.type === 'SALE' ? '#000000' : '#444444'} 
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        </group>
      ))}

      {/* Draw Synapses (Lines) */}
      {lines.map((line, idx) => (
        <Line 
          key={idx}
          points={line}
          color="black"
          lineWidth={1}
          transparent
          opacity={0.2}
        />
      ))}

      {/* Background ambient particles */}
      {topology.length < 20 && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(300).map(() => (Math.random() - 0.5) * 1000), 3]}
            />
          </bufferGeometry>
          <pointsMaterial size={2} color="#000000" sizeAttenuation transparent opacity={0.1} />
        </points>
      )}
    </group>
  );
};

export default function CortexPage() {
  const router = useRouter();
  const [topology, setTopology] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTopology();
    const interval = setInterval(fetchTopology, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchTopology = async () => {
    try {
      // Intentar obtener de la API
      const response = await fetch('http://localhost:3001/cortex/topology').catch(() => null);
      if (response && response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setTopology(data);
          setIsLoading(false);
          return;
        }
      }
      
      // Fallback Mock Topology para demostrar el Obelisco 3D si la API no está corriendo
      const mockData = Array.from({ length: 60 }).map((_, i) => ({
        id: `node-${i}`,
        type: i % 5 === 0 ? 'SALE' : 'NEURON',
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 800,
        z: (Math.random() - 0.5) * 800,
      }));
      setTopology(mockData);
    } catch (err) {
      console.error("Error fetching topology:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden relative font-sans">
      <div className="absolute inset-0 neural-grid opacity-5 pointer-events-none" />
      
      {/* WebGL 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 800], fov: 60 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[100, 100, 100]} intensity={2} />
          <NeuralNetwork topology={topology} />
          <OrbitControls 
            enableZoom={true} 
            enablePan={true} 
            enableRotate={true}
            autoRotate={false}
            maxDistance={2000}
            minDistance={100}
          />
        </Canvas>
      </div>

      <div className="relative z-10 p-12 flex justify-between items-start pointer-events-none">
        <div className="space-y-4 pointer-events-auto">
           <button 
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-black border-2 border-black px-6 py-3 rounded-2xl hover:bg-black hover:text-white transition-all uppercase font-black text-[12px] tracking-widest group shadow-xl bg-white/80 backdrop-blur-md"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Volver al Obelisco
          </button>
          <div className="flex items-center gap-3">
             <BrainCircuit className="w-8 h-8 text-black animate-pulse" />
             <h1 className="text-6xl font-black tracking-tighter uppercase italic text-black drop-shadow-sm">
               Cortex <span className="text-black/20">3D</span>
             </h1>
          </div>
          <div className="flex items-center gap-4">
             <p className="text-[12px] font-mono font-black uppercase tracking-[0.4em] bg-black text-white px-4 py-1.5 rounded-full inline-block shadow-md">
               Motor WebGL
             </p>
             <div className="flex items-center gap-2">
                <RefreshCw className={cn("w-3 h-3 animate-spin", isLoading && "text-black")} />
                <span className="text-[10px] font-mono font-black uppercase tracking-widest">Sincronizando...</span>
             </div>
          </div>
        </div>

        <div className="flex gap-4 pointer-events-auto">
           <div className="glass-panel px-8 py-6 rounded-[2rem] border-2 border-black/10 bg-white/80 backdrop-blur-md shadow-xl">
              <p className="text-[10px] font-mono font-black text-black/40 uppercase tracking-widest">Masa Neural</p>
              <p className="text-2xl font-black text-black italic">{topology.length}.0</p>
           </div>
           <div className="glass-panel px-8 py-6 rounded-[2rem] border-2 border-black/10 bg-white/80 backdrop-blur-md shadow-xl">
              <p className="text-[10px] font-mono font-black text-black/40 uppercase tracking-widest">Estado Obelisco</p>
              <p className="text-2xl font-black text-black italic">CONECTADO</p>
           </div>
        </div>
      </div>

      {/* Floating Dynamic Panels */}
      <div className="absolute inset-0 z-5 pointer-events-none">
          <div 
            className="absolute top-[30%] left-[8%] glass-panel p-10 rounded-[3rem] border-2 border-black w-80 pointer-events-auto hover:scale-105 transition-all shadow-2xl bg-white/60 backdrop-blur-lg"
            style={{ transform: 'perspective(1200px) rotateY(15deg)' }}
          >
             <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6 text-black" />
                <h3 className="text-sm font-black uppercase italic tracking-widest">Flujo de Sinapsis</h3>
             </div>
             <div className="space-y-6">
                {topology.slice(-3).reverse().map((t, i) => (
                    <div key={i} className="flex justify-between items-center pb-4 border-b border-black/5">
                        <span className="text-[10px] font-mono font-black uppercase text-black/40">{t.type}</span>
                        <span className="text-[10px] font-mono font-black text-black">{t.id.substring(0, 8)}</span>
                    </div>
                ))}
                {topology.length === 0 && <p className="text-[10px] font-mono font-black text-black/20 italic">Esperando sinapsis...</p>}
             </div>
          </div>

          <div 
            className="absolute bottom-[15%] right-[8%] glass-panel p-10 rounded-[3rem] border-2 border-black w-96 pointer-events-auto hover:scale-105 transition-all shadow-2xl bg-white/60 backdrop-blur-lg"
            style={{ transform: 'perspective(1200px) rotateY(-15deg)' }}
          >
             <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-black" />
                <h3 className="text-sm font-black uppercase italic tracking-widest">La Providencia</h3>
             </div>
             <p className="text-[11px] font-mono font-black text-black leading-relaxed italic">
                SISTEMA: La topología neural se está reconfigurando en el espacio tridimensional. Detectadas {topology.length} unidades de complejo. El motor WebGL mantiene la coherencia cuántica.
             </p>
          </div>
      </div>

      {/* Control Bar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-4 bg-white/80 backdrop-blur-xl p-3 rounded-[2.5rem] border-2 border-black shadow-2xl pointer-events-auto">
         {['Rotación Libre', 'Fijar Nodo', 'Filtro Tipo', 'Exportar'].map(label => (
           <button key={label} className="px-8 py-4 rounded-[1.8rem] bg-white border-2 border-black/10 text-[9px] font-black uppercase tracking-[0.2em] hover:border-black hover:bg-black hover:text-white transition-all italic">
             {label}
           </button>
         ))}
      </div>

      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-100/50 via-transparent to-gray-200/50" />
        <div className="noise-overlay" />
      </div>
    </div>
  );
}
