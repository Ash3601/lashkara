'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  FulfillmentStatus,
  Order,
  PaymentMethod,
  ProductionStatus,
} from '@/domain/order';
import type { CartItem } from '@/domain/cart';
import { cartTotals } from './cart-store';

interface CheckoutInput {
  customer: Order['customer'];
  shippingAddress: Order['shippingAddress'];
  paymentMethod: PaymentMethod;
  items: CartItem[];
}

interface OrderState {
  orders: Order[];
  createOrder: (input: CheckoutInput) => Order;
  updateStatuses: (
    id: string,
    productionStatus: ProductionStatus,
    fulfillmentStatus: FulfillmentStatus,
  ) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      createOrder: ({ customer, shippingAddress, paymentMethod, items }) => {
        const totals = cartTotals(items);
        const hasMeasurements = items.some(
          (item) => item.sizingMode === 'CUSTOM_MEASUREMENTS',
        );
        const order: Order = {
          id: `AUR-${Date.now().toString().slice(-7)}`,
          createdAt: new Date().toISOString(),
          customer,
          shippingAddress,
          paymentMethod,
          paymentStatus: paymentMethod === 'COD' ? 'COD_PENDING' : 'SIMULATED',
          productionStatus: hasMeasurements ? 'MEASUREMENT_REVIEW' : 'NEW',
          fulfillmentStatus: 'UNFULFILLED',
          items: JSON.parse(JSON.stringify(items)),
          ...totals,
        };
        set({ orders: [order, ...get().orders] });
        return order;
      },
      updateStatuses: (id, productionStatus, fulfillmentStatus) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, productionStatus, fulfillmentStatus } : order,
          ),
        })),
    }),
    { name: 'aurelia-orders' },
  ),
);
