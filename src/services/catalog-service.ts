import { collections } from '@/data/collections';
import { products } from '@/data/products';
import type { Collection, Product } from '@/domain/product';

export interface CatalogService {
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getCollectionBySlug(slug: string): Promise<Collection | null>;
  getProductsByCollection(slug: string): Promise<Product[]>;
}

export const catalogService: CatalogService = {
  async getProducts() {
    return products;
  },
  async getProductBySlug(slug) {
    return products.find((product) => product.slug === slug) ?? null;
  },
  async getCollectionBySlug(slug) {
    return collections.find((collection) => collection.slug === slug) ?? null;
  },
  async getProductsByCollection(slug) {
    return products.filter((product) => product.collectionSlugs.includes(slug));
  },
};
