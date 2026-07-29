interface SearchBarProps {
  onSearchChange: (value: string) => void;
  searchQuery: string;
}

export function SearchBar({ onSearchChange, searchQuery }: SearchBarProps) {
  return (
    <div className="px-4 pb-3 pt-5 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-center gap-2.5">
        <div className="flex flex-1 items-center justify-end gap-1">
          <span className="text-xs text-juicy-red">★</span>
          <div className="h-0.5 max-w-9 flex-1 bg-juicy-red" />
        </div>
        <h1 className="whitespace-nowrap text-center font-headline text-[clamp(1.5rem,5vw,1.65rem)] uppercase leading-none tracking-[0.01em] text-juicy-red">
          ¿Qué vas a pedir hoy?
        </h1>
        <div className="flex flex-1 items-center gap-1">
          <div className="h-0.5 max-w-9 flex-1 bg-juicy-red" />
          <span className="text-xs text-juicy-red">★</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-xl">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-juicy-gray"
          fill="none"
          height="18"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="18"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          aria-label="Buscar productos"
          className="h-12 w-full rounded-full border-[1.5px] border-juicy-red bg-white py-0 pl-11 pr-4 text-[0.95rem] text-juicy-black outline-none placeholder:text-juicy-gray"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar hamburguesas, combos o extras"
          type="text"
          value={searchQuery}
        />
      </div>
    </div>
  );
}
