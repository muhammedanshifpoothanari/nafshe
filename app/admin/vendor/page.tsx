'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Settings, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Search,
  Bell,
  Globe,
  Filter,
  FileText,
  CreditCard,
  Truck,
  Barcode,
  Ticket,
  Eye,
  X,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVendorId, setSelectedVendorId] = useState('dior');
  const [vendors, setVendors] = useState<any[]>([]);
  const [currentVendor, setCurrentVendor] = useState<any>(null);
  const [brandProfile, setBrandProfile] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Brand profile editing form state
  const [brandForm, setBrandForm] = useState({
    name: '',
    tagline: '',
    description: '',
    story: '',
    image: '',
    accentColor: '#BCA374'
  });

  // Product submission form state
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: 'dresses',
    description: '',
    images: '',
    colors: '',
    sizes: '',
    stock: '10'
  });

  const [uploadingBrandImage, setUploadingBrandImage] = useState(false);
  const [uploadingProductImage, setUploadingProductImage] = useState(false);
  const [uploadingEditProductImage, setUploadingEditProductImage] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editProductForm, setEditProductForm] = useState({
    name: '',
    price: '',
    category: 'dresses',
    description: '',
    images: '',
    colors: '',
    sizes: '',
    stock: '10'
  });

  const handleImageUpload = (file: File, type: 'brand' | 'product' | 'edit-product') => {
    if (type === 'brand') setUploadingBrandImage(true);
    else if (type === 'product') setUploadingProductImage(true);
    else setUploadingEditProductImage(true);

    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.url) {
          if (type === 'brand') {
            setBrandForm(prev => ({ ...prev, image: data.url }));
          } else if (type === 'product') {
            setProductForm(prev => ({ ...prev, images: data.url }));
          } else {
            setEditProductForm(prev => ({ ...prev, images: data.url }));
          }
        } else {
          alert('Upload failed: ' + (data.message || 'Unknown error'));
        }
      })
      .catch(err => {
        console.error('Error uploading image:', err);
        alert('Image uploader failed.');
      })
      .finally(() => {
        if (type === 'brand') setUploadingBrandImage(false);
        else if (type === 'product') setUploadingProductImage(false);
        else setUploadingEditProductImage(false);
      });
  };

  // Fetch vendors list on mount
  useEffect(() => {
    fetch('/api/vendors')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setVendors(data);
          // Default context: Dior, or the first vendor in the list
          const defaultVendor = data.find(v => v.id === 'dior') || data[0];
          if (defaultVendor) {
            setSelectedVendorId(defaultVendor.id);
            setCurrentVendor(defaultVendor);
          }
        }
      })
      .catch(err => console.error('Error fetching vendors list:', err));
  }, []);

  // Fetch products and brand profile details when selected vendor changes
  useEffect(() => {
    if (!selectedVendorId) return;

    setLoading(true);

    // Find current vendor metadata
    const vendor = vendors.find(v => v.id === selectedVendorId);
    if (vendor) {
      setCurrentVendor(vendor);
    }

    // Fetch vendor products (all status states: approved, pending, rejected)
    const fetchProducts = fetch(`/api/products?vendorId=${selectedVendorId}&status=all`)
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error('Error fetching products:', err));

    // Fetch vendor public brand profile (if exists)
    const fetchBrand = fetch(`/api/brands/${selectedVendorId}`)
      .then(res => res.json())
      .then(brandData => {
        if (brandData && !brandData.error) {
          setBrandProfile(brandData);
          setBrandForm({
            name: brandData.name || '',
            tagline: brandData.tagline || '',
            description: brandData.description || '',
            story: brandData.story || '',
            image: brandData.image || '',
            accentColor: brandData.accentColor || '#BCA374'
          });
        } else {
          setBrandProfile(null);
          setBrandForm({
            name: vendor?.name || '',
            tagline: '',
            description: '',
            story: '',
            image: '/assets/bag.jpg',
            accentColor: '#BCA374'
          });
        }
      })
      .catch(err => console.error('Error fetching brand profile:', err));

    Promise.all([fetchProducts, fetchBrand]).then(() => {
      setLoading(false);
    });
  }, [selectedVendorId, vendors]);

  const handleRequestProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentVendor) return;

    const formattedPayload = {
      name: productForm.name,
      brand: currentVendor.name,
      price: Number(productForm.price),
      category: productForm.category,
      description: productForm.description,
      images: productForm.images ? [productForm.images] : ['/assets/bag.jpg'],
      colors: productForm.colors ? productForm.colors.split(',').map(s => s.trim()) : [],
      sizes: productForm.sizes ? productForm.sizes.split(',').map(s => s.trim()) : [],
      stock: Number(productForm.stock),
      vendorId: selectedVendorId,
      status: 'pending' // Forced to pending state for admin approvals
    };

    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedPayload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.product) {
          setProducts([data.product, ...products]);
          setProductForm({
            name: '',
            price: '',
            category: 'dresses',
            description: '',
            images: '',
            colors: '',
            sizes: '',
            stock: '10'
          });
          setShowProductModal(false);
          alert('Product request submitted! Awaiting Nafshe Admin verification.');
        } else {
          alert(data.message || 'Failed to submit product request');
        }
      })
      .catch(err => {
        console.error('Error submitting product request:', err);
        alert('Error occurred during submission');
      });
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !selectedVendorId) return;

    const formattedPayload = {
      name: editProductForm.name,
      price: Number(editProductForm.price),
      category: editProductForm.category,
      description: editProductForm.description,
      images: editProductForm.images ? [editProductForm.images] : ['/assets/bag.jpg'],
      colors: editProductForm.colors ? editProductForm.colors.split(',').map(s => s.trim()).filter(Boolean) : [],
      sizes: editProductForm.sizes ? editProductForm.sizes.split(',').map(s => s.trim()).filter(Boolean) : [],
      stock: Number(editProductForm.stock),
      status: 'pending', // Re-evaluate upon updates
      feedback: '' // Reset administrative notes
    };

    fetch(`/api/products/${editingProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedPayload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.product) {
          setProducts(prev => prev.map(p => p.id === editingProduct.id ? data.product : p));
          setShowEditProductModal(false);
          setEditingProduct(null);
          alert('Product details updated successfully and submitted for Admin verification!');
        } else {
          alert(data.message || 'Failed to update product details');
        }
      })
      .catch(err => {
        console.error('Error updating product details:', err);
        alert('Error occurred during product update');
      });
  };

  const handleSaveBrandProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVendorId) return;

    fetch(`/api/brands/${selectedVendorId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(brandForm)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBrandProfile(data.brand);
          alert('Maison branding details updated successfully!');
        } else {
          alert(data.message || 'Failed to update brand profile');
        }
      })
      .catch(err => {
        console.error('Error updating brand details:', err);
        alert('Error saving brand profile');
      });
  };

  // Dynamic statistics
  const totalProductsCount = products.length;
  const approvedCount = products.filter(p => p.status === 'approved').length;
  const pendingCount = products.filter(p => p.status === 'pending').length;
  const rejectedCount = products.filter(p => p.status === 'rejected').length;

  const STATS = [
    { label: 'Total Catalog', value: totalProductsCount.toString(), change: 'Products', up: true },
    { label: 'Approved Live', value: approvedCount.toString(), change: 'Active On Site', up: true },
    { label: 'Pending Admin', value: pendingCount.toString(), change: 'In Review Pipeline', up: false },
    { label: 'Rejected / Edits', value: rejectedCount.toString(), change: 'Action Required', up: false },
  ];

  const PURCHASE_ORDERS = [
    { id: 'PO-8821', date: 'May 10', items: 120, total: '$45,000', status: 'Pending Delivery' },
    { id: 'PO-8819', date: 'May 05', items: 85, total: '$32,400', status: 'Received at Godown' },
  ];

  // Filtering products by search term
  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F7F5] flex selection:bg-primary selection:text-white">
      
      {/* Enterprise Maison Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col fixed inset-y-0 left-0 z-50 shadow-2xl">
         <div className="p-8 border-b border-white/10 space-y-4">
            <div className="flex items-center gap-3">
               <span className="text-2xl font-light tracking-tighter text-accent">Λ</span>
               <div className="flex flex-col">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase max-w-[150px] truncate">{currentVendor?.name || 'Maison Dior'}</span>
                  <span className="text-[7px] text-accent/60 uppercase font-bold tracking-widest text-wrap">Supply Portal</span>
               </div>
            </div>
            
            {/* Context Selector */}
            <div className="space-y-1">
               <label className="text-[7px] uppercase tracking-widest text-white/40 font-bold">Maison Selector</label>
               <select
                 value={selectedVendorId}
                 onChange={(e) => setSelectedVendorId(e.target.value)}
                 className="w-full bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest font-bold text-white px-3 py-2 outline-none focus:border-accent appearance-none rounded-none cursor-pointer"
               >
                 {vendors.map(v => (
                   <option key={v.id} value={v.id} className="bg-primary text-white">
                     {v.name}
                   </option>
                 ))}
               </select>
            </div>
         </div>

         {/* Edit Product Modal */}
         {showEditProductModal && editingProduct && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
              <div className="w-full max-w-2xl bg-[#F8F7F5] border border-border shadow-2xl p-12 space-y-8 relative overflow-hidden text-luxury max-h-[90vh] overflow-y-auto custom-scrollbar">
                 <div className="absolute top-0 right-0 p-8">
                    <button onClick={() => { setShowEditProductModal(false); setEditingProduct(null); }} className="text-muted-foreground hover:text-luxury transition-colors">
                       <X className="w-6 h-6" />
                    </button>
                 </div>
                 
                 <div className="space-y-2">
                    <h2 className="text-2xl font-light tracking-tight">Edit Product <span className="font-serif italic text-accent">Details</span></h2>
                    <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-muted-foreground">Modify proposed or active listing configuration</p>
                 </div>

                 <form onSubmit={handleEditProduct} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2 md:col-span-2">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Product Title</label>
                          <input
                             type="text"
                             value={editProductForm.name}
                             onChange={(e) => setEditProductForm({ ...editProductForm, name: e.target.value })}
                             className="w-full bg-white border border-border p-3 text-xs outline-none focus:border-accent"
                             required
                          />
                       </div>
                       
                       <div className="space-y-2">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                          <select
                             value={editProductForm.category}
                             onChange={(e) => setEditProductForm({ ...editProductForm, category: e.target.value })}
                             className="w-full bg-white border border-border p-3 text-xs outline-none focus:border-accent appearance-none rounded-none cursor-pointer"
                          >
                             <option value="abayas">Abayas</option>
                             <option value="dresses">Dresses</option>
                             <option value="bags">Bags</option>
                             <option value="jewelry">Jewelry</option>
                             <option value="sunglasses">Sunglasses</option>
                             <option value="shoes">Shoes</option>
                             <option value="watches">Watches</option>
                             <option value="tops">Tops</option>
                          </select>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Price (INR / ₹)</label>
                          <input
                             type="number"
                             value={editProductForm.price}
                             onChange={(e) => setEditProductForm({ ...editProductForm, price: e.target.value })}
                             className="w-full bg-white border border-border p-3 text-xs outline-none focus:border-accent"
                             required
                          />
                       </div>

                       <div className="space-y-2">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Intake Stock Level</label>
                          <input
                             type="number"
                             value={editProductForm.stock}
                             onChange={(e) => setEditProductForm({ ...editProductForm, stock: e.target.value })}
                             className="w-full bg-white border border-border p-3 text-xs outline-none focus:border-accent"
                             required
                          />
                       </div>

                       <div className="space-y-2 md:col-span-2">
                           <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Product Image</label>
                           <div className="flex gap-4 items-center">
                              <input
                                 type="text"
                                 value={editProductForm.images}
                                 onChange={(e) => setEditProductForm({ ...editProductForm, images: e.target.value })}
                                 placeholder="/assets/bag.jpg or external url"
                                 className="flex-grow bg-white border border-border p-3 text-xs outline-none focus:border-accent"
                              />
                              <label className="px-6 py-3 bg-white border border-border hover:bg-neutral-50 cursor-pointer text-[9px] uppercase tracking-widest font-bold text-luxury transition-all relative whitespace-nowrap flex-shrink-0">
                                 {uploadingEditProductImage ? 'Uploading...' : 'Choose File'}
                                 <input 
                                    type="file" 
                                    accept="image/*"
                                    className="hidden" 
                                    disabled={uploadingEditProductImage}
                                    onChange={(e) => {
                                       const file = e.target.files?.[0];
                                       if (file) handleImageUpload(file, 'edit-product');
                                    }}
                                 />
                              </label>
                           </div>
                        </div>

                       <div className="space-y-2">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Colors (comma-separated)</label>
                          <input
                             type="text"
                             value={editProductForm.colors}
                             onChange={(e) => setEditProductForm({ ...editProductForm, colors: e.target.value })}
                             className="w-full bg-white border border-border p-3 text-xs outline-none focus:border-accent"
                          />
                       </div>

                       <div className="space-y-2">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Sizes (comma-separated)</label>
                          <input
                             type="text"
                             value={editProductForm.sizes}
                             onChange={(e) => setEditProductForm({ ...editProductForm, sizes: e.target.value })}
                             className="w-full bg-white border border-border p-3 text-xs outline-none focus:border-accent"
                          />
                       </div>

                       <div className="space-y-2 md:col-span-2">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Description & Details</label>
                          <textarea
                             value={editProductForm.description}
                             onChange={(e) => setEditProductForm({ ...editProductForm, description: e.target.value })}
                             rows={3}
                             className="w-full bg-white border border-border p-3 text-xs outline-none focus:border-accent"
                          />
                       </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border">
                       <button
                          type="submit"
                          className="w-full py-4 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:opacity-95 transition-all"
                       >
                          Save Product Changes
                       </button>
                    </div>
                 </form>
              </div>
           </div>
         )}

         <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {[
              { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'inventory', label: 'Inventory & Status', icon: Barcode },
              { id: 'storefront', label: 'Maison Branding', icon: Globe },
              { id: 'supply', label: 'Supply Chain (PO)', icon: Truck },
              { id: 'finance', label: 'Settlements', icon: CreditCard },
              { id: 'promotions', label: 'Paid Banners', icon: Ticket },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 text-[9px] uppercase tracking-[0.2em] font-bold transition-all rounded-none ${activeTab === item.id ? 'bg-white/10 text-accent border-l-2 border-accent' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                 <item.icon className={`w-3.5 h-3.5 ${activeTab === item.id ? 'text-accent' : 'text-white/40'}`} />
                 {item.label}
              </button>
            ))}
         </nav>

         <div className="p-4 border-t border-white/10">
            <Link href="/" className="w-full flex items-center justify-center py-3 border border-white/20 text-white/40 hover:text-white hover:border-white transition-all text-[9px] font-bold uppercase tracking-[0.2em]">
               Return to Store
            </Link>
         </div>
      </aside>

      <main className="flex-grow ml-64 p-12 space-y-12 overflow-x-hidden min-h-screen">
         
         <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
            <div className="space-y-1">
               <h1 className="text-3xl font-light text-luxury tracking-wide">
                  Enterprise <span className="italic font-serif">{currentVendor?.name || 'Maison'}</span>
               </h1>
               <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
                  Vendor Control Node • Connection Status: Synchronized
               </p>
            </div>
            <div className="flex items-center gap-4">
               {brandProfile && (
                 <Link href={`/brands/${selectedVendorId}`} target="_blank" className="flex items-center gap-3 bg-white border border-border px-8 py-3 text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-neutral-50 transition-all text-luxury">
                    <Eye className="w-3.5 h-3.5" />
                    Public Site
                 </Link>
               )}
               <button 
                  onClick={() => setShowProductModal(true)}
                  className="flex items-center gap-3 bg-primary text-white px-8 py-3 text-[9px] uppercase tracking-[0.2em] font-bold shadow-2xl hover:opacity-90 transition-all"
               >
                  <Plus className="w-3.5 h-3.5" />
                  Request Product
               </button>
            </div>
         </header>

         {loading ? (
            <div className="h-[400px] flex flex-col items-center justify-center gap-4 text-luxury">
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse">Syncing Maison Vault...</span>
            </div>
         ) : (
            <>
               {activeTab === 'overview' && (
                 <div className="space-y-12 animate-in fade-in duration-500">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                       {STATS.map((stat, i) => (
                         <div key={i} className="bg-white p-8 border border-border space-y-4 hover:border-accent/40 transition-colors">
                            <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</p>
                            <div className="flex items-end justify-between">
                               <p className="text-3xl font-light text-luxury font-serif">{stat.value}</p>
                               <span className="text-[8px] font-bold uppercase tracking-widest text-accent">{stat.change}</span>
                            </div>
                         </div>
                       ))}
                    </div>

                    {/* Dashboard Modules */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                       
                       {/* Purchase Orders */}
                       <div className="lg:col-span-7 bg-white border border-border overflow-hidden">
                          <div className="p-8 border-b border-border flex items-center justify-between">
                             <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury">Active Purchase Orders</h2>
                             <span className="text-[8px] text-accent font-bold uppercase tracking-widest">Nafshe HQ Issued</span>
                          </div>
                          <div className="overflow-x-auto">
                             <table className="w-full text-left">
                                <thead>
                                   <tr className="bg-neutral-50 text-[8px] uppercase tracking-widest font-bold text-muted-foreground border-b border-border">
                                      <th className="px-8 py-5">PO Number</th>
                                      <th className="px-8 py-5">Issued Date</th>
                                      <th className="px-8 py-5">Value</th>
                                      <th className="px-8 py-5 text-right">Status</th>
                                   </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                   {PURCHASE_ORDERS.map((po) => (
                                     <tr key={po.id} className="hover:bg-neutral-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                           <p className="text-xs font-bold text-luxury">{po.id}</p>
                                           <p className="text-[9px] text-muted-foreground uppercase">{po.items} Units Requested</p>
                                        </td>
                                        <td className="px-8 py-6 text-xs font-light">{po.date}</td>
                                        <td className="px-8 py-6 text-xs font-bold">{po.total}</td>
                                        <td className="px-8 py-6 text-right">
                                           <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[8px] uppercase font-bold tracking-widest">{po.status}</span>
                                        </td>
                                     </tr>
                                   ))}
                                </tbody>
                             </table>
                          </div>
                       </div>

                       {/* Settlement Overview */}
                       <div className="lg:col-span-5 bg-white border border-border p-10 space-y-8 text-luxury">
                          <div className="flex items-center gap-3">
                             <CreditCard className="w-4 h-4 text-accent" />
                             <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">Automatic Settlement</h2>
                          </div>
                          <div className="space-y-6">
                             <div className="p-6 bg-neutral-50 border border-border rounded-sm space-y-4">
                                <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Next Auto-Payment</p>
                                <div className="flex justify-between items-end">
                                   <p className="text-2xl font-light font-serif">June 30, 2026</p>
                                   <p className="text-xl font-bold text-accent">{currentVendor?.sales || '₹0'}</p>
                                </div>
                                <p className="text-[7px] uppercase tracking-widest text-muted-foreground">Status: Connected to Bank Account</p>
                             </div>
                             <div className="space-y-4">
                                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Credit Agreement</p>
                                <div className="flex justify-between items-center text-xs">
                                   <span className="font-light text-muted-foreground italic">Settlement Terms</span>
                                   <span className="font-bold">Net-30 Days</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                   <span className="font-light text-muted-foreground italic">HQ Commission Rate</span>
                                   <span className="font-bold text-accent">{currentVendor?.commissionRate || 15}%</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                   <span className="font-light text-muted-foreground italic">Routing Node Tier</span>
                                   <span className="font-bold uppercase tracking-wider text-[10px]">{currentVendor?.tier || 'Standard'}</span>
                                </div>
                             </div>
                          </div>
                       </div>

                    </div>
                 </div>
               )}

               {activeTab === 'inventory' && (
                 <div className="space-y-8 animate-in fade-in duration-500">
                    {/* Barcode & Inventory Management */}
                    <div className="bg-white border border-border shadow-sm overflow-hidden text-luxury">
                       <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                             <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">Maison Inventory Catalog</h2>
                             <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Status of pending and live items</p>
                          </div>
                          <div className="relative">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                             <input 
                               type="text" 
                               value={searchTerm}
                               onChange={(e) => setSearchTerm(e.target.value)}
                               placeholder="Search Inventory By Name or SKU..." 
                               className="pl-10 pr-4 py-2 bg-neutral-50 border border-border text-[9px] uppercase tracking-widest font-bold w-72 focus:border-accent outline-none" 
                             />
                          </div>
                       </div>
                       <div className="overflow-x-auto">
                          <table className="w-full text-left">
                             <thead>
                                <tr className="bg-neutral-50 text-[8px] uppercase tracking-widest font-bold text-muted-foreground border-b border-border">
                                   <th className="px-8 py-5">Product Details</th>
                                   <th className="px-8 py-5">SKU Code</th>
                                   <th className="px-8 py-5">Unit Price</th>
                                   <th className="px-8 py-5">Stock Level</th>
                                   <th className="px-8 py-5">Approval Status</th>
                                   <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y divide-border">
                                {filteredProducts.length === 0 ? (
                                   <tr>
                                      <td colSpan={6} className="text-center py-20 text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                                         No products found in this Maison vault.
                                      </td>
                                   </tr>
                                ) : (
                                   filteredProducts.map((item) => (
                                     <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                           <div className="flex items-center gap-4">
                                              <div className="relative w-12 h-12 border border-border bg-neutral-100 overflow-hidden flex-shrink-0">
                                                 <Image 
                                                    src={(item.images?.[0] && (item.images[0].startsWith('/') || item.images[0].startsWith('http://') || item.images[0].startsWith('https://'))) ? item.images[0] : '/assets/bag.jpg'} 
                                                    alt={item.name} 
                                                    fill 
                                                    className="object-cover grayscale" 
                                                 />
                                              </div>
                                              <div>
                                                 <p className="text-xs font-bold text-luxury uppercase">{item.name}</p>
                                                 <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest mt-0.5">{item.category}</p>
                                              </div>
                                           </div>
                                        </td>
                                        <td className="px-8 py-6 text-xs font-mono font-bold text-muted-foreground">{item.id}</td>
                                        <td className="px-8 py-6 text-xs font-bold">₹{item.price?.toLocaleString()}</td>
                                        <td className="px-8 py-6 text-xs font-light">{item.stock} Units</td>
                                        <td className="px-8 py-6">
                                           <div className="flex flex-col items-start gap-1">
                                              {item.status === 'approved' && (
                                                <span className="px-3 py-1 bg-green-50 text-green-600 border border-green-200 text-[8px] uppercase font-bold tracking-widest">Approved</span>
                                              )}
                                              {item.status === 'pending' && (
                                                <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-200 text-[8px] uppercase font-bold tracking-widest">Pending Review</span>
                                              )}
                                              {item.status === 'rejected' && (
                                                <>
                                                  <span className="px-3 py-1 bg-rose-50 text-rose-600 border border-rose-200 text-[8px] uppercase font-bold tracking-widest">Rejected</span>
                                                  {item.feedback && (
                                                     <p className="text-[8px] text-rose-500 italic max-w-[200px] truncate mt-1" title={item.feedback}>
                                                        "{item.feedback}"
                                                     </p>
                                                  )}
                                                </>
                                              )}
                                           </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                           <button
                                              onClick={() => {
                                                 setEditingProduct(item);
                                                 setEditProductForm({
                                                    name: item.name || '',
                                                    price: item.price?.toString() || '',
                                                    category: item.category || 'abayas',
                                                    description: item.description || '',
                                                    images: item.images?.[0] || '',
                                                    colors: item.colors?.join(', ') || '',
                                                    sizes: item.sizes?.join(', ') || '',
                                                    stock: item.stock?.toString() || '10'
                                                 });
                                                 setShowEditProductModal(true);
                                              }}
                                              className="px-4 py-2 bg-white border border-border text-[8px] font-bold uppercase tracking-widest hover:bg-neutral-50 text-luxury transition-all"
                                           >
                                              Edit
                                           </button>
                                        </td>
                                     </tr>
                                   ))
                                )}
                             </tbody>
                          </table>
                       </div>
                    </div>
                 </div>
               )}

               {activeTab === 'storefront' && (
                 <div className="space-y-12 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                       
                       {/* Brand details preview */}
                       <div className="lg:col-span-4 space-y-6">
                          <div className="bg-primary text-white p-10 space-y-8 shadow-2xl relative">
                             <div className="absolute top-0 right-0 p-4 opacity-10 font-serif text-8xl font-black">
                                {brandProfile?.logo || 'M'}
                             </div>
                             
                             <div className="space-y-2">
                                <h2 className="text-xs uppercase tracking-[0.3em] font-bold">Maison Public Profile</h2>
                                <p className="text-[8px] text-accent/60 uppercase font-bold tracking-widest">How clients see your brand</p>
                             </div>
                             
                             {brandProfile ? (
                               <div className="space-y-4">
                                  <div className="space-y-1">
                                     <p className="text-[8px] uppercase tracking-widest text-white/40">Maison Tagline</p>
                                     <p className="text-xs font-bold italic font-serif">"{brandProfile.tagline}"</p>
                                  </div>
                                  <div className="space-y-1">
                                     <p className="text-[8px] uppercase tracking-widest text-white/40">Heritage Story Summary</p>
                                     <p className="text-[9px] text-white/70 leading-relaxed font-light">{brandProfile.story}</p>
                                  </div>
                                  <div className="space-y-1">
                                     <p className="text-[8px] uppercase tracking-widest text-white/40">Accent Palette</p>
                                     <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 border border-white/20" style={{ backgroundColor: brandProfile.accentColor || '#BCA374' }} />
                                        <span className="text-[9px] font-mono">{brandProfile.accentColor || '#BCA374'}</span>
                                     </div>
                                  </div>
                               </div>
                             ) : (
                               <div className="py-6 border-2 border-dashed border-white/20 text-center text-[9px] text-white/40 uppercase tracking-widest">
                                  No public profile instantiated for this vendor account.
                               </div>
                             )}
                          </div>
                       </div>

                       {/* Brand editing form */}
                       <div className="lg:col-span-8 bg-white border border-border p-12 space-y-10 text-luxury">
                          <div className="space-y-2">
                             <h2 className="text-2xl font-light">Maison <span className="italic font-serif text-accent">Branding Profile</span></h2>
                             <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Customize your brand details published on the public gallery</p>
                          </div>
                          
                          <form className="space-y-6" onSubmit={handleSaveBrandProfile}>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                   <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Maison Display Name</label>
                                   <input 
                                      type="text" 
                                      value={brandForm.name} 
                                      onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                                      className="w-full bg-neutral-50 border border-border p-3.5 text-xs outline-none focus:border-accent" 
                                      required
                                   />
                                </div>
                                <div className="space-y-2">
                                   <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Maison Tagline</label>
                                   <input 
                                      type="text" 
                                      value={brandForm.tagline} 
                                      onChange={(e) => setBrandForm({ ...brandForm, tagline: e.target.value })}
                                      className="w-full bg-neutral-50 border border-border p-3.5 text-xs outline-none focus:border-accent" 
                                      required
                                   />
                                </div>
                                <div className="space-y-2">
                                   <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Brand Accent Color Hex</label>
                                   <div className="flex gap-2">
                                      <input 
                                         type="color" 
                                         value={brandForm.accentColor} 
                                         onChange={(e) => setBrandForm({ ...brandForm, accentColor: e.target.value })}
                                         className="w-12 h-12 bg-neutral-50 border border-border p-1 outline-none cursor-pointer rounded-none" 
                                      />
                                      <input 
                                         type="text" 
                                         value={brandForm.accentColor} 
                                         onChange={(e) => setBrandForm({ ...brandForm, accentColor: e.target.value })}
                                         className="flex-1 bg-neutral-50 border border-border px-4 text-xs font-mono outline-none focus:border-accent" 
                                      />
                                   </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Hero Showcase Image</label>
                                    <div className="flex gap-4 items-center">
                                       <input 
                                          type="text" 
                                          value={brandForm.image} 
                                          onChange={(e) => setBrandForm({ ...brandForm, image: e.target.value })}
                                          placeholder="Image URL"
                                          className="flex-grow bg-neutral-50 border border-border p-3.5 text-xs outline-none focus:border-accent" 
                                       />
                                       <label className="px-6 py-3.5 bg-white border border-border hover:bg-neutral-50 cursor-pointer text-[9px] uppercase tracking-widest font-bold text-luxury transition-all relative">
                                          {uploadingBrandImage ? 'Uploading...' : 'Choose File'}
                                          <input 
                                             type="file" 
                                             accept="image/*"
                                             className="hidden" 
                                             disabled={uploadingBrandImage}
                                             onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleImageUpload(file, 'brand');
                                             }}
                                          />
                                       </label>
                                    </div>
                                 </div>
                                <div className="space-y-2 md:col-span-2">
                                   <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Maison Short Description</label>
                                   <textarea 
                                      rows={2} 
                                      value={brandForm.description} 
                                      onChange={(e) => setBrandForm({ ...brandForm, description: e.target.value })}
                                      className="w-full bg-neutral-50 border border-border p-3.5 text-xs outline-none focus:border-accent" 
                                      required
                                   />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                   <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Heritage Story & Archives</label>
                                   <textarea 
                                      rows={4} 
                                      value={brandForm.story} 
                                      onChange={(e) => setBrandForm({ ...brandForm, story: e.target.value })}
                                      className="w-full bg-neutral-50 border border-border p-3.5 text-xs outline-none focus:border-accent" 
                                      required
                                   />
                                </div>
                             </div>
                             
                             <button type="submit" className="px-12 py-4 bg-primary text-white text-[9px] uppercase tracking-[0.3em] font-bold shadow-xl hover:opacity-90 transition-all">
                                Save Maison Changes
                             </button>
                          </form>
                       </div>

                    </div>
                 </div>
               )}

               {activeTab === 'supply' && (
                 <div className="max-w-4xl space-y-12 animate-in fade-in duration-500 text-luxury">
                    <div className="bg-white border border-border p-12 space-y-10">
                       <div className="space-y-2">
                          <h2 className="text-2xl font-light">Provision <span className="italic font-serif text-accent">Intake slot</span></h2>
                          <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold font-sans">Request Godown Inventory Intake slot</p>
                       </div>
                       <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => { e.preventDefault(); alert('Slot requested!'); }}>
                          <div className="space-y-2">
                             <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Item Code (SKU)</label>
                             <input type="text" placeholder="e.g. DIOR-LADY-001" className="w-full bg-neutral-50 border border-border p-4 text-[11px] font-mono outline-none focus:border-accent" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Quantity for Intake</label>
                             <input type="number" placeholder="50" className="w-full bg-neutral-50 border border-border p-4 text-xs outline-none focus:border-accent" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Godown Location</label>
                             <select className="w-full bg-neutral-50 border border-border p-4 text-[9px] uppercase tracking-widest font-bold outline-none focus:border-accent appearance-none rounded-none cursor-pointer">
                                <option>Dubai Hub (DXB-01)</option>
                                <option>Riyadh Hub (RUH-04)</option>
                                <option>Paris Maison (CDG-02)</option>
                             </select>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Credit Terms Application</label>
                             <div className="p-4 bg-neutral-50 border border-border text-[9px] font-bold uppercase tracking-wider">Current: Net-30 Days</div>
                          </div>
                          <div className="md:col-span-2 pt-6">
                              <button 
                                 type="submit"
                                 className="w-full py-4 bg-primary text-white text-[9px] uppercase tracking-[0.3em] font-bold shadow-xl hover:opacity-95 transition-all"
                              >
                                Submit Provision Request
                             </button>
                          </div>
                       </form>
                    </div>
                 </div>
               )}

               {activeTab === 'finance' && (
                 <div className="max-w-4xl space-y-12 animate-in fade-in duration-500 text-luxury">
                    <div className="bg-white border border-border p-12 space-y-8">
                       <div className="space-y-2">
                          <h2 className="text-xs uppercase tracking-[0.3em] font-bold">Financial Node Audit</h2>
                          <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest">Automatic clearing and billing data</p>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="p-6 bg-neutral-50 border border-border">
                             <p className="text-[8px] uppercase tracking-widest text-muted-foreground">Cumulative Sales</p>
                             <p className="text-xl font-bold font-serif mt-2">{currentVendor?.sales || '₹0'}</p>
                          </div>
                          <div className="p-6 bg-neutral-50 border border-border">
                             <p className="text-[8px] uppercase tracking-widest text-muted-foreground">Nafshe Commission Rate</p>
                             <p className="text-xl font-bold font-serif mt-2">{currentVendor?.commissionRate || 15}%</p>
                          </div>
                          <div className="p-6 bg-neutral-50 border border-border">
                             <p className="text-[8px] uppercase tracking-widest text-muted-foreground">Accrued Commission</p>
                             <p className="text-xl font-bold font-serif mt-2">
                                ₹{Math.floor((Number((currentVendor?.sales || '₹0').replace(/[^\d]/g, '')) * (currentVendor?.commissionRate || 15)) / 100).toLocaleString()}
                             </p>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <h3 className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Connected Bank Settlement Node</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="p-4 border border-border bg-neutral-50">
                                <p className="text-[8px] uppercase text-muted-foreground">Tax Identifier (Tax ID)</p>
                                <p className="text-xs font-mono font-bold mt-1">{currentVendor?.taxId || 'N/A'}</p>
                             </div>
                             <div className="p-4 border border-border bg-neutral-50">
                                <p className="text-[8px] uppercase text-muted-foreground">Routing Bank Account (IBAN)</p>
                                <p className="text-xs font-mono font-bold mt-1">{currentVendor?.bankAccount || 'N/A'}</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               )}

               {activeTab === 'promotions' && (
                 <div className="space-y-12 animate-in fade-in duration-500 text-luxury">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                       <div className="bg-white border border-border p-10 space-y-8">
                          <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">Maison Hero Banners</h2>
                          <div className="space-y-4">
                             <div className="flex items-center gap-6 p-4 border border-border bg-neutral-50">
                                <div className="w-16 h-10 bg-neutral-100 relative overflow-hidden flex-shrink-0">
                                   <Image src="/assets/hero.jpg" alt="banner" fill className="object-cover grayscale" />
                                </div>
                                <div className="flex-grow">
                                   <p className="text-[10px] font-bold text-luxury">Homepage Hero Slot</p>
                                   <p className="text-[8px] text-green-600 uppercase font-bold tracking-widest">Active Slot</p>
                                </div>
                                <div className="text-right">
                                   <p className="text-xs font-bold">2,400</p>
                                   <p className="text-[7px] text-muted-foreground uppercase font-bold tracking-widest">Clicks</p>
                                </div>
                             </div>
                          </div>
                       </div>
                       
                       <div className="bg-white border border-border p-10 space-y-8">
                          <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">Active Promo Coupons</h2>
                          <div className="p-5 border-l-2 border-accent bg-accent/5">
                             <p className="text-sm font-mono font-bold text-luxury">{selectedVendorId.toUpperCase()}VIP20</p>
                             <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Discount: 20% Off • Redemptions: 45/100</p>
                          </div>
                       </div>
                    </div>
                 </div>
               )}
            </>
         )}
      </main>

      {/* Request Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-[#F8F7F5] border border-border shadow-2xl p-12 space-y-8 relative overflow-hidden text-luxury max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="absolute top-0 right-0 p-8">
                 <button onClick={() => setShowProductModal(false)} className="text-muted-foreground hover:text-luxury transition-colors">
                    <X className="w-6 h-6" />
                 </button>
              </div>
              
              <div className="space-y-2">
                 <h2 className="text-2xl font-light tracking-tight">Request <span className="font-serif italic text-accent">New Product</span></h2>
                 <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-muted-foreground">Submit listing proposal for Nafshe admin verification</p>
              </div>

              <form onSubmit={handleRequestProduct} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                       <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Product Title</label>
                       <input
                          type="text"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          placeholder="e.g. Lady Dior Mini"
                          className="w-full bg-white border border-border p-3 text-xs outline-none focus:border-accent"
                          required
                       />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                       <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          className="w-full bg-white border border-border p-3 text-xs outline-none focus:border-accent appearance-none rounded-none cursor-pointer"
                       >
                          <option value="abayas">Abayas</option>
                          <option value="dresses">Dresses</option>
                          <option value="bags">Bags</option>
                          <option value="jewelry">Jewelry</option>
                          <option value="sunglasses">Sunglasses</option>
                          <option value="shoes">Shoes</option>
                          <option value="watches">Watches</option>
                          <option value="tops">Tops</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Price (INR / ₹)</label>
                       <input
                          type="number"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          placeholder="4500"
                          className="w-full bg-white border border-border p-3 text-xs outline-none focus:border-accent"
                          required
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Intake Stock Level</label>
                       <input
                          type="number"
                          value={productForm.stock}
                          onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                          placeholder="10"
                          className="w-full bg-white border border-border p-3 text-xs outline-none focus:border-accent"
                          required
                       />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Product Image</label>
                        <div className="flex gap-4 items-center">
                           <input
                              type="text"
                              value={productForm.images}
                              onChange={(e) => setProductForm({ ...productForm, images: e.target.value })}
                              placeholder="/assets/bag.jpg or external url"
                              className="flex-grow bg-white border border-border p-3 text-xs outline-none focus:border-accent"
                           />
                           <label className="px-6 py-3 bg-white border border-border hover:bg-neutral-50 cursor-pointer text-[9px] uppercase tracking-widest font-bold text-luxury transition-all relative">
                              {uploadingProductImage ? 'Uploading...' : 'Choose File'}
                              <input 
                                 type="file" 
                                 accept="image/*"
                                 className="hidden" 
                                 disabled={uploadingProductImage}
                                 onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleImageUpload(file, 'product');
                                 }}
                              />
                           </label>
                        </div>
                     </div>

                    <div className="space-y-2">
                       <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Colors (comma-separated)</label>
                       <input
                          type="text"
                          value={productForm.colors}
                          onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                          placeholder="Black, Gold, Pink"
                          className="w-full bg-white border border-border p-3 text-xs outline-none focus:border-accent"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Sizes (comma-separated)</label>
                       <input
                          type="text"
                          value={productForm.sizes}
                          onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                          placeholder="Small, Medium, Large"
                          className="w-full bg-white border border-border p-3 text-xs outline-none focus:border-accent"
                       />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                       <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Description & Details</label>
                       <textarea
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          rows={3}
                          placeholder="Heritage details and material configuration..."
                          className="w-full bg-white border border-border p-3 text-xs outline-none focus:border-accent"
                       />
                    </div>
                 </div>

                 <div className="space-y-4 pt-4 border-t border-border">
                    <button
                       type="submit"
                       className="w-full py-4 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:opacity-95 transition-all"
                    >
                       Submit Listing Request
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
