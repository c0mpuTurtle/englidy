import { type ButtonHTMLAttributes } from 'react';

interface SelectableCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

const base = 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700';
const selectedCls =
  'border-purple-600 dark:border-purple-400 bg-purple-100 dark:bg-purple-950/60 ring-1 ring-purple-400 dark:ring-purple-600';
const hover = 'hover:border-purple-300 dark:hover:border-purple-700';

export function SelectableCard({
  selected,
  children,
  className = '',
  ...props
}: SelectableCardProps) {
  return (
    <button
      {...props}
      className={[
        'flex items-start gap-4 rounded-2xl p-4 text-left transition-all',
        selected ? selectedCls : `${base} ${hover}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
}
