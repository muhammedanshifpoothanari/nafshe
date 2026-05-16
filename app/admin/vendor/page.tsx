'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Settings, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Search,
  Bell,
  Globe,
  Filter,
  FileText,
  CreditCard,
  Truck,
  Barcode,
  Ticket,
  Eye
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const STATS = [
    { label: 'Total Receivables', value: '$248,500', change: '+12.5%', up: true },
    { label: 'Pending POs', value: '12', change: 'Action Required', up: false },
    { label: 'In-Transit to Godown', value: '450 units', change: 'On Time', up: true },
    { label: 'Settlement Date', value: 'May 30', change: 'Net-30 Terms', up: true },
  ];

  const PURCHASE_ORDERS = [
    { id: 'PO-8821', date: 'May 10', items: 120, total: '$45,000', status: 'Pending Delivery' },
    { id: 'PO-8819', date: 'May 05', items: 85, total: '$32,400', status: 'Received at Godown' },
  ];

  const INVENTORY = [
    { id: 'SKU-001', barcode: '7291002341', name: 'Lady Dior Bag', stock: 12, price: '$4,500', terms: 'Net-30', paymentDate: 'June 10' },
    { id: 'SKU-002', barcode: '7291002342', name: 'Bar Jacket', stock: 5, price: '$3,200', terms: 'Net-30', paymentDate: 'June 15' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F5] flex">
      
      {/* Enterprise Maison Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col fixed inset-y-0 left-0 z-50">
         <div className="p-8 border-b border-white/10">
            <div className="flex items-center gap-3">
               <span className="text-2xl font-light tracking-tighter text-accent">Λ</span>
               <div className="flex flex-col">
                  <span className="text-xs font-bold tracking-[0.3em] uppercase">Maison Dior</span>
                  <span className="text-[8px] text-accent/60 uppercase font-bold tracking-widest text-wrap">Supply Chain Portal</span>
               </div>
            </div>
         </div>

         <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {[
              { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'supply', label: 'Supply Chain (PO)', icon: Truck },
              { id: 'inventory', label: 'Inventory (Barcodes)', icon: Barcode },
              { id: 'finance', label: 'Settlements', icon: CreditCard },
              { id: 'storefront', label: 'Your Maison Site', icon: Globe },
              { id: 'promotions', label: 'Paid Banners', icon: Ticket },
              { id: 'clients', label: 'VIP Relations', icon: Users },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 text-[9px] uppercase tracking-[0.2em] font-bold transition-all rounded-sm ${activeTab === item.id ? 'bg-white/10 text-accent' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                 <item.icon className={`w-3.5 h-3.5 ${activeTab === item.id ? 'text-accent' : 'text-white/40'}`} />
                 {item.label}
              </button>
            ))}
         </nav>
      </aside>

      <main className="flex-1 ml-64 p-12 space-y-12">
         
         <header className="flex items-center justify-between">
            <div className="space-y-1">
               <h1 className="text-3xl font-light text-luxury tracking-wide">Enterprise <span className="italic font-serif">Command</span></h1>
               <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Godown Sync: Active — Last delivery 4h ago</p>
            </div>
            <div className="flex items-center gap-6">
               <Link href="/maison/dior" className="flex items-center gap-3 bg-white border border-border px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-muted transition-all">
                  <Eye className="w-4 h-4" />
                  View Your Site
               </Link>
               <button 
                  onClick={() => alert('Provisioning system opening...') }
                  className="flex items-center gap-3 bg-primary text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold shadow-2xl shadow-primary/20"
               >
                  <Plus className="w-4 h-4" />
                  Provision New Stock
               </button>
            </div>
         </header>

         {activeTab === 'overview' && (
           <div className="space-y-12 animate-fade-in">
              {/* Stats Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <div key={i} className="bg-white p-8 border border-border space-y-4">
                 <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</p>
                 <div className="flex items-end justify-between">
                    <p className="text-3xl font-light text-luxury">{stat.value}</p>
                    <span className={`text-[9px] font-bold ${stat.up ? 'text-green-500' : 'text-rose-500'}`}>{stat.change}</span>
                 </div>
              </div>
            ))}
         </div>

         {/* Supply Chain Modules */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Purchase Orders (POs) from Nafshe */}
            <div className="lg:col-span-7 bg-white border border-border shadow-sm overflow-hidden">
               <div className="p-8 border-b border-border flex items-center justify-between">
                  <h2 className="text-xs uppercase tracking-[0.3em] font-bold">Open Purchase Orders</h2>
                  <span className="text-[9px] text-accent font-bold uppercase tracking-widest">Nafshe HQ Issued</span>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-muted/10 text-[9px] uppercase tracking-widest font-bold text-muted-foreground border-b border-border">
                           <th className="px-8 py-5">PO Number</th>
                           <th className="px-8 py-5">Issued Date</th>
                           <th className="px-8 py-5">Value</th>
                           <th className="px-8 py-5 text-right">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border">
                        {PURCHASE_ORDERS.map((po) => (
                          <tr key={po.id} className="hover:bg-muted/5 transition-colors">
                             <td className="px-8 py-6">
                                <p className="text-xs font-bold text-luxury">{po.id}</p>
                                <p className="text-[9px] text-muted-foreground uppercase">{po.items} Units Requested</p>
                             </td>
                             <td className="px-8 py-6">
                                <p className="text-xs font-light">{po.date}</p>
                             </td>
                             <td className="px-8 py-6 text-xs font-bold">{po.total}</td>
                             <td className="px-8 py-6 text-right">
                                <button 
                                   onClick={() => alert('Invoice generated and sent to Godown.')}
                                   className="px-4 py-2 bg-primary text-white text-[8px] uppercase tracking-widest font-bold"
                                >
                                   Generate Invoice
                                </button>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Financial Status — Settlement Dates */}
            <div className="lg:col-span-5 bg-white border border-border p-10 space-y-8">
               <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-accent" />
                  <h2 className="text-xs uppercase tracking-[0.3em] font-bold">Automatic Settlement</h2>
               </div>
               <div className="space-y-6">
                  <div className="p-6 bg-muted/20 border border-border rounded-sm space-y-4">
                     <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Next Auto-Payment</p>
                     <div className="flex justify-between items-end">
                        <p className="text-2xl font-light text-luxury">May 30, 2024</p>
                        <p className="text-xl font-bold text-accent">$12,400</p>
                     </div>
                     <p className="text-[8px] uppercase tracking-widest text-muted-foreground">Status: Approved by Godown Receiving</p>
                  </div>
                  <div className="space-y-4">
                     <p className="text-[10px] font-bold uppercase tracking-widest">Credit Terms Overview</p>
                     <div className="flex justify-between items-center text-xs">
                        <span className="font-light text-muted-foreground italic">Current Terms</span>
                        <span className="font-bold">Net-30 Days</span>
                     </div>
                     <div className="flex justify-between items-center text-xs">
                        <span className="font-light text-muted-foreground italic">Overdue Invoices</span>
                        <span className="font-bold text-rose-500">0 (Excellent)</span>
                     </div>
                  </div>
                  <button 
                     onClick={() => alert('Agreement update portal opening...')}
                     className="w-full py-4 border border-primary text-primary text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary hover:text-white transition-all"
                  >
                     Update Credit Agreement
                  </button>
               </div>
            </div>

         </div>

         {/* Barcode & Inventory Management */}
         <div className="bg-white border border-border shadow-sm overflow-hidden">
            <div className="p-8 border-b border-border flex items-center justify-between">
               <h2 className="text-xs uppercase tracking-[0.3em] font-bold">Barcode & Item Tracking</h2>
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input type="text" placeholder="Scan Barcode..." className="pl-10 pr-4 py-2 border border-border text-[9px] uppercase tracking-widest font-bold w-64 focus:border-accent outline-none" />
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-muted/10 text-[9px] uppercase tracking-widest font-bold text-muted-foreground border-b border-border">
                        <th className="px-8 py-5">Item Code (SKU)</th>
                        <th className="px-8 py-5">Universal Barcode</th>
                        <th className="px-8 py-5">Valuation</th>
                        <th className="px-8 py-5">Payment Due</th>
                        <th className="px-8 py-5 text-right">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                     {INVENTORY.map((item) => (
                       <tr key={item.id} className="hover:bg-muted/5 transition-colors">
                          <td className="px-8 py-6">
                             <p className="text-xs font-bold text-luxury">{item.id}</p>
                             <p className="text-[10px] font-light italic">{item.name}</p>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-3">
                                <Barcode className="w-4 h-4 text-muted-foreground" />
                                <span className="text-xs font-mono">{item.barcode}</span>
                             </div>
                          </td>
                          <td className="px-8 py-6 text-xs font-bold">{item.price}</td>
                          <td className="px-8 py-6">
                             <p className="text-xs font-light">{item.paymentDate}</p>
                             <p className="text-[9px] text-accent uppercase font-bold tracking-widest">{item.terms}</p>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <span className="px-3 py-1 bg-green-50 text-green-600 text-[8px] uppercase font-bold tracking-widest rounded-full">Received</span>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            </div>
            </div>
         )}

         {activeTab === 'storefront' && (
           <div className="space-y-12 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                 
                 {/* Sharing Module */}
                 <div className="lg:col-span-4 space-y-6">
                    <div className="bg-primary text-white p-10 space-y-8 shadow-2xl">
                       <div className="space-y-2">
                          <h2 className="text-xs uppercase tracking-[0.3em] font-bold">Share Your Maison</h2>
                          <p className="text-[10px] text-white/60 uppercase font-bold tracking-widest">Your Private E-Commerce Link</p>
                       </div>
                       <div className="p-4 bg-white/10 border border-white/20 rounded-sm space-y-4">
                          <p className="text-[11px] font-mono text-accent">nafshe.com/maison/dior</p>
                          <button 
                             onClick={() => {
                                navigator.clipboard.writeText('nafshe.com/maison/dior');
                                alert('Link copied to clipboard!');
                             }}
                             className="w-full py-3 bg-white text-primary text-[9px] uppercase tracking-widest font-bold"
                          >
                             Copy Private Link
                          </button>
                       </div>
                       <p className="text-[9px] text-white/40 italic leading-relaxed">
                          "Share this link with your private clients to give them direct access to your verified Nafshe sanctuary."
                       </p>
                    </div>
                 </div>

                 {/* Customization Form */}
                 <div className="lg:col-span-8 bg-white border border-border p-12 space-y-10">
                    <div className="space-y-2">
                       <h2 className="text-2xl font-light text-luxury">Maison <span className="italic serif">Branding</span></h2>
                       <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Customize your custom storefront appearance</p>
                    </div>
                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Maison Display Name</label>
                             <input type="text" defaultValue="Maison Dior" className="w-full bg-muted/20 border border-border p-4 text-xs outline-none focus:border-accent" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Custom Store URL</label>
                             <div className="flex items-center">
                                <span className="px-4 py-4 bg-muted/30 border border-r-0 border-border text-[9px] font-bold">/maison/</span>
                                <input type="text" defaultValue="dior" className="flex-1 bg-muted/20 border border-border p-4 text-xs outline-none focus:border-accent" />
                             </div>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Maison Heritage Story</label>
                          <textarea rows={4} className="w-full bg-muted/20 border border-border p-4 text-xs outline-none focus:border-accent" defaultValue="The pinnacle of French luxury and heritage craftsmanship since 1946." />
                       </div>
                       <div className="space-y-4">
                          <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Hero Branding Image</label>
                          <div className="relative h-48 bg-muted border-2 border-dashed border-border flex items-center justify-center group overflow-hidden">
                             <Image src="/assets/hero.jpg" alt="hero" fill className="object-cover opacity-20 grayscale group-hover:opacity-40 transition-all" />
                             <button className="relative z-10 px-6 py-2 bg-white border border-border text-[9px] uppercase tracking-widest font-bold">Replace Asset</button>
                          </div>
                       </div>
                       <button className="px-12 py-5 bg-primary text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl shadow-primary/20">
                          Save Maison Changes
                       </button>
                    </form>
                 </div>

              </div>
           </div>
         )}

         {activeTab === 'supply' && (
           <div className="max-w-4xl space-y-12 animate-fade-in">
              <div className="bg-white border border-border p-12 space-y-10">
                 <div className="space-y-2">
                    <h2 className="text-2xl font-light text-luxury">Provision <span className="italic serif">Stock</span></h2>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Request Godown Intake Slot</p>
                 </div>
                 <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                       <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Item Code (SKU)</label>
                       <input type="text" placeholder="e.g. DIOR-LADY-001" className="w-full bg-muted/20 border border-border p-4 text-[11px] font-mono outline-none focus:border-accent" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Quantity for Intake</label>
                       <input type="number" placeholder="50" className="w-full bg-muted/20 border border-border p-4 text-xs outline-none focus:border-accent" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Godown Location</label>
                       <select className="w-full bg-muted/20 border border-border p-4 text-[10px] uppercase tracking-widest font-bold outline-none focus:border-accent appearance-none">
                          <option>Dubai Hub (DXB-01)</option>
                          <option>Riyadh Hub (RUH-04)</option>
                          <option>Paris Maison (CDG-02)</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Credit Terms Application</label>
                       <div className="p-4 bg-muted/10 border border-border text-[10px] font-bold">Current: Net-30 Days</div>
                    </div>
                    <div className="md:col-span-2 pt-6">
                        <button 
                           onClick={() => alert('Stock provision request submitted for Godown approval.')}
                           className="w-full py-5 bg-primary text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl shadow-primary/20 hover:opacity-95 transition-all"
                        >
                          Submit Provision Request
                       </button>
                    </div>
                 </form>
              </div>
           </div>
         )}

         {activeTab === 'promotions' && (
           <div className="space-y-12 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                 {/* Paid Banner Management */}
                 <div className="bg-white border border-border p-10 space-y-8">
                    <div className="flex items-center justify-between">
                       <h2 className="text-xs uppercase tracking-[0.3em] font-bold">Maison Banners</h2>
                       <button 
                          onClick={() => alert('Banner slot booking portal opening...')}
                          className="text-[9px] text-accent font-bold uppercase tracking-widest"
                       >
                          Book Slot
                       </button>
                    </div>
                    <div className="space-y-6">
                       {[
                         { loc: 'Homepage Hero', status: 'Active', clicks: '2,400' },
                         { loc: 'Bags Category', status: 'Pending Approval', clicks: '-' },
                       ].map((b, i) => (
                         <div key={i} className="flex items-center gap-6 p-4 border border-border bg-muted/5 group hover:border-accent transition-all">
                            <div className="w-16 h-10 bg-muted relative overflow-hidden">
                               <Image src="/assets/hero.jpg" alt="banner" fill className="object-cover grayscale" />
                            </div>
                            <div className="flex-1">
                               <p className="text-[10px] font-bold text-luxury">{b.loc}</p>
                               <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest">{b.status}</p>
                            </div>
                            <div className="text-right">
                               <p className="text-xs font-bold">{b.clicks}</p>
                               <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest">Clicks</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Coupon System */}
                 <div className="bg-white border border-border p-10 space-y-8">
                    <div className="flex items-center justify-between">
                       <h2 className="text-xs uppercase tracking-[0.3em] font-bold">Maison Coupons</h2>
                       <button 
                          onClick={() => alert('Coupon creation wizard opening...')}
                          className="px-4 py-2 bg-primary text-white text-[8px] uppercase tracking-widest font-bold"
                       >
                          + New Coupon
                       </button>
                    </div>
                    <div className="space-y-6">
                       {[
                         { code: 'DIORVIP20', discount: '20%', usage: '45/100' },
                         { code: 'FIRSTSANCTUARY', discount: '$500', usage: '12/50' },
                       ].map((c, i) => (
                         <div key={i} className="flex items-center justify-between p-5 border-l-2 border-accent bg-accent/5">
                            <div className="space-y-1">
                               <p className="text-sm font-mono font-bold text-luxury">{c.code}</p>
                               <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Discount: {c.discount}</p>
                            </div>
                            <div className="text-right">
                               <p className="text-xs font-bold">{c.usage}</p>
                               <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest">Redemptions</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
         )}
      </main>

    </div>
  );
}
