'use client';

import { NafsheFooter } from '@/components/nafshe-footer';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const FAQS = [
    { q: "How do I join the Elite VIP Circle?", a: "Membership is currently by invitation or request through our private portal. Once your identity is verified and your first acquisition is complete, you will be considered for Elite Tier status." },
    { q: "Is the Jeddah Flagship open for private viewings?", a: "Yes, our Jeddah Sanctuary on King Abdulaziz Road is available for private appointments. Please contact your VIP Concierge to reserve a time." },
    { q: "What are your credit terms for luxury acquisitions?", a: "For our Maison partners, we operate on verified credit terms (Net-30). For collectors, acquisitions are processed through secure, immediate settlement to ensure priority dispatch." },
    { q: "How do you guarantee product authenticity?", a: "Every piece at Nafshe is sourced directly from the brand's Maison or their official global godown. Each item undergoes a triple-verification process at our Jeddah HQ before final dispatch." },
  ];

  return (
    <div className="bg-background min-h-screen">
      <main className="max-w-4xl mx-auto px-6 py-32 space-y-24 animate-fade-in">
        <div className="space-y-6 text-center">
           <div className="flex items-center justify-center gap-3 text-accent">
              <HelpCircle className="w-5 h-5" />
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold">Assistance</p>
           </div>
           <h1 className="text-5xl font-light text-luxury tracking-tighter">Maison <span className="italic serif">Inquiries</span></h1>
           <p className="text-sm text-muted-foreground font-light leading-relaxed italic">Frequently Asked Questions for the Discerning Member</p>
        </div>

        <div className="space-y-4">
           {FAQS.map((faq, i) => (
             <div key={i} className="border border-border bg-white overflow-hidden transition-all duration-500">
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-8 flex items-center justify-between text-left group"
                >
                   <span className="text-sm font-bold uppercase tracking-widest text-luxury group-hover:text-accent transition-colors">{faq.q}</span>
                   <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-500 ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-8 transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                   <p className="text-sm font-light text-muted-foreground leading-relaxed italic border-t border-border pt-6">{faq.a}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="p-12 bg-primary text-center space-y-6 relative overflow-hidden">
           <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-light text-white italic serif">Still Seeking Clarity?</h3>
              <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Our Jeddah Concierge is Standing By</p>
              <button className="px-10 py-4 bg-accent text-primary text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl">
                 Chat with Concierge
              </button>
           </div>
           <MessageSquare className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5" />
        </div>
      </main>
      <NafsheFooter />
    </div>
  );
}
