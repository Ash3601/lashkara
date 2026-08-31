import { notFound } from 'next/navigation';
import Image from 'next/image';
import { catalogService } from '@/services/catalog-service';
import { SiteShell } from '@/components/layout/site-shell';
import { CollectionBrowser } from '@/components/collection/collection-browser';

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await catalogService.getCollectionBySlug(slug);
  if (!collection) notFound();
  const products = await catalogService.getProductsByCollection(slug);

  return (
    <SiteShell>
      <main>
        <section className="relative min-h-[360px] overflow-hidden bg-stone-950 text-white">
          <Image src={collection.image} alt={collection.title} fill priority sizes="100vw" className="object-cover opacity-65" />
          <div className="absolute inset-0 bg-stone-950/35" />
          <div className="relative mx-auto flex min-h-[360px] max-w-7xl flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Collection</p>
            <h1 className="mt-2 font-serif text-5xl">{collection.title}</h1>
            <p className="mt-3 max-w-2xl text-stone-100">{collection.description}</p>
          </div>
        </section>
        <section className="section">
          <div className="section-inner">
            <CollectionBrowser products={products} />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
