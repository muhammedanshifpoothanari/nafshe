'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  AlertTriangle, 
  Package, 
  Barcode, 
  Layers,
  ArrowRight,
  X,
  Check,
  XCircle,
  Clock,
  Filter,
  Download,
  Printer
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Status tabs: 'all', 'pending', 'approved', 'rejected'
  const [activeStatusTab, setActiveStatusTab] = useState('all');

  // Modal / Form state for admin instant provisioning
  const [showForm, setShowForm] = useState(false);
  const [newAsset, setNewAsset] = useState({
    name: '',
    brand: 'Nafshe HQ',
    price: '',
    category: 'abayas',
    description: '',
    images: '',
    colors: '',
    sizes: '',
    stock: '10'
  });

  const [uploadingAssetImage, setUploadingAssetImage] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editProductForm, setEditProductForm] = useState({
    name: '',
    brand: '',
    price: '',
    category: 'abayas',
    description: '',
    images: '',
    colors: '',
    sizes: '',
    stock: '10'
  });
  const [uploadingEditProductImage, setUploadingEditProductImage] = useState(false);

  const handleAssetImageUpload = (file: File) => {
    setUploadingAssetImage(true);
    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.url) {
          setNewAsset(prev => ({ ...prev, images: data.url }));
        } else {
          alert('Upload failed: ' + (data.message || 'Unknown error'));
        }
      })
      .catch(err => {
        console.error('Error uploading image:', err);
        alert('Image upload failed.');
      })
      .finally(() => {
        setUploadingAssetImage(false);
      });
  };

  // Action: Export Inventory to CSV for Google Sheets
  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Name',
      'Brand',
      'Price',
      'Category',
      'Description',
      'Picture Path 1',
      'Image Preview 1 (Google Sheets)',
      'Picture Path 2',
      'Image Preview 2 (Google Sheets)',
      'Picture Path 3',
      'Image Preview 3 (Google Sheets)',
      'Colors',
      'Sizes',
      'Stock',
      'Status'
    ];

    function escapeCSV(val: any) {
      if (val === undefined || val === null) return '';
      let str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        str = str.replace(/"/g, '""');
        return `"${str}"`;
      }
      return str;
    }

    const csvRows = [headers.join(',')];

    for (const p of products) {
      const img1 = p.images && p.images[0] ? p.images[0] : '';
      const img2 = p.images && p.images[1] ? p.images[1] : '';
      const img3 = p.images && p.images[2] ? p.images[2] : '';

      const getFullUrl = (pathStr: string) => {
        if (!pathStr) return '';
        if (pathStr.startsWith('http://') || pathStr.startsWith('https://')) return pathStr;
        return `https://nafshe.com${pathStr}`;
      };

      const formula1 = img1 ? `=IMAGE("${getFullUrl(img1)}")` : '';
      const formula2 = img2 ? `=IMAGE("${getFullUrl(img2)}")` : '';
      const formula3 = img3 ? `=IMAGE("${getFullUrl(img3)}")` : '';

      const row = [
        escapeCSV(p.id),
        escapeCSV(p.name),
        escapeCSV(p.brand),
        escapeCSV(p.price),
        escapeCSV(p.category),
        escapeCSV(p.description),
        escapeCSV(img1),
        formula1,
        escapeCSV(img2),
        formula2,
        escapeCSV(img3),
        formula3,
        escapeCSV(p.colors ? p.colors.join(' | ') : ''),
        escapeCSV(p.sizes ? p.sizes.join(' | ') : ''),
        escapeCSV(p.stock),
        escapeCSV(p.status)
      ];
      csvRows.push(row.join(','));
    }

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `inventory_export_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Rejection Dialog state
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [rejectionFeedback, setRejectionFeedback] = useState('');

  // Fetch all products
  const fetchAllProducts = () => {
    setLoading(true);
    fetch('/api/products?status=all&isAdmin=true')
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Action: Approve Product Request
  const handleApprove = (id: string) => {
    fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'approved', feedback: '' })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Vendor product request approved and is now live on the storefront!');
          fetchAllProducts();
        } else {
          alert(data.message || 'Failed to approve product');
        }
      })
      .catch(err => {
        console.error('Error approving product:', err);
        alert('Error approving product');
      });
  };

  // Action: Open Rejection Dialog
  const openRejectionDialog = (id: string) => {
    setSelectedProductId(id);
    setRejectionFeedback('');
    setShowRejectDialog(true);
  };

  // Action: Submit Rejection Feedback
  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !rejectionFeedback) return;

    fetch(`/api/products/${selectedProductId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'rejected', feedback: rejectionFeedback })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Product request rejected. Rejection reason dispatched to vendor.');
          setShowRejectDialog(false);
          setSelectedProductId('');
          setRejectionFeedback('');
          fetchAllProducts();
        } else {
          alert(data.message || 'Failed to reject product');
        }
      })
      .catch(err => {
        console.error('Error rejecting product:', err);
        alert('Error rejecting product');
      });
  };

  // Action: Admin Provision New Asset (Instantly Approved)
  const handleProvisionAsset = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedPayload = {
      name: newAsset.name,
      brand: newAsset.brand,
      price: Number(newAsset.price),
      category: newAsset.category,
      description: newAsset.description,
      images: newAsset.images ? [newAsset.images] : ['/assets/bag.jpg'],
      colors: newAsset.colors ? newAsset.colors.split(',').map(s => s.trim()) : [],
      sizes: newAsset.sizes ? newAsset.sizes.split(',').map(s => s.trim()) : [],
      stock: Number(newAsset.stock),
      vendorId: 'nafshe', // Owned by Nafshe admin HQ
      status: 'approved' // Instantly approved
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
          setShowForm(false);
          setNewAsset({
            name: '',
            brand: 'Nafshe HQ',
            price: '',
            category: 'abayas',
            description: '',
            images: '',
            colors: '',
            sizes: '',
            stock: '10'
          });
          alert('Asset provisioned and published instantly.');
          fetchAllProducts();
        } else {
          alert(data.message || 'Failed to provision asset');
        }
      })
      .catch(err => {
        console.error('Error provisioning asset:', err);
        alert('Error occurred during provisioning');
      });
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const formattedPayload = {
      name: editProductForm.name,
      brand: editProductForm.brand,
      price: Number(editProductForm.price),
      category: editProductForm.category,
      description: editProductForm.description,
      images: editProductForm.images ? [editProductForm.images] : ['/assets/bag.jpg'],
      colors: editProductForm.colors ? editProductForm.colors.split(',').map(s => s.trim()).filter(Boolean) : [],
      sizes: editProductForm.sizes ? editProductForm.sizes.split(',').map(s => s.trim()).filter(Boolean) : [],
      stock: Number(editProductForm.stock)
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
          setShowEditForm(false);
          setEditingProduct(null);
          alert('Asset details updated successfully!');
          fetchAllProducts();
        } else {
          alert(data.message || 'Failed to update asset');
        }
      })
      .catch(err => {
        console.error('Error updating product:', err);
        alert('Failed to update asset');
      });
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete asset "${name}"?`)) return;

    fetch(`/api/products/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(prev => prev.filter(p => p.id !== id));
          alert('Asset deleted successfully!');
          fetchAllProducts();
        } else {
          alert(data.message || 'Failed to delete asset');
        }
      })
      .catch(err => {
        console.error('Error deleting product:', err);
        alert('Failed to delete asset');
      });
  };

  const handleEditProductImageUpload = (file: File) => {
    setUploadingEditProductImage(true);
    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.url) {
          setEditProductForm(prev => ({ ...prev, images: data.url }));
        } else {
          alert('Upload failed: ' + (data.message || 'Unknown error'));
        }
      })
      .catch(err => {
        console.error('Error uploading image:', err);
        alert('Image upload failed.');
      })
      .finally(() => {
        setUploadingEditProductImage(false);
      });
  };

  // Filtering products by status tab and search text
  const filteredProducts = products.filter(p => {
    // 1. Filter by tab
    if (activeStatusTab !== 'all' && p.status !== activeStatusTab) {
      return false;
    }
    // 2. Filter by search query
    return (
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate valuation of approved inventory
  const totalValuation = products
    .filter(p => p.status === 'approved')
    .reduce((acc, p) => acc + (p.price * (p.stock || 0)), 0);

  // Critical violations (out of stock approved items)
  const lowStockCount = products.filter(p => p.status === 'approved' && p.stock <= 2).length;

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20 selection:bg-white selection:text-black">
      
      {/* Brutalist Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
        <div className="space-y-3">
           <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Approval & <span className="text-white/20">Inventory</span></h1>
           <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
              Gatekeeper dashboard for vendor requests and catalog nodes
           </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin-print"
            target="_blank"
            className="px-8 py-5 border border-white/20 text-white hover:bg-white/10 text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-4"
          >
            <Printer className="w-4 h-4" />
            Print PDF Catalog
          </Link>
          <button
            onClick={handleExportCSV}
            className="px-8 py-5 border border-white/20 text-white hover:bg-white/10 text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-4"
          >
            <Download className="w-4 h-4" />
            Export Inventory CSV
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-all flex items-center gap-4 shadow-2xl shadow-white/5"
          >
            <Plus className="w-4 h-4" />
            Provision HQ Asset
          </button>
        </div>
      </div>

      {/* Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 border border-white/10">
         <div className="lg:col-span-8 bg-black p-8 flex items-center gap-6">
            <div className="w-12 h-12 border border-amber-500/30 bg-amber-50/5 flex items-center justify-center">
               <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Maison Compliance Pipeline</h3>
               <p className="text-[9px] text-white/40 uppercase tracking-widest mt-1">
                  {products.filter(p => p.status === 'pending').length} product listing requests are awaiting administrative clearance.
               </p>
            </div>
         </div>
         <div className="lg:col-span-4 bg-black p-8 flex items-center justify-between group cursor-crosshair">
            <div>
               <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Total Live Catalog Valuation</p>
               <p className="text-xl font-black font-mono tracking-tighter text-white group-hover:text-accent transition-colors">₹{totalValuation.toLocaleString()}</p>
            </div>
            <Layers className="w-6 h-6 text-white/10 group-hover:text-white transition-all" />
         </div>
      </div>

      {/* Sub-navigation Status Tabs & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="flex gap-2 border border-white/10 p-1 bg-white/5">
            {[
              { id: 'all', label: 'All Catalog' },
              { id: 'pending', label: `Pending Approvals (${products.filter(p => p.status === 'pending').length})` },
              { id: 'approved', label: 'Approved Live' },
              { id: 'rejected', label: 'Rejected Vault' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveStatusTab(tab.id)}
                className={`px-6 py-3 text-[9px] font-black uppercase tracking-widest transition-all ${activeStatusTab === tab.id ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              >
                 {tab.label}
              </button>
            ))}
         </div>

         <div className="relative group w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="SEARCH CATALOG NODE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-all"
            />
         </div>
      </div>

      {loading ? (
         <div className="min-h-[300px] flex items-center justify-center text-[10px] font-black tracking-[1em] text-white/20 uppercase animate-pulse">
            Connecting Vault Nodes...
         </div>
      ) : (
         <>
            {/* Pending Approvals Dashboard cards view */}
            {activeStatusTab === 'pending' && filteredProducts.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProducts.map((p) => (
                     <div key={p.id} className="bg-white/5 border border-white/10 p-8 space-y-6 flex flex-col justify-between hover:border-white/30 transition-colors">
                        <div className="space-y-4">
                           {/* Vendor and SKU */}
                           <div className="flex justify-between items-center border-b border-white/10 pb-4">
                              <span className="text-[9px] font-black uppercase tracking-widest text-accent italic">Request from {p.brand}</span>
                              <span className="text-[8px] font-mono font-bold text-white/40">SKU: {p.id}</span>
                           </div>

                           <div className="flex gap-6">
                              {/* Image Preview */}
                              <div className="relative w-24 h-24 border border-white/10 bg-white/5 overflow-hidden flex-shrink-0">
                                 <Image 
                                    src={(p.images?.[0] && (p.images[0].startsWith('/') || p.images[0].startsWith('http://') || p.images[0].startsWith('https://'))) ? p.images[0] : '/assets/bag.jpg'} 
                                    alt={p.name} 
                                    fill 
                                    className="object-cover grayscale hover:grayscale-0 transition-all"
                                 />
                              </div>

                              <div className="space-y-1 flex-1">
                                 <h3 className="text-sm font-black uppercase tracking-wide text-white">{p.name}</h3>
                                 <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Category: {p.category}</p>
                                 <p className="text-xs font-mono font-bold text-white mt-1">Valuation: ₹{p.price?.toLocaleString()}</p>
                                 <p className="text-[9px] text-white/60 font-light font-mono mt-1">Proposed Intake: {p.stock} units</p>
                              </div>
                           </div>

                           <div className="space-y-2">
                              <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Listing Description</p>
                              <p className="text-[10px] text-white/60 leading-relaxed font-light line-clamp-3">
                                 {p.description || 'No description supplied by vendor.'}
                              </p>
                           </div>

                           {/* Attributes */}
                           <div className="grid grid-cols-2 gap-4 pt-2">
                              <div>
                                 <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Colors</p>
                                 <p className="text-[9px] font-bold text-white/60 uppercase">{p.colors?.join(', ') || 'N/A'}</p>
                              </div>
                              <div>
                                 <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Sizes</p>
                                 <p className="text-[9px] font-bold text-white/60 uppercase">{p.sizes?.join(', ') || 'N/A'}</p>
                              </div>
                           </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col gap-2 pt-4 border-t border-white/15">
                           <div className="flex gap-2">
                              <button
                                 onClick={() => handleApprove(p.id)}
                                 className="flex-1 py-2 bg-white text-black hover:bg-neutral-200 transition-all text-[8px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5"
                              >
                                 <Check className="w-3 h-3" />
                                 Approve
                              </button>
                              <button
                                 onClick={() => openRejectionDialog(p.id)}
                                 className="flex-1 py-2 border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 transition-all text-[8px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5"
                              >
                                 <XCircle className="w-3 h-3" />
                                 Reject
                              </button>
                           </div>
                           <div className="flex gap-2">
                              <button
                                 onClick={() => {
                                    setEditingProduct(p);
                                    setEditProductForm({
                                       name: p.name || '',
                                       brand: p.brand || '',
                                       price: p.price?.toString() || '',
                                       category: p.category || 'abayas',
                                       description: p.description || '',
                                       images: p.images?.[0] || '',
                                       colors: p.colors?.join(', ') || '',
                                       sizes: p.sizes?.join(', ') || '',
                                       stock: p.stock?.toString() || '10'
                                    });
                                    setShowEditForm(true);
                                 }}
                                 className="flex-1 py-2 border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-[8px] font-black uppercase tracking-widest text-center"
                              >
                                 Edit Details
                              </button>
                              <button
                                 onClick={() => handleDeleteProduct(p.id, p.name)}
                                 className="flex-1 py-2 border border-rose-500/20 text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/5 transition-all text-[8px] font-black uppercase tracking-widest text-center"
                              >
                                 Delete
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               /* Asset Manifest (Default Table View) */
               <div className="overflow-x-auto border border-white/10">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-white/5 text-[8px] uppercase tracking-[0.3em] font-black text-white/40 border-b border-white/10">
                       <th className="px-8 py-5">Asset Description</th>
                       <th className="px-8 py-5">SKU / Origin</th>
                       <th className="px-8 py-5">Unit Valuation</th>
                       <th className="px-8 py-5">Availability</th>
                       <th className="px-8 py-5">Review State</th>
                       <th className="px-8 py-5 text-right">Gate Operations</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {filteredProducts.length === 0 ? (
                        <tr>
                           <td colSpan={6} className="text-center py-20 text-[9px] uppercase tracking-[0.3em] font-black text-white/20">
                              No catalog assets map to this query filter.
                           </td>
                        </tr>
                     ) : (
                        filteredProducts.map(product => (
                          <tr key={product.id} className="hover:bg-white/5 transition-all group">
                            <td className="px-8 py-8">
                               <div className="flex items-center gap-4">
                                  <div className="relative w-10 h-10 border border-white/10 flex-shrink-0 overflow-hidden">
                                     <Image 
                                        src={(product.images?.[0] && (product.images[0].startsWith('/') || product.images[0].startsWith('http://') || product.images[0].startsWith('https://'))) ? product.images[0] : '/assets/bag.jpg'} 
                                        alt={product.name} 
                                        fill 
                                        className="object-cover grayscale" 
                                     />
                                  </div>
                                  <div className="space-y-1">
                                     <p className="text-[11px] font-bold text-white uppercase">{product.name}</p>
                                     <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">{product.category}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-8 py-8">
                               <p className="text-[10px] font-mono font-bold text-white/60 uppercase">{product.id}</p>
                               <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1 flex items-center gap-2">
                                  <ArrowRight className="w-2.5 h-2.5 text-accent" />
                                  {product.brand}
                               </p>
                            </td>
                            <td className="px-8 py-8 text-xs font-black font-mono tracking-tighter text-white">₹{product.price?.toLocaleString()}</td>
                            <td className="px-8 py-8">
                               <p className={`text-xs font-black font-mono tracking-tighter ${
                                 product.stock === 0 ? 'text-rose-500' : 
                                 product.stock < 5 ? 'text-amber-500' : 'text-white'
                               }`}>
                                 {product.stock} <span className="text-[8px] font-bold text-white/20">Units</span>
                               </p>
                            </td>
                            <td className="px-8 py-8">
                               <div className="flex flex-col items-start gap-1">
                                  {product.status === 'approved' && (
                                    <span className="px-3 py-1 border border-green-500/30 text-green-500 text-[8px] font-black uppercase tracking-widest bg-green-500/5">Approved</span>
                                  )}
                                  {product.status === 'pending' && (
                                    <span className="px-3 py-1 border border-amber-500/30 text-amber-500 text-[8px] font-black uppercase tracking-widest bg-amber-500/5">Pending Clear</span>
                                  )}
                                  {product.status === 'rejected' && (
                                    <>
                                       <span className="px-3 py-1 border border-rose-500/30 text-rose-500 text-[8px] font-black uppercase tracking-widest bg-rose-500/5">Rejected</span>
                                       {product.feedback && (
                                          <p className="text-[8px] text-rose-500/80 italic mt-0.5 max-w-[150px] truncate" title={product.feedback}>
                                             "{product.feedback}"
                                          </p>
                                       )}
                                    </>
                                  )}
                               </div>
                            </td>
                            <td className="px-8 py-8 text-right">
                                <div className="flex items-center justify-end gap-2">
                                   {product.status === 'pending' && (
                                      <>
                                         <button 
                                            onClick={() => handleApprove(product.id)}
                                            className="px-3 py-2 bg-green-600 text-white hover:bg-green-500 text-[8px] font-bold uppercase tracking-widest transition-all"
                                            title="Approve request"
                                         >
                                            Approve
                                         </button>
                                         <button 
                                            onClick={() => openRejectionDialog(product.id)}
                                            className="px-3 py-2 border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 text-[8px] font-bold uppercase tracking-widest transition-all"
                                            title="Reject request"
                                         >
                                            Reject
                                         </button>
                                      </>
                                   )}
                                   <button 
                                      onClick={() => {
                                         setEditingProduct(product);
                                         setEditProductForm({
                                            name: product.name || '',
                                            brand: product.brand || 'Nafshe HQ',
                                            price: product.price?.toString() || '',
                                            category: product.category || 'abayas',
                                            description: product.description || '',
                                            images: product.images?.[0] || '',
                                            colors: product.colors?.join(', ') || '',
                                            sizes: product.sizes?.join(', ') || '',
                                            stock: product.stock?.toString() || '10'
                                         });
                                         setShowEditForm(true);
                                      }}
                                      className="px-3 py-2 border border-white/15 text-white/80 hover:bg-white hover:text-black text-[8px] font-bold uppercase tracking-widest transition-all"
                                      title="Edit asset details"
                                   >
                                      Edit
                                   </button>
                                   <button 
                                      onClick={() => handleDeleteProduct(product.id, product.name)}
                                      className="px-3 py-2 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white text-[8px] font-bold uppercase tracking-widest transition-all"
                                      title="Delete asset"
                                   >
                                      Delete
                                   </button>
                                </div>
                             </td>
                          </tr>
                        ))
                     )}
                   </tbody>
                 </table>
               </div>
            )}
         </>
      )}

      {/* HQ Asset Provisioning Dialog (Overlay) */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-black border border-white/20 shadow-2xl p-12 space-y-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                 <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                 </button>
              </div>
              
              <div className="space-y-3">
                 <h2 className="text-2xl font-black uppercase tracking-tighter">HQ Asset <span className="text-white/20 italic">Provisioning</span></h2>
                 <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/40">Immediate Database Entry Registration</p>
              </div>

              <form onSubmit={handleProvisionAsset} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 md:col-span-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Product Title</label>
                       <input
                          type="text"
                          value={newAsset.name}
                          onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Brand Ownership</label>
                       <input
                          type="text"
                          value={newAsset.brand}
                          onChange={(e) => setNewAsset({ ...newAsset, brand: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Classification</label>
                       <select 
                          value={newAsset.category}
                          onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                          className="w-full px-4 py-4 bg-black border border-white/10 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-white/40 transition-all appearance-none cursor-pointer rounded-none"
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
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Valuation (₹)</label>
                       <input
                          type="number"
                          value={newAsset.price}
                          onChange={(e) => setNewAsset({ ...newAsset, price: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Initial Intake Quantity</label>
                       <input
                          type="number"
                          value={newAsset.stock}
                          onChange={(e) => setNewAsset({ ...newAsset, stock: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Showcase Image URL</label>
                        <div className="flex gap-4 items-center">
                           <input
                              type="text"
                              value={newAsset.images}
                              placeholder="/assets/bag.jpg or external url"
                              onChange={(e) => setNewAsset({ ...newAsset, images: e.target.value })}
                              className="flex-grow px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                           />
                           <label className="px-6 py-4 bg-white text-black hover:bg-neutral-200 cursor-pointer text-[9px] uppercase tracking-widest font-black transition-all relative whitespace-nowrap flex-shrink-0">
                              {uploadingAssetImage ? 'Uploading...' : 'Choose File'}
                              <input 
                                 type="file" 
                                 accept="image/*"
                                 className="hidden" 
                                 disabled={uploadingAssetImage}
                                 onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleAssetImageUpload(file);
                                 }}
                              />
                           </label>
                        </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Description</label>
                       <textarea
                          rows={2}
                          value={newAsset.description}
                          onChange={(e) => setNewAsset({ ...newAsset, description: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                       />
                    </div>
                 </div>

                 <div className="space-y-6 pt-6 border-t border-white/10">
                    <button
                       type="submit"
                       className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all"
                    >
                       Provision Asset Instantly
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Rejection Feedback Dialog (Overlay) */}
      {showRejectDialog && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="w-full max-w-md bg-black border border-white/20 shadow-2xl p-10 space-y-8 relative text-white">
              <div className="space-y-2">
                 <h3 className="text-lg font-black uppercase tracking-tight text-rose-500">Listing Rejection Protocol</h3>
                 <p className="text-[9px] uppercase tracking-widest text-white/40">Declare grounds for rejecting product request</p>
              </div>

              <form onSubmit={handleRejectSubmit} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Feedback / Reason for Rejection</label>
                    <textarea
                       value={rejectionFeedback}
                       onChange={(e) => setRejectionFeedback(e.target.value)}
                       rows={4}
                       placeholder="e.g. Image resolution is too low, or branding style does not match Nafshe guidelines."
                       className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs text-white outline-none focus:border-white/40 transition-all"
                       required
                    />
                 </div>

                 <div className="flex gap-4 pt-4 border-t border-white/10">
                    <button
                       type="button"
                       onClick={() => { setShowRejectDialog(false); setSelectedProductId(''); }}
                       className="flex-grow py-3 border border-white/10 text-white/40 hover:text-white transition-colors text-[9px] font-black uppercase tracking-widest"
                    >
                       Cancel
                    </button>
                    <button
                       type="submit"
                       className="flex-grow py-3 bg-rose-600 hover:bg-rose-500 text-white transition-colors text-[9px] font-black uppercase tracking-widest"
                    >
                       Confirm Rejection
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Edit Product Dialog (Overlay) */}
      {showEditForm && editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-black border border-white/20 shadow-2xl p-12 space-y-12 relative overflow-hidden text-white max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="absolute top-0 right-0 p-8">
                 <button onClick={() => { setShowEditForm(false); setEditingProduct(null); }} className="text-white/40 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                 </button>
              </div>
              
              <div className="space-y-3">
                 <h2 className="text-2xl font-black uppercase tracking-tighter">Edit Asset <span className="text-white/20 italic">Details</span></h2>
                 <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/40">Modify properties of catalog entry {editingProduct.id}</p>
              </div>

              <form onSubmit={handleEditProduct} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 md:col-span-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Product Title</label>
                       <input
                          type="text"
                          value={editProductForm.name}
                          onChange={(e) => setEditProductForm({ ...editProductForm, name: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Brand Ownership</label>
                       <input
                          type="text"
                          value={editProductForm.brand}
                          onChange={(e) => setEditProductForm({ ...editProductForm, brand: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Classification</label>
                       <select 
                          value={editProductForm.category}
                          onChange={(e) => setEditProductForm({ ...editProductForm, category: e.target.value })}
                          className="w-full px-4 py-4 bg-black border border-white/10 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-white/40 transition-all appearance-none cursor-pointer rounded-none"
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
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Valuation (₹)</label>
                       <input
                          type="number"
                          value={editProductForm.price}
                          onChange={(e) => setEditProductForm({ ...editProductForm, price: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Inventory Stock Level</label>
                       <input
                          type="number"
                          value={editProductForm.stock}
                          onChange={(e) => setEditProductForm({ ...editProductForm, stock: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          required
                       />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Showcase Image URL</label>
                       <div className="flex gap-4 items-center">
                          <input
                             type="text"
                             value={editProductForm.images}
                             placeholder="/assets/bag.jpg or external url"
                             onChange={(e) => setEditProductForm({ ...editProductForm, images: e.target.value })}
                             className="flex-grow px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                          />
                          <label className="px-6 py-4 bg-white text-black hover:bg-neutral-200 cursor-pointer text-[9px] uppercase tracking-widest font-black transition-all relative whitespace-nowrap flex-shrink-0">
                             {uploadingEditProductImage ? 'Uploading...' : 'Choose File'}
                             <input 
                                type="file" 
                                accept="image/*"
                                className="hidden" 
                                disabled={uploadingEditProductImage}
                                onChange={(e) => {
                                   const file = e.target.files?.[0];
                                   if (file) handleEditProductImageUpload(file);
                                }}
                             />
                          </label>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Colors (comma-separated)</label>
                       <input
                          type="text"
                          value={editProductForm.colors}
                          onChange={(e) => setEditProductForm({ ...editProductForm, colors: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Sizes (comma-separated)</label>
                       <input
                          type="text"
                          value={editProductForm.sizes}
                          onChange={(e) => setEditProductForm({ ...editProductForm, sizes: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                       />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Description</label>
                       <textarea
                          rows={2}
                          value={editProductForm.description}
                          onChange={(e) => setEditProductForm({ ...editProductForm, description: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 text-xs font-bold text-white outline-none focus:border-white/40 transition-all"
                       />
                    </div>
                 </div>

                 <div className="space-y-6 pt-6 border-t border-white/10">
                    <button
                       type="submit"
                       className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all"
                    >
                       Save Asset Changes
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
