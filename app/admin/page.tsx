'use client';

import { useState, useEffect } from 'react';
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
  Settings,
  FileText,
  CheckCircle2,
  XCircle
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
  const [activeTab, setActiveTab] = useState<'operations' | 'approvals' | 'finance'>('operations');
  const [approvals, setApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'approvals') {
      fetchApprovals();
    }
  }, [activeTab]);

  const fetchApprovals = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/approvals?status=pending');
      const data = await res.json();
      setApprovals(data);
    } catch (error) {
      console.error('Error fetching approvals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`/api/approvals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action, feedback: `Admin ${action} request.` })
      });
      if (res.ok) {
        alert(`Request successfully ${action}!`);
        fetchApprovals();
      }
    } catch (error) {
      console.error('Approval action error:', error);
    }
  };

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

      {/* Tabs System */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('operations')}
          className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest border-t-2 transition-all ${
            activeTab === 'operations' ? 'border-white text-white bg-white/5' : 'border-transparent text-white/40 hover:text-white'
          }`}
        >
          Operations
        </button>
        <button
          onClick={() => setActiveTab('approvals')}
          className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest border-t-2 transition-all ${
            activeTab === 'approvals' ? 'border-white text-white bg-white/5' : 'border-transparent text-white/40 hover:text-white'
          }`}
        >
          Approvals Queue
        </button>
        <button
          onClick={() => setActiveTab('finance')}
          className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest border-t-2 transition-all ${
            activeTab === 'finance' ? 'border-white text-white bg-white/5' : 'border-transparent text-white/40 hover:text-white'
          }`}
        >
          Financial Center (P&L & BS)
        </button>
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

      {/* Dynamic Content Views */}
      {activeTab === 'operations' && (
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

             {/* Quick Actions */}
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
      )}

      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
             <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white">Pending Requests Approval Queue</h2>
             <button onClick={fetchApprovals} className="text-[8px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all">Reload Queue</button>
          </div>
          {loading ? (
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Scanning approval nodes...</p>
          ) : approvals.length === 0 ? (
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest py-8 text-center border border-dashed border-white/10">No pending vendor approval requests detected.</p>
          ) : (
            <div className="space-y-4">
              {approvals.map((req) => (
                <div key={req.id} className="p-6 bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[8px] uppercase tracking-widest font-black bg-white/10 px-2 py-0.5 text-white/60">{req.type}</span>
                      <span className="text-[8px] uppercase tracking-widest font-black bg-blue-500/10 text-blue-400 px-2 py-0.5">{req.action}</span>
                      <span className="text-xs font-mono font-bold text-white">{req.id}</span>
                    </div>
                    <p className="text-xs text-white/60">Proposed by: <span className="text-white font-bold">{req.vendorId}</span></p>
                    <div className="bg-black/40 p-4 font-mono text-[10px] text-white/80 overflow-x-auto max-w-2xl border border-white/5">
                      {JSON.stringify(req.data, null, 2)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAction(req.id, 'approved')}
                      className="px-4 py-2 border border-green-500/30 bg-green-500/5 text-[9px] font-black uppercase tracking-widest text-green-500 hover:bg-green-500/20 transition-all flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3 h-3" /> Approve
                    </button>
                    <button
                      onClick={() => handleAction(req.id, 'rejected')}
                      className="px-4 py-2 border border-red-500/30 bg-red-500/5 text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/20 transition-all flex items-center gap-2"
                    >
                      <XCircle className="w-3 h-3" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'finance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Profit & Loss Statement */}
          <div className="bg-white/5 border border-white/10 p-8 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white border-b border-white/10 pb-4">Profit & Loss (P&L) Statement</h3>
            <div className="space-y-4">
              {[
                { label: 'Marketplace Gross Revenue', value: '₹45,23,000', detail: 'Total client sales' },
                { label: 'Cost of Goods Sold (COGS)', value: '₹22,12,000', detail: 'Vendor product costs' },
                { label: 'Gross Profit', value: '₹23,11,000', isBold: true },
                { label: 'Nafshe Commission Earnings', value: '₹6,78,450', detail: '15% platform split' },
                { label: 'Ad Spend (BDA) Advertising Revenue', value: '₹1,50,000', detail: 'Internal marketing slots' },
                { label: 'Operating Income', value: '₹8,28,450', isBold: true },
                { label: 'Logistics & Processing Fees', value: '₹85,000', detail: 'FBA overhead' },
                { label: 'Net Profit before Taxes', value: '₹7,43,450', isBold: true, isHighlight: true }
              ].map((item, i) => (
                <div key={i} className={`flex justify-between items-center text-xs py-2 border-b border-white/5 ${item.isBold ? 'font-bold text-white' : 'text-white/60'} ${item.isHighlight ? 'bg-white/5 px-2 py-3 border border-white/10' : ''}`}>
                  <div>
                    <p className="uppercase text-[9px] tracking-wider">{item.label}</p>
                    {item.detail && <p className="text-[8px] text-white/40 lowercase mt-0.5">{item.detail}</p>}
                  </div>
                  <span className="font-mono text-xs">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Balance Sheet */}
          <div className="bg-white/5 border border-white/10 p-8 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white border-b border-white/10 pb-4">Balance Sheet</h3>
            <div className="space-y-4">
              {[
                { label: 'Total Current Assets', value: '₹55,20,000', detail: 'Cash, stock, receivables' },
                { label: 'Godown Inventory (FBA)', value: '₹18,50,000', detail: 'Assets in platform custody' },
                { label: 'Fixed Assets', value: '₹12,00,000', detail: 'Server clusters, infrastructure' },
                { label: 'Total Assets', value: '₹85,70,000', isBold: true, isHighlight: true },
                { label: 'Accounts Payable (Vendors)', value: '₹12,40,000', detail: 'Calculated payout pipeline' },
                { label: 'Total Liabilities', value: '₹12,40,000', isBold: true },
                { label: 'Retained Earnings', value: '₹73,30,000', detail: 'Owners equity' },
                { label: 'Total Liabilities & Equity', value: '₹85,70,000', isBold: true, isHighlight: true }
              ].map((item, i) => (
                <div key={i} className={`flex justify-between items-center text-xs py-2 border-b border-white/5 ${item.isBold ? 'font-bold text-white' : 'text-white/60'} ${item.isHighlight ? 'bg-white/5 px-2 py-3 border border-white/10' : ''}`}>
                  <div>
                    <p className="uppercase text-[9px] tracking-wider">{item.label}</p>
                    {item.detail && <p className="text-[8px] text-white/40 lowercase mt-0.5">{item.detail}</p>}
                  </div>
                  <span className="font-mono text-xs">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
