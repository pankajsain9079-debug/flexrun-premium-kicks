import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Minus, Plus, Shield, Truck } from "lucide-react";
import { getProduct, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";
import { ProductGrid } from "@/components/ProductGrid";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams();
  const product = id ? getProduct(id) : undefined;
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [size, setSize] = useState<number | null>(null);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container py-32 text-center">
        <h1 className="font-display text-3xl mb-4">Product not found</h1>
        <Button asChild><Link to="/shop">Back to shop</Link></Button>
      </div>
    );
  }

  const handleAdd = () => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    addToCart(product.id, size, qty);
    toast.success(`${product.name} added to cart`);
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container py-8 md:py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-smooth">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary/50 animate-fade-in">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-6 animate-fade-in-up">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">{product.tagline}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-primary">{"★".repeat(Math.round(product.rating))}</span>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <div>
            <p className="text-sm font-semibold mb-3">Color: <span className="text-muted-foreground font-normal">{product.colors[0]}</span></p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <span key={c} className="px-3 py-1.5 text-xs rounded-full border border-border">{c}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-3">Select size (US)</p>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "h-11 rounded-md border text-sm font-medium transition-smooth",
                    size === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center rounded-md border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 grid place-items-center hover:text-primary"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="h-11 w-11 grid place-items-center hover:text-primary"><Plus className="h-4 w-4" /></button>
            </div>
            <Button onClick={handleAdd} size="lg" className="flex-1 bg-gradient-primary hover:opacity-90 shadow-glow h-11">
              Add to cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11"
              onClick={() => toggleWishlist(product.id)}
              aria-label="Wishlist"
            >
              <Heart className={cn("h-5 w-5", isWishlisted(product.id) && "fill-primary text-primary")} />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-6 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm"><Truck className="h-4 w-4 text-primary" /> Free shipping over $100</div>
            <div className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4 text-primary" /> 30-day returns</div>
          </div>

          <div className="pt-6 border-t border-border/50">
            <h3 className="font-display font-semibold mb-3">Features</h3>
            <ul className="space-y-2">
              {product.features.map((f) => (
                <li key={f} className="text-sm text-muted-foreground flex gap-2"><span className="text-primary">→</span> {f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">You may also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
};

export default ProductDetail;