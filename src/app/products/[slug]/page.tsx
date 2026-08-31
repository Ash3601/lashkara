import { notFound } from 'next/navigation';
import { catalogService } from '@/services/catalog-service';
import { SiteShell } from '@/components/layout/site-shell';
import { ProductDetail } from '@/components/product/product-detail';
import { ProductGrid } from '@/components/product/product-grid';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await catalogService.getProductBySlug(slug);
  if (!product) notFound();
  const products = await catalogService.getProducts();
  const related = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);

  return (
    <SiteShell>
      <ProductDetail product={product} />
      <section className="section bg-white">
        <div className="section-inner">
          <h2 className="mb-8 font-serif text-4xl">Related pieces</h2>
          <ProductGrid products={related.length ? related : products.slice(0, 4)} />
        </div>
      </section>
    </SiteShell>
  );
}
