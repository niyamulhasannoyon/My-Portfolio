export function Marquee({
  items,
  className = "",
}: {
  items: { label: string; icon?: React.ReactNode }[];
  className?: string;
}) {
  return (
    <div
      className={`relative flex overflow-x-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-brand-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-brand-bg to-transparent" />

      <div className="flex animate-marquee items-center gap-16 whitespace-nowrap py-4">
        {/* First pass */}
        {items.map((item, i) => (
          <span
            key={`a-${i}`}
            className="inline-flex items-center gap-3 text-sm font-medium tracking-wide text-zinc-500 transition-colors duration-300 hover:text-zinc-300"
          >
            {item.icon && <span className="h-4 w-4">{item.icon}</span>}
            {item.label}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, i) => (
          <span
            key={`b-${i}`}
            className="inline-flex items-center gap-3 text-sm font-medium tracking-wide text-zinc-500 transition-colors duration-300 hover:text-zinc-300"
          >
            {item.icon && <span className="h-4 w-4">{item.icon}</span>}
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
