'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { ButtonLink } from '@/components/common/button';
import { formatINR, lineTotal } from '@/lib/money';
import { useCartStore, cartTotals } from '@/stores/cart-store';

export function CartClient() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const totals = cartTotals(items);

  if (!items.length) {
    return (
      <div className="rounded-md border border-stone-200 bg-white p-8 text-center">
        <h1 className="font-serif text-4xl">Your cart is empty</h1>
        <p className="mt-3 text-stone-600">Add a ready-to-ship or custom-sized item to begin.</p>
        <ButtonLink className="mt-6" href="/collections">Continue Shopping</ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-4">
        {items.map((item) => (
          <article key={item.id} className="grid gap-4 rounded-md border border-stone-200 bg-white p-4 sm:grid-cols-[120px_1fr]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-stone-100">
              <Image src={item.thumbnail} alt={item.title} fill sizes="120px" className="object-cover" />
            </div>
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/products/${item.productSlug}`} className="font-medium">{item.title}</Link>
                  <p className="mt-1 text-sm text-stone-600">{item.sizingMode.replaceAll('_', ' ')}</p>
                  {item.selectedStandardSize ? <p className="text-sm text-stone-600">Size {item.selectedStandardSize}</p> : null}
                  {item.stitchingCharge ? <p className="text-sm text-stone-600">Tailoring {formatINR(item.stitchingCharge)}</p> : null}
                </div>
                <button type="button" aria-label="Remove item" onClick={() => removeItem(item.id)} className="icon-button">
                  <Trash2 size={16} />
                </button>
              </div>
              {item.customMeasurements ? (
                <details className="mt-3 rounded-md bg-stone-50 p-3 text-sm">
                  <summary className="cursor-pointer font-medium">View measurements</summary>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-stone-600">
                    {Object.entries(item.customMeasurements).map(([key, value]) => (
                      <span key={key}>{key}: {String(value)}</span>
                    ))}
                  </div>
                </details>
              ) : null}
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button className="icon-button" type="button" aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={16} /></button>
                  <span className="grid h-11 w-12 place-items-center rounded-md border border-stone-300">{item.quantity}</span>
                  <button className="icon-button" type="button" aria-label="Increase quantity" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={16} /></button>
                </div>
                <strong>{formatINR(lineTotal(item.unitProductPrice, item.stitchingCharge, item.quantity))}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
      <aside className="h-fit rounded-md border border-stone-200 bg-white p-5">
        <h2 className="font-serif text-3xl">Order summary</h2>
        <div className="mt-5 grid gap-3 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(totals.subtotal)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>FREE</span></div>
          <div className="flex justify-between border-t border-stone-200 pt-3 text-base font-semibold"><span>Total</span><span>{formatINR(totals.total)}</span></div>
        </div>
        <ButtonLink className="mt-6 w-full" href="/checkout">Proceed to Checkout</ButtonLink>
      </aside>
    </div>
  );
}
