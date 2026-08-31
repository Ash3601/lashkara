'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Button, ButtonLink } from '@/components/common/button';
import { checkoutSchema } from '@/lib/validation';
import { formatINR } from '@/lib/money';
import { useCartStore, cartTotals } from '@/stores/cart-store';
import { useOrderStore } from '@/stores/order-store';

type CheckoutValues = z.infer<typeof checkoutSchema>;

export function CheckoutClient() {
  const router = useRouter();
  const { items, clear } = useCartStore();
  const createOrder = useOrderStore((state) => state.createOrder);
  const totals = cartTotals(items);
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: 'UPI' },
  });

  if (!items.length) {
    return (
      <div className="rounded-md border border-stone-200 bg-white p-8 text-center">
        <h1 className="font-serif text-4xl">Checkout needs a cart</h1>
        <ButtonLink className="mt-6" href="/collections">Browse products</ButtonLink>
      </div>
    );
  }

  function submit(values: CheckoutValues) {
    const order = createOrder({
      customer: {
        fullName: values.fullName,
        email: values.email,
        mobile: values.mobile,
      },
      shippingAddress: {
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        state: values.state,
        pinCode: values.pinCode,
        country: 'India',
      },
      paymentMethod: values.paymentMethod,
      items,
    });
    clear();
    router.push(`/order-confirmation/${order.id}`);
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-6">
        <section className="rounded-md border border-stone-200 bg-white p-5">
          <h2 className="font-serif text-3xl">Contact</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              ['fullName', 'Full name'],
              ['email', 'Email'],
              ['mobile', 'Mobile number'],
            ].map(([name, label]) => (
              <label key={name} className="grid gap-1 text-sm">
                <span>{label}</span>
                <input className="input" {...register(name as keyof CheckoutValues)} />
                {errors[name as keyof CheckoutValues] ? <span className="text-xs text-rose-700">{String(errors[name as keyof CheckoutValues]?.message)}</span> : null}
              </label>
            ))}
          </div>
        </section>
        <section className="rounded-md border border-stone-200 bg-white p-5">
          <h2 className="font-serif text-3xl">Shipping address</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              ['address1', 'Address line 1'],
              ['address2', 'Address line 2'],
              ['city', 'City'],
              ['state', 'State'],
              ['pinCode', 'PIN code'],
            ].map(([name, label]) => (
              <label key={name} className="grid gap-1 text-sm">
                <span>{label}</span>
                <input className="input" {...register(name as keyof CheckoutValues)} />
                {errors[name as keyof CheckoutValues] ? <span className="text-xs text-rose-700">{String(errors[name as keyof CheckoutValues]?.message)}</span> : null}
              </label>
            ))}
            <label className="grid gap-1 text-sm">
              <span>Country</span>
              <input className="input" value="India" readOnly />
            </label>
          </div>
        </section>
        <section className="rounded-md border border-stone-200 bg-white p-5">
          <h2 className="font-serif text-3xl">Delivery and payment</h2>
          <div className="mt-4 rounded-md border border-stone-300 p-4 text-sm">
            Standard Delivery - FREE
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {['UPI', 'CARD', 'COD'].map((method) => (
              <label key={method} className="rounded-md border border-stone-300 p-4 text-sm">
                <input className="mr-2" type="radio" value={method} {...register('paymentMethod')} />
                {method}
              </label>
            ))}
          </div>
        </section>
      </div>
      <aside className="h-fit rounded-md border border-stone-200 bg-white p-5">
        <h2 className="font-serif text-3xl">Summary</h2>
        <div className="mt-4 grid gap-3 text-sm">
          {items.map((item) => <div key={item.id} className="flex justify-between gap-3"><span>{item.title} x {item.quantity}</span><span>{formatINR((item.unitProductPrice + item.stitchingCharge) * item.quantity)}</span></div>)}
          <div className="flex justify-between border-t border-stone-200 pt-3 font-semibold"><span>Total</span><span>{formatINR(totals.total)}</span></div>
        </div>
        <Button className="mt-6 w-full" type="submit">Place Order</Button>
      </aside>
    </form>
  );
}
