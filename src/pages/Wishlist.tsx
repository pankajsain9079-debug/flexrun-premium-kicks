import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { getProduct } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const { wishlist } = useStore();
  const items = wishlist.map((id) => getProduct(id)!).filter(Boolean);

  return (
    <div className="container py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Wishlist</h1>
      <p className="text-muted-foreground mb-10">{items.length} saved {items.length === 1 ? "item" : "items"}</p>
      {items.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-6" />
          <p className="text-muted-foreground mb-6">Your wishlist is empty.</p>
          <Button asChild className="bg-gradient-primary"><Link to="/shop">Browse shoes</Link></Button>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
};

export default Wishlist;