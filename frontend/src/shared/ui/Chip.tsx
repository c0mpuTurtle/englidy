import { type ButtonHTMLAttributes } from 'react';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
  emoji?: string;
}

const base = 'border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200';
const selectedCls =
  'border-purple-600 dark:border-purple-400 bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 ring-1 ring-purple-400 dark:ring-purple-600 font-semibold';
const hover = 'hover:border-purple-300 dark:hover:border-purple-700';

export function Chip({ selected, emoji, children, className = '', ...props }: ChipProps) {
  return (
    <button
      {...props}
      className={[
        'flex items-center gap-2 rounded-xl px-3 py-3 text-left text-sm font-medium transition-all',
        selected ? selectedCls : `${base} ${hover}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {emoji && <span className="shrink-0 text-xl">{emoji}</span>}
      <span className="leading-tight">{children}</span>
    </button>
  );
}
