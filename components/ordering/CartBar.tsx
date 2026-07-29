interface CartBarProps {
  onOpenOrder: () => void;
  quantity: number;
  totalLabel: string;
}

export function CartBar({ onOpenOrder, quantity, totalLabel }: CartBarProps) {
  if (quantity <= 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-[76px] z-[25] flex justify-center px-4">
      <button
        className="flex h-[52px] w-full max-w-md items-center gap-2.5 rounded-full bg-juicy-red-dark px-[18px] text-white shadow-[0_6px_18px_rgba(59,20,10,0.35)] transition-transform hover:-translate-y-0.5"
        onClick={onOpenOrder}
        type="button"
      >
        <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20">
          <path d="M6 8h12l-1 12H7L6 8z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
        <div className="h-5 w-px bg-white/40" />
        <p className="flex-1 text-left text-[0.8rem] font-bold tracking-[0.02em]">
          VER PEDIDO · {quantity} {quantity === 1 ? "PRODUCTO" : "PRODUCTOS"} · {totalLabel}
        </p>
        <svg fill="none" height="16" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="16">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
