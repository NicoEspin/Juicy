"use client";

import Link from "next/link";
import type { Branch } from "@/types/ordering";

interface BranchSheetProps {
  branches: Branch[];
  currentBranchId: string;
  onClose: () => void;
  onSelectBranch: (branch: Branch) => void;
}

function groupByCity(branches: Branch[]) {
  const order: string[] = [];
  const groups = new Map<string, Branch[]>();

  branches.forEach((branch) => {
    if (!groups.has(branch.city)) {
      groups.set(branch.city, []);
      order.push(branch.city);
    }
    groups.get(branch.city)?.push(branch);
  });

  return order.map((city) => ({ city, branches: groups.get(city) ?? [] }));
}

export function BranchSheet({ branches, currentBranchId, onClose, onSelectBranch }: BranchSheetProps) {
  const cityGroups = groupByCity(branches);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-juicy-black/50"
      onClick={onClose}
    >
      <div
        className="ordering-sheet max-h-[82vh] w-full max-w-lg overflow-y-auto rounded-t-[24px] bg-juicy-cream px-5 pb-7 pt-2.5 sm:rounded-b-[24px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-4.5 mt-1.5 h-1 w-10 rounded-full bg-juicy-cream-dark" />
        <p className="mb-1 font-headline text-xl text-juicy-red">Elegí tu sucursal</p>
        <p className="mb-4.5 text-[13px] text-juicy-gray">
          Vamos a mostrarte el menú y precios de esa sucursal.
        </p>

        {cityGroups.map((group) => (
          <div key={group.city} className="mb-5">
            <p className="mb-2.5 font-headline text-sm tracking-[0.01em] text-juicy-black">{group.city}</p>
            {group.branches.map((branch) => {
              const isCurrent = branch.id === currentBranchId;
              return (
                <div
                  key={branch.id}
                  className="mb-2.5 flex items-center justify-between gap-3 rounded-2xl border border-juicy-red/15 bg-white px-4 py-3.5"
                >
                  <div>
                    <p className="text-[15px] font-bold text-juicy-black">{branch.name}</p>
                    <p className="text-xs text-juicy-gray">{branch.city}</p>
                  </div>
                  <button
                    className="min-h-11 shrink-0 rounded-full bg-juicy-red px-4 text-[13px] font-bold text-white disabled:opacity-50"
                    disabled={isCurrent}
                    onClick={() => onSelectBranch(branch)}
                    type="button"
                  >
                    {isCurrent ? "Sucursal actual" : "Elegir sucursal"}
                  </button>
                </div>
              );
            })}
          </div>
        ))}

        <Link
          className="mt-1 block text-center text-[13px] font-bold text-juicy-red underline-offset-2 hover:underline"
          href="/sucursales"
        >
          Ver todas las sucursales
        </Link>
      </div>
    </div>
  );
}
