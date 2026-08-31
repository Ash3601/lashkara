'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingBag, UserCog, X } from 'lucide-react';
import { useState } from 'react';
import { collections } from '@/data/collections';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/common/button';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const count = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const nav = (
    <>
      <Link href="/collections">All Collections</Link>
      {collections.map((collection) => (
        <Link key={collection.slug} href={`/collections/${collection.slug}`}>
          {collection.title}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#fffdf8]/95 backdrop-blur">
      <div className="bg-stone-950 px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.14em] text-white">
        Prototype preview - free shipping and simulated checkout
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="px-3 lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </Button>
        <Link href="/" className="font-serif text-2xl tracking-[0.18em] text-stone-950">
          AURELIA
        </Link>
        <nav className="hidden items-center gap-7 text-sm uppercase tracking-[0.12em] text-stone-700 lg:flex">
          {nav}
        </nav>
        <div className="flex items-center gap-1">
          <Button variant="ghost" className="px-3" aria-label="Search">
            <Search size={19} />
          </Button>
          <Link
            href="/admin"
            className="inline-flex min-h-11 items-center rounded-md px-3 text-stone-700 hover:bg-stone-100"
            aria-label="Admin demo"
          >
            <UserCog size={19} />
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex min-h-11 items-center rounded-md px-3 text-stone-900 hover:bg-stone-100"
            aria-label={`Cart with ${count} items`}
          >
            <ShoppingBag size={20} />
            {count > 0 ? (
              <span className="absolute -right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-700 px-1 text-xs text-white">
                {count}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 bg-stone-950/35 lg:hidden">
          <div className="min-h-full w-[min(86vw,360px)] bg-[#fffdf8] p-5 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-serif text-xl tracking-[0.18em]">AURELIA</span>
              <Button
                variant="ghost"
                className="px-3"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={20} />
              </Button>
            </div>
            <nav className="grid gap-5 text-sm uppercase tracking-[0.14em] text-stone-800">
              {nav}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
