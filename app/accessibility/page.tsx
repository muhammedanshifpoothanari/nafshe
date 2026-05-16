'use client';

import { NafsheFooter } from '@/components/nafshe-footer';
import { Accessibility, Smartphone, MousePointer2, MessageSquareText } from 'lucide-react';

export default function AccessibilityPage() {
  return (
    <div className="bg-background min-h-screen">
      <main className="max-w-4xl mx-auto px-6 py-32 space-y-16 animate-fade-in">
        <div className="space-y-6 text-center">
           <div className="flex items-center justify-center gap-3 text-accent">
              <Accessibility className="w-5 h-5" />
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold">Inclusion</p>
           </div>
           <h1 className="text-5xl font-light text-luxury tracking-tighter">Universal <span className="italic serif">Accessibility</span></h1>
           <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Luxury for All Members</p>
        </div>

        <div className="prose prose-luxury max-w-none space-y-12">
           <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-luxury flex items-center gap-3">
                 <MousePointer2 className="w-4 h-4 text-accent" /> 01. Intuitive Navigation
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed italic">
                 "Our digital architecture is designed to be as effortless as a walk through a private gallery."
              </p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                 Nafshe is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards, including WCAG 2.1 Level AA.
              </p>
           </section>

           <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-luxury flex items-center gap-3">
                 <Smartphone className="w-4 h-4 text-accent" /> 02. Multi-Device Experience
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                 Our ecosystem is optimized for screen readers, keyboard navigation, and high-contrast viewing modes across all devices. We ensure that our high-fashion cinematic assets are paired with descriptive metadata for all collectors.
              </p>
           </section>

           <section className="space-y-6 pt-12 border-t border-border">
              <div className="flex items-start gap-4 p-8 bg-muted/20 border border-border italic">
                 <MessageSquareText className="w-6 h-6 text-accent flex-shrink-0" />
                 <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    Should you encounter any barrier within our digital sanctuary, our VIP Concierge is available 24/7 to provide personal assistance and ensure your acquisition journey remains seamless.
                 </p>
              </div>
           </section>
        </div>
      </main>
      <NafsheFooter />
    </div>
  );
}
