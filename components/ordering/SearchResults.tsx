import { ProductCard } from "@/components/ordering/ProductCard";
import type { Product } from "@/types/ordering";

interface SearchResultsProps {
  onOpenDetail: (product: Product) => void;
  query: string;
  results: Product[];
}

export function SearchResults({ onOpenDetail, query, results }: SearchResultsProps) {
  return (
    <div className="px-4 pb-4 sm:px-6 lg:px-8">
      <p className="mb-3 font-headline text-base text-juicy-red">RESULTADOS</p>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard
              key={product.id}
              onOpenDetail={() => onOpenDetail(product)}
              product={product}
            />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-[0.95rem] text-juicy-gray">
          No encontramos productos para &quot;{query}&quot;.
        </p>
      )}
    </div>
  );
}
