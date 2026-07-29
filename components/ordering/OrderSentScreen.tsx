import { JuicyDog } from "@/components/ui/JuicyDog";
import { landingAssets } from "@/data/landingContent";

interface OrderSentScreenProps {
  onClose: () => void;
  orderReference: string;
}

export function OrderSentScreen({ onClose, orderReference }: OrderSentScreenProps) {
  return (
    <div className="ordering-fade fixed inset-0 z-[99] flex flex-col items-center justify-center gap-3.5 bg-juicy-cream p-8 text-center">
      <JuicyDog alt="Juicy Dog celebrando el pedido enviado" className="w-24 sm:w-28" src={landingAssets.pet} />
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-juicy-red">
        <svg fill="none" height="30" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="30" className="text-white">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <p className="font-headline text-2xl text-juicy-red">¡LISTO!</p>
      <p className="max-w-[300px] text-[15px] leading-6 text-juicy-black">
        Tu pedido fue enviado por WhatsApp. Esperá la respuesta de la sucursal para confirmar disponibilidad,
        demora y total.
      </p>
      <p className="text-xs text-juicy-gray">Referencia: {orderReference}</p>
      <p className="max-w-[280px] text-[11px] text-juicy-gray">
        Este historial se guarda únicamente en este dispositivo.
      </p>
      <button
        className="mt-2 min-h-11 rounded-full bg-juicy-red px-7 font-bold text-white"
        onClick={onClose}
        type="button"
      >
        Volver al inicio
      </button>
    </div>
  );
}
