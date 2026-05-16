'use client';

import { useState } from 'react';
import { 
  Menu, 
  X, 
  LogOut, 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  FileText, 
  Settings, 
  Home, 
  Shield,
  Search,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CommandPalette } from '@/components/admin/command-palette';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/admin', icon: Home },
    { label: 'Vendor Command', href: '/admin/vendor', icon: Shield },
    { label: 'Registration', href: '/admin/vendors', icon: Users },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Inventory', href: '/admin/products', icon: Package },
    { label: 'Settlements', href: '/admin/earnings', icon: DollarSign },
    { label: 'Intelligence', href: '/admin/reports', icon: BarChart3 },
    { label: 'Documents', href: '/admin/documents', icon: FileText },
    { label: 'System', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <CommandPalette />
      
      {/* Brutalist Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-black border-r border-white/10 transition-all duration-300 flex flex-col z-50`}>
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-white flex items-center justify-center">
                <span className="text-black font-black text-sm italic">N</span>
             </div>
             {sidebarOpen && (
               <div className="flex flex-col">
                  <span className="text-xs font-bold tracking-[0.3em] uppercase leading-none">Nafshe</span>
                  <span className="text-[7px] text-white/40 uppercase font-bold tracking-[0.4em] mt-1">Command Center</span>
               </div>
             )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-200 ${
                  isActive 
                    ? 'bg-white text-black' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`} />
                {sidebarOpen && (
                  <div className="flex items-center justify-between flex-1">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
                    {isActive && <ChevronRight className="w-3 h-3" />}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-4">
          <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-sm space-y-1">
             <p className="text-[7px] font-black uppercase tracking-[0.2em] text-white/40">Support Command</p>
             <p className="text-[9px] font-bold text-white selection:bg-accent selection:text-black">safa@nafshe.com</p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-sm text-white/40 hover:text-rose-500 hover:bg-rose-500/5 transition-all text-[9px] font-bold uppercase tracking-[0.2em]"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Exit Command</span>}
          </button>
        </div>
      </aside>

      {/* Main Orchestration Layer */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Dynamic Background Noise/Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1a1a1a,transparent)] pointer-events-none" />
        
        {/* Command Header */}
        <header className="h-20 bg-black/50 backdrop-blur-xl border-b border-white/10 flex items-center px-8 gap-8 relative z-10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-none hover:bg-white hover:text-black transition-all"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <div className="flex-1 flex items-center gap-4">
             <div className="relative group hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                <button 
                  onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                  className="pl-10 pr-12 py-2 bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest font-bold text-white/40 hover:text-white hover:border-white/30 transition-all text-left w-64 rounded-sm"
                >
                  Search Command... 
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[7px] text-white/20 border border-white/10 px-1 rounded font-mono">⌘K</span>
                </button>
             </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="text-right hidden sm:block">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Super Admin</p>
                <p className="text-[7px] font-bold uppercase tracking-[0.3em] text-green-500 mt-0.5 flex items-center justify-end gap-1.5">
                   <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                   System Online
                </p>
             </div>
             <div className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white transition-colors cursor-pointer group relative">
                <Users className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-none border border-black" />
             </div>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto relative z-0 custom-scrollbar scroll-smooth">
          <div className="p-8 lg:p-12 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
