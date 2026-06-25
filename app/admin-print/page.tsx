'use client';

import { products } from '@/lib/data/products';

export default function PrintCatalogPage() {
  return (
    <div className="print-catalog-container min-h-screen bg-white text-black p-8 font-sans selection:bg-neutral-100">
      
      {/* CSS print overrides to completely strip out website wrappers/widgets */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          /* Hide all external components (Header, floating WhatsApp, countdown banner) */
          header,
          footer,
          nav,
          aside,
          iframe,
          .fixed,
          .bg-primary,
          a[href^="https://wa.me"],
          .print\\:hidden {
            display: none !important;
          }

          /* Reset body and html for high contrast layout */
          html, body, main, #__next {
            background: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
          }

          /* Force the catalog container to expand and fill the page */
          .print-catalog-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            background: white !important;
            color: black !important;
            display: block !important;
          }

          /* Ensure table rows do not break weirdly across pages */
          tr {
            page-break-inside: avoid !important;
          }
        }
      `}} />

      {/* Action Bar (hidden on print) */}
      <div className="mb-8 flex items-center justify-between border-b pb-4 print:hidden">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider">Inventory Catalog PDF Generator</h1>
          <p className="text-xs text-neutral-500">Optimized instant print layout. Offline-first local images.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 active:scale-95 transition-all"
        >
          Print / Save PDF
        </button>
      </div>

      {/* Catalog Header */}
      <div className="text-center mb-8 border-b-2 border-black pb-6">
        <h2 className="text-3xl font-light uppercase tracking-[0.2em]">Nafshe Inventory</h2>
        <p className="text-xs uppercase tracking-widest text-neutral-600 mt-2">
          Full Catalog | Generated on {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[11px] leading-tight">
          <thead>
            <tr className="border-b-2 border-black bg-neutral-50 uppercase tracking-wider font-bold">
              <th className="py-3 px-2 border-b">ID</th>
              <th className="py-3 px-2 border-b w-[240px]">Product Images</th>
              <th className="py-3 px-2 border-b">Name</th>
              <th className="py-3 px-2 border-b">Brand</th>
              <th className="py-3 px-2 border-b text-right">Price</th>
              <th className="py-3 px-2 border-b">Category</th>
              <th className="py-3 px-2 border-b text-center">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-neutral-200 break-inside-avoid">
                <td className="py-4 px-2 font-mono font-bold text-neutral-600">{p.id}</td>
                <td className="py-4 px-2">
                  <div className="flex gap-2">
                    {p.images && p.images.slice(0, 3).map((img: string, idx: number) => (
                      <div key={idx} className="relative w-16 h-16 border border-neutral-200 bg-neutral-50 overflow-hidden flex-shrink-0">
                        <img
                          src={img}
                          alt={`${p.name} - image ${idx + 1}`}
                          className="w-full h-full object-cover"
                          loading="eager"
                        />
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-2 font-bold max-w-[200px] break-words">{p.name}</td>
                <td className="py-4 px-2 text-neutral-700">{p.brand}</td>
                <td className="py-4 px-2 text-right font-bold text-neutral-800">
                  ₹{p.price.toLocaleString()}
                </td>
                <td className="py-4 px-2 uppercase tracking-wide text-[10px] text-neutral-500">
                  {p.category}
                </td>
                <td className="py-4 px-2 text-center font-bold">{(p as any).stock || 10}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Catalog Footer */}
      <div className="mt-12 text-center text-[9px] uppercase tracking-widest text-neutral-400 border-t pt-4">
        © {new Date().getFullYear()} Nafshe. All Rights Reserved. Confidential Inventory Data.
      </div>
    </div>
  );
}
