interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div
      className="ordering-toast fixed right-4 top-[calc(env(safe-area-inset-top)+1rem)] z-[65] flex max-w-[280px] items-center gap-3 rounded-2xl border border-juicy-red/15 bg-white py-2.5 pl-2.5 pr-4 shadow-[0_14px_32px_rgba(26,16,8,0.18)] sm:max-w-xs"
      role="status"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-juicy-red/10 text-juicy-red">
        <svg fill="none" height="16" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="16">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
      <p className="text-[13px] font-semibold leading-snug text-juicy-black">{message}</p>
    </div>
  );
}
