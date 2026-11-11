import type { ReactNode } from 'react';

type Variant = 'purple' | 'indigo' | 'amber' | 'zinc' | 'blue' | 'violet';

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  purple: 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300',
  indigo: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300',
  amber: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300',
  zinc: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300',
  blue: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400',
  violet: 'bg-violet-200 dark:bg-violet-800/40 text-violet-800 dark:text-violet-200',
};

export function Badge({ children, variant = 'purple', className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}
