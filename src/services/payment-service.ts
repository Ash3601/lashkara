import type { PaymentMethod } from '@/domain/order';

export interface PaymentMethodOption {
  id: PaymentMethod;
  label: string;
  helper: string;
}

export interface PaymentService {
  getAvailableMethods(): Promise<PaymentMethodOption[]>;
}

export const paymentService: PaymentService = {
  async getAvailableMethods() {
    return [
      { id: 'UPI', label: 'UPI', helper: 'Simulated UPI selection only' },
      { id: 'CARD', label: 'Card', helper: 'No card data collected' },
      { id: 'COD', label: 'Cash on Delivery', helper: 'COD pending in prototype' },
    ];
  },
};
