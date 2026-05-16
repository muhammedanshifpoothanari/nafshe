export interface Story {
  id: string;
  title: string;
  image: string;
  products: string[];
  duration: number;
}

const IMG = "https://images.unsplash.com/photo-1595777707802-08f28e0b8436?w=600";

export const stories: Story[] = [
  {
    id: "1",
    title: "New Collection",
    image: IMG,
    products: ["1", "2", "11"],
    duration: 5
  },
  {
    id: "2",
    title: "Casual Vibes",
    image: IMG,
    products: ["3", "27", "15"],
    duration: 5
  },
  {
    id: "3",
    title: "Evening Glow",
    image: IMG,
    products: ["7", "35", "14"],
    duration: 5
  },
  {
    id: "4",
    title: "Accessories",
    image: IMG,
    products: ["4", "9", "24"],
    duration: 5
  },
  {
    id: "5",
    title: "Limited Edition",
    image: IMG,
    products: ["5", "23"],
    duration: 5
  },
  {
    id: "6",
    title: "Premium Basics",
    image: IMG,
    products: ["8", "22", "31"],
    duration: 5
  },
  {
    id: "7",
    title: "Luxury Care",
    image: IMG,
    products: ["42", "45", "49"],
    duration: 5
  },
  {
    id: "8",
    title: "Timeless Classics",
    image: IMG,
    products: ["26", "39", "34"],
    duration: 5
  }
];
