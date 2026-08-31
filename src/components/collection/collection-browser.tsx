'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Product } from '@/domain/product';
import { Button } from '@/components/common/button';
import { ProductGrid } from '@/components/product/product-grid';

type SortMode = 'featured' | 'newest' | 'price-asc' | 'price-desc';

export function CollectionBrowser({ products }: { products: Product[] }) {
  const [showFilters, setShowFilters] = useState(false);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [fulfillment, setFulfillment] = useState('');
  const [customOnly, setCustomOnly] = useState(false);
  const [sort, setSort] = useState<SortMode>('featured');

  const colors = Array.from(new Set(products.flatMap((product) => product.colors)));
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const visible = useMemo(() => {
    const filtered = products.filter((product) => {
      if (size && !product.standardSizes?.includes(size as never)) return false;
      if (color && !product.colors.includes(color)) return false;
      if (fulfillment && product.fulfillmentType !== fulfillment) return false;
      if (customOnly && !product.sizingModes.includes('CUSTOM_MEASUREMENTS')) return false;
      return true;
    });
    return [...filtered].sort((a, b) => {
      if (sort === 'newest') return Number(Boolean(b.newArrival)) - Number(Boolean(a.newArrival));
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [color, customOnly, fulfillment, products, size, sort]);

  const filters = (
    <div className="grid gap-4">
      <label className="grid gap-1 text-sm">
        <span className="font-medium">Size</span>
        <select className="input" value={size} onChange={(event) => setSize(event.target.value)}>
          <option value="">Any size</option>
          {sizes.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        <span className="font-medium">Color</span>
        <select className="input" value={color} onChange={(event) => setColor(event.target.value)}>
          <option value="">Any color</option>
          {colors.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        <span className="font-medium">Fulfillment</span>
        <select className="input" value={fulfillment} onChange={(event) => setFulfillment(event.target.value)}>
          <option value="">Any</option>
          <option value="READY_TO_SHIP">Ready to Ship</option>
          <option value="MADE_TO_ORDER">Made to Order</option>
        </select>
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={customOnly} onChange={(event) => setCustomOnly(event.target.checked)} />
        Custom measurements available
      </label>
      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          setSize('');
          setColor('');
          setFulfillment('');
          setCustomOnly(false);
        }}
      >
        Clear filters
      </Button>
    </div>
  );

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:block">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em]">Filters</h2>
        {filters}
      </aside>
      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-stone-600">{visible.length} products</p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" className="px-3 lg:hidden" type="button" onClick={() => setShowFilters(true)}>
              <SlidersHorizontal size={18} /> Filters
            </Button>
            <label className="flex items-center gap-2 text-sm">
              Sort
              <select className="input min-h-10 w-44" value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>
        {visible.length ? <ProductGrid products={visible} /> : <p className="rounded-md border border-stone-200 p-6">No products match these filters.</p>}
      </section>
      {showFilters ? (
        <div className="fixed inset-0 z-50 bg-stone-950/35 lg:hidden">
          <div className="min-h-full w-[min(88vw,360px)] bg-[#fffdf8] p-5">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl">Filters</h2>
              <Button variant="ghost" className="px-3" aria-label="Close filters" onClick={() => setShowFilters(false)}>
                <X size={20} />
              </Button>
            </div>
            {filters}
          </div>
        </div>
      ) : null}
    </div>
  );
}
