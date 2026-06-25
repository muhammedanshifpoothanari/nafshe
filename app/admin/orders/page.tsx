'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ArrowRight,
  Package,
  Trash2,
  Edit2,
  X,
  ShoppingCart,
  Layers
} from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [carts, setCarts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'carts'>('orders');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Status Modal State
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [statusForm, setStatusForm] = useState({
    status: 'Pending',
    trackingId: ''
  });

  const statuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];

  const fetchOrdersAndCarts = () => {
    setLoading(true);
    const getOrders = fetch('/api/orders').then(res => res.json());
    const getCarts = fetch('/api/carts').then(res => res.json());

    Promise.all([getOrders, getCarts])
      .then(([ordersData, cartsData]) => {
        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setCarts(Array.isArray(cartsData) ? cartsData : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders/carts:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrdersAndCarts();
  }, []);

  const handleUpdateOrderStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    fetch(`/api/orders/${selectedOrder.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(statusForm)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Order updated successfully!');
          setShowStatusModal(false);
          setSelectedOrder(null);
          fetchOrdersAndCarts();
        } else {
          alert(data.message || 'Failed to update order');
        }
      })
      .catch(err => {
        console.error('Error updating order:', err);
        alert('Error updating order');
      });
  };

  const handleDeleteOrder = (id: string) => {
    if (!confirm(`Are you sure you want to permanently delete order "${id}"?`)) return;

    fetch(`/api/orders/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Order deleted successfully!');
          fetchOrdersAndCarts();
        } else {
          alert(data.message || 'Failed to delete order');
        }
      })
      .catch(err => {
        console.error('Error deleting order:', err);
        alert('Error deleting order');
      });
  };

  const handleDeleteCart = (sessionId: string) => {
    if (!confirm('Dismiss this active/abandoned cart session?')) return;

    fetch(`/api/carts/${sessionId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Abandoned cart dismissed.');
          fetchOrdersAndCarts();
        } else {
          alert(data.message || 'Failed to delete cart');
        }
      })
      .catch(err => {
        console.error('Error deleting cart:', err);
        alert('Error deleting cart');
      });
  };

  // Filter logic
  const filteredOrders = orders.filter(order =>
    (filterStatus === 'All' || order.status === filterStatus) &&
    (order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.vendor?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredCarts = carts.filter(cart =>
    cart.sessionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cart.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* Brutalist Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
        <div className="space-y-3">
           <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Order & Cart <span className="text-white/20">Logistics</span></h1>
           <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
              Operational Manifest — Global Fulfilment & Active Cart Tracking
           </p>
        </div>
        <button 
          onClick={() => alert('Preparing order report export...')}
          className="px-10 py-5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center gap-4"
        >
          <Download className="w-4 h-4" />
          Export Manifest
        </button>
      </div>

      {/* Intelligence Dashboard (Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
        {[
          { label: 'Total Volume', value: orders.length, color: 'text-white' },
          { label: 'Awaiting Action', value: orders.filter(o => o.status === 'Pending').length, color: 'text-rose-500' },
          { label: 'Active/Abandoned Carts', value: carts.length, color: 'text-amber-500' },
          { label: 'Fulfilled Orders', value: orders.filter(o => o.status === 'Delivered').length, color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-black p-8 space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">{stat.label}</p>
            <p className={`text-4xl font-black font-mono tracking-tighter ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tab Switching */}
      <div className="flex gap-2 border-b border-white/10 pb-1">
        <button
          onClick={() => { setActiveTab('orders'); setSearchTerm(''); }}
          className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'border-b-2 border-white text-white' : 'text-white/40 hover:text-white'}`}
        >
          Active Orders ({orders.length})
        </button>
        <button
          onClick={() => { setActiveTab('carts'); setSearchTerm(''); }}
          className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'carts' ? 'border-b-2 border-white text-white' : 'text-white/40 hover:text-white'}`}
        >
          Abandoned Carts ({carts.length})
        </button>
      </div>

      {/* Orchestration Controls */}
      {activeTab === 'orders' ? (
        <div className="space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="FILTER BY ID, CLIENT, OR VENDOR..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white outline-none focus:border-white/30 transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-6 py-2 border transition-all text-[9px] font-black uppercase tracking-widest ${
                  filterStatus === status
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white/40 border-white/10 hover:border-white/30'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-white transition-colors" />
          <input
            type="text"
            placeholder="FILTER BY SESSION ID OR EMAIL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white outline-none focus:border-white/30 transition-all"
          />
        </div>
      )}

      {loading ? (
        <div className="min-h-[200px] flex items-center justify-center text-[10px] font-black tracking-[1em] text-white/20 uppercase animate-pulse">
           Connecting Logistics Vault...
        </div>
      ) : activeTab === 'orders' ? (
        /* Orders View */
        <div className="overflow-x-auto border border-white/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-[8px] uppercase tracking-[0.3em] font-black text-white/40 border-b border-white/10">
                <th className="px-8 py-5">Order Reference</th>
                <th className="px-8 py-5">Entity Chain</th>
                <th className="px-8 py-5">Valuation</th>
                <th className="px-8 py-5">Logistic Status</th>
                <th className="px-8 py-5">Timestamp</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-[9px] uppercase tracking-[0.3em] font-black text-white/20">
                     No orders match the manifest criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-white/5 transition-all group">
                    <td className="px-8 py-8 font-mono text-xs font-black text-white group-hover:text-accent transition-colors">{order.id}</td>
                    <td className="px-8 py-8">
                       <div className="space-y-1">
                          <p className="text-[11px] font-bold text-white uppercase">{order.customerName}</p>
                          <p className="text-[9px] font-medium text-white/40 lowercase leading-none">{order.customerEmail}</p>
                          <p className="text-[8px] font-black text-white/30 uppercase tracking-widest flex items-center gap-2 pt-1">
                             <ArrowRight className="w-2.5 h-2.5" />
                             {order.vendor}
                          </p>
                       </div>
                    </td>
                    <td className="px-8 py-8">
                       <p className="text-[11px] font-black text-white tracking-tighter">₹{order.amount?.toLocaleString()}</p>
                       <p className="text-[8px] font-bold text-white/20 uppercase mt-1">{order.items?.length || 0} Unique Items</p>
                    </td>
                    <td className="px-8 py-8">
                       <div className={`inline-flex items-center gap-2 px-3 py-1 border text-[8px] font-black uppercase tracking-widest ${
                          order.status === 'Delivered' ? 'border-green-500/30 text-green-500 bg-green-500/5' :
                          order.status === 'Processing' ? 'border-amber-500/30 text-amber-500 bg-amber-500/5' :
                          order.status === 'Shipped' ? 'border-blue-500/30 text-blue-500 bg-blue-500/5' :
                          'border-rose-500/30 text-rose-500 bg-rose-500/5'
                       }`}>
                          {order.status}
                       </div>
                       <p className="text-[7px] font-bold text-white/20 uppercase tracking-widest mt-1.5 font-mono">{order.trackingId || 'N/A'}</p>
                    </td>
                    <td className="px-8 py-8 text-[9px] font-bold text-white/40 uppercase tracking-widest font-mono">{order.date || order.createdAt?.split('T')?.[0]}</td>
                    <td className="px-8 py-8 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => {
                              setSelectedOrder(order);
                              setStatusForm({
                                status: order.status || 'Pending',
                                trackingId: order.trackingId || ''
                              });
                              setShowStatusModal(true);
                            }}
                            className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all"
                            title="Update status"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteOrder(order.id)}
                            className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-rose-500 hover:bg-rose-500 text-white transition-all"
                            title="Delete/Cancel order"
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
      ) : (
        /* Abandoned Carts View */
        <div className="overflow-x-auto border border-white/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-[8px] uppercase tracking-[0.3em] font-black text-white/40 border-b border-white/10">
                <th className="px-8 py-5">Session Identifier</th>
                <th className="px-8 py-5">Captured Email</th>
                <th className="px-8 py-5">Cart Contents</th>
                <th className="px-8 py-5">Valuation</th>
                <th className="px-8 py-5">Last Activity</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCarts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-[9px] uppercase tracking-[0.3em] font-black text-white/20">
                     No active abandoned carts found.
                  </td>
                </tr>
              ) : (
                filteredCarts.map(cart => (
                  <tr key={cart.sessionId} className="hover:bg-white/5 transition-all group">
                    <td className="px-8 py-8 font-mono text-xs font-black text-white/70">{cart.sessionId}</td>
                    <td className="px-8 py-8 text-xs font-bold text-white uppercase">{cart.email || <span className="text-white/20 italic">Anonymous Guest</span>}</td>
                    <td className="px-8 py-8 max-w-xs">
                       <div className="flex flex-col gap-1">
                          {cart.items?.map((item: any, idx: number) => (
                            <p key={idx} className="text-[10px] text-white/60 truncate uppercase">
                               • {item.name} <span className="text-white/30">({item.brand})</span> x{item.quantity}
                            </p>
                          ))}
                          {(!cart.items || cart.items.length === 0) && (
                             <p className="text-[10px] text-white/20 italic">Empty Basket</p>
                          )}
                       </div>
                    </td>
                    <td className="px-8 py-8 font-mono text-xs font-black text-white">₹{cart.total?.toLocaleString()}</td>
                    <td className="px-8 py-8 text-[9px] font-bold text-white/40 uppercase tracking-widest font-mono">
                       {new Date(cart.updatedAt).toLocaleString()}
                    </td>
                    <td className="px-8 py-8 text-right">
                       <button 
                         onClick={() => handleDeleteCart(cart.sessionId)}
                         className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-rose-500 hover:bg-rose-500 text-white transition-all ml-auto"
                         title="Dismiss abandoned cart"
                       >
                         <Trash2 className="w-3.5 h-3.5" />
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Order Status Dialog */}
      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-md bg-black border border-white/20 shadow-2xl p-10 space-y-8 relative text-white">
              <div className="absolute top-0 right-0 p-6">
                 <button onClick={() => { setShowStatusModal(false); setSelectedOrder(null); }} className="text-white/40 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              <div className="space-y-2">
                 <h3 className="text-lg font-black uppercase tracking-tight text-white">Update Logistics Status</h3>
                 <p className="text-[9px] uppercase tracking-widest text-white/40">Adjust routing state for order {selectedOrder.id}</p>
              </div>

              <form onSubmit={handleUpdateOrderStatus} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Operational Status</label>
                    <select
                       value={statusForm.status}
                       onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}
                       className="w-full px-4 py-3 bg-black border border-white/10 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-white/40 transition-all appearance-none cursor-pointer rounded-none"
                    >
                       <option value="Pending">Pending</option>
                       <option value="Processing">Processing</option>
                       <option value="Shipped">Shipped</option>
                       <option value="Delivered">Delivered</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Consignment Tracking ID</label>
                    <input
                       type="text"
                       value={statusForm.trackingId}
                       onChange={(e) => setStatusForm({ ...statusForm, trackingId: e.target.value })}
                       placeholder="e.g. TRK990184"
                       className="w-full px-4 py-3 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                    />
                 </div>

                 <div className="flex gap-4 pt-4 border-t border-white/10">
                    <button
                       type="submit"
                       className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-neutral-200 transition-all"
                    >
                       Apply Changes
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

    </div>
  );
}
