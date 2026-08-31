import { estimatedDeliveryDays } from '@/lib/dates';

export interface ShippingEstimateInput {
  productionLeadDays: number;
}

export interface ShippingEstimate {
  dispatchDays: number;
  deliveryDays: number;
  shippingAmount: number;
}

export interface ShippingService {
  getEstimate(input: ShippingEstimateInput): Promise<ShippingEstimate>;
}

export const shippingService: ShippingService = {
  async getEstimate(input) {
    return {
      dispatchDays: input.productionLeadDays,
      deliveryDays: estimatedDeliveryDays(input.productionLeadDays),
      shippingAmount: 0,
    };
  },
};
