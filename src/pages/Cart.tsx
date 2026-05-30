import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { getProduct } from "@/data/products";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { cart, updateQty, removeFromCart } = useStore();
  const items = cart.map((c) => ({ ...c, product: getProduct(c.id)! })).filter((c) => c.product);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container py-32 text-center max-w-md mx-auto">
        <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-6" />
        <h1 className="font-display text-3xl font-bold mb-3">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
        <Button asChild size="lg" className="bg-gradient-primary"><Link to="/shop">Start shopping</Link></Button>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-10">Your Cart</h1>
      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-4">
          {items.map((i) => (
            <div key={`${i.id}-${i.size}`} className="flex gap-4 p-4 rounded-2xl border border-border/50 bg-card">
              <Link to={`/product/${i.id}`} className="h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-secondary">
                <img src={i.product.image} alt={i.product.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div className="min-w-0">
                    <Link to={`/product/${i.id}`} className="font-display font-semibold hover:text-primary transition-smooth block truncate">{i.product.name}</Link>
                    <p className="text-sm text-muted-foreground">Size US {i.size}</p>
                    <p className="text-sm text-muted-foreground">{i.product.colors[0]}</p>
                  </div>
                  <p className="font-semibold">${i.product.price * i.qty}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-md border border-border">
                    <button onClick={() => updateQty(i.id, i.size, i.qty - 1)} className="h-9 w-9 grid place-items-center hover:text-primary"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-8 text-center text-sm font-semibold">{i.qty}</span>
                    <button onClick={() => updateQty(i.id, i.size, i.qty + 1)} className="h-9 w-9 grid place-items-center hover:text-primary"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <button onClick={() => removeFromCart(i.id, i.size)} className="text-muted-foreground hover:text-destructive transition-smooth"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-2xl border border-border/50 bg-card p-6 h-fit space-y-4 lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-semibold">Order summary</h2>
          <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
          <div className="border-t border-border/50 pt-4">
            <Row label="Total" value={`$${total.toFixed(2)}`} bold />
          </div>
          <Button asChild size="lg" className="w-full bg-gradient-primary shadow-glow"><Link to="/checkout">Checkout</Link></Button>
          <Button asChild variant="outline" className="w-full"><Link to="/shop">Continue shopping</Link></Button>
        </aside>
      </div>
    </div>
  );
};

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className={`flex justify-between ${bold ? "text-lg font-display font-bold" : "text-sm"}`}>
    <span className={bold ? "" : "text-muted-foreground"}>{label}</span>
    <span>{value}</span>
  </div>
);

export default Cart;