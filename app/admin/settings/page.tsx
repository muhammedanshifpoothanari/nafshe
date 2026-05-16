'use client';

import { useState } from 'react';
import { 
  Save, 
  Users, 
  DollarSign, 
  Shield, 
  Bell, 
  Settings, 
  Lock,
  Globe,
  Database,
  Terminal,
  ArrowRight
} from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    platformName: 'NAFSHE',
    platformEmail: 'admin@nafshe.com',
    supportPhone: '+91-1234567890',
    defaultCommission: '15',
    taxRate: '18',
    enableVendorRegistration: true,
    maxVendors: '500',
    requireApproval: true,
    autoPayoutEnabled: true,
    payoutFrequency: 'weekly',
    minPayoutAmount: '1000',
  });

  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* Brutalist Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
        <div className="space-y-3">
           <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Core <span className="text-white/20">Configuration</span></h1>
           <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
              System Parameters & Security Protocols
           </p>
        </div>
        <button
          onClick={handleSave}
          className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-all flex items-center gap-4 shadow-2xl shadow-white/5"
        >
          <Save className="w-4 h-4" />
          Commit Changes
        </button>
      </div>

      {/* Intelligence Grid (Tabs) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10 bg-white/5 p-2">
         <div className="flex flex-wrap gap-1">
            {[
              { id: 'general', label: 'Global', icon: Globe },
              { id: 'commission', label: 'Fiscal', icon: DollarSign },
              { id: 'vendors', label: 'Nodes', icon: Users },
              { id: 'security', label: 'Security', icon: Lock },
              { id: 'notifications', label: 'Broadcast', icon: Bell },
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
         {saved && (
           <div className="px-6 py-2 bg-green-500 text-black text-[8px] font-black uppercase tracking-widest animate-pulse">
              SUCCESS: CONFIG COMMITTED
           </div>
         )}
      </div>

      {/* Configuration Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         
         {/* Main Settings Form */}
         <div className="lg:col-span-8 space-y-12">
            
            {activeTab === 'general' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                 <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-l-2 border-white pl-4">Platform Identity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Marketplace Identifier</label>
                          <input
                            type="text"
                            value={settings.platformName}
                            onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                            className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Master Administrative Gateway</label>
                          <input
                            type="email"
                            value={settings.platformEmail}
                            onChange={(e) => setSettings({ ...settings, platformEmail: e.target.value })}
                            className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          />
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'commission' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                 <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-l-2 border-white pl-4">Fiscal Logic</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Default Commission (%)</label>
                          <input
                            type="number"
                            value={settings.defaultCommission}
                            onChange={(e) => setSettings({ ...settings, defaultCommission: e.target.value })}
                            className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Platform Tax Rate (%)</label>
                          <input
                            type="number"
                            value={settings.taxRate}
                            onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
                            className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          />
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                 <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-l-2 border-white pl-4">RBAC Protocols</h3>
                    {[
                      { role: 'SUPER ADMIN', desc: 'ROOT ACCESS — ALL NODES' },
                      { role: 'MAISON PARTNER', desc: 'VENDOR ACCESS — RESTRICTED' },
                      { role: 'LOGISTICS NODE', desc: 'GODOWN ACCESS — MANIFEST ONLY' },
                    ].map((role, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 hover:border-white/30 transition-all">
                         <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white">{role.role}</p>
                            <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{role.desc}</p>
                         </div>
                         <button className="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Configure Permissions</button>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                 <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-l-2 border-white pl-4">System Broadcasts</h3>
                    <div className="space-y-px bg-white/10 border border-white/10">
                       {[
                         'NEW VENDOR ONBOARDING',
                         'INVENTORY DEPLETION ALERTS',
                         'SETTLEMENT DISBURSEMENT READY',
                         'SECURITY BREACH PROTOCOLS',
                       ].map((n, i) => (
                         <div key={i} className="bg-black p-6 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{n}</span>
                            <div className="w-12 h-6 bg-white/10 border border-white/10 relative cursor-pointer hover:bg-white transition-all group">
                               <div className="absolute top-1 left-1 bottom-1 w-4 bg-white/20 group-hover:bg-black transition-colors" />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}

            {/* Default Placeholder for other tabs */}
            {(activeTab === 'vendors') && (
               <div className="min-h-[300px] border border-dashed border-white/10 flex flex-col items-center justify-center space-y-4 grayscale opacity-30">
                  <Database className="w-8 h-8" />
                  <p className="text-[9px] font-black uppercase tracking-[0.5em]">Syncing Module Configuration...</p>
               </div>
            )}

         </div>

         {/* System Meta Info */}
         <div className="lg:col-span-4 space-y-10">
            <div className="bg-white/5 border border-white/10 p-10 space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Terminal className="w-20 h-20" />
               </div>
               <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">System Integrity</h4>
                  <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Environment: Production (Cloud-Native)</p>
               </div>
               <div className="space-y-4">
                  {[
                    { label: 'KERNEL VERSION', val: 'V12.4.0-STABLE' },
                    { label: 'DB LATENCY', val: '12MS' },
                    { label: 'NODE UPTIME', val: '4,500 HOURS' },
                    { label: 'ENCRYPTION', val: 'AES-256-GCM' },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                       <span className="text-[8px] font-black uppercase tracking-widest text-white/40">{m.label}</span>
                       <span className="text-[8px] font-mono font-bold text-white">{m.val}</span>
                    </div>
                  ))}
               </div>
               <button 
                 onClick={() => alert('Initiating System Diagnostic...')}
                 className="w-full py-4 border border-white/20 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
               >
                  Run Full Diagnostic
               </button>
            </div>
         </div>

      </div>

    </div>
  );
}
