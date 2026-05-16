'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, X } from 'lucide-react';

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification] = useState(true);

  const whatsappMessage = encodeURIComponent(
    'Hello! I have a question about your products and would like to know more.'
  );
  const whatsappNumber = '971'; // UAE country code, replace with actual number
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />

          {/* Notification Badge */}
          {hasNotification && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
              1
            </span>
          )}
        </button>

        {/* Message Box */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 w-80 bg-white dark:bg-slate-900 rounded-lg shadow-2xl border border-border overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Header */}
            <div className="bg-green-500 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Nafshe Support</h3>
                <p className="text-xs text-green-100">Online</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-green-600 rounded transition"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Content */}
            <div className="p-4 space-y-4">
              <p className="text-sm text-foreground">
                Hi! 👋 How can we help you today? Feel free to reach out on WhatsApp for immediate assistance.
              </p>

              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Open WhatsApp
              </Link>

              <p className="text-xs text-muted-foreground text-center">
                We typically respond within minutes
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
