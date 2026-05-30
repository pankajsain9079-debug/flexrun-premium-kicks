import { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ products }: { products: Product[] }) => {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        No products found. Try a different search.
      </div>
    );
  }
  return (
    <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
};