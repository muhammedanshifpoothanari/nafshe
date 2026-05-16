'use client';

import { 
  FileText, 
  Download, 
  Trash2, 
  Plus, 
  Eye, 
  Shield, 
  Lock,
  Search,
  ArrowRight
} from 'lucide-react';

const DOCUMENTS = [
  { id: 1, name: 'Purchase Order Template', type: 'PDF', size: '245 KB', created: '2024-05-01', downloads: 152 },
  { id: 2, name: 'Invoice Template', type: 'PDF', size: '189 KB', created: '2024-05-01', downloads: 298 },
  { id: 3, name: 'Vendor Agreement', type: 'DOCX', size: '512 KB', created: '2024-04-15', downloads: 47 },
  { id: 4, name: 'Commission Policy', type: 'PDF', size: '156 KB', created: '2024-03-20', downloads: 89 },
  { id: 5, name: 'Return & Refund Policy', type: 'PDF', size: '234 KB', created: '2024-03-15', downloads: 167 },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* Brutalist Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
        <div className="space-y-3">
           <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Protocol <span className="text-white/20">Repository</span></h1>
           <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
              Centralized Vault for Legal & Operational Assets
           </p>
        </div>
        <button 
          onClick={() => alert('Opening Secure Upload Gateway...')}
          className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-all flex items-center gap-4 shadow-2xl shadow-white/5"
        >
          <Plus className="w-4 h-4" />
          Ingest New Document
        </button>
      </div>

      {/* Intelligence Grid (Categories) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
        {[
          { label: 'Purchase Orders', count: 24, icon: FileText },
          { label: 'Financial Ledgers', count: 156, icon: Shield },
          { label: 'Legal Agreements', count: 12, icon: Lock },
          { label: 'System Reports', count: 45, icon: FileText },
        ].map((cat, i) => (
          <div key={i} className="bg-black p-8 group hover:bg-white/5 transition-all cursor-crosshair">
            <div className="flex items-center justify-between mb-4">
               <cat.icon className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
               <span className="text-[10px] font-black font-mono text-white/20 group-hover:text-white">{cat.count}</span>
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white">{cat.label}</p>
          </div>
        ))}
      </div>

      {/* Orchestration Controls */}
      <div className="relative group">
         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-white transition-colors" />
         <input
           type="text"
           placeholder="SEARCH VAULT BY IDENTIFIER..."
           className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white outline-none focus:border-white/30 transition-all"
         />
      </div>

      {/* Asset Manifest (Table) */}
      <div className="overflow-x-auto border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-[8px] uppercase tracking-[0.3em] font-black text-white/40 border-b border-white/10">
              <th className="px-8 py-5">Document Identifier</th>
              <th className="px-8 py-5">Classification</th>
              <th className="px-8 py-5">Volume Size</th>
              <th className="px-8 py-5">Creation Date</th>
              <th className="px-8 py-5">Access Count</th>
              <th className="px-8 py-5 text-right">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {DOCUMENTS.map(doc => (
              <tr key={doc.id} className="hover:bg-white/5 transition-all group">
                <td className="px-8 py-8">
                   <div className="flex items-center gap-4">
                      <FileText className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                      <p className="text-[11px] font-bold text-white uppercase group-hover:text-accent transition-colors">{doc.name}</p>
                   </div>
                </td>
                <td className="px-8 py-8">
                   <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{doc.type}</span>
                </td>
                <td className="px-8 py-8 text-[9px] font-mono font-bold text-white/40">{doc.size}</td>
                <td className="px-8 py-8 text-[9px] font-mono font-bold text-white/20 uppercase tracking-widest">{doc.created}</td>
                <td className="px-8 py-8 text-[11px] font-black font-mono text-white tracking-tighter">{doc.downloads}</td>
                <td className="px-8 py-8 text-right">
                   <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => alert('Initiating Preview Node...')}
                        className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-white hover:bg-white hover:text-black transition-all"
                      >
                         <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => alert('Initiating Download Stream...')}
                        className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-white hover:bg-white hover:text-black transition-all"
                      >
                         <Download className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => alert('Deleting Node from Repository...')}
                        className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-rose-500 hover:bg-rose-500 text-white transition-all"
                      >
                         <Trash2 className="w-3.5 h-3.5" />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
