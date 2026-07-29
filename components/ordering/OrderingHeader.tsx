interface OrderingHeaderProps {
  branchLabel: string;
  onOpenBranchSheet: () => void;
  onProfileClick: () => void;
}

export function OrderingHeader({ branchLabel, onOpenBranchSheet, onProfileClick }: OrderingHeaderProps) {
  return (
    <div className="sticky top-0 z-30 bg-juicy-cream">
      <div className="flex items-center justify-between gap-2.5 px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="shrink-0 -rotate-3 rounded-lg bg-juicy-red px-2.5 py-1.5 text-white shadow-[0_3px_0_rgba(26,16,8,0.25)]">
          <p className="text-center font-body text-[9px] tracking-[0.12em] opacity-85">BURGERS</p>
          <p className="text-center font-headline text-lg leading-none tracking-[0.01em]">Juicy</p>
          <p className="mt-0.5 text-center text-[7px] tracking-[0.02em] opacity-80">Taste the difference</p>
        </div>

        <button
          aria-label="Elegir sucursal"
          className="flex min-h-11 max-w-[230px] flex-1 items-center justify-center gap-1.5 rounded-full border-[1.5px] border-juicy-red bg-juicy-cream px-3.5 py-2.5 font-bold text-juicy-red"
          onClick={onOpenBranchSheet}
          type="button"
        >
          <svg fill="none" height="15" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="15">
            <path d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">{branchLabel}</span>
          <svg fill="none" height="12" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="12">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <button
          aria-label="Perfil"
          className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-juicy-red bg-juicy-cream"
          onClick={onProfileClick}
          type="button"
        >
          <svg fill="none" height="18" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18" className="text-juicy-red">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
          </svg>
        </button>
      </div>

      <div className="checker-strip" />
    </div>
  );
}
