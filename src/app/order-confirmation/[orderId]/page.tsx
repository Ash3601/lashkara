import { OrderConfirmationClient } from '@/components/order/order-confirmation-client';
import { SiteShell } from '@/components/layout/site-shell';

export default function OrderConfirmationPage() {
  return (
    <SiteShell>
      <main className="section">
        <div className="section-inner">
          <OrderConfirmationClient />
        </div>
      </main>
    </SiteShell>
  );
}
