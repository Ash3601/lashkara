import Image from 'next/image';
import { ArrowRight, Gem, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { collections } from '@/data/collections';
import { products } from '@/data/products';
import { ButtonLink } from '@/components/common/button';
import { SiteShell } from '@/components/layout/site-shell';
import { ProductGrid } from '@/components/product/product-grid';

export default function Home() {
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const arrivals = products.filter((product) => product.newArrival).slice(0, 4);
  const ready = products
    .filter((product) => product.fulfillmentType === 'READY_TO_SHIP')
    .slice(0, 4);

  return (
    <SiteShell>
      <main>
        <section className="relative min-h-[calc(100vh-128px)] overflow-hidden bg-stone-950 text-white">
          <Image
            src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1800&q=85"
            alt="Editorial Indian occasion wear"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-stone-950/15 to-transparent" />
          <div className="relative mx-auto flex min-h-[calc(100vh-128px)] max-w-7xl items-end px-4 pb-12 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em]">
                Aurelia Atelier
              </p>
              <h1 className="mt-4 font-serif text-5xl leading-[0.98] sm:text-7xl">
                Occasion wear tailored around the person.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-stone-100">
                A premium prototype for browsing collections, capturing custom
                measurements, and reviewing tailoring-ready orders.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/collections">Shop collections <ArrowRight size={18} /></ButtonLink>
                <ButtonLink href="/admin" variant="secondary">Admin demo</ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-inner">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-800">Shop by collection</p>
                <h2 className="mt-2 font-serif text-4xl">Curated for every ceremony</h2>
              </div>
              <ButtonLink href="/collections" variant="ghost">View all</ButtonLink>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {collections.map((collection) => (
                <a key={collection.slug} href={`/collections/${collection.slug}`} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-stone-100">
                    <Image src={collection.image} alt={collection.title} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-serif text-3xl text-white">{collection.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="section-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-800">New arrivals</p>
            <h2 className="mb-8 mt-2 font-serif text-4xl">Fresh from the atelier</h2>
            <ProductGrid products={arrivals} />
          </div>
        </section>

        <section className="section">
          <div className="section-inner">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-800">Featured products</p>
                <h2 className="mt-2 font-serif text-4xl">Signature silhouettes</h2>
                <p className="mt-4 text-stone-600">
                  Products show sale, ready-to-ship, and custom sizing badges so
                  the merchandising behavior can be reviewed early.
                </p>
              </div>
              <ProductGrid products={featured} />
            </div>
          </div>
        </section>

        <section className="section bg-[#f3eee7]">
          <div className="section-inner">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-serif text-4xl">Ready to Ship</h2>
              <ButtonLink href="/collections/ready-to-ship" variant="secondary">Shop quick dispatch</ButtonLink>
            </div>
            <ProductGrid products={ready} />
          </div>
        </section>

        <section className="section bg-stone-950 text-white">
          <div className="section-inner grid gap-8 md:grid-cols-3">
            {[
              [Gem, 'Original luxury direction', 'Inspired by the category, not copied from the reference brand.'],
              [RulerIcon, 'Custom measurement flow', 'Mandatory inches-based tailoring fields are validated before cart.'],
              [Truck, 'Mock delivery promise', 'Ready-to-ship and made-to-order ETAs stay deterministic.'],
            ].map(([Icon, title, copy]) => (
              <div key={String(title)} className="border-t border-white/20 pt-5">
                <Icon className="mb-4" size={24} />
                <h3 className="font-serif text-2xl">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-300">{String(copy)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-px bg-stone-200 text-center sm:grid-cols-4">
          {[
            [Sparkles, 'Premium finish'],
            [ShieldCheck, 'Prototype safe'],
            [Truck, 'Free shipping'],
            [Gem, 'Tailoring review'],
          ].map(([Icon, label]) => (
            <div key={String(label)} className="bg-[#fffdf8] px-3 py-6 text-sm font-medium">
              <Icon className="mx-auto mb-2" size={21} />
              {String(label)}
            </div>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}

function RulerIcon(props: React.ComponentProps<typeof Gem>) {
  return <Gem {...props} />;
}
