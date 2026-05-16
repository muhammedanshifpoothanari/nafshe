export interface Brand {
  id: string;
  name: string;
  name_display?: string;
  logo: string;
  tagline: string;
  description: string;
  story: string;
  featured: boolean;
  accentColor?: string;
  image: string;
}

export const brands: Brand[] = [
  {
    id: "chanel",
    name: "Chanel",
    logo: "C",
    tagline: "Haute Couture & Elegance",
    description: "The ultimate house of luxury, known for timeless classics and modern sophistication.",
    story: "Founded by Coco Chanel, the brand revolutionized women's fashion by introducing silhouettes that combined comfort with high-end luxury.",
    featured: true,
    image: "/assets/bag.jpg"
  },
  {
    id: "dior",
    name: "Dior",
    name_display: "Maison Christian Dior",
    logo: "D",
    tagline: "The New Look of Luxury",
    description: "Architectural silhouettes and refined femininity from the heart of Paris.",
    story: "Christian Dior's post-war 'New Look' defined an era of glamour that continues to inspire the world of haute couture today.",
    featured: true,
    image: "/assets/dress.jpg"
  },
  {
    id: "louis-vuitton",
    name: "Louis Vuitton",
    logo: "LV",
    tagline: "The Art of Travel",
    description: "Iconic trunks and modern accessories that define global luxury.",
    story: "Starting as a master trunk maker in 1854, Louis Vuitton has become the world's most valuable luxury brand.",
    featured: true,
    image: "/assets/jewelry.jpg"
  },
  {
    id: "hermes",
    name: "Hermès",
    logo: "H",
    tagline: "Purity and Craftsmanship",
    description: "Unmatched quality in leather, silk, and ready-to-wear.",
    story: "A family-owned house since 1837, Hermès remains the gold standard for artisanal excellence.",
    featured: true,
    image: "/assets/hero.jpg"
  }
];

export function getBrandById(id: string): Brand | undefined {
  return brands.find(b => b.id === id);
}

export function getFeaturedBrands(): Brand[] {
  return brands.filter(b => b.featured);
}

export function getAllBrands(): Brand[] {
  return brands;
}
