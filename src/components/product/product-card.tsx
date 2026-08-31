import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/domain/product';
import { formatINR } from '@/lib/money';

export function ProductCard({ product }: { product: Product }) {
  const sale = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-stone-100">
        <Image
          src={product.images[0]?.src ?? ''}
          alt={product.images[0]?.alt ?? product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {sale ? <span className="badge bg-rose-800 text-white">Sale</span> : null}
          {product.fulfillmentType === 'READY_TO_SHIP' ? (
            <span className="badge bg-white text-stone-900">Ready</span>
          ) : null}
          {product.sizingModes.includes('CUSTOM_MEASUREMENTS') ? (
            <span className="badge bg-stone-950 text-white">Custom</span>
          ) : null}
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-stone-950">{product.title}</h3>
        <div className="mt-1 flex items-center gap-2 text-sm">
          <span>{formatINR(product.price)}</span>
          {sale ? (
            <span className="text-stone-500 line-through">
              {formatINR(product.compareAtPrice ?? 0)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
