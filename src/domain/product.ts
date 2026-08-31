export type Currency = 'INR';

export type SizingMode =
  | 'STANDARD_SIZE'
  | 'UNSTITCHED'
  | 'CUSTOM_MEASUREMENTS';

export type StandardSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type FulfillmentType = 'READY_TO_SHIP' | 'MADE_TO_ORDER';

export type InventoryStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  collectionSlugs: string[];
  price: number;
  compareAtPrice?: number;
  currency: Currency;
  images: ProductImage[];
  colors: string[];
  fabric: string;
  work?: string;
  occasion?: string[];
  careInstructions?: string;
  sizingModes: SizingMode[];
  standardSizes?: StandardSize[];
  stitchingCharge?: number;
  customStitchingCharge?: number;
  fulfillmentType: FulfillmentType;
  productionLeadDays: number;
  inventoryStatus: InventoryStatus;
  featured?: boolean;
  newArrival?: boolean;
}

export interface Collection {
  slug: string;
  title: string;
  description: string;
  image: string;
  featured?: boolean;
}
