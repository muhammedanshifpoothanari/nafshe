'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Home,
  Shield,
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  BarChart3,
  FileText,
  Settings,
  Search,
} from 'lucide-react';
import { Command } from 'cmdk';

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[640px] bg-black border border-white/20 shadow-2xl rounded-xl overflow-hidden z-[100] animate-in fade-in zoom-in duration-200"
      >
        <div className="flex items-center border-b border-white/10 px-4 py-4 gap-4">
          <Search className="w-5 h-5 text-white/40" />
          <Command.Input
            autoFocus
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent border-none outline-none text-white text-base placeholder:text-white/20"
          />
          <div className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/40 font-bold tracking-widest">
            ESC TO EXIT
          </div>
        </div>

        <Command.List className="max-h-[400px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10">
          <Command.Empty className="py-12 text-center text-sm text-white/40 italic">
            No results found. Try another query.
          </Command.Empty>

          <Command.Group heading="General" className="px-2 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
            <CommandItem
              onSelect={() => runCommand(() => router.push('/admin'))}
            >
              <Home className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/admin/vendor'))}
            >
              <Shield className="w-4 h-4" />
              <span>Vendor Command Portal</span>
            </CommandItem>
          </Command.Group>

          <Command.Group heading="Management" className="px-2 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 border-t border-white/5 mt-2">
            <CommandItem
              onSelect={() => runCommand(() => router.push('/admin/vendors'))}
            >
              <Users className="w-4 h-4" />
              <span>Vendor Registration</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/admin/orders'))}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Order Management</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/admin/products'))}
            >
              <Package className="w-4 h-4" />
              <span>Inventory Control</span>
            </CommandItem>
          </Command.Group>

          <Command.Group heading="Finance & Data" className="px-2 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 border-t border-white/5 mt-2">
            <CommandItem
              onSelect={() => runCommand(() => router.push('/admin/earnings'))}
            >
              <DollarSign className="w-4 h-4" />
              <span>Vendor Settlements</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/admin/reports'))}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Operational Reports</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/admin/documents'))}
            >
              <FileText className="w-4 h-4" />
              <span>Internal Documents</span>
            </CommandItem>
          </Command.Group>

          <Command.Group heading="System" className="px-2 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 border-t border-white/5 mt-2">
            <CommandItem
              onSelect={() => runCommand(() => router.push('/admin/settings'))}
            >
              <Settings className="w-4 h-4" />
              <span>Command Settings</span>
            </CommandItem>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  );
}

function CommandItem({ children, onSelect }: { children: React.ReactNode; onSelect: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-4 px-3 py-3 rounded-md text-sm text-white/60 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors"
    >
      {children}
    </Command.Item>
  );
}
