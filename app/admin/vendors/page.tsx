'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Shield, 
  Activity, 
  ArrowUpRight,
  Filter,
  X,
  CreditCard,
  Building
} from 'lucide-react';

const VENDORS = [
  { 
    id: 1, 
    name: 'Luxury Brands Co', 
    email: 'luxury@example.com', 
    category: 'Premium Fashion', 
    sales: '₹12,50,000', 
    status: 'Active', 
    sync: 'Synchronized', 
    tier: 'Maison Tier 1' 
  },
  { 
    id: 2, 
    name: 'Fashion House', 
    email: 'fashion@example.com', 
    category: 'Casual Wear', 
    sales: '₹8,75,000', 
    status: 'Active', 
    sync: 'Active', 
    tier: 'Standard' 
  },
  { 
    id: 3, 
    name: 'Premium Store', 
    email: 'premium@example.com', 
    category: 'Accessories', 
    sales: '₹5,40,000', 
    status: 'Pending', 
    sync: 'Disconnected', 
    tier: 'Evaluating' 
  },
  { 
    id: 4, 
    name: 'Designer Collective', 
    email: 'designer@example.com', 
    category: 'High Fashion', 
    sales: '₹15,30,000', 
    status: 'Active', 
    sync: 'Synchronized', 
    tier: 'Maison Tier 1' 
  },
];

function VendorsContent() {
  const searchParams = useSearchParams();
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState<any>(null);

  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    category: '',
    bankAccount: '',
    taxId: '',
    commissionRate: '15',
    status: 'Pending',
    sync: 'Provisioning',
    tier: 'Standard'
  });

  useEffect(() => {
    fetch('/api/vendors')
      .then(res => res.json())
      .then(data => {
        setVendors(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching vendors:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchParams.get('open') === 'true') {
      setShowForm(true);
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    bankAccount: '',
    taxId: '',
    commissionRate: '15',
  });

  const filteredVendors = vendors.filter(v => 
    v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    
    fetch('/api/vendors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.vendor) {
          setVendors([data.vendor, ...vendors]);
          setFormData({ name: '', email: '', category: '', bankAccount: '', taxId: '', commissionRate: '15' });
          setShowForm(false);
        } else {
          alert(data.message || 'Failed to provision vendor');
        }
      })
      .catch(err => {
        console.error('Error registering vendor:', err);
        alert('Failed to register vendor');
      });
  };

  const handleEditVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVendor) return;

    fetch(`/api/vendors/${editingVendor.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFormData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.vendor) {
          setVendors(prev => prev.map(v => v.id === editingVendor.id ? data.vendor : v));
          setShowEditForm(false);
          setEditingVendor(null);
          alert('Vendor details updated successfully!');
        } else {
          alert(data.message || 'Failed to update vendor');
        }
      })
      .catch(err => {
        console.error('Error updating vendor:', err);
        alert('Failed to update vendor');
      });
  };

  const handleDeleteVendor = (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete vendor "${name}"? This will also remove their synchronization nodes.`)) return;

    fetch(`/api/vendors/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setVendors(prev => prev.filter(v => v.id !== id));
          alert('Vendor deleted successfully!');
        } else {
          alert(data.message || 'Failed to delete vendor');
        }
      })
      .catch(err => {
        console.error('Error deleting vendor:', err);
        alert('Failed to delete vendor');
      });
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* Brutalist Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
        <div className="space-y-3">
           <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Vendor <span className="text-white/20">Registrations</span></h1>
           <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
              Provisioning & Lifecycle Management for Global Partners
           </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-all flex items-center gap-4 shadow-2xl shadow-white/5"
        >
          <Plus className="w-4 h-4" />
          Provision New Vendor
        </button>
      </div>

      {/* Advanced Orchestration Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
         <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="SEARCH PARTNER NETWORK..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-all"
            />
         </div>
         <button className="px-8 py-5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all flex items-center gap-3">
            <Filter className="w-4 h-4" />
            Filters
         </button>
      </div>

      {/* Vendor Grid Table */}
      <div className="overflow-x-auto border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-[8px] uppercase tracking-[0.3em] font-black text-white/40 border-b border-white/10">
              <th className="px-8 py-5">Partner Identifier</th>
              <th className="px-8 py-5">Classification</th>
              <th className="px-8 py-5">System Sync</th>
              <th className="px-8 py-5">Cumulative Revenue</th>
              <th className="px-8 py-5">Compliance</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-20 text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">
                  Synchronizing Partner Directory...
                </td>
              </tr>
            ) : filteredVendors.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-20 text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">
                  No partners registered.
                </td>
              </tr>
            ) : (
              filteredVendors.map(vendor => (
                <tr key={vendor.id} className="hover:bg-white/5 transition-all group cursor-pointer">
                  <td className="px-8 py-8">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white group-hover:bg-white group-hover:text-black transition-all">
                           {vendor.name ? vendor.name.charAt(0) : 'V'}
                        </div>
                        <div className="space-y-1">
                           <p className="text-xs font-black text-white uppercase tracking-wider">{vendor.name}</p>
                           <p className="text-[9px] font-bold text-white/30 lowercase group-hover:text-white/60 transition-colors">{vendor.email}</p>
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-8">
                     <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{vendor.category}</p>
                     <p className="text-[8px] font-black text-accent uppercase tracking-[0.2em] mt-1 italic">{vendor.tier}</p>
                  </td>
                  <td className="px-8 py-8">
                     <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-none ${
                          vendor.sync === 'Synchronized' ? 'bg-green-500' : 
                          vendor.sync === 'Active' ? 'bg-blue-500' : 'bg-white/20'
                        }`} />
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{vendor.sync}</span>
                     </div>
                  </td>
                  <td className="px-8 py-8 text-xs font-black font-mono tracking-tighter text-white">{vendor.sales}</td>
                  <td className="px-8 py-8">
                     <div className={`inline-flex items-center gap-2 px-3 py-1 text-[8px] font-black uppercase tracking-widest border ${
                       vendor.status === 'Active' ? 'border-green-500/30 text-green-500' : 'border-amber-500/30 text-amber-500'
                     }`}>
                        {vendor.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {vendor.status}
                     </div>
                  </td>
                  <td className="px-8 py-8 text-right">
                     <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             setEditingVendor(vendor);
                             setEditFormData({
                               name: vendor.name || '',
                               email: vendor.email || '',
                               category: vendor.category || '',
                               bankAccount: vendor.bankAccount || '',
                               taxId: vendor.taxId || '',
                               commissionRate: vendor.commissionRate?.toString() || '15',
                               status: vendor.status || 'Pending',
                               sync: vendor.sync || 'Provisioning',
                               tier: vendor.tier || 'Standard'
                             });
                             setShowEditForm(true);
                           }}
                           className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-white hover:bg-white hover:text-black transition-all"
                           title="Edit Vendor details"
                        >
                           <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             handleDeleteVendor(vendor.id, vendor.name);
                           }}
                           className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-rose-500 hover:bg-rose-500 text-white transition-all"
                           title="Delete Vendor node"
                        >
                           <Trash2 className="w-3.5 h-3.5" />
                        </button>
                     </div>
                  </td>
                </tr>
              ))
            )}
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
                 <h2 className="text-2xl font-black uppercase tracking-tighter">Partner <span className="text-white/20 italic">Provisioning</span></h2>
                 <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/40">Secure Node Registration Protocol</p>
              </div>

              <form onSubmit={handleAddVendor} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Legal Business Entity</label>
                       <div className="relative group">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          <input
                             type="text"
                             value={formData.name}
                             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                             className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                             required
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Operational Gateway (Email)</label>
                       <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Product Classification</label>
                       <input
                          type="text"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Node Commission Rate (%)</label>
                       <input
                          type="number"
                          value={formData.commissionRate}
                          onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                 </div>

                 <div className="space-y-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4 text-white/40">
                       <Shield className="w-5 h-5" />
                       <p className="text-[9px] uppercase tracking-widest leading-relaxed">
                          By provisioning this node, you certify that the partner has passed initial <span className="text-white">Godown Compliance</span> and is eligible for <span className="text-white">Net-30 Settlement</span>.
                       </p>
                    </div>
                    <div className="flex gap-4">
                       <button
                          type="submit"
                          className="flex-1 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all"
                       >
                          Complete Registration
                       </button>
                    </div>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Edit Vendor Dialog (Overlay) */}
      {showEditForm && editingVendor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-black border border-white/20 shadow-2xl p-12 space-y-12 relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 p-8">
                 <button onClick={() => { setShowEditForm(false); setEditingVendor(null); }} className="text-white/40 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                 </button>
              </div>
              
              <div className="space-y-3">
                 <h2 className="text-2xl font-black uppercase tracking-tighter">Edit Vendor <span className="text-white/20 italic">Node</span></h2>
                 <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/40">Modify Entity Configuration for {editingVendor.name}</p>
              </div>

              <form onSubmit={handleEditVendor} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Legal Entity Name</label>
                       <input
                          type="text"
                          value={editFormData.name}
                          onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Operational Gateway (Email)</label>
                       <input
                          type="email"
                          value={editFormData.email}
                          onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Category</label>
                       <input
                          type="text"
                          value={editFormData.category}
                          onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Commission Rate (%)</label>
                       <input
                          type="number"
                          value={editFormData.commissionRate}
                          onChange={(e) => setEditFormData({ ...editFormData, commissionRate: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Maison Tier</label>
                       <select
                          value={editFormData.tier}
                          onChange={(e) => setEditFormData({ ...editFormData, tier: e.target.value })}
                          className="w-full px-4 py-3 bg-black border border-white/10 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-white/40 transition-all appearance-none cursor-pointer rounded-none"
                       >
                          <option value="Standard">Standard</option>
                          <option value="Maison Tier 1">Maison Tier 1</option>
                          <option value="Evaluating">Evaluating</option>
                          <option value="HQ Brand">HQ Brand</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Compliance Status</label>
                       <select
                          value={editFormData.status}
                          onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                          className="w-full px-4 py-3 bg-black border border-white/10 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-white/40 transition-all appearance-none cursor-pointer rounded-none"
                       >
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Suspended">Suspended</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Tax Identifier (Tax ID)</label>
                       <input
                          type="text"
                          value={editFormData.taxId}
                          onChange={(e) => setEditFormData({ ...editFormData, taxId: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-xs font-mono text-white outline-none focus:border-white/40 transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Routing Bank Account (IBAN)</label>
                       <input
                          type="text"
                          value={editFormData.bankAccount}
                          onChange={(e) => setEditFormData({ ...editFormData, bankAccount: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-xs font-mono text-white outline-none focus:border-white/40 transition-all"
                       />
                    </div>
                 </div>

                 <div className="space-y-6 pt-6 border-t border-white/10">
                    <button
                       type="submit"
                       className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all"
                    >
                       Save Configuration Changes
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}

export default function VendorsPage() {
  return (
    <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-[10px] font-black tracking-[1em] text-white/20 uppercase animate-pulse">Initializing Hub...</div>}>
      <VendorsContent />
    </Suspense>
  );
}
