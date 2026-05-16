'use client';

import { NafsheFooter } from '@/components/nafshe-footer';
import { Truck, Globe, RefreshCcw, PackageCheck } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="bg-background min-h-screen">
      <main className="max-w-4xl mx-auto px-6 py-32 space-y-16 animate-fade-in">
        <div className="space-y-6 text-center">
           <div className="flex items-center justify-center gap-3 text-accent">
              <Truck className="w-5 h-5" />
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold">Logistics</p>
           </div>
           <h1 className="text-5xl font-light text-luxury tracking-tighter">Global <span className="italic serif">Sanctuary Delivery</span></h1>
           <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">White-Glove Distribution</p>
        </div>

        <div className="prose prose-luxury max-w-none space-y-12">
           <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-luxury flex items-center gap-3">
                 <Globe className="w-4 h-4 text-accent" /> 01. The Path of Luxury
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                 Nafshe provides seamless global logistics for our Maison partners. Items are first received at our high-security godowns in Paris, Dubai, or Riyadh for final quality inspection and barcode verification before being dispatched to your private address.
              </p>
           </section>

           <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-luxury flex items-center gap-3">
                 <PackageCheck className="w-4 h-4 text-accent" /> 02. Priority Dispatch
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed italic">
                 "Our white-glove couriers ensure that your acquisitions arrive in pristine condition, maintained within climate-controlled environments at every step."
              </p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                 Standard delivery within our primary hubs takes 24–48 hours from the moment the Maison invoice is accepted. International dispatch typically ranges from 3 to 7 business days.
              </p>
           </section>

           <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-luxury flex items-center gap-3">
                 <RefreshCcw className="w-4 h-4 text-accent" /> 03. Private Returns
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                 We offer a discreet 14-day return window for all verified acquisitions. Returns must be initiated through your Private Member Profile and are subject to inspection at our central godown.
              </p>
           </section>

           <section className="space-y-6 pt-12 border-t border-border">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-loose text-center">
                 To track a specific Maison dispatch, please visit your Private Profile or consult with the VIP Concierge.
              </p>
           </section>
        </div>
      </main>
      <NafsheFooter />
    </div>
  );
}
