import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { cn } from "@/lib/utils";

export const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block animate-fade-in-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary/50">
        {(product.isNew || product.isBestSeller || product.originalPrice) && (
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
            {product.isNew && <Badge>New</Badge>}
            {product.isBestSeller && <Badge variant="dark">Best Seller</Badge>}
            {product.originalPrice && <Badge variant="sale">Sale</Badge>}
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 h-9 w-9 grid place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-primary hover:text-primary-foreground transition-smooth"
          aria-label="Toggle wishlist"
        >
          <Heart className={cn("h-4 w-4", wished && "fill-primary text-primary")} />
        </button>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.tagline}</p>
        <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-smooth">{product.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

const Badge = ({ children, variant = "primary" }: { children: React.ReactNode; variant?: "primary" | "dark" | "sale" }) => {
  const cls =
    variant === "primary"
      ? "bg-primary text-primary-foreground"
      : variant === "sale"
      ? "bg-destructive text-destructive-foreground"
      : "bg-foreground text-background";
  return <span className={cn("inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-bold uppercase tracking-wider", cls)}>{children}</span>;
};