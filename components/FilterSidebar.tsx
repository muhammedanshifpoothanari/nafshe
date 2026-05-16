'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FilterOptions {
  brands: string[];
  categories: string[];
  priceRange: [number, number];
  sortBy: string;
}

const CATEGORIES = ['Formal Wear', 'Casual Wear', 'Accessories'];
const BRANDS = ['Reverie', 'Luxe Essentials'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
];

interface FilterSidebarProps {
  onFiltersChange: (filters: FilterOptions) => void;
}

export function FilterSidebar({ onFiltersChange }: FilterSidebarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
    sort: true,
  });

  const [filters, setFilters] = useState<FilterOptions>({
    brands: searchParams.get('brand')?.split(',') || [],
    categories: searchParams.get('category')?.split(',') || [],
    priceRange: [0, 5000],
    sortBy: searchParams.get('sort') || 'newest',
  });

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFiltersChange(newFilters);
    updateUrl(newFilters);
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    
    const newFilters = { ...filters, brands: newBrands };
    setFilters(newFilters);
    onFiltersChange(newFilters);
    updateUrl(newFilters);
  };

  const handleSortChange = (sort: string) => {
    const newFilters = { ...filters, sortBy: sort };
    setFilters(newFilters);
    onFiltersChange(newFilters);
    updateUrl(newFilters);
  };

  const updateUrl = (newFilters: FilterOptions) => {
    const params = new URLSearchParams();
    if (newFilters.categories.length > 0) {
      params.set('category', newFilters.categories.join(','));
    }
    if (newFilters.brands.length > 0) {
      params.set('brand', newFilters.brands.join(','));
    }
    if (newFilters.sortBy !== 'newest') {
      params.set('sort', newFilters.sortBy);
    }
    router.push(`/products${params.toString() ? '?' + params.toString() : ''}`);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearFilters = () => {
    const emptyFilters: FilterOptions = {
      brands: [],
      categories: [],
      priceRange: [0, 5000],
      sortBy: 'newest',
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
    router.push('/products');
  };

  return (
    <div className="w-full md:w-64 space-y-6">
      {/* Clear Filters */}
      {(filters.brands.length > 0 || filters.categories.length > 0) && (
        <button
          onClick={clearFilters}
          className="w-full text-xs font-light tracking-widest uppercase text-accent hover:text-accent/80 transition-colors py-2 border-b border-border"
        >
          Clear All Filters
        </button>
      )}

      {/* Sort */}
      <div>
        <button
          onClick={() => toggleSection('sort')}
          className="flex items-center justify-between w-full mb-4 group"
        >
          <h3 className="text-sm font-light tracking-wide uppercase">Sort</h3>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedSections.sort ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.sort && (
          <div className="space-y-3 pl-2">
            {SORT_OPTIONS.map(option => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={filters.sortBy === option.value}
                  onChange={() => handleSortChange(option.value)}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-xs font-light text-muted-foreground group-hover:text-foreground transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="h-px bg-border" />

      {/* Category */}
      <div>
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-4 group"
        >
          <h3 className="text-sm font-light tracking-wide uppercase">Category</h3>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedSections.category ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.category && (
          <div className="space-y-3 pl-2">
            {CATEGORIES.map(category => (
              <label key={category} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 rounded accent-accent"
                />
                <span className="text-xs font-light text-muted-foreground group-hover:text-foreground transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="h-px bg-border" />

      {/* Brand */}
      <div>
        <button
          onClick={() => toggleSection('brand')}
          className="flex items-center justify-between w-full mb-4 group"
        >
          <h3 className="text-sm font-light tracking-wide uppercase">Brand</h3>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedSections.brand ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.brand && (
          <div className="space-y-3 pl-2">
            {BRANDS.map(brand => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="w-4 h-4 rounded accent-accent"
                />
                <span className="text-xs font-light text-muted-foreground group-hover:text-foreground transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
