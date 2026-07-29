import type { Category, ProductCategoryId } from "@/types/ordering";

interface CategoryTabsProps {
  activeCategory: ProductCategoryId;
  categories: Category[];
  onSelect: (categoryId: ProductCategoryId) => void;
}

export function CategoryTabs({ activeCategory, categories, onSelect }: CategoryTabsProps) {
  return (
    <div className="sticky top-[64px] z-20 bg-juicy-cream py-0.5 pb-3.5 sm:top-[76px]">
      <div className="ordering-no-scrollbar flex gap-2.5 overflow-x-auto px-4 sm:px-6">
        {categories.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <button
              key={category.id}
              className={`min-h-11 shrink-0 whitespace-nowrap rounded-full border-[1.5px] border-juicy-red px-5 py-2.5 text-sm font-bold transition-colors ${
                isActive ? "bg-juicy-red text-white" : "bg-juicy-cream text-juicy-red hover:bg-juicy-red/10"
              }`}
              onClick={() => onSelect(category.id)}
              type="button"
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
