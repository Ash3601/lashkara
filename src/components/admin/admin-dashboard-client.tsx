'use client';

import Link from 'next/link';
import { formatINR } from '@/lib/money';
import { useOrderStore } from '@/stores/order-store';
import type { ProductionStatus } from '@/domain/order';

const columns: ProductionStatus[] = ['NEW', 'MEASUREMENT_REVIEW', 'CUTTING', 'STITCHING', 'QC', 'READY_TO_PACK'];

export function AdminDashboardClient() {
  const orders = useOrderStore((state) => state.orders);
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const customOrders = orders.filter((order) => order.items.some((item) => item.customMeasurements));
  const reviewOrders = orders.filter((order) => order.productionStatus === 'MEASUREMENT_REVIEW');

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['Total orders', orders.length],
          ['Revenue', formatINR(revenue)],
          ['Custom measurement orders', customOrders.length],
          ['Awaiting review', reviewOrders.length],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md border border-stone-200 bg-white p-5">
            <p className="text-sm text-stone-600">{label}</p>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
      <section className="mt-8 rounded-md border border-stone-200 bg-white p-5">
        <h2 className="font-serif text-3xl">Recent orders</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-stone-200 text-stone-500">
              <tr>
                <th className="py-3">Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Production</th>
                <th>Fulfillment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-stone-100">
                  <td className="py-3 font-medium">{order.id}</td>
                  <td>{order.customer.fullName}</td>
                  <td>{formatINR(order.total)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.productionStatus}</td>
                  <td>{order.fulfillmentStatus}</td>
                  <td><Link className="underline" href={`/admin/orders/${order.id}`}>View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!orders.length ? <p className="py-8 text-center text-stone-600">No local prototype orders yet.</p> : null}
        </div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 font-serif text-3xl">Production board</h2>
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {columns.map((status) => (
            <div key={status} className="rounded-md border border-stone-200 bg-white p-4">
              <h3 className="text-sm font-semibold">{status.replaceAll('_', ' ')}</h3>
              <div className="mt-3 grid gap-2">
                {orders.filter((order) => order.productionStatus === status).map((order) => (
                  <Link key={order.id} href={`/admin/orders/${order.id}`} className="rounded-md bg-stone-50 p-3 text-sm">
                    {order.id}
                    <span className="block text-stone-600">{order.customer.fullName}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
