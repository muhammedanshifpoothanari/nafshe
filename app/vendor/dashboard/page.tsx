'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Zap, 
  Package, 
  Tag, 
  TrendingUp, 
  DollarSign, 
  FileSpreadsheet, 
  Plus, 
  LogOut, 
  Activity,
  Percent,
  Sliders,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function VendorDashboard() {
  const [vendor, setVendor] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'inventory' | 'coupons' | 'payouts' | 'bda'>('products');
  const [products, setProducts] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [bdas, setBdas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductCost, setNewProductCost] = useState('');
  const [newProductFulfillment, setNewProductFulfillment] = useState<'FBA' | 'FBM'>('FBM');

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponValue, setNewCouponValue] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');

  const [newBdaType, setNewBdaType] = useState<'ad_spend' | 'marketing' | 'logistics'>('ad_spend');
  const [newBdaAmount, setNewBdaAmount] = useState('');
  const [newBdaDesc, setNewBdaDesc] = useState('');

  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('vendorSession');
    if (!session) {
      router.push('/vendor/login');
      return;
    }
    const vendorData = JSON.parse(session);
    setVendor(vendorData);
  }, []);

  useEffect(() => {
    if (vendor) {
      loadTabData();
    }
  }, [vendor, activeTab]);

  const loadTabData = async () => {
    if (!vendor) return;
    setLoading(true);
    try {
      if (activeTab === 'products' || activeTab === 'inventory') {
        const res = await fetch(`/api/products?vendorId=${vendor.id}&status=all`);
        const data = await res.json();
        setProducts(data);
      } else if (activeTab === 'payouts') {
        const res = await fetch(`/api/payouts?vendorId=${vendor.id}`);
        const data = await res.json();
        setPayouts(data);
      } else if (activeTab === 'bda') {
        const res = await fetch(`/api/bdas?vendorId=${vendor.id}`);
        const data = await res.json();
        setBdas(data);
      }
    } catch (err) {
      console.error('Error fetching tab data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('vendorSession');
    router.push('/vendor/login');
  };

  // Submit product creation for approval
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice || !newProductCategory) return;

    try {
      const payload = {
        name: newProductName,
        brand: vendor.name,
        price: Number(newProductPrice),
        category: newProductCategory,
        costPrice: Number(newProductCost) || 0,
        fulfillmentType: newProductFulfillment,
        vendorId: vendor.id,
        status: 'pending'
      };

      const res = await fetch('/api/approvals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId: vendor.id,
          type: 'product',
          action: 'create',
          data: payload
        })
      });

      if (res.ok) {
        alert('Product creation request submitted to Nafshe Admin for approval.');
        setNewProductName('');
        setNewProductPrice('');
        setNewProductCategory('');
        setNewProductCost('');
      }
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  // Toggle FBA/FBM status (triggers approval flow)
  const handleFulfillmentToggle = async (prodId: string, currentType: 'FBA' | 'FBM') => {
    const nextType = currentType === 'FBA' ? 'FBM' : 'FBA';
    try {
      const res = await fetch('/api/approvals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId: vendor.id,
          type: 'product',
          action: 'update',
          targetId: prodId,
          data: { fulfillmentType: nextType }
        })
      });
      if (res.ok) {
        alert(`Change request to ${nextType} sent to Nafshe Admin for approval.`);
      }
    } catch (error) {
      console.error('Error updating fulfillment:', error);
    }
  };

  // Request BDA / Ad Spend
  const handleBdaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBdaAmount) return;

    try {
      const res = await fetch('/api/approvals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId: vendor.id,
          type: 'bda',
          action: 'create',
          data: {
            vendorId: vendor.id,
            type: newBdaType,
            amount: Number(newBdaAmount),
            description: newBdaDesc,
            status: 'Pending'
          }
        })
      });
      if (res.ok) {
        alert('BDA / Ad Spend request submitted to Nafshe Admin for approval.');
        setNewBdaAmount('');
        setNewBdaDesc('');
      }
    } catch (error) {
      console.error('Error creating BDA:', error);
    }
  };

  if (!vendor) {
    return <div className="text-white bg-black min-h-screen p-12">Checking active connections...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            {vendor.name} <span className="text-white/20">Admin Panel</span>
          </h1>
          <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40 flex items-center gap-2 mt-1">
            <span className="w-2 h-2 bg-blue-500 animate-pulse" />
            Consignment Terms: {vendor.consignment ? 'CONSIGNMENT ACTIVE' : 'STANDARD'} | Commission Split: {vendor.commissionRate}%
          </p>
        </div>
        <button 
          onClick={handleLogout}
          className="px-6 py-3 border border-white/10 hover:border-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all self-start md:self-auto"
        >
          <LogOut className="w-4 h-4" /> Disconnect Node
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 overflow-x-auto">
        {[
          { id: 'products', label: 'Products CRUD', icon: Package },
          { id: 'inventory', label: 'Inventory (FBA/FBM)', icon: Sliders },
          { id: 'coupons', label: 'Coupons & Offers', icon: Percent },
          { id: 'bda', label: 'Ad Spend & BDA', icon: Tag },
          { id: 'payouts', label: 'Payout Ledger', icon: DollarSign },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-4 text-[9px] font-black uppercase tracking-widest border-t-2 transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'border-white text-white bg-white/5' : 'border-transparent text-white/40 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Create Product Form */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 p-8 space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-white/10 pb-3">Submit Product for Approval</h2>
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className="text-[8px] uppercase tracking-widest text-white/40 font-bold block mb-1">Product Title</label>
                <input 
                  type="text" 
                  required
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="e.g. Classic Silk Abaya"
                  className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-white focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[8px] uppercase tracking-widest text-white/40 font-bold block mb-1">Price (SAR)</label>
                  <input 
                    type="number" 
                    required
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    placeholder="999"
                    className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[8px] uppercase tracking-widest text-white/40 font-bold block mb-1">Cost Price (SAR)</label>
                  <input 
                    type="number" 
                    required
                    value={newProductCost}
                    onChange={(e) => setNewProductCost(e.target.value)}
                    placeholder="400"
                    className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-[8px] uppercase tracking-widest text-white/40 font-bold block mb-1">Category</label>
                <input 
                  type="text" 
                  required
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value)}
                  placeholder="e.g. dresses, bags"
                  className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[8px] uppercase tracking-widest text-white/40 font-bold block mb-1">Fulfillment Mode</label>
                <select 
                  value={newProductFulfillment}
                  onChange={(e) => setNewProductFulfillment(e.target.value as any)}
                  className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-white focus:outline-none"
                >
                  <option value="FBM">FBM (Merchant Self-Ship)</option>
                  <option value="FBA">FBA (Nafshe Storage Warehousing)</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" /> Request Approval
              </button>
            </form>
          </div>

          {/* Product Listing */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-white/10 pb-3">Platform Listings</h2>
            {loading ? (
              <p className="text-xs font-mono text-white/40">Querying listings...</p>
            ) : products.length === 0 ? (
              <p className="text-xs font-mono text-white/40 border border-dashed border-white/10 p-10 text-center">No products catalogued. Submit your first product.</p>
            ) : (
              <div className="overflow-x-auto border border-white/10">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-[8px] uppercase tracking-widest text-white/40 font-black">
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Fulfillment</th>
                      <th className="px-6 py-4">Valuation</th>
                      <th className="px-6 py-4 text-right">Approval Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-5">
                          <p className="font-bold text-white">{p.name}</p>
                          <p className="text-[9px] text-white/40 lowercase mt-0.5">{p.category}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border ${
                            p.fulfillmentType === 'FBA' ? 'border-blue-500/30 text-blue-400 bg-blue-500/5' : 'border-white/10 text-white/40'
                          }`}>{p.fulfillmentType}</span>
                        </td>
                        <td className="px-6 py-5 text-white/80">SAR {p.price}</td>
                        <td className="px-6 py-5 text-right">
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 border ${
                            p.status === 'approved' ? 'border-green-500/30 text-green-500 bg-green-500/5' : 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5'
                          }`}>{p.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-white/10 pb-3">Inventory Warehousing Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="p-6 bg-white/5 border border-white/10 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-bold text-white">{p.name}</h3>
                    <p className="text-[8px] uppercase tracking-widest text-white/40 mt-0.5">Stock Level: {p.stock || 10}</p>
                  </div>
                  <span className={`text-[8px] font-black px-2 py-0.5 border ${
                    p.fulfillmentType === 'FBA' ? 'border-blue-500/30 text-blue-400 bg-blue-500/5' : 'border-white/10 text-white/40'
                  }`}>{p.fulfillmentType}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleFulfillmentToggle(p.id, p.fulfillmentType)}
                    className="flex-1 py-2 border border-white/10 hover:border-white text-[8px] font-black uppercase tracking-widest transition-all"
                  >
                    Request {p.fulfillmentType === 'FBA' ? 'FBM' : 'FBA'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 bg-white/5 border border-white/10 p-8 space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-white/10 pb-3">Generate Coupon Code</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Coupon registered.'); }} className="space-y-4">
              <div>
                <label className="text-[8px] uppercase tracking-widest text-white/40 font-bold block mb-1">Coupon Code</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. DIOR50"
                  className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-white focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[8px] uppercase tracking-widest text-white/40 font-bold block mb-1">Value</label>
                  <input 
                    type="number" 
                    required
                    placeholder="15"
                    className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[8px] uppercase tracking-widest text-white/40 font-bold block mb-1">Type</label>
                  <select className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-white focus:outline-none">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed SAR</option>
                  </select>
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-all flex items-center justify-center gap-2"
              >
                Create Promotion
              </button>
            </form>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-white/10 pb-3">Active Promotional Campaign</h2>
            <p className="text-xs font-mono text-white/40 border border-dashed border-white/10 p-10 text-center">No custom promotions active on storefront.</p>
          </div>
        </div>
      )}

      {activeTab === 'bda' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 bg-white/5 border border-white/10 p-8 space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-white/10 pb-3">Log / Request Ad Spend & BDA</h2>
            <form onSubmit={handleBdaSubmit} className="space-y-4">
              <div>
                <label className="text-[8px] uppercase tracking-widest text-white/40 font-bold block mb-1">Expense Type</label>
                <select 
                  value={newBdaType}
                  onChange={(e) => setNewBdaType(e.target.value as any)}
                  className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-white focus:outline-none"
                >
                  <option value="ad_spend">Ad Spend (Marketing Campaigns)</option>
                  <option value="logistics">Logistics Fee</option>
                  <option value="marketing">Special Banner Promotion</option>
                </select>
              </div>
              <div>
                <label className="text-[8px] uppercase tracking-widest text-white/40 font-bold block mb-1">Amount (SAR)</label>
                <input 
                  type="number" 
                  required
                  value={newBdaAmount}
                  onChange={(e) => setNewBdaAmount(e.target.value)}
                  placeholder="500"
                  className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[8px] uppercase tracking-widest text-white/40 font-bold block mb-1">Description</label>
                <textarea 
                  value={newBdaDesc}
                  onChange={(e) => setNewBdaDesc(e.target.value)}
                  placeholder="Facebook campaign details or logistics invoice"
                  className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-white focus:outline-none h-24"
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-all flex items-center justify-center gap-2"
              >
                Submit Expense Node
              </button>
            </form>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-white/10 pb-3">Expense Log Ledger</h2>
            {loading ? (
              <p className="text-xs font-mono text-white/40">Querying ledger...</p>
            ) : bdas.length === 0 ? (
              <p className="text-xs font-mono text-white/40 border border-dashed border-white/10 p-10 text-center">No ad spend or expenses logged for this period.</p>
            ) : (
              <div className="overflow-x-auto border border-white/10">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-[8px] uppercase tracking-widest text-white/40 font-black">
                      <th className="px-6 py-4">Expense ID</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {bdas.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-5">
                          <p className="font-bold text-white">{item.id}</p>
                          <p className="text-[9px] text-white/40 mt-0.5">{item.description}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border border-white/10 text-white/60">{item.type}</span>
                        </td>
                        <td className="px-6 py-5 text-white/80">SAR {item.amount}</td>
                        <td className="px-6 py-5 text-right">
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border ${
                            item.status === 'Approved' ? 'border-green-500/30 text-green-500 bg-green-500/5' : 
                            item.status === 'Deducted' ? 'border-blue-500/30 text-blue-400 bg-blue-500/5' : 
                            'border-yellow-500/30 text-yellow-500 bg-yellow-500/5'
                          }`}>{item.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'payouts' && (
        <div className="space-y-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-white/10 pb-3">Settled Payout Ledger</h2>
          {loading ? (
            <p className="text-xs font-mono text-white/40">Querying payouts...</p>
          ) : payouts.length === 0 ? (
            <p className="text-xs font-mono text-white/40 border border-dashed border-white/10 p-10 text-center">No calculated payouts or settlements generated.</p>
          ) : (
            <div className="overflow-x-auto border border-white/10">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-[8px] uppercase tracking-widest text-white/40 font-black">
                    <th className="px-6 py-4">Settlement ID</th>
                    <th className="px-6 py-4">Sales Revenue</th>
                    <th className="px-6 py-4">Commission Deducted</th>
                    <th className="px-6 py-4">Ad Spend (BDA) Deducted</th>
                    <th className="px-6 py-4">Taxes</th>
                    <th className="px-6 py-4">Net Payout</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {payouts.map((pay) => (
                    <tr key={pay.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-5">
                        <p className="font-bold text-white">{pay.id}</p>
                        <p className="text-[8px] text-white/40 mt-0.5">
                          {new Date(pay.periodStart).toLocaleDateString()} - {new Date(pay.periodEnd).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-5 text-white/80">SAR {pay.salesRevenue}</td>
                      <td className="px-6 py-5 text-red-400">-SAR {pay.nafsheCommission}</td>
                      <td className="px-6 py-5 text-red-400">-SAR {pay.bdaDeductions}</td>
                      <td className="px-6 py-5 text-red-400">-SAR {pay.taxAmount}</td>
                      <td className="px-6 py-5 text-green-500 font-bold">SAR {pay.payoutAmount}</td>
                      <td className="px-6 py-5 text-right">
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border ${
                          pay.status === 'Paid' ? 'border-green-500/30 text-green-500 bg-green-500/5' : 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5'
                        }`}>{pay.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
