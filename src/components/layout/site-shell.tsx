import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
