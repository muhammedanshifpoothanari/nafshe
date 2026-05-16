'use client';

import { Play, Users, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export function NafsheLiveShopping() {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="text-accent font-medium text-sm tracking-widest">LIVE EXPERIENCE</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-foreground">
            Shop Live with Experts
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join our exclusive live shopping sessions with brand experts and style consultants
          </p>
        </div>

        {/* Live Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Featured Live Session */}
          <div className="rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-80 bg-muted flex items-center justify-center overflow-hidden group">
              <Image
                src="/hero-luxury.jpg"
                alt="Live Shopping Session"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Live Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                LIVE NOW
              </div>

              {/* Play Button */}
              <button className="absolute inset-0 flex items-center justify-center hover:bg-black/20 transition-colors group">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                  <Play className="w-6 h-6 text-foreground fill-foreground ml-1" />
                </div>
              </button>

              {/* Stats */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-4 text-white text-sm">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>1.2K watching</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>428 comments</span>
                </div>
              </div>
            </div>

            {/* Session Info */}
            <div className="p-6 bg-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Nike x Jordan Collection Launch
                  </h3>
                  <p className="text-accent text-sm font-medium mt-1">Hosted by Style Expert Sarah</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Exclusive preview of limited edition sneakers with live styling tips and special discounts
              </p>
              <button className="luxury-button-primary w-full">
                Join Now
              </button>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="space-y-4">
            {[
              {
                brand: 'Louis Vuitton',
                title: 'New Season Handbags',
                time: 'Today at 3 PM',
                host: 'Fashion Editor Lisa',
              },
              {
                brand: 'Rolls Royce',
                title: 'Luxury Lifestyle Edit',
                time: 'Tomorrow at 5 PM',
                host: 'Lifestyle Host Emma',
              },
              {
                brand: 'Premium Jewelry',
                title: 'Gold Collection Showcase',
                time: 'Friday at 7 PM',
                host: 'Jewelry Expert Maya',
              },
            ].map((session, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎬</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-accent uppercase tracking-wider">
                      {session.brand}
                    </p>
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {session.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {session.time}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      with {session.host}
                    </p>
                  </div>
                  <button className="text-accent hover:text-accent font-medium whitespace-nowrap">
                    Remind →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
