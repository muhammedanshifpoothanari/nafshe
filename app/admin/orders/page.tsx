'use client';

import { useState } from 'react';
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
  Package
} from 'lucide-react';

const ORDERS = [
  { id: '#12345', customer: 'Priya Singh', vendor: 'Luxury Brands Co', amount: '₹25,000', items: 3, status: 'Delivered', date: '2024-05-12', trackingId: 'TRK123456' },
  { id: '#12344', customer: 'Anjali Sharma', vendor: 'Fashion House', amount: '₹15,500', items: 2, status: 'Processing', date: '2024-05-11', trackingId: 'TRK123455' },
  { id: '#12343', customer: 'Zara Khan', vendor: 'Premium Store', amount: '₹8,900', items: 1, status: 'Pending', date: '2024-05-10', trackingId: 'TRK123454' },
  { id: '#12342', customer: 'Neha Patel', vendor: 'Luxury Brands Co', amount: '₹32,100', items: 4, status: 'Shipped', date: '2024-05-09', trackingId: 'TRK123453' },
  { id: '#12341', customer: 'Deepa Verma', vendor: 'Designer Collective', amount: '₹18,700', items: 2, status: 'Delivered', date: '2024-05-08', trackingId: 'TRK123452' },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const statuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];

  const filteredOrders = orders.filter(order =>
    (filterStatus === 'All' || order.status === filterStatus) &&
    (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.vendor.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* Brutalist Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
        <div className="space-y-3">
           <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Order <span className="text-white/20">Logistics</span></h1>
           <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
              Operational Manifest — Global Fulfilment Tracking
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
          { label: 'In-Transit', value: orders.filter(o => o.status === 'Shipped').length, color: 'text-blue-500' },
          { label: 'Fulfilled', value: orders.filter(o => o.status === 'Delivered').length, color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-black p-8 space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">{stat.label}</p>
            <p className={`text-4xl font-black font-mono tracking-tighter ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Orchestration Controls */}
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

      {/* Logistic Manifest (Table) */}
      <div className="overflow-x-auto border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-[8px] uppercase tracking-[0.3em] font-black text-white/40 border-b border-white/10">
              <th className="px-8 py-5">Order Reference</th>
              <th className="px-8 py-5">Entity Chain</th>
              <th className="px-8 py-5">Valuation</th>
              <th className="px-8 py-5">Logistic Status</th>
              <th className="px-8 py-5">Timestamp</th>
              <th className="px-8 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-white/5 transition-all group">
                <td className="px-8 py-8 font-mono text-xs font-black text-white group-hover:text-accent transition-colors">{order.id}</td>
                <td className="px-8 py-8">
                   <div className="space-y-1">
                      <p className="text-[11px] font-bold text-white uppercase">{order.customer}</p>
                      <p className="text-[8px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                         <ArrowRight className="w-2.5 h-2.5" />
                         {order.vendor}
                      </p>
                   </div>
                </td>
                <td className="px-8 py-8">
                   <p className="text-[11px] font-black text-white tracking-tighter">{order.amount}</p>
                   <p className="text-[8px] font-bold text-white/20 uppercase mt-1">{order.items} Units</p>
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
                   <p className="text-[7px] font-bold text-white/20 uppercase tracking-widest mt-1.5 font-mono">{order.trackingId}</p>
                </td>
                <td className="px-8 py-8 text-[9px] font-bold text-white/40 uppercase tracking-widest font-mono">{order.date}</td>
                <td className="px-8 py-8 text-right">
                   <button 
                     onClick={() => alert('Initiating Deep-Link Order Analysis...')}
                     className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all"
                   >
                     <Eye className="w-3.5 h-3.5" />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
