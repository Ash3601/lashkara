import type { CartItem } from './cart';

export type PaymentMethod = 'UPI' | 'CARD' | 'COD';

export type PaymentStatus = 'SIMULATED' | 'COD_PENDING';

export type ProductionStatus =
  | 'NEW'
  | 'MEASUREMENT_REVIEW'
  | 'CUTTING'
  | 'STITCHING'
  | 'QC'
  | 'READY_TO_PACK';

export type FulfillmentStatus =
  | 'UNFULFILLED'
  | 'PACKED'
  | 'SHIPPED'
  | 'IN_TRANSIT'
  | 'DELIVERED';

export interface CustomerContact {
  fullName: string;
  email: string;
  mobile: string;
}

export interface ShippingAddress {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pinCode: string;
  country: 'India';
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerContact;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  productionStatus: ProductionStatus;
  fulfillmentStatus: FulfillmentStatus;
  items: CartItem[];
  subtotal: number;
  shippingAmount: number;
  total: number;
}
