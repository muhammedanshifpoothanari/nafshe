import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import { NafsheHeader } from '@/components/nafshe-header'
import { NafsheConversionHooks } from '@/components/nafshe-conversion-hooks'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-sans', display: 'swap' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-heading', display: 'swap' });

export const metadata: Metadata = {
  title: 'NAFSHE - Futuristic Luxury Shopping',
  description: 'Ultra-fast luxury shopping. Premium brands. Zero compromise.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${montserrat.variable} bg-background`}>
      <body className="font-sans antialiased relative selection:bg-accent selection:text-white" suppressHydrationWarning>
        {/* Global Editorial Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[9999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        
        <Providers>
          <NafsheConversionHooks />
          <div className="relative z-10 flex flex-col min-h-screen">
             <NafsheHeader />
             <main className="flex-grow">
                {children}
             </main>
          </div>
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
