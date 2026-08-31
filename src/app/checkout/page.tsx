import { CheckoutClient } from '@/components/checkout/checkout-client';
import { SiteShell } from '@/components/layout/site-shell';

export default function CheckoutPage() {
  return (
    <SiteShell>
      <main className="section">
        <div className="section-inner">
          <h1 className="mb-8 font-serif text-5xl">Checkout</h1>
          <CheckoutClient />
        </div>
      </main>
    </SiteShell>
  );
}
