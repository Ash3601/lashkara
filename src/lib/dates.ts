export function dispatchCopy(fulfillmentType: string, leadDays: number) {
  if (fulfillmentType === 'READY_TO_SHIP') return 'Dispatches in 1-2 business days';
  return `Dispatches in approximately ${leadDays} business days`;
}

export function estimatedDeliveryDays(productionLeadDays: number) {
  return productionLeadDays + 3;
}

export function deliveryCopy(productionLeadDays: number) {
  return `Estimated delivery in ${estimatedDeliveryDays(productionLeadDays)} business days`;
}
