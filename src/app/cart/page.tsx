import { CartClient } from '@/components/cart/cart-client';
import { SiteShell } from '@/components/layout/site-shell';

export default function CartPage() {
  return (
    <SiteShell>
      <main className="section">
        <div className="section-inner">
          <CartClient />
        </div>
      </main>
    </SiteShell>
  );
}
