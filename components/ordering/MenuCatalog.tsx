import { ProductCard } from "@/components/ordering/ProductCard";
import type { Category, Product } from "@/types/ordering";

interface MenuCatalogProps {
  categories: Category[];
  onOpenDetail: (product: Product) => void;
  products: Product[];
}

export function MenuCatalog({ categories, onOpenDetail, products }: MenuCatalogProps) {
  const featured = products.filter((product) => product.featured);

  const sections = [
    ...(featured.length ? [{ anchorId: "section-destacados", title: "LAS MÁS PEDIDAS", products: featured }] : []),
    ...categories.map((category) => ({
      anchorId: `section-${category.id}`,
      title: category.label.toUpperCase(),
      products: products.filter((product) => product.category === category.id),
    })),
  ].filter((section) => section.products.length > 0);

  return (
    <div className="px-4 pb-28 sm:px-6 lg:px-8">
      {sections.map((section) => (
        <div key={section.anchorId} className="mb-7 scroll-mt-[150px]" id={section.anchorId}>
          <div className="mb-4 flex items-center gap-2.5">
            <div className="h-0.5 flex-1 bg-juicy-red/50" />
            <p className="whitespace-nowrap font-headline text-base uppercase tracking-[0.02em] text-juicy-red">
              ★ {section.title}
            </p>
            <div className="h-0.5 flex-1 bg-juicy-red/50" />
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
            {section.products.map((product) => (
              <ProductCard
                key={`${section.anchorId}-${product.id}`}
                onOpenDetail={() => onOpenDetail(product)}
                product={product}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
