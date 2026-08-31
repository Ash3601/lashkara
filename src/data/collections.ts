import type { Collection } from '@/domain/product';

export const collections: Collection[] = [
  {
    slug: 'lehengas',
    title: 'Lehengas',
    description: 'Ceremonial sets with embroidered skirts, sculpted blouses, and dupattas.',
    image: 'https://images.unsplash.com/photo-1610030469668-8e9f641a76ca?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    slug: 'sarees',
    title: 'Sarees',
    description: 'Silk, organza, and georgette drapes for intimate events and grand entrances.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    slug: 'anarkali-suits',
    title: 'Anarkali & Suits',
    description: 'Flowing anarkalis and tailored suits balanced between ease and occasion.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    slug: 'ready-to-ship',
    title: 'Ready to Ship',
    description: 'Event-ready pieces reserved for quick dispatch from the prototype atelier.',
    image: 'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
];
