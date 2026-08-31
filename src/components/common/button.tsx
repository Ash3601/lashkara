import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const variants = {
  primary: 'bg-stone-950 text-white hover:bg-stone-800',
  secondary: 'border border-stone-300 bg-white text-stone-950 hover:bg-stone-100',
  ghost: 'text-stone-800 hover:bg-stone-100',
};

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
}) {
  return (
    <button
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  variant = 'primary',
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: keyof typeof variants;
  children: ReactNode;
}) {
  return (
    <Link
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
