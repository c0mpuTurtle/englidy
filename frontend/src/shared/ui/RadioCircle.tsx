interface RadioCircleProps {
  selected: boolean;
}

export function RadioCircle({ selected }: RadioCircleProps) {
  return (
    <div
      className={`ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
        selected
          ? 'border-purple-500 bg-purple-600 dark:bg-purple-500'
          : 'border-zinc-300 dark:border-zinc-600'
      }`}
    >
      {selected && <div className="h-2 w-2 rounded-full bg-white" />}
    </div>
  );
}
