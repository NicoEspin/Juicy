import Image from "next/image";
import { forwardRef } from "react";
import { landingAssets } from "@/data/landingContent";

interface OrderingHeaderProps {
  branchLabel: string;
  onOpenBranchSheet: () => void;
  onProfileClick: () => void;
}

export const OrderingHeader = forwardRef<HTMLDivElement, OrderingHeaderProps>(function OrderingHeader(
  { branchLabel, onOpenBranchSheet, onProfileClick },
  ref,
) {
  return (
    <div ref={ref} className="sticky top-0 z-30 bg-juicy-cream">
      <div className="flex items-center justify-between gap-2.5 px-4 py-3.5 sm:px-6 lg:px-8">
        <Image
          alt="Juicy Hamburgers"
          className="h-11 w-auto shrink-0"
          priority
          sizes="90px"
          src={landingAssets.logo}
        />

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
});
