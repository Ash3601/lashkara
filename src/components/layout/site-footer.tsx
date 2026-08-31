export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-stone-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-serif text-2xl tracking-[0.18em]">AURELIA</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-stone-300">
            A client-demo atelier storefront for occasion wear, custom sizing, and
            tailoring operations.
          </p>
        </div>
        {['Shop', 'Support', 'Atelier'].map((title) => (
          <div key={title}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
              {title}
            </h2>
            <div className="mt-4 grid gap-3 text-sm text-stone-300">
              <span>Collections</span>
              <span>Shipping</span>
              <span>Care guide</span>
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
