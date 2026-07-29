interface WhatsappReturnDialogProps {
  onConfirmSent: () => void;
  onKeepEditing: () => void;
  onReopen: () => void;
}

export function WhatsappReturnDialog({ onConfirmSent, onKeepEditing, onReopen }: WhatsappReturnDialogProps) {
  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 z-[98] flex items-center justify-center bg-juicy-black/55 p-6"
      role="alertdialog"
    >
      <div className="w-full max-w-[340px] rounded-[18px] bg-juicy-cream p-6 shadow-[0_12px_32px_rgba(59,20,10,0.3)]">
        <p className="mb-3 font-headline text-[17px] text-juicy-red">¿Pudiste enviar el pedido por WhatsApp?</p>
        <div className="flex flex-col gap-2.5">
          <button
            className="h-12 rounded-full border-none bg-juicy-red font-bold text-white"
            onClick={onConfirmSent}
            type="button"
          >
            Sí, ya lo envié
          </button>
          <button
            className="h-12 rounded-full border-[1.5px] border-juicy-red bg-transparent font-bold text-juicy-red"
            onClick={onReopen}
            type="button"
          >
            Volver a WhatsApp
          </button>
          <button
            className="h-11 rounded-full border-none bg-transparent font-bold text-juicy-gray"
            onClick={onKeepEditing}
            type="button"
          >
            Seguir editando
          </button>
        </div>
      </div>
    </div>
  );
}
