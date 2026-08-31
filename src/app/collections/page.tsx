import Image from 'next/image';
import { collections } from '@/data/collections';
import { products } from '@/data/products';
import { SiteShell } from '@/components/layout/site-shell';
import { ProductGrid } from '@/components/product/product-grid';

export default function CollectionsPage() {
  return (
    <SiteShell>
      <main className="section">
        <div className="section-inner">
          <h1 className="font-serif text-5xl">Collections</h1>
          <p className="mt-3 max-w-2xl text-stone-600">
            Browse the complete seeded prototype catalog across ceremony-led categories.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((collection) => (
              <a key={collection.slug} href={`/collections/${collection.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <Image src={collection.image} alt={collection.title} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition group-hover:scale-105" />
                </div>
                <h2 className="mt-3 font-serif text-2xl">{collection.title}</h2>
                <p className="text-sm text-stone-600">{collection.description}</p>
              </a>
            ))}
          </div>
          <h2 className="mb-8 mt-14 font-serif text-4xl">All products</h2>
          <ProductGrid products={products} />
        </div>
      </main>
    </SiteShell>
  );
}
