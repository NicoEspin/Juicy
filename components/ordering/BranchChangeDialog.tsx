interface BranchChangeDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function BranchChangeDialog({ onCancel, onConfirm }: BranchChangeDialogProps) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-juicy-black/55 p-6">
      <div className="w-full max-w-[340px] rounded-[18px] bg-juicy-cream p-6 shadow-[0_12px_32px_rgba(59,20,10,0.3)]">
        <p className="mb-2 font-headline text-[17px] text-juicy-red">¿Cambiar de sucursal?</p>
        <p className="mb-5 text-sm leading-6 text-juicy-black">
          Tu pedido pertenece a otra sucursal. Si cambiás de sucursal, se vaciará el pedido.
        </p>
        <div className="flex gap-2.5">
          <button
            className="h-11 flex-1 rounded-full border-[1.5px] border-juicy-red bg-transparent font-bold text-juicy-red"
            onClick={onCancel}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="h-11 flex-1 rounded-full border-none bg-juicy-red font-bold text-white"
            onClick={onConfirm}
            type="button"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
