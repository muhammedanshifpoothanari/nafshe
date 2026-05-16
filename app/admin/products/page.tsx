'use client';

import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  AlertTriangle, 
  Package, 
  Barcode, 
  Layers,
  ArrowRight,
  X
} from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'Nike Air Force 1 Premium', sku: 'NIKE-AF1-001', vendor: 'Luxury Brands Co', price: '₹1,299', stock: 45, status: 'Active', category: 'Shoes' },
  { id: 2, name: 'Louis Vuitton Tote', sku: 'LV-TOTE-001', vendor: 'Fashion House', price: '₹8,500', stock: 8, status: 'Active', category: 'Bags' },
  { id: 3, name: 'Air Jordan 1 Retro', sku: 'AJ-RT-001', vendor: 'Premium Store', price: '₹2,499', stock: 2, status: 'Low Stock', category: 'Shoes' },
  { id: 4, name: 'Luxury Automatic Watch', sku: 'LAW-AUTO-001', vendor: 'Designer Collective', price: '₹45,000', stock: 15, status: 'Active', category: 'Watches' },
  { id: 5, name: 'Designer Sunglasses', sku: 'DES-SUN-001', vendor: 'Trend Setters', price: '₹3,500', stock: 0, status: 'Out of Stock', category: 'Accessories' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* Brutalist Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
        <div className="space-y-3">
           <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Inventory <span className="text-white/20">Control</span></h1>
           <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
              SKU Management & Asset Provisioning Gateway
           </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-all flex items-center gap-4 shadow-2xl shadow-white/5"
        >
          <Plus className="w-4 h-4" />
          Provision New Asset
        </button>
      </div>

      {/* Intelligence Grid (Alerts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 border border-white/10">
         <div className="lg:col-span-8 bg-black p-8 flex items-center gap-6">
            <div className="w-12 h-12 border border-amber-500/30 bg-amber-500/5 flex items-center justify-center">
               <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Stock Threshold Violation</h3>
               <p className="text-[9px] text-white/40 uppercase tracking-widest mt-1">2 Nodes below critical level. 1 Node exhausted.</p>
            </div>
         </div>
         <div className="lg:col-span-4 bg-black p-8 flex items-center justify-between group cursor-crosshair">
            <div>
               <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Total Asset Valuation</p>
               <p className="text-xl font-black font-mono tracking-tighter text-white group-hover:text-accent transition-colors">₹1,24,50,000</p>
            </div>
            <Layers className="w-6 h-6 text-white/10 group-hover:text-white transition-all" />
         </div>
      </div>

      {/* Orchestration Controls */}
      <div className="relative group">
         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-white transition-colors" />
         <input
           type="text"
           placeholder="SEARCH BY IDENTIFIER OR SKU..."
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white outline-none focus:border-white/30 transition-all"
         />
      </div>

      {/* Asset Manifest (Table) */}
      <div className="overflow-x-auto border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-[8px] uppercase tracking-[0.3em] font-black text-white/40 border-b border-white/10">
              <th className="px-8 py-5">Asset Description</th>
              <th className="px-8 py-5">SKU / Origin</th>
              <th className="px-8 py-5">Unit Valuation</th>
              <th className="px-8 py-5">Availability</th>
              <th className="px-8 py-5">State</th>
              <th className="px-8 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredProducts.map(product => (
              <tr key={product.id} className="hover:bg-white/5 transition-all group">
                <td className="px-8 py-8">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-white transition-colors">
                         <Package className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[11px] font-bold text-white uppercase">{product.name}</p>
                         <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">{product.category}</p>
                      </div>
                   </div>
                </td>
                <td className="px-8 py-8">
                   <p className="text-[10px] font-mono font-bold text-white/60 uppercase">{product.sku}</p>
                   <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1 flex items-center gap-2">
                      <ArrowRight className="w-2.5 h-2.5" />
                      {product.vendor}
                   </p>
                </td>
                <td className="px-8 py-8 text-xs font-black font-mono tracking-tighter text-white">{product.price}</td>
                <td className="px-8 py-8">
                   <p className={`text-xs font-black font-mono tracking-tighter ${
                     product.stock === 0 ? 'text-rose-500' : 
                     product.stock < 5 ? 'text-amber-500' : 'text-white'
                   }`}>
                     {product.stock} <span className="text-[8px] font-bold text-white/20">Units</span>
                   </p>
                </td>
                <td className="px-8 py-8">
                   <div className={`inline-flex items-center gap-2 px-3 py-1 border text-[8px] font-black uppercase tracking-widest ${
                     product.status === 'Active' ? 'border-green-500/30 text-green-500' :
                     product.status === 'Low Stock' ? 'border-amber-500/30 text-amber-500' : 'border-rose-500/30 text-rose-500'
                   }`}>
                      {product.status}
                   </div>
                </td>
                <td className="px-8 py-8 text-right">
                   <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-white hover:bg-white hover:text-black transition-all">
                         <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-rose-500 hover:bg-rose-500 text-white transition-all">
                         <Trash2 className="w-3.5 h-3.5" />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Provisioning Dialog (Overlay) */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-black border border-white/20 shadow-2xl p-12 space-y-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                 <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                 </button>
              </div>
              
              <div className="space-y-3">
                 <h2 className="text-2xl font-black uppercase tracking-tighter">Asset <span className="text-white/20 italic">Provisioning</span></h2>
                 <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/40">Inventory Registration Protocol</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert('Asset provisioned successfully.'); setShowForm(false); }} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 md:col-span-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Product Identifier (Full Name)</label>
                       <input
                          type="text"
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Classification</label>
                       <select className="w-full px-4 py-4 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-white/40 transition-all appearance-none">
                          <option>Shoes</option>
                          <option>Bags</option>
                          <option>Watches</option>
                          <option>Accessories</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Base Valuation (₹)</label>
                       <input
                          type="number"
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Initial Intake Quantity</label>
                       <input
                          type="number"
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Godown Assignment</label>
                       <div className="p-4 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 italic">
                          Automatic Node Selection
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4 text-white/40">
                       <Barcode className="w-5 h-5 text-white/20" />
                       <p className="text-[9px] uppercase tracking-widest leading-relaxed">
                          Provisioning will generate a new <span className="text-white">Universal Barcode</span> and initiate a <span className="text-white">Godown Intake Request</span>.
                       </p>
                    </div>
                    <button
                       type="submit"
                       className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all"
                    >
                       Provision Asset
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
