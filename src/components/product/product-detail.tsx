'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check, Minus, Plus, Ruler } from 'lucide-react';
import type { CustomMeasurements } from '@/domain/measurement';
import type { Product, SizingMode, StandardSize } from '@/domain/product';
import { Button } from '@/components/common/button';
import { MeasurementForm } from '@/components/measurement/measurement-form';
import { dispatchCopy, deliveryCopy } from '@/lib/dates';
import { formatINR } from '@/lib/money';
import { useCartStore } from '@/stores/cart-store';

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [mode, setMode] = useState<SizingMode>(product.sizingModes[0]);
  const [size, setSize] = useState<StandardSize | undefined>(product.standardSizes?.[0]);
  const [measurements, setMeasurements] = useState<CustomMeasurements | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const isCustom = mode === 'CUSTOM_MEASUREMENTS';
  const customCharge = isCustom ? product.customStitchingCharge ?? 0 : 0;
  const unavailable = product.inventoryStatus === 'OUT_OF_STOCK';

  function addToCart() {
    if (mode === 'STANDARD_SIZE' && !size) {
      setMessage('Choose a standard size first.');
      return;
    }
    if (isCustom && !measurements) {
      setMessage('Add valid custom measurements before adding to cart.');
      return;
    }
    addItem({
      product,
      sizingMode: mode,
      selectedStandardSize: mode === 'STANDARD_SIZE' ? size : undefined,
      customMeasurements: measurements,
      quantity,
    });
    router.push('/cart');
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 sm:grid-cols-[88px_1fr]">
          <div className="hidden gap-3 sm:grid">
            {product.images.map((image) => (
              <div key={image.src} className="relative aspect-square overflow-hidden rounded-md bg-stone-100">
                <Image src={image.src} alt={image.alt} fill sizes="88px" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-stone-100">
            <Image src={product.images[0]?.src ?? ''} alt={product.images[0]?.alt ?? product.title} fill priority sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
          </div>
        </div>

        <section className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{product.category}</p>
          <h1 className="mt-2 font-serif text-3xl text-stone-950 sm:text-5xl">{product.title}</h1>
          <p className="mt-3 text-stone-600">{product.description}</p>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{formatINR(product.price + customCharge)}</span>
            {product.compareAtPrice ? <span className="text-stone-500 line-through">{formatINR(product.compareAtPrice)}</span> : null}
            {customCharge ? <span className="text-sm text-stone-600">includes {formatINR(customCharge)} tailoring</span> : null}
          </div>

          <div className="mt-6 grid gap-2 text-sm text-stone-700">
            <p><strong>Colour:</strong> {product.colors.join(', ')}</p>
            <p><strong>Fabric:</strong> {product.fabric}</p>
            {product.work ? <p><strong>Work:</strong> {product.work}</p> : null}
            <p><strong>Dispatch:</strong> {dispatchCopy(product.fulfillmentType, product.productionLeadDays)}</p>
            <p><strong>Delivery:</strong> {deliveryCopy(product.productionLeadDays)}</p>
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold">Sizing mode</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {product.sizingModes.map((sizingMode) => (
                <button
                  key={sizingMode}
                  type="button"
                  onClick={() => {
                    setMode(sizingMode);
                    setMessage('');
                  }}
                  className={`rounded-md border px-3 py-3 text-sm font-medium ${mode === sizingMode ? 'border-stone-950 bg-stone-950 text-white' : 'border-stone-300 bg-white'}`}
                >
                  {sizingMode.replaceAll('_', ' ')}
                </button>
              ))}
            </div>
          </fieldset>

          {mode === 'STANDARD_SIZE' ? (
            <fieldset className="mt-5">
              <legend className="text-sm font-semibold">Standard size</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.standardSizes?.map((standardSize) => (
                  <button
                    key={standardSize}
                    type="button"
                    onClick={() => setSize(standardSize)}
                    className={`grid h-11 w-12 place-items-center rounded-md border text-sm ${size === standardSize ? 'border-stone-950 bg-stone-950 text-white' : 'border-stone-300 bg-white'}`}
                  >
                    {standardSize}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          {isCustom ? (
            <div className="mt-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Ruler size={18} /> Custom measurements in inches
              </div>
              <MeasurementForm onSubmit={(values) => {
                setMeasurements(values as CustomMeasurements);
                setMessage('Measurements saved for this cart item.');
              }} />
            </div>
          ) : null}

          <div className="mt-6 flex items-center gap-3">
            <button className="icon-button" type="button" aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus size={16} />
            </button>
            <span className="grid h-11 w-12 place-items-center rounded-md border border-stone-300">{quantity}</span>
            <button className="icon-button" type="button" aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}>
              <Plus size={16} />
            </button>
            <Button className="flex-1" disabled={unavailable} onClick={addToCart}>
              {unavailable ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
          {message ? <p className="mt-3 flex items-center gap-2 text-sm text-rose-800"><Check size={16} /> {message}</p> : null}

          <div className="mt-8 divide-y divide-stone-200 border-y border-stone-200 text-sm">
            <details className="py-4" open>
              <summary className="cursor-pointer font-semibold">Product details</summary>
              <p className="mt-3 text-stone-600">{product.description}</p>
            </details>
            <details className="py-4">
              <summary className="cursor-pointer font-semibold">Care instructions</summary>
              <p className="mt-3 text-stone-600">{product.careInstructions ?? 'Dry clean recommended for all embellished garments.'}</p>
            </details>
            <details className="py-4">
              <summary className="cursor-pointer font-semibold">Shipping and returns</summary>
              <p className="mt-3 text-stone-600">Prototype shipping is free. Custom stitched pieces are shown for demo review only.</p>
            </details>
          </div>
        </section>
      </div>
    </main>
  );
}
