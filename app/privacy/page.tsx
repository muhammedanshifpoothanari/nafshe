'use client';

import { NafsheFooter } from '@/components/nafshe-footer';
import { Shield, Lock, Eye, FileText, ShoppingBag } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen">
      <main className="max-w-4xl mx-auto px-6 py-32 space-y-16 animate-fade-in">
        <div className="space-y-6 text-center">
           <div className="flex items-center justify-center gap-3 text-accent">
              <Shield className="w-5 h-5" />
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold">Confidentiality</p>
           </div>
           <h1 className="text-5xl font-light text-luxury tracking-tighter">Privacy <span className="italic serif">Charter</span></h1>
           <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Last Updated: May 2024</p>
        </div>

        <div className="prose prose-luxury max-w-none space-y-12">
           <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-luxury flex items-center gap-3">
                 <Lock className="w-4 h-4 text-accent" /> 01. The Sanctuary Guarantee
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed italic">
                 "At Nafshe, your privacy is not merely a policy; it is the foundation of our sanctuary. We treat your personal data with the same reverence as the rare pieces we source."
              </p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                 We collect only the essential information required to facilitate your private acquisitions and provide a personalized concierge experience. This includes identity verification for elite tier membership and encrypted payment processing.
              </p>
           </section>

           <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-luxury flex items-center gap-3">
                 <Eye className="w-4 h-4 text-accent" /> 02. Digital Surveillance
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                 Nafshe employs state-of-the-art encryption and non-invasive analytical tools to ensure our ecosystem remains secure and intuitive. We never sell, lease, or distribute your private information to third-party entities outside of our verified Maison partners.
              </p>
           </section>

           <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-luxury flex items-center gap-3">
                 <ShoppingBag className="w-4 h-4 text-accent" /> 03. Product Selection Privacy
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                 Your browsing history, item reservations, and final acquisitions are protected as private information. We do not share your specific product selections with other members or third parties, except as required to fulfill your order through our verified Maison partners.
              </p>
           </section>

           <section className="space-y-6 pt-12 border-t border-border">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-loose text-center">
                 For inquiries regarding your digital legacy at Nafshe, contact our Privacy Concierge at privacy@nafshe.com
              </p>
           </section>
        </div>
      </main>
      <NafsheFooter />
    </div>
  );
}
