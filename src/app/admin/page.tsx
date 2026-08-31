import { AdminDashboardClient } from '@/components/admin/admin-dashboard-client';
import { SiteShell } from '@/components/layout/site-shell';

export default function AdminPage() {
  return (
    <SiteShell>
      <main className="section bg-stone-50">
        <div className="section-inner">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-800">Prototype admin</p>
          <h1 className="mb-8 mt-2 font-serif text-5xl">Tailoring operations</h1>
          <AdminDashboardClient />
        </div>
      </main>
    </SiteShell>
  );
}
