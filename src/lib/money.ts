export function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function lineTotal(unitProductPrice: number, stitchingCharge: number, quantity: number) {
  return (unitProductPrice + stitchingCharge) * quantity;
}
