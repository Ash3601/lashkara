'use client';

import { useParams } from 'next/navigation';
import { ButtonLink } from '@/components/common/button';
import { formatINR } from '@/lib/money';
import { useOrderStore } from '@/stores/order-store';

export function OrderConfirmationClient() {
  const params = useParams<{ orderId: string }>();
  const order = useOrderStore((state) =>
    state.orders.find((item) => item.id === params.orderId),
  );

  if (!order) {
    return (
      <div className="rounded-md border border-stone-200 bg-white p-8 text-center">
        <h1 className="font-serif text-4xl">Order not found</h1>
        <p className="mt-3 text-stone-600">Local prototype orders are stored in this browser.</p>
        <ButtonLink className="mt-6" href="/collections">Continue Shopping</ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl rounded-md border border-stone-200 bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-800">Order created</p>
      <h1 className="mt-2 font-serif text-5xl">Thank you, {order.customer.fullName}</h1>
      <p className="mt-3 text-stone-600">Order {order.id} is saved locally for prototype admin review.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-stone-50 p-4 text-sm">
          <strong>Contact</strong>
          <p className="mt-2">{order.customer.email}</p>
          <p>{order.customer.mobile}</p>
        </div>
        <div className="rounded-md bg-stone-50 p-4 text-sm">
          <strong>Payment</strong>
          <p className="mt-2">{order.paymentMethod} - {order.paymentStatus}</p>
          <p>Total {formatINR(order.total)}</p>
        </div>
      </div>
      <div className="mt-6 divide-y divide-stone-200">
        {order.items.map((item) => (
          <div key={item.id} className="py-4">
            <div className="flex justify-between gap-4">
              <div>
                <h2 className="font-medium">{item.title}</h2>
                <p className="text-sm text-stone-600">{item.sizingMode.replaceAll('_', ' ')} {item.selectedStandardSize ? `- ${item.selectedStandardSize}` : ''}</p>
              </div>
              <span>{formatINR((item.unitProductPrice + item.stitchingCharge) * item.quantity)}</span>
            </div>
            {item.customMeasurements ? (
              <p className="mt-2 text-sm text-stone-600">
                Measurements captured: bust {item.customMeasurements.bust} in, waist {item.customMeasurements.waist} in, hips {item.customMeasurements.hips} in.
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/collections" variant="secondary">Continue Shopping</ButtonLink>
        <ButtonLink href={`/admin/orders/${order.id}`}>View in Admin</ButtonLink>
      </div>
    </div>
  );
}
