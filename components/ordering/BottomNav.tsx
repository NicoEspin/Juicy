interface NavItem {
  icon: "home" | "orders" | "favorites" | "profile";
  isActive: boolean;
  label: string;
  onClick: () => void;
}

interface BottomNavProps {
  items: NavItem[];
}

function NavIcon({ icon }: { icon: NavItem["icon"] }) {
  const props = { fill: "none", height: 20, stroke: "currentColor", strokeWidth: 2, viewBox: "0 0 24 24", width: 20 };

  if (icon === "home") {
    return (
      <svg {...props}>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </svg>
    );
  }
  if (icon === "orders") {
    return (
      <svg {...props}>
        <rect x="6" y="4" width="12" height="16" rx="2" />
        <path d="M9 9h6M9 13h6" />
      </svg>
    );
  }
  if (icon === "favorites") {
    return (
      <svg {...props}>
        <path d="M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9z" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}

export function BottomNav({ items }: BottomNavProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex justify-center border-t border-juicy-red/15 bg-juicy-cream pb-[env(safe-area-inset-bottom)]">
      <div className="flex w-full max-w-2xl">
        {items.map((item) => (
          <button
            key={item.label}
            aria-label={item.label}
            className={`flex min-h-11 flex-1 flex-col items-center gap-0.5 bg-transparent px-1 pb-2 pt-2.5 ${
              item.isActive ? "text-juicy-red" : "text-juicy-gray"
            }`}
            onClick={item.onClick}
            type="button"
          >
            <NavIcon icon={item.icon} />
            <span className="text-[11px] font-bold">{item.label}</span>
            {item.isActive && <div className="mt-0.5 h-0.5 w-4 rounded-full bg-juicy-red-light" />}
          </button>
        ))}
      </div>
    </div>
  );
}
