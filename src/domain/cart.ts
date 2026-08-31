import type { CustomMeasurements } from './measurement';
import type { SizingMode, StandardSize } from './product';

export interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  title: string;
  thumbnail: string;
  unitProductPrice: number;
  sizingMode: SizingMode;
  selectedStandardSize?: StandardSize;
  customMeasurements?: CustomMeasurements;
  stitchingCharge: number;
  quantity: number;
}

export interface CartTotals {
  subtotal: number;
  shippingAmount: number;
  total: number;
}
