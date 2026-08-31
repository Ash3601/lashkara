'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import type { FulfillmentStatus, ProductionStatus } from '@/domain/order';
import { ButtonLink } from '@/components/common/button';
import { formatINR } from '@/lib/money';
import { useOrderStore } from '@/stores/order-store';

const productionStatuses: ProductionStatus[] = ['NEW', 'MEASUREMENT_REVIEW', 'CUTTING', 'STITCHING', 'QC', 'READY_TO_PACK'];
const fulfillmentStatuses: FulfillmentStatus[] = ['UNFULFILLED', 'PACKED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED'];

export function AdminOrderDetailClient() {
  const params = useParams<{ orderId: string }>();
  const { orders, updateStatuses } = useOrderStore();
  const order = orders.find((item) => item.id === params.orderId);

  if (!order) {
    return (
      <div className="rounded-md border border-stone-200 bg-white p-8 text-center">
        <h1 className="font-serif text-4xl">Admin order not found</h1>
        <ButtonLink className="mt-6" href="/admin">Back to admin</ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <section className="rounded-md border border-stone-200 bg-white p-5">
        <h1 className="font-serif text-4xl">{order.id}</h1>
        <p className="mt-2 text-sm text-stone-600">{new Date(order.createdAt).toLocaleString()}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-stone-50 p-4 text-sm">
            <strong>Customer</strong>
            <p className="mt-2">{order.customer.fullName}</p>
            <p>{order.customer.email}</p>
            <p>{order.customer.mobile}</p>
          </div>
          <div className="rounded-md bg-stone-50 p-4 text-sm">
            <strong>Shipping</strong>
            <p className="mt-2">{order.shippingAddress.address1}</p>
            <p>{order.shippingAddress.address2}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pinCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
        <div className="mt-8 divide-y divide-stone-200">
          {order.items.map((item) => (
            <article key={item.id} className="grid gap-4 py-5 sm:grid-cols-[96px_1fr]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-stone-100">
                <Image src={item.thumbnail} alt={item.title} fill sizes="96px" className="object-cover" />
              </div>
              <div>
                <h2 className="font-medium">{item.title}</h2>
                <p className="mt-1 text-sm text-stone-600">{item.sizingMode.replaceAll('_', ' ')} {item.selectedStandardSize ? `- ${item.selectedStandardSize}` : ''}</p>
                {item.customMeasurements ? (
                  <div className="mt-3 rounded-md border border-stone-200 p-4 text-sm">
                    <h3 className="font-semibold">Complete measurement snapshot</h3>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {Object.entries(item.customMeasurements).map(([key, value]) => (
                        <p key={key}><span className="text-stone-500">{key}</span>: {String(value)}</p>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
      <aside className="h-fit rounded-md border border-stone-200 bg-white p-5">
        <h2 className="font-serif text-3xl">Statuses</h2>
        <label className="mt-4 grid gap-1 text-sm">
          <span>Production status</span>
          <select className="input" value={order.productionStatus} onChange={(event) => updateStatuses(order.id, event.target.value as ProductionStatus, order.fulfillmentStatus)}>
            {productionStatuses.map((status) => <option key={status}>{status}</option>)}
          </select>
        </label>
        <label className="mt-4 grid gap-1 text-sm">
          <span>Fulfillment status</span>
          <select className="input" value={order.fulfillmentStatus} onChange={(event) => updateStatuses(order.id, order.productionStatus, event.target.value as FulfillmentStatus)}>
            {fulfillmentStatuses.map((status) => <option key={status}>{status}</option>)}
          </select>
        </label>
        <div className="mt-6 grid gap-2 border-t border-stone-200 pt-4 text-sm">
          <div className="flex justify-between"><span>Payment</span><span>{order.paymentMethod}</span></div>
          <div className="flex justify-between"><span>Status</span><span>{order.paymentStatus}</span></div>
          <div className="flex justify-between font-semibold"><span>Total</span><span>{formatINR(order.total)}</span></div>
        </div>
      </aside>
    </div>
  );
}
