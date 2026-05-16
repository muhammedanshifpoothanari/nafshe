'use client';

import { NafsheFooter } from '@/components/nafshe-footer';
import { Ruler, Sparkles, ShieldCheck, Info } from 'lucide-react';

export default function SizeGuidePage() {
  const SIZES = [
    { it: '38', fr: '34', uk: '6', us: '2', int: 'XS' },
    { it: '40', fr: '36', uk: '8', us: '4', int: 'S' },
    { it: '42', fr: '38', uk: '10', us: '6', int: 'M' },
    { it: '44', fr: '40', uk: '12', us: '8', int: 'L' },
    { it: '46', fr: '42', uk: '14', us: '10', int: 'XL' },
  ];

  return (
    <div className="bg-background min-h-screen">
      <main className="max-w-5xl mx-auto px-6 py-32 space-y-24 animate-fade-in">
        <div className="space-y-6 text-center">
           <div className="flex items-center justify-center gap-3 text-accent">
              <Ruler className="w-5 h-5" />
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold">Measurement</p>
           </div>
           <h1 className="text-5xl font-light text-luxury tracking-tighter">Universal <span className="italic serif">Size Guide</span></h1>
           <p className="text-sm text-muted-foreground font-light leading-relaxed italic">Precision Conversions for Global Maison Collections</p>
        </div>

        {/* International Conversion Table */}
        <div className="bg-white border border-border shadow-sm overflow-hidden">
           <div className="p-8 border-b border-border flex items-center justify-between bg-muted/5">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold">International Apparel</h2>
              <span className="text-[9px] text-accent font-bold uppercase tracking-widest">Global Standards</span>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-muted/10 text-[9px] uppercase tracking-widest font-bold text-muted-foreground border-b border-border">
                       <th className="px-8 py-5">Italian (IT)</th>
                       <th className="px-8 py-5">French (FR)</th>
                       <th className="px-8 py-5">British (UK)</th>
                       <th className="px-8 py-5">American (US)</th>
                       <th className="px-8 py-5 text-right">International</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border">
                    {SIZES.map((s, i) => (
                      <tr key={i} className="hover:bg-muted/5 transition-colors">
                         <td className="px-8 py-6 text-sm font-light text-luxury">{s.it}</td>
                         <td className="px-8 py-6 text-sm font-light text-luxury">{s.fr}</td>
                         <td className="px-8 py-6 text-sm font-light text-luxury">{s.uk}</td>
                         <td className="px-8 py-6 text-sm font-light text-luxury">{s.us}</td>
                         <td className="px-8 py-6 text-right font-bold text-accent">{s.int}</td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Private Sizing Concierge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="p-10 border border-border space-y-6">
              <div className="flex items-center gap-3 text-accent">
                 <Sparkles className="w-4 h-4" />
                 <h3 className="text-[10px] uppercase tracking-widest font-bold">Bespoke Fit Service</h3>
              </div>
              <p className="text-sm font-light text-luxury leading-relaxed italic">
                "Not certain of your fit? Our Jeddah-based specialists can provide exact garment measurements for any piece in our collection."
              </p>
              <button className="text-[9px] uppercase tracking-widest font-bold text-accent underline underline-offset-4">Consult Concierge</button>
           </div>
           <div className="p-10 bg-primary text-white space-y-6">
              <div className="flex items-center gap-3 text-accent">
                 <ShieldCheck className="w-4 h-4" />
                 <h3 className="text-[10px] uppercase tracking-widest font-bold">Authenticity & Fit</h3>
              </div>
              <p className="text-sm font-light text-white/70 leading-relaxed">
                 We guarantee that all sizing follows the official Maison charts. Every piece received at our Jeddah HQ is verified for size accuracy before dispatch.
              </p>
           </div>
        </div>

        <div className="flex items-start gap-4 p-8 bg-muted/20 border border-border italic">
           <Info className="w-6 h-6 text-accent flex-shrink-0" />
           <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Please note that sizing may vary slightly between Maison collections. We recommend referring to the specific 'Maison Fit' notes on each product detail page.
           </p>
        </div>

      </main>
      <NafsheFooter />
    </div>
  );
}
