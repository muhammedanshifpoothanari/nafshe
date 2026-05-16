export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Fatima Al-Mansouri',
    role: 'Fashion Enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    rating: 5,
    text: 'The quality of the abayas is exceptional. The craftsmanship and attention to detail are what set Nafshe apart. I\'ve been a loyal customer for over a year now.',
    verified: true,
  },
  {
    id: '2',
    name: 'Layla Al-Dosari',
    role: 'Professional',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    rating: 5,
    text: 'Nafshe has transformed my wardrobe. The variety and luxury of their collections is unmatched. Customer service is also outstanding.',
    verified: true,
  },
  {
    id: '3',
    name: 'Amira Al-Rashid',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    rating: 5,
    text: 'I love how Nafshe combines tradition with modern elegance. Every piece feels premium and is perfect for any occasion.',
    verified: true,
  },
  {
    id: '4',
    name: 'Hana Al-Suwaidi',
    role: 'Student',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c006ae6f?w=200&h=200&fit=crop',
    rating: 4.9,
    text: 'The new arrivals are always on point. Nafshe stays ahead of fashion trends while maintaining that luxury feel.',
    verified: true,
  },
  {
    id: '5',
    name: 'Maryam Al-Mazrouei',
    role: 'Entrepreneur',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    rating: 5,
    text: 'Best place to find formal wear and accessories. The delivery was quick and the packaging was beautiful.',
    verified: true,
  },
  {
    id: '6',
    name: 'Nora Al-Kaabi',
    role: 'Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    rating: 5,
    text: 'As someone in fashion, I appreciate the quality and curated selection. Nafshe truly understands luxury.',
    verified: true,
  },
];

export function getTestimonials(): Testimonial[] {
  return testimonials;
}

export function getTestimonialsByRating(minRating: number): Testimonial[] {
  return testimonials.filter((t) => t.rating >= minRating);
}
