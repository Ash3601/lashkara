'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, CartTotals } from '@/domain/cart';
import type { Product, SizingMode, StandardSize } from '@/domain/product';
import type { CustomMeasurements } from '@/domain/measurement';
import { lineTotal } from '@/lib/money';

function makeItemId(input: {
  productId: string;
  sizingMode: SizingMode;
  selectedStandardSize?: StandardSize;
  customMeasurements?: CustomMeasurements;
}) {
  return btoa(
    JSON.stringify({
      p: input.productId,
      m: input.sizingMode,
      s: input.selectedStandardSize ?? null,
      c: input.customMeasurements ?? null,
    }),
  );
}

export function cartTotals(items: CartItem[]): CartTotals {
  const subtotal = items.reduce(
    (sum, item) =>
      sum + lineTotal(item.unitProductPrice, item.stitchingCharge, item.quantity),
    0,
  );
  return { subtotal, shippingAmount: 0, total: subtotal };
}

interface AddToCartInput {
  product: Product;
  sizingMode: SizingMode;
  selectedStandardSize?: StandardSize;
  customMeasurements?: CustomMeasurements;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (input: AddToCartInput) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: ({ product, sizingMode, selectedStandardSize, customMeasurements, quantity }) =>
        set((state) => {
          const stitchingCharge =
            sizingMode === 'CUSTOM_MEASUREMENTS'
              ? product.customStitchingCharge ?? 0
              : 0;
          const id = makeItemId({
            productId: product.id,
            sizingMode,
            selectedStandardSize,
            customMeasurements,
          });
          const existing = state.items.find((item) => item.id === id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }
          const item: CartItem = {
            id,
            productId: product.id,
            productSlug: product.slug,
            title: product.title,
            thumbnail: product.images[0]?.src ?? '',
            unitProductPrice: product.price,
            sizingMode,
            selectedStandardSize,
            customMeasurements: customMeasurements
              ? JSON.parse(JSON.stringify(customMeasurements))
              : undefined,
            stitchingCharge,
            quantity,
          };
          return { items: [...state.items, item] };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
          ),
        })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'aurelia-cart' },
  ),
);
