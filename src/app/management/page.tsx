"use client";

import { useState, useEffect } from "react";
import { nodesApi } from "@/lib/api";
import { 
  Package, 
  ShoppingCart, 
  Plus, 
  ArrowRight, 
  Layers,
  Activity
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function ManagementPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory'); // inventory | sales

  // Form states
  const [productForm, setProductForm] = useState({ name: '', price: 0, stock: 0 });
  const [saleForm, setSaleForm] = useState({ productId: '', quantity: 1 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const nodes = await nodesApi.getNodes();
      setProducts(nodes.filter(n => n.type === 'INVENTORY'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await nodesApi.addInventory(productForm);
      setProductForm({ name: '', price: 0, stock: 0 });
      fetchProducts();
      alert("Neurona de Inventario Creada");
    } catch (err) {
      alert("Error al crear neurona");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecordSale = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const selectedProduct = products.find(p => p.id === saleForm.productId);
      if (!selectedProduct) return;

      await nodesApi.recordSale({
        productId: saleForm.productId,
        quantity: saleForm.quantity,
        total: selectedProduct.data.price * saleForm.quantity
      });
      
      setSaleForm({ productId: '', quantity: 1 });
      fetchProducts();
      alert("Sinapsis de Venta y Finanzas Ejecutada");
    } catch (err) {
      alert("Error en la transacción");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tighter text-white uppercase neon-text">
          Gestión de Biomasa (Recursos)
        </h1>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-primary text-primary-foreground' : 'text-white/40'}`}
          >
            Inventario
          </button>
          <button 
            onClick={() => setActiveTab('sales')}
            className={`px-4 py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all ${activeTab === 'sales' ? 'bg-secondary text-white' : 'text-white/40'}`}
          >
            Ventas
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Forms Section */}
        <div className="space-y-8">
          {activeTab === 'inventory' ? (
            <div className="glass-card border-primary/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Package className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-mono uppercase tracking-widest text-white">Nueva Neurona de Inventario</h2>
              </div>
              
              <form onSubmit={handleAddProduct} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase text-white/40 ml-1">Nombre del Recurso</label>
                  <input 
                    type="text" 
                    value={productForm.name}
                    onChange={e => setProductForm({...productForm, name: e.target.value})}
                    className="input-field" 
                    placeholder="E.G. CHIP NEURAL"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase text-white/40 ml-1">Valor Unitario</label>
                    <input 
                      type="number" 
                      value={productForm.price}
                      onChange={e => setProductForm({...productForm, price: parseFloat(e.target.value)})}
                      className="input-field" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase text-white/40 ml-1">Stock Inicial</label>
                    <input 
                      type="number" 
                      value={productForm.stock}
                      onChange={e => setProductForm({...productForm, stock: parseInt(e.target.value)})}
                      className="input-field" 
                    />
                  </div>
                </div>
                <button type="submit" disabled={isLoading} className="btn-primary">
                  {isLoading ? 'Sincronizando...' : 'Inyectar Neurona'}
                </button>
              </form>
            </div>
          ) : (
            <div className="glass-card border-secondary/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-mono uppercase tracking-widest text-white">Disparar Sinapsis de Venta</h2>
              </div>
              
              <form onSubmit={handleRecordSale} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase text-white/40 ml-1">Seleccionar Recurso</label>
                  <select 
                    value={saleForm.productId}
                    onChange={e => setSaleForm({...saleForm, productId: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Seleccione un producto...</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.data.name} ({p.data.stock} disp.)</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase text-white/40 ml-1">Cantidad de Intercambio</label>
                  <input 
                    type="number" 
                    value={saleForm.quantity}
                    onChange={e => setSaleForm({...saleForm, quantity: parseInt(e.target.value)})}
                    className="input-field" 
                  />
                </div>
                <button type="submit" disabled={isLoading} className="btn-secondary bg-secondary/20 border-secondary/40 hover:bg-secondary/30">
                  {isLoading ? 'Procesando...' : 'Ejecutar Transacción'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Live Visualizer */}
        <div className="space-y-8">
          <div className="glass-card h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-mono uppercase tracking-widest text-white/60 flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> Visualizador de Células
              </h3>
              <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">Live Sync</span>
            </div>
            
            <div className="flex-1 space-y-4">
              {products.length === 0 && (
                <div className="h-full flex items-center justify-center text-white/20 font-mono text-xs italic">
                  Esperando inyección de datos...
                </div>
              )}
              {products.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                      <Layers className="w-5 h-5 text-primary/60" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white uppercase tracking-tight">{p.data.name}</p>
                      <p className="text-[10px] font-mono text-white/40">ID: {p.id.substring(0, 8)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{formatCurrency(p.data.price)}</p>
                    <p className="text-[10px] font-mono text-white/40">{p.data.stock} Unidades</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
