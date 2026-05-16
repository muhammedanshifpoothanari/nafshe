'use client';

import { NafsheFooter } from '@/components/nafshe-footer';
import { FileText, Scale, Gavel, ShieldAlert } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen">
      <main className="max-w-4xl mx-auto px-6 py-32 space-y-16 animate-fade-in">
        <div className="space-y-6 text-center">
           <div className="flex items-center justify-center gap-3 text-accent">
              <Scale className="w-5 h-5" />
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold">Governance</p>
           </div>
           <h1 className="text-5xl font-light text-luxury tracking-tighter">Maison <span className="italic serif">Agreement</span></h1>
           <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Effective Date: May 2024</p>
        </div>

        <div className="prose prose-luxury max-w-none space-y-12">
           <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-luxury flex items-center gap-3">
                 <Gavel className="w-4 h-4 text-accent" /> 01. The Nature of Service
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                 Nafshe operates as a multi-vendor luxury sanctuary. By entering our digital premises, you agree to uphold the standards of the community and the exclusive credit terms established with our Maison partners.
              </p>
           </section>

           <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-luxury flex items-center gap-3">
                 <ShieldAlert className="w-4 h-4 text-accent" /> 02. Acquisition Authenticity
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed italic">
                 "Every piece reserved through Nafshe is guaranteed authentic and sourced directly from verified Maisons or their official godowns."
              </p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                 Collectors agree that any reservation constitutes a binding agreement to acquire, subject to our private return policies. Nafshe reserves the right to terminate membership for any conduct that compromises the security or integrity of the sanctuary.
              </p>
           </section>

           <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-luxury flex items-center gap-3">
                 <FileText className="w-4 h-4 text-accent" /> 03. Credit & Settlements
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                 Payments are processed according to the credit terms agreed upon by the vendor at registration. Automatic settlements are disbursed on the specified date following godown receipt and invoice verification.
              </p>
           </section>

           <section className="space-y-6 pt-12 border-t border-border">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-loose text-center italic">
                 Governance provided by Nafshe Global Legal Concierge — Paris · Dubai · Riyadh
              </p>
           </section>
        </div>
      </main>
      <NafsheFooter />
    </div>
  );
}
