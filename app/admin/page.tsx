'use client';

import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Clock,
  ArrowRight,
  Plus,
  Settings
} from 'lucide-react';
import Link from 'next/link';

const STATS = [
  { label: 'Market Revenue', value: '₹45,23,000', change: '+18.7%', detail: 'Vs Last Month' },
  { label: 'Active Vendors', value: '156', change: '+8.2%', detail: 'Global Network' },
  { label: 'Total Orders', value: '1,234', change: '+12.5%', detail: 'Processing 12/h' },
  { label: 'SKU Inventory', value: '3,847', change: '+5.1%', detail: 'Godown Integrated' },
];

const RECENT_ORDERS = [
  { id: '#12345', customer: 'Priya Singh', vendor: 'Luxury Brands Co', amount: '₹25,000', status: 'Delivered' },
  { id: '#12344', customer: 'Anjali Sharma', vendor: 'Fashion House', amount: '₹15,500', status: 'Processing' },
  { id: '#12343', customer: 'Zara Khan', vendor: 'Premium Store', amount: '₹8,900', status: 'Pending' },
];

const ACTIVITY_LOG = [
  { user: 'Vendor Dior', action: 'Provisioned 50 units', time: '2m ago', type: 'inventory' },
  { user: 'Admin SA', action: 'Approved Settlement', time: '15m ago', type: 'finance' },
  { user: 'System', action: 'Godown Sync Successful', time: '1h ago', type: 'system' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12 pb-20">
      
      {/* High-Contrast Command Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
           <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Command <span className="text-white/20">Dashboard</span></h1>
           <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 animate-ping" />
              Real-Time Marketplace Orchestration — 128 Node Active
           </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-6 py-4 border border-white/10 bg-white/5 flex flex-col items-end">
              <span className="text-[8px] uppercase tracking-widest font-black text-white/40">Global Uptime</span>
              <span className="text-xs font-mono font-bold text-green-500">99.9998%</span>
           </div>
           <button 
             onClick={() => alert('Opening Deployment Wizard...')}
             className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-all flex items-center gap-3"
           >
              <Zap className="w-4 h-4 fill-current" />
              Deploy Change
           </button>
        </div>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-black p-8 space-y-6 group hover:bg-white/5 transition-all cursor-crosshair">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">{stat.label}</span>
              <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black tracking-tighter text-white font-mono">{stat.value}</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-green-500">{stat.change}</span>
                <span className="text-[8px] uppercase tracking-widest text-white/20">{stat.detail}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Primary Intelligence Layer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Core Operations (Recent Orders) */}
        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white">Critical Operations</h2>
              <Link href="/admin/orders" className="text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all flex items-center gap-2">
                 Full Manifest
                 <ArrowRight className="w-3 h-3" />
              </Link>
           </div>
           <div className="overflow-hidden border border-white/5">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-white/5 text-[8px] uppercase tracking-widest font-black text-white/40 border-b border-white/10">
                       <th className="px-6 py-4">Transaction ID</th>
                       <th className="px-6 py-4">Client / Origin</th>
                       <th className="px-6 py-4">Valuation</th>
                       <th className="px-6 py-4 text-right">State</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {RECENT_ORDERS.map((order) => (
                      <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                         <td className="px-6 py-6 text-xs font-mono font-bold text-white/60 group-hover:text-white">{order.id}</td>
                         <td className="px-6 py-6">
                            <p className="text-[11px] font-bold text-white">{order.customer}</p>
                            <p className="text-[8px] uppercase tracking-widest text-white/40 mt-1">{order.vendor}</p>
                         </td>
                         <td className="px-6 py-6 text-[11px] font-black tracking-tighter">{order.amount}</td>
                         <td className="px-6 py-6 text-right">
                            <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 border ${
                               order.status === 'Delivered' ? 'border-green-500/30 text-green-500 bg-green-500/5' : 'border-white/10 text-white/40'
                            }`}>
                               {order.status}
                            </span>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* System Pulse & Activity */}
        <div className="lg:col-span-4 space-y-10">
           
           {/* Real-Time Ticker */}
           <div className="bg-white/5 border border-white/10 p-8 space-y-6">
              <div className="flex items-center gap-3">
                 <Activity className="w-4 h-4 text-white" />
                 <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">System Pulse</h2>
              </div>
              <div className="space-y-6">
                 {ACTIVITY_LOG.map((log, i) => (
                   <div key={i} className="flex gap-4 group">
                      <div className="w-px bg-white/10 relative group-hover:bg-white/30 transition-colors">
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-none border border-black" />
                      </div>
                      <div className="flex-1 pb-4">
                         <p className="text-[10px] font-bold text-white group-hover:text-accent transition-colors">{log.user}</p>
                         <p className="text-[9px] text-white/40 mt-0.5">{log.action}</p>
                         <span className="text-[7px] uppercase tracking-widest font-black text-white/20 mt-2 block">{log.time}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Quick Orchestration */}
           <div className="space-y-4">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 px-2">Rapid Actions</p>
              <div className="grid grid-cols-2 gap-2">
                 <button className="flex flex-col items-center justify-center gap-3 p-6 bg-black border border-white/10 hover:border-white transition-all group">
                    <Plus className="w-4 h-4 text-white/40 group-hover:text-white group-hover:rotate-90 transition-all" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover:text-white">Provision</span>
                 </button>
                 <button className="flex flex-col items-center justify-center gap-3 p-6 bg-black border border-white/10 hover:border-white transition-all group">
                    <ShieldCheck className="w-4 h-4 text-white/40 group-hover:text-white transition-all" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover:text-white">Audit</span>
                 </button>
                 <button className="flex flex-col items-center justify-center gap-3 p-6 bg-black border border-white/10 hover:border-white transition-all group">
                    <Clock className="w-4 h-4 text-white/40 group-hover:text-white transition-all" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover:text-white">Uptime</span>
                 </button>
                 <button className="flex flex-col items-center justify-center gap-3 p-6 bg-black border border-white/10 hover:border-white transition-all group">
                    <Settings className="w-4 h-4 text-white/40 group-hover:text-white transition-all" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover:text-white">Config</span>
                 </button>
              </div>
           </div>

        </div>

      </div>

      {/* Global Financial Ticker (Footer) */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 h-10 flex items-center z-50 overflow-hidden px-8">
         <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
            {[
              { label: 'Settlement Node-01', val: 'Active', color: 'text-green-500' },
              { label: 'Pending Payouts', val: '₹12,40,000', color: 'text-white' },
              { label: 'Godown Latency', val: '12ms', color: 'text-blue-500' },
              { label: 'Security Protocols', val: 'Encrypted', color: 'text-green-500' },
              { label: 'Market Volatility', val: 'Low', color: 'text-white/40' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                 <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">{item.label}:</span>
                 <span className={`text-[8px] font-bold uppercase tracking-widest ${item.color}`}>{item.val}</span>
                 <span className="text-white/10 px-4">•</span>
              </div>
            ))}
         </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
