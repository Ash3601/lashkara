import { AdminOrderDetailClient } from '@/components/admin/admin-order-detail-client';
import { SiteShell } from '@/components/layout/site-shell';

export default function AdminOrderPage() {
  return (
    <SiteShell>
      <main className="section bg-stone-50">
        <div className="section-inner">
          <AdminOrderDetailClient />
        </div>
      </main>
    </SiteShell>
  );
}
