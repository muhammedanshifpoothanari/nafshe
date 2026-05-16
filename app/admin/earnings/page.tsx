'use client';

import { useState } from 'react';
import { 
  Send, 
  Download, 
  Filter, 
  CreditCard, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  Activity
} from 'lucide-react';

const VENDOR_EARNINGS = [
  { id: 1, vendor: 'Luxury Brands Co', totalSales: '₹12,50,000', commissionRate: '15%', commission: '₹1,87,500', payoutStatus: 'Paid', lastPayout: '2024-05-10', pendingAmount: '₹0' },
  { id: 2, vendor: 'Fashion House', totalSales: '₹8,75,000', commissionRate: '15%', commission: '₹1,31,250', payoutStatus: 'Pending', lastPayout: '2024-05-01', pendingAmount: '₹1,31,250' },
  { id: 3, vendor: 'Premium Store', totalSales: '₹5,40,000', commissionRate: '15%', commission: '₹81,000', payoutStatus: 'Paid', lastPayout: '2024-04-28', pendingAmount: '₹0' },
  { id: 4, vendor: 'Designer Collective', totalSales: '₹15,30,000', commissionRate: '15%', commission: '₹2,29,500', payoutStatus: 'Pending', lastPayout: '2024-04-15', pendingAmount: '₹2,29,500' },
  { id: 5, vendor: 'Trend Setters', totalSales: '₹6,20,000', commissionRate: '15%', commission: '₹93,000', payoutStatus: 'Paid', lastPayout: '2024-05-05', pendingAmount: '₹0' },
];

export default function EarningsPage() {
  const [earnings, setEarnings] = useState(VENDOR_EARNINGS);

  const totalCommission = earnings.reduce((sum, e) => {
    const amount = parseFloat(e.commission.replace(/[^0-9]/g, ''));
    return sum + amount;
  }, 0);

  const totalPending = earnings.reduce((sum, e) => {
    const amount = parseFloat(e.pendingAmount.replace(/[^0-9]/g, ''));
    return sum + amount;
  }, 0);

  const handlePayout = (vendorId: number) => {
    setEarnings(earnings.map(e =>
      e.id === vendorId
        ? { ...e, payoutStatus: 'Paid', pendingAmount: '₹0', lastPayout: new Date().toISOString().split('T')[0] }
        : e
    ));
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* Brutalist Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
        <div className="space-y-3">
           <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Fiscal <span className="text-white/20">Settlements</span></h1>
           <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
              Disbursement Orchestration & Ledger Verification
           </p>
        </div>
        <button 
          onClick={() => alert('Initiating Global Settlement Export...')}
          className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-all flex items-center gap-4 shadow-2xl shadow-white/5"
        >
          <Download className="w-4 h-4" />
          Export Ledger
        </button>
      </div>

      {/* Intelligence Grid (Fiscal Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
         {[
           { label: 'Cumulative Fee Revenue', value: `₹${(totalCommission / 100000).toFixed(2)}L`, color: 'text-white' },
           { label: 'Pending Disbursements', value: `₹${(totalPending / 100000).toFixed(2)}L`, color: 'text-amber-500' },
           { label: 'Verified Partners', value: earnings.length, color: 'text-green-500' },
         ].map((stat, i) => (
           <div key={i} className="bg-black p-10 space-y-4">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">{stat.label}</p>
              <p className={`text-3xl font-black font-mono tracking-tighter ${stat.color}`}>{stat.value}</p>
           </div>
         ))}
      </div>

      {/* Ledger Manifest (Table) */}
      <div className="overflow-x-auto border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-[8px] uppercase tracking-[0.3em] font-black text-white/40 border-b border-white/10">
              <th className="px-8 py-5">Partner Identifier</th>
              <th className="px-8 py-5">Transaction Volume</th>
              <th className="px-8 py-5">Fee Structure</th>
              <th className="px-8 py-5">Net Owed</th>
              <th className="px-8 py-5">Settlement State</th>
              <th className="px-8 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {earnings.map(earning => (
              <tr key={earning.id} className="hover:bg-white/5 transition-all group">
                <td className="px-8 py-8">
                   <p className="text-[11px] font-black text-white uppercase group-hover:text-accent transition-colors">{earning.vendor}</p>
                   <p className="text-[7px] font-bold text-white/20 uppercase tracking-[0.3em] mt-1 font-mono">Last Payout: {earning.lastPayout}</p>
                </td>
                <td className="px-8 py-8">
                   <p className="text-xs font-black font-mono tracking-tighter text-white/60 group-hover:text-white transition-colors">{earning.totalSales}</p>
                </td>
                <td className="px-8 py-8 text-[9px] font-bold text-white/40 uppercase tracking-widest">{earning.commissionRate}</td>
                <td className="px-8 py-8">
                   <p className="text-xs font-black font-mono tracking-tighter text-white">{earning.commission}</p>
                   {earning.pendingAmount !== '₹0' && (
                     <p className="text-[8px] font-black text-amber-500 uppercase mt-1">Pending: {earning.pendingAmount}</p>
                   )}
                </td>
                <td className="px-8 py-8">
                   <div className={`inline-flex items-center gap-2 px-3 py-1 border text-[8px] font-black uppercase tracking-widest ${
                     earning.payoutStatus === 'Paid' ? 'border-green-500/30 text-green-500 bg-green-500/5' : 'border-amber-500/30 text-amber-500 bg-amber-500/5'
                   }`}>
                      {earning.payoutStatus}
                   </div>
                </td>
                <td className="px-8 py-8 text-right">
                   {earning.payoutStatus === 'Pending' ? (
                     <button
                       onClick={() => handlePayout(earning.id)}
                       className="px-6 py-3 bg-white text-black text-[9px] font-black uppercase tracking-widest hover:bg-accent hover:text-black transition-all"
                     >
                       Disburse
                     </button>
                   ) : (
                     <div className="flex items-center justify-end gap-2 text-white/20">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Verified</span>
                     </div>
                   )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dispersion History */}
      <div className="space-y-6">
         <div className="flex items-center gap-3 border-l-2 border-white pl-4">
            <Activity className="w-4 h-4 text-white" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Dispersion History</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {earnings
              .filter(e => e.payoutStatus === 'Paid')
              .slice(0, 3)
              .map(earning => (
                <div key={earning.id} className="bg-white/5 border border-white/10 p-6 flex items-center justify-between group hover:border-white/30 transition-all">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/60">{earning.vendor}</p>
                    <p className="text-[7px] text-white/20 uppercase tracking-widest font-mono">NODE-SETTLE-OK</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black font-mono tracking-tighter text-green-500">{earning.commission}</p>
                    <p className="text-[7px] text-white/20 uppercase tracking-widest font-mono">{earning.lastPayout}</p>
                  </div>
                </div>
              ))}
         </div>
      </div>

    </div>
  );
}
