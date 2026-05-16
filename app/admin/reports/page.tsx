'use client';

import { useState } from 'react';
import { 
  Download, 
  Plus, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Package, 
  ShoppingCart, 
  FileText,
  Calendar,
  ArrowRight
} from 'lucide-react';

type ReportType = 'sales' | 'stock' | 'po' | 'invoice';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportType>('sales');
  const [dateRange, setDateRange] = useState('monthly');

  const SALES_DATA = [
    { month: 'JAN 2024', orders: 234, revenue: '₹45,60,000', growth: '+12.5%' },
    { month: 'FEB 2024', orders: 267, revenue: '₹52,30,000', growth: '+14.7%' },
    { month: 'MAR 2024', orders: 312, revenue: '₹61,80,000', growth: '+18.3%' },
    { month: 'APR 2024', orders: 298, revenue: '₹58,50,000', growth: '-5.3%' },
    { month: 'MAY 2024', orders: 345, revenue: '₹68,20,000', growth: '+16.6%' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* Brutalist Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
        <div className="space-y-3">
           <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Operational <span className="text-white/20">Intelligence</span></h1>
           <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
              Data Aggregation & Predictive Analytics Pipeline
           </p>
        </div>
        <button 
          onClick={() => alert('Initiating Global Data Export...')}
          className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-all flex items-center gap-4 shadow-2xl shadow-white/5"
        >
          <Download className="w-4 h-4" />
          Export All Nodes
        </button>
      </div>

      {/* Intelligence Command Bar (Tabs) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10 bg-white/5 p-2">
         <div className="flex flex-wrap gap-1">
            {[
              { id: 'sales' as ReportType, label: 'Sales Feed', icon: BarChart3 },
              { id: 'stock' as ReportType, label: 'Inventory Audit', icon: Package },
              { id: 'po' as ReportType, label: 'Supply Orders', icon: ShoppingCart },
              { id: 'invoice' as ReportType, label: 'Ledger', icon: FileText },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 transition-all text-[9px] font-black uppercase tracking-widest ${
                  activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
         </div>
         <div className="flex items-center gap-4 px-4">
            <Calendar className="w-3.5 h-3.5 text-white/20" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-[9px] font-black uppercase tracking-widest text-white/60 outline-none cursor-pointer hover:text-white"
            >
              <option value="weekly">Weekly Pulse</option>
              <option value="monthly">Monthly Cycle</option>
              <option value="quarterly">Quarterly Sync</option>
              <option value="yearly">Annual Audit</option>
            </select>
         </div>
      </div>

      {/* Intelligence Content */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
         
         {activeTab === 'sales' && (
           <div className="space-y-12">
              {/* Bento High-Density Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                 {[
                   { label: 'Cycle Revenue', value: '₹68,20,000', detail: '+16.6% Momentum', trend: 'up' },
                   { label: 'Order Velocity', value: '345', detail: '+47 Nodes vs Prev', trend: 'up' },
                   { label: 'Avg Node Valuation', value: '₹19,768', detail: '+2.3% Efficiency', trend: 'up' },
                 ].map((stat, i) => (
                   <div key={i} className="bg-black p-10 space-y-4">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">{stat.label}</p>
                      <p className="text-3xl font-black font-mono tracking-tighter text-white">{stat.value}</p>
                      <div className="flex items-center gap-2">
                         <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">{stat.detail}</span>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Data Visualization Table */}
              <div className="space-y-6">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-l-2 border-white pl-4">Historical Progression</h3>
                 <div className="overflow-hidden border border-white/10 bg-black">
                    <div className="p-10 space-y-8">
                       {SALES_DATA.map(data => (
                         <div key={data.month} className="flex flex-col md:flex-row md:items-center gap-6 group">
                            <span className="w-24 text-[10px] font-black text-white/40 group-hover:text-white transition-colors uppercase tracking-widest">{data.month}</span>
                            <div className="flex-1 h-12 bg-white/5 border border-white/5 relative overflow-hidden">
                               <div
                                 className="bg-white h-full transition-all duration-1000 ease-out group-hover:bg-accent"
                                 style={{ width: `${(parseFloat(data.revenue.replace(/[^0-9]/g, '')) / 700000) * 10}%` }}
                               />
                               <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
                                  <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{data.orders} TRANSACTIONS</span>
                                  <span className="text-[9px] font-mono font-bold text-white tracking-tighter">{data.revenue}</span>
                               </div>
                            </div>
                            <div className={`w-16 text-[10px] font-black text-right ${data.growth.startsWith('+') ? 'text-green-500' : 'text-rose-500'}`}>
                               {data.growth}
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
         )}

         {activeTab !== 'sales' && (
           <div className="min-h-[400px] border border-dashed border-white/10 flex flex-col items-center justify-center space-y-6 bg-white/5 grayscale opacity-50">
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center animate-spin-slow">
                 <div className="w-8 h-8 border border-white/40" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Synchronizing Data Nodes...</p>
              <button 
                onClick={() => alert('Forcing Data Sync...')}
                className="text-[8px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors"
              >
                Force Manual Refresh
              </button>
           </div>
         )}

      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
