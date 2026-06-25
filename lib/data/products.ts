export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  colors?: string[];
  sizes?: string[];
  rating?: number;
  reviews?: number;
}

export const products: Product[] = [
  {
    "id": "1",
    "name": "Midnight Elegance Abaya (191036)",
    "brand": "Reverie",
    "price": 1550,
    "category": "Abayas",
    "description": "Meticulously crafted luxury modest wear. Includes multiple styling options and premium fabric selection. Highlighted by our signature stitching and tailored details.",
    "images": [
      "/images/products/20260506_191036.jpg",
      "/images/products/20260506_191100.jpg",
      "/images/products/20260506_192041.jpg"
    ],
    "colors": [
      "Midnight",
      "Black"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.8,
    "reviews": 146
  },
  {
    "id": "2",
    "name": "Satin Evening Gown (192055)",
    "brand": "Luxe",
    "price": 2130,
    "category": "Formal",
    "description": "Meticulously crafted luxury modest wear. Includes multiple styling options and premium fabric selection. Highlighted by our signature stitching and tailored details.",
    "images": [
      "/images/products/20260506_192055.jpg",
      "/images/products/20260506_192254.jpg",
      "/images/products/20260506_192309.jpg"
    ],
    "colors": [
      "Midnight",
      "Black",
      "Emerald"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.7,
    "reviews": 164
  },
  {
    "id": "3",
    "name": "Cotton Lounge Set (192328)",
    "brand": "Nafshe",
    "price": 2000,
    "category": "Casual",
    "description": "Meticulously crafted luxury modest wear. Includes multiple styling options and premium fabric selection. Highlighted by our signature stitching and tailored details.",
    "images": [
      "/images/products/20260506_192328.jpg",
      "/images/products/20260506_192440.jpg",
      "/images/products/20260506_192613.jpg"
    ],
    "colors": [
      "Midnight",
      "Black",
      "Emerald",
      "Ivory"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.8,
    "reviews": 80
  },
  {
    "id": "4",
    "name": "Gold Loop Brooch (193502)",
    "brand": "Reverie",
    "price": 1210,
    "category": "Accessories",
    "description": "Meticulously crafted luxury modest wear. Includes multiple styling options and premium fabric selection. Highlighted by our signature stitching and tailored details.",
    "images": [
      "/images/products/20260506_193502.jpg",
      "/images/products/20260506_193635.jpg",
      "/images/products/20260506_193655.jpg"
    ],
    "colors": [
      "Midnight",
      "Black"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.8,
    "reviews": 26
  },
  {
    "id": "5",
    "name": "Limited Edition Kimono (193834)",
    "brand": "Luxe",
    "price": 2260,
    "category": "Limited",
    "description": "Meticulously crafted luxury modest wear. Includes multiple styling options and premium fabric selection. Highlighted by our signature stitching and tailored details.",
    "images": [
      "/images/products/20260506_193834.jpg",
      "/images/products/20260506_193903.jpg",
      "/images/products/20260506_194006.jpg"
    ],
    "colors": [
      "Midnight",
      "Black",
      "Emerald"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.9,
    "reviews": 141
  },
  {
    "id": "6",
    "name": "Gold Thread Abaya (194150)",
    "brand": "Nafshe",
    "price": 1220,
    "category": "Abayas",
    "description": "Meticulously crafted luxury modest wear. Includes multiple styling options and premium fabric selection. Highlighted by our signature stitching and tailored details.",
    "images": [
      "/images/products/20260506_194150.jpg",
      "/images/products/20260506_195621.jpg",
      "/images/products/20260506_195628.jpg"
    ],
    "colors": [
      "Midnight",
      "Black",
      "Emerald",
      "Ivory"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.9,
    "reviews": 58
  },
  {
    "id": "7",
    "name": "Satin Evening Gown (195643)",
    "brand": "Reverie",
    "price": 1400,
    "category": "Formal",
    "description": "Meticulously crafted luxury modest wear. Includes multiple styling options and premium fabric selection. Highlighted by our signature stitching and tailored details.",
    "images": [
      "/images/products/20260506_195643.jpg",
      "/images/products/20260506_195932.jpg",
      "/images/products/20260506_200035.jpg"
    ],
    "colors": [
      "Midnight",
      "Black"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.9,
    "reviews": 190
  },
  {
    "id": "8",
    "name": "Cotton Lounge Set (200221)",
    "brand": "Luxe",
    "price": 2390,
    "category": "Casual",
    "description": "Meticulously crafted luxury modest wear. Includes multiple styling options and premium fabric selection. Highlighted by our signature stitching and tailored details.",
    "images": [
      "/images/products/20260506_200221.jpg",
      "/images/products/20260506_200235.jpg",
      "/images/products/20260506_200327.jpg"
    ],
    "colors": [
      "Midnight",
      "Black",
      "Emerald"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.9,
    "reviews": 138
  },
  {
    "id": "9",
    "name": "Gold Loop Brooch (201858)",
    "brand": "Nafshe",
    "price": 2220,
    "category": "Accessories",
    "description": "Meticulously crafted luxury modest wear. Includes multiple styling options and premium fabric selection. Highlighted by our signature stitching and tailored details.",
    "images": [
      "/images/products/20260506_201858.jpg",
      "/images/products/20260506_201914.jpg",
      "/images/products/20260506_202107.jpg"
    ],
    "colors": [
      "Midnight",
      "Black",
      "Emerald",
      "Ivory"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.6,
    "reviews": 168
  },
  {
    "id": "10",
    "name": "Collector Gold Thread Abaya (202120)",
    "brand": "Reverie",
    "price": 1720,
    "category": "Limited",
    "description": "Meticulously crafted luxury modest wear. Includes multiple styling options and premium fabric selection. Highlighted by our signature stitching and tailored details.",
    "images": [
      "/images/products/20260506_202120.jpg",
      "/images/products/20260506_202359_1.jpg",
      "/images/products/20260506_202426_1.jpg"
    ],
    "colors": [
      "Midnight",
      "Black"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.9,
    "reviews": 120
  },
  {
    "id": "11",
    "name": "Classic Black Abaya (202644(0))",
    "brand": "Luxe",
    "price": 1020,
    "category": "Abayas",
    "description": "Meticulously crafted luxury modest wear. Includes multiple styling options and premium fabric selection. Highlighted by our signature stitching and tailored details.",
    "images": [
      "/images/products/20260506_202644(0)_1.jpg",
      "/images/products/20260506_202644_1.jpg",
      "/images/products/20260506_202824_1.jpg"
    ],
    "colors": [
      "Midnight",
      "Black",
      "Emerald"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 5,
    "reviews": 36
  },
  {
    "id": "12",
    "name": "Satin Evening Gown (202834)",
    "brand": "Nafshe",
    "price": 1390,
    "category": "Formal",
    "description": "Meticulously crafted luxury modest wear. Includes multiple styling options and premium fabric selection. Highlighted by our signature stitching and tailored details.",
    "images": [
      "/images/products/20260506_202834_1.jpg",
      "/images/products/20260506_202847_1.jpg",
      "/images/products/20260506_202855_1.jpg"
    ],
    "colors": [
      "Midnight",
      "Black",
      "Emerald",
      "Ivory"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.8,
    "reviews": 167
  },
  {
    "id": "13",
    "name": "Louis Vuitton Monogram Leather Tote",
    "brand": "Louis Vuitton",
    "price": 22400,
    "category": "bags",
    "description": "Exquisite high-fashion couture piece from Louis Vuitton. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0341 (2).jpg",
      "/images/products/IMG_0342.jpg",
      "/images/products/IMG_0346.jpg"
    ],
    "colors": [
      "Gold",
      "Silver"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.8,
    "reviews": 58
  },
  {
    "id": "14",
    "name": "Valentino Velvet Halter Gown",
    "brand": "Valentino",
    "price": 19800,
    "category": "dresses",
    "description": "Exquisite high-fashion couture piece from Valentino. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0347 (1).jpg",
      "/images/products/IMG_0352.jpg",
      "/images/products/IMG_0353.jpg"
    ],
    "colors": [
      "Gold",
      "Silver",
      "Black"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.7,
    "reviews": 110
  },
  {
    "id": "15",
    "name": "Dior Classic Slingbacks",
    "brand": "Dior",
    "price": 22100,
    "category": "shoes",
    "description": "Exquisite high-fashion couture piece from Dior. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0354.jpg",
      "/images/products/IMG_0355.jpg",
      "/images/products/IMG_0356.jpg"
    ],
    "colors": [
      "Gold",
      "Silver",
      "Black",
      "Brown"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40"
    ],
    "rating": 4.9,
    "reviews": 40
  },
  {
    "id": "16",
    "name": "Chanel Pearl Drop Necklace",
    "brand": "Chanel",
    "price": 13900,
    "category": "jewelry",
    "description": "Exquisite high-fashion couture piece from Chanel. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0357.jpg",
      "/images/products/IMG_0358.jpg",
      "/images/products/IMG_0359.jpg"
    ],
    "colors": [
      "Gold",
      "Silver"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.7,
    "reviews": 44
  },
  {
    "id": "17",
    "name": "Prada Oversized Cat-Eye Frames",
    "brand": "Prada",
    "price": 42400,
    "category": "sunglasses",
    "description": "Exquisite high-fashion couture piece from Prada. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0360.jpg",
      "/images/products/IMG_0361.jpg",
      "/images/products/IMG_0363.jpg"
    ],
    "colors": [
      "Gold",
      "Silver",
      "Black"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.7,
    "reviews": 11
  },
  {
    "id": "18",
    "name": "Hermès Sapphire Dial Watch",
    "brand": "Hermès",
    "price": 34800,
    "category": "watches",
    "description": "Exquisite high-fashion couture piece from Hermès. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0364.jpg",
      "/images/products/IMG_0365.jpg",
      "/images/products/IMG_0366.jpg"
    ],
    "colors": [
      "Gold",
      "Silver",
      "Black",
      "Brown"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.7,
    "reviews": 26
  },
  {
    "id": "19",
    "name": "Gucci Tailored Linen Blazer",
    "brand": "Gucci",
    "price": 39000,
    "category": "tops",
    "description": "Exquisite high-fashion couture piece from Gucci. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0369.jpg",
      "/images/products/IMG_0370.jpg",
      "/images/products/IMG_0371.jpg"
    ],
    "colors": [
      "Gold",
      "Silver"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.9,
    "reviews": 57
  },
  {
    "id": "20",
    "name": "Balenciaga Matelasse Chain Bag",
    "brand": "Balenciaga",
    "price": 35600,
    "category": "bags",
    "description": "Exquisite high-fashion couture piece from Balenciaga. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0372.jpg",
      "/images/products/IMG_0373.jpg",
      "/images/products/IMG_0376.jpg"
    ],
    "colors": [
      "Gold",
      "Silver",
      "Black"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 5,
    "reviews": 53
  },
  {
    "id": "21",
    "name": "Louis Vuitton Pleated Satin Dress",
    "brand": "Louis Vuitton",
    "price": 24000,
    "category": "dresses",
    "description": "Exquisite high-fashion couture piece from Louis Vuitton. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0377.jpg",
      "/images/products/IMG_0379.jpg",
      "/images/products/IMG_0380 (1).jpg"
    ],
    "colors": [
      "Gold",
      "Silver",
      "Black",
      "Brown"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.9,
    "reviews": 88
  },
  {
    "id": "22",
    "name": "Valentino Leather Ankle Boots",
    "brand": "Valentino",
    "price": 41300,
    "category": "shoes",
    "description": "Exquisite high-fashion couture piece from Valentino. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0380.jpg",
      "/images/products/IMG_0381.jpg",
      "/images/products/IMG_0383.jpg"
    ],
    "colors": [
      "Gold",
      "Silver"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40"
    ],
    "rating": 5,
    "reviews": 36
  },
  {
    "id": "23",
    "name": "Dior 18k Gold Link Bracelet",
    "brand": "Dior",
    "price": 38100,
    "category": "jewelry",
    "description": "Exquisite high-fashion couture piece from Dior. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0384.jpg",
      "/images/products/IMG_0387.jpg",
      "/images/products/IMG_0388.jpg"
    ],
    "colors": [
      "Gold",
      "Silver",
      "Black"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.9,
    "reviews": 28
  },
  {
    "id": "24",
    "name": "Chanel Square Acetate Sunglasses",
    "brand": "Chanel",
    "price": 26700,
    "category": "sunglasses",
    "description": "Exquisite high-fashion couture piece from Chanel. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0389.jpg",
      "/images/products/IMG_0391.jpg",
      "/images/products/IMG_0392.jpg"
    ],
    "colors": [
      "Gold",
      "Silver",
      "Black",
      "Brown"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 5,
    "reviews": 156
  },
  {
    "id": "25",
    "name": "Prada Automatic Leather Timepiece",
    "brand": "Prada",
    "price": 47400,
    "category": "watches",
    "description": "Exquisite high-fashion couture piece from Prada. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0393.jpg",
      "/images/products/IMG_0394.jpg",
      "/images/products/IMG_0395.jpg"
    ],
    "colors": [
      "Gold",
      "Silver"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.8,
    "reviews": 95
  },
  {
    "id": "26",
    "name": "Hermès Embroidered Silk Shirt",
    "brand": "Hermès",
    "price": 36300,
    "category": "tops",
    "description": "Exquisite high-fashion couture piece from Hermès. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0398.jpg",
      "/images/products/IMG_0399.jpg",
      "/images/products/IMG_0401.jpg"
    ],
    "colors": [
      "Gold",
      "Silver",
      "Black"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 5,
    "reviews": 23
  },
  {
    "id": "27",
    "name": "Gucci Epsom Leather Handbag",
    "brand": "Gucci",
    "price": 13200,
    "category": "bags",
    "description": "Exquisite high-fashion couture piece from Gucci. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0402.jpg",
      "/images/products/IMG_0403.jpg",
      "/images/products/IMG_0405.jpg"
    ],
    "colors": [
      "Gold",
      "Silver",
      "Black",
      "Brown"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.9,
    "reviews": 53
  },
  {
    "id": "28",
    "name": "Balenciaga Silk Evening Dress",
    "brand": "Balenciaga",
    "price": 12200,
    "category": "dresses",
    "description": "Exquisite high-fashion couture piece from Balenciaga. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0408.jpg",
      "/images/products/IMG_0409.jpg",
      "/images/products/IMG_0410.jpg"
    ],
    "colors": [
      "Gold",
      "Silver"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.9,
    "reviews": 157
  },
  {
    "id": "29",
    "name": "Louis Vuitton Floral Lace Pumps",
    "brand": "Louis Vuitton",
    "price": 10500,
    "category": "shoes",
    "description": "Exquisite high-fashion couture piece from Louis Vuitton. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0411.jpg",
      "/images/products/IMG_0412.jpg",
      "/images/products/IMG_0415.jpg"
    ],
    "colors": [
      "Gold",
      "Silver",
      "Black"
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40"
    ],
    "rating": 4.7,
    "reviews": 145
  },
  {
    "id": "30",
    "name": "Valentino Serpenti Gold Ring",
    "brand": "Valentino",
    "price": 20900,
    "category": "jewelry",
    "description": "Exquisite high-fashion couture piece from Valentino. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0417 (1).jpg",
      "/images/products/IMG_0419 (1).jpg",
      "/images/products/IMG_0420.jpg"
    ],
    "colors": [
      "Gold",
      "Silver",
      "Black",
      "Brown"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.8,
    "reviews": 50
  },
  {
    "id": "31",
    "name": "Dior Signature Logo Frames",
    "brand": "Dior",
    "price": 22400,
    "category": "sunglasses",
    "description": "Exquisite high-fashion couture piece from Dior. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0421.jpg",
      "/images/products/IMG_0422 (1).jpg",
      "/images/products/IMG_0423 (2).jpg"
    ],
    "colors": [
      "Gold",
      "Silver"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.8,
    "reviews": 55
  },
  {
    "id": "32",
    "name": "Chanel Diamond Bezel Watch",
    "brand": "Chanel",
    "price": 22200,
    "category": "watches",
    "description": "Exquisite high-fashion couture piece from Chanel. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0425 (1).jpg",
      "/images/products/IMG_0426 (1).jpg",
      "/images/products/IMG_0427 (1).jpg"
    ],
    "colors": [
      "Gold",
      "Silver",
      "Black"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.8,
    "reviews": 157
  },
  {
    "id": "33",
    "name": "Prada Draped Silk Blouse",
    "brand": "Prada",
    "price": 47800,
    "category": "tops",
    "description": "Exquisite high-fashion couture piece from Prada. Features premium materials and expert craftsmanship designed for red carpet elegance and style statement.",
    "images": [
      "/images/products/IMG_0432 (1).jpg",
      "/images/products/IMG_0434 (1).jpg",
      "/images/products/IMG_0435 (1).jpg"
    ],
    "colors": [
      "Gold",
      "Silver",
      "Black",
      "Brown"
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.8,
    "reviews": 67
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q)
  );
}
