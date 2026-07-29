import type { Category, ProductCategoryId } from "@/types/ordering";

interface CategoryTabsProps {
  activeCategory: ProductCategoryId;
  categories: Category[];
  categoriesWithPromo: Set<ProductCategoryId>;
  onSelect: (categoryId: ProductCategoryId) => void;
  /** Live-measured header height (px) so this bar docks right below it, never under it. */
  stickyTop: number;
}

export function CategoryTabs({
  activeCategory,
  categories,
  categoriesWithPromo,
  onSelect,
  stickyTop,
}: CategoryTabsProps) {
  return (
    <div className="sticky z-20 bg-juicy-cream pb-3.5" style={{ top: stickyTop }}>
      <div className="ordering-no-scrollbar flex gap-2.5 overflow-x-auto px-4 pt-2.5 sm:px-6">
        {categories.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <button
              key={category.id}
              className={`relative min-h-11 shrink-0 whitespace-nowrap rounded-full border-[1.5px] border-juicy-red px-5 py-2.5 text-sm font-bold transition-colors ${
                isActive ? "bg-juicy-red text-white" : "bg-juicy-cream text-juicy-red hover:bg-juicy-red/10"
              }`}
              onClick={() => onSelect(category.id)}
              type="button"
            >
              {category.label}
              {categoriesWithPromo.has(category.id) && (
                <span
                  aria-hidden="true"
                  className="absolute -right-1.5 -top-2 rounded-full bg-juicy-gold px-1.5 py-[3px] text-[9px] font-extrabold leading-none tracking-wide text-juicy-black shadow-sm"
                >
                  OFF
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
