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

const IMG = "https://images.unsplash.com/photo-1595777707802-08f28e0b8436?w=600";

export const products: Product[] = [
  {id:"1",name:"Midnight Elegance Abaya",brand:"Reverie",price:2500,category:"Abayas",description:"Exquisite hand-embroidered abaya",images:[IMG],colors:["Midnight","Black","Emerald"],sizes:["XS","S","M","L","XL"],rating:4.9,reviews:128},
  {id:"2",name:"Royal Indigo Formal Gown",brand:"Reverie",price:3200,category:"Formal",description:"Sophisticated formal gown",images:[IMG],colors:["Royal","Purple"],sizes:["XS","S","M","L"],rating:4.8,reviews:95},
  {id:"3",name:"Emerald Garden Casual",brand:"Luxe",price:1200,category:"Casual",description:"Effortlessly elegant casual",images:[IMG],colors:["Emerald","Cream","Taupe"],sizes:["XS","S","M","L","XL"],rating:4.7,reviews:156},
  {id:"4",name:"Pearl Essence Hijab",brand:"Luxe",price:450,category:"Accessories",description:"Premium silk hijab",images:[IMG],colors:["Pearl","Champagne","Blush"],sizes:["One Size"],rating:4.9,reviews:234},
  {id:"5",name:"Limited Edition Kimono",brand:"Reverie",price:4500,category:"Limited",description:"Fusion kimono exclusive",images:[IMG],colors:["Charcoal"],sizes:["S","M","L"],rating:5.0,reviews:42},
  {id:"6",name:"Gold Thread Dupatta",brand:"Reverie",price:1800,category:"Accessories",description:"Hand-embroidered dupatta",images:[IMG],colors:["Navy","Black"],sizes:["One Size"],rating:4.8,reviews:67},
  {id:"7",name:"Velvet Romance Evening",brand:"Luxe",price:2100,category:"Formal",description:"Luxurious velvet ensemble",images:[IMG],colors:["Burgundy","Black","Navy"],sizes:["XS","S","M","L"],rating:4.7,reviews:89},
  {id:"8",name:"Silk Charmeuse Blouse",brand:"Luxe",price:950,category:"Casual",description:"Timeless silk blouse",images:[IMG],colors:["Ivory","Blush","Slate"],sizes:["XS","S","M","L","XL"],rating:4.8,reviews:201},
  {id:"9",name:"Beaded Evening Clutch",brand:"Luxe",price:1600,category:"Accessories",description:"Hand-beaded luxury clutch",images:[IMG],colors:["Gold","Silver"],sizes:["One Size"],rating:4.9,reviews:112},
  {id:"10",name:"Premium Pashmina Wrap",brand:"Reverie",price:2200,category:"Accessories",description:"Authentic Pashmina wrap",images:[IMG],colors:["Charcoal","Cream","Plum"],sizes:["One Size"],rating:5.0,reviews:78},
  {id:"11",name:"Champagne Dreams Saree",brand:"Reverie",price:3500,category:"Formal",description:"Elegant saree with pearls",images:[IMG],colors:["Champagne","Rose"],sizes:["One Size"],rating:4.9,reviews:156},
  {id:"12",name:"Noir Statement Jacket",brand:"Luxe",price:1800,category:"Casual",description:"Structured black jacket",images:[IMG],colors:["Black"],sizes:["XS","S","M","L","XL"],rating:4.8,reviews:134},
  {id:"13",name:"Gossamer Hijab Collection",brand:"Luxe",price:350,category:"Accessories",description:"Ultra-lightweight hijab sets",images:[IMG],colors:["Multi"],sizes:["One Size"],rating:4.7,reviews:289},
  {id:"14",name:"Midnight Black Gown",brand:"Reverie",price:2950,category:"Formal",description:"Classic black gown",images:[IMG],colors:["Black"],sizes:["XS","S","M","L"],rating:4.8,reviews:98},
  {id:"15",name:"Sunset Orange Casual",brand:"Luxe",price:1050,category:"Casual",description:"Vibrant orange casual",images:[IMG],colors:["Orange","Coral"],sizes:["XS","S","M","L","XL"],rating:4.6,reviews:167},
  {id:"16",name:"Embroidered Shawl Collar",brand:"Reverie",price:2400,category:"Formal",description:"Luxe shawl with embroidery",images:[IMG],colors:["Navy","Burgundy"],sizes:["One Size"],rating:4.9,reviews:123},
  {id:"17",name:"Crystal Encrusted Sandal",brand:"Luxe",price:1200,category:"Accessories",description:"Embellished sandal",images:[IMG],colors:["Gold","Silver"],sizes:["5","6","7","8","9","10"],rating:4.8,reviews:95},
  {id:"18",name:"Ethereal Maxi Dress",brand:"Luxe",price:1900,category:"Formal",description:"Flowing maxi dress",images:[IMG],colors:["Ivory","Sage","Blue"],sizes:["XS","S","M","L","XL"],rating:4.7,reviews:178},
  {id:"19",name:"Timeless Leather Belt",brand:"Luxe",price:650,category:"Accessories",description:"Premium leather belt",images:[IMG],colors:["Black","Cognac","Navy"],sizes:["XS","S","M","L","XL"],rating:4.9,reviews:156},
  {id:"20",name:"Luxury Loungewear Set",brand:"Luxe",price:1450,category:"Casual",description:"Premium loungewear",images:[IMG],colors:["Taupe","Cream","Charcoal"],sizes:["XS","S","M","L","XL"],rating:4.8,reviews:145},
  {id:"21",name:"Gold Embroidered Saree",brand:"Reverie",price:3800,category:"Formal",description:"Premium silk saree",images:[IMG],colors:["Red"],sizes:["One Size"],rating:4.9,reviews:189},
  {id:"22",name:"Minimal White Shirt",brand:"Luxe",price:850,category:"Casual",description:"Clean lines premium shirt",images:[IMG],colors:["White"],sizes:["XS","S","M","L","XL"],rating:4.7,reviews:267},
  {id:"23",name:"Exclusive Limited Abaya",brand:"Reverie",price:5200,category:"Limited",description:"Collector's piece",images:[IMG],colors:["Black"],sizes:["M","L"],rating:5.0,reviews:28},
  {id:"24",name:"Rose Gold Jewelry Set",brand:"Luxe",price:2800,category:"Accessories",description:"Elegant jewelry",images:[IMG],colors:["Rose"],sizes:["One Size"],rating:4.9,reviews:103},
  {id:"25",name:"Plum Velvet Evening",brand:"Luxe",price:2350,category:"Formal",description:"Plum velvet gown",images:[IMG],colors:["Plum"],sizes:["XS","S","M","L"],rating:4.8,reviews:112},
  {id:"26",name:"Beige Cashmere Scarf",brand:"Reverie",price:1900,category:"Accessories",description:"Pure cashmere",images:[IMG],colors:["Beige","Camel"],sizes:["One Size"],rating:4.9,reviews:134},
  {id:"27",name:"Modern Collar Dress",brand:"Luxe",price:1200,category:"Casual",description:"Contemporary styled",images:[IMG],colors:["Navy","Black","Cream"],sizes:["XS","S","M","L","XL"],rating:4.7,reviews:198},
  {id:"28",name:"Statement Brooch",brand:"Luxe",price:1100,category:"Accessories",description:"Vintage-inspired brooch",images:[IMG],colors:["Gold"],sizes:["One Size"],rating:4.8,reviews:87},
  {id:"29",name:"Crisp White Blazer",brand:"Luxe",price:1600,category:"Casual",description:"Tailored blazer",images:[IMG],colors:["White"],sizes:["XS","S","M","L","XL"],rating:4.8,reviews:156},
  {id:"30",name:"Emerald Stone Necklace",brand:"Luxe",price:2400,category:"Accessories",description:"Luxury necklace",images:[IMG],colors:["Gold"],sizes:["One Size"],rating:4.9,reviews:78},
  {id:"31",name:"Classic Trousers",brand:"Luxe",price:1100,category:"Casual",description:"Tailored trousers",images:[IMG],colors:["Black","Navy","Taupe"],sizes:["XS","S","M","L","XL"],rating:4.7,reviews:234},
  {id:"32",name:"Silk Pillowcase Set",brand:"Luxe",price:580,category:"Accessories",description:"Luxury pillowcases",images:[IMG],colors:["Ivory","Rose"],sizes:["One Size"],rating:4.9,reviews:412},
  {id:"33",name:"Charcoal Linen Pants",brand:"Luxe",price:1050,category:"Casual",description:"Premium linen pants",images:[IMG],colors:["Charcoal","Oatmeal"],sizes:["XS","S","M","L","XL"],rating:4.6,reviews:167},
  {id:"34",name:"Gold Loop Earrings",brand:"Luxe",price:720,category:"Accessories",description:"Classic gold loops",images:[IMG],colors:["Gold"],sizes:["One Size"],rating:4.9,reviews:201},
  {id:"35",name:"Gradient Evening Shawl",brand:"Reverie",price:2100,category:"Formal",description:"Ombre silk shawl",images:[IMG],colors:["Navy"],sizes:["One Size"],rating:4.8,reviews:89},
  {id:"36",name:"Luxury Silk Camisole",brand:"Luxe",price:620,category:"Casual",description:"Pure silk camisole",images:[IMG],colors:["Ivory","Black","Blush"],sizes:["XS","S","M","L","XL"],rating:4.8,reviews:278},
  {id:"37",name:"Beaded Evening Shoes",brand:"Luxe",price:1800,category:"Accessories",description:"Embellished heels",images:[IMG],colors:["Gold","Silver"],sizes:["5","6","7","8","9","10"],rating:4.7,reviews:134},
  {id:"38",name:"Premium Cotton Shirt",brand:"Luxe",price:920,category:"Casual",description:"Premium cotton shirt",images:[IMG],colors:["Sky","Cream"],sizes:["XS","S","M","L","XL"],rating:4.7,reviews:167},
  {id:"39",name:"Pearl Stud Earrings",brand:"Luxe",price:950,category:"Accessories",description:"Authentic pearls",images:[IMG],colors:["White","Black"],sizes:["One Size"],rating:4.9,reviews:189},
  {id:"40",name:"Designer Sunglasses",brand:"Luxe",price:1450,category:"Accessories",description:"Luxury sunglasses",images:[IMG],colors:["Black","Gold"],sizes:["One Size"],rating:4.8,reviews:123},
  {id:"41",name:"Silk Sleep Mask",brand:"Luxe",price:380,category:"Accessories",description:"Luxury sleep mask",images:[IMG],colors:["Black","Blush"],sizes:["One Size"],rating:4.9,reviews:312},
  {id:"42",name:"Luxury Hand Cream",brand:"Luxe",price:185,category:"Accessories",description:"Premium hand care",images:[IMG],colors:["Gold"],sizes:["One Size"],rating:4.9,reviews:567},
  {id:"43",name:"Evening Chain Bag",brand:"Luxe",price:1950,category:"Accessories",description:"Luxury shoulder bag",images:[IMG],colors:["Black","Cognac"],sizes:["One Size"],rating:4.8,reviews:145},
  {id:"44",name:"Luxury Perfume",brand:"Reverie",price:320,category:"Accessories",description:"Signature fragrance",images:[IMG],colors:["Amber"],sizes:["One Size"],rating:4.9,reviews:234},
  {id:"45",name:"Premium Hair Serum",brand:"Luxe",price:280,category:"Accessories",description:"Hair care serum",images:[IMG],colors:["Gold"],sizes:["One Size"],rating:4.8,reviews:189},
  {id:"46",name:"Premium Candle",brand:"Reverie",price:220,category:"Accessories",description:"Scented candle",images:[IMG],colors:["Cream"],sizes:["One Size"],rating:4.9,reviews:156},
  {id:"47",name:"Cashmere Socks Set",brand:"Luxe",price:420,category:"Accessories",description:"Cashmere socks",images:[IMG],colors:["Neutral"],sizes:["One Size"],rating:4.9,reviews:245},
  {id:"48",name:"Leather Phone Case",brand:"Luxe",price:580,category:"Accessories",description:"Leather phone case",images:[IMG],colors:["Black","Caramel"],sizes:["One Size"],rating:4.7,reviews:178},
  {id:"49",name:"Silk Eye Cream",brand:"Luxe",price:275,category:"Accessories",description:"Premium eye care",images:[IMG],colors:["Gold"],sizes:["One Size"],rating:4.9,reviews:267},
  {id:"50",name:"Luxury Gift Box",brand:"Nafshe",price:150,category:"Accessories",description:"Premium gift box",images:[IMG],colors:["Charcoal"],sizes:["One Size"],rating:5.0,reviews:89},
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
