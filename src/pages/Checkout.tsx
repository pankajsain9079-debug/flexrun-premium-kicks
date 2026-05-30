import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/context/StoreContext";
import { getProduct } from "@/data/products";

const Checkout = () => {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const items = cart.map((c) => ({ ...c, product: getProduct(c.id)! })).filter((c) => c.product);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    clearCart();
  };

  if (done) {
    return (
      <div className="container py-32 text-center max-w-lg mx-auto animate-scale-in">
        <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 grid place-items-center mb-6">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-display text-4xl font-bold mb-3">Order confirmed</h1>
        <p className="text-muted-foreground mb-8">Thanks for choosing FlexRun. We'll send tracking details to your inbox shortly.</p>
        <Button asChild size="lg" className="bg-gradient-primary"><Link to="/shop">Keep shopping</Link></Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-32 text-center">
        <h1 className="font-display text-3xl mb-4">Your cart is empty</h1>
        <Button asChild onClick={() => navigate("/shop")}>Browse shoes</Button>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-10">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-[1fr_400px] gap-10">
        <div className="space-y-8">
          <Section title="Contact">
            <Field label="Email" type="email" required />
          </Section>
          <Section title="Shipping address">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First name" required />
              <Field label="Last name" required />
            </div>
            <Field label="Street address" required />
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="City" required />
              <Field label="State" required />
              <Field label="Zip" required />
            </div>
          </Section>
          <Section title="Payment">
            <Field label="Card number" placeholder="1234 5678 9012 3456" required />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Expiry" placeholder="MM/YY" required />
              <Field label="CVC" placeholder="123" required />
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Lock className="h-3 w-3" /> Secured encrypted checkout. Demo only — no charge.</p>
          </Section>
        </div>

        <aside className="rounded-2xl border border-border/50 bg-card p-6 h-fit space-y-4 lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-semibold">Order</h2>
          <div className="space-y-3 max-h-72 overflow-auto">
            {items.map((i) => (
              <div key={`${i.id}-${i.size}`} className="flex gap-3 text-sm">
                <div className="h-14 w-14 rounded-md overflow-hidden bg-secondary shrink-0">
                  <img src={i.product.image} alt={i.product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{i.product.name}</p>
                  <p className="text-xs text-muted-foreground">Size {i.size} · Qty {i.qty}</p>
                </div>
                <p className="font-semibold">${i.product.price * i.qty}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border/50 pt-4 space-y-2 text-sm">
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
            <Row label="Tax" value={`$${tax.toFixed(2)}`} />
          </div>
          <div className="border-t border-border/50 pt-4 flex justify-between font-display text-lg font-bold">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
          <Button type="submit" size="lg" className="w-full bg-gradient-primary shadow-glow">Place order</Button>
        </aside>
      </form>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <h3 className="font-display text-xl font-semibold">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const Field = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-1.5">
    <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
    <Input {...props} className="h-11 bg-secondary border-border/50" />
  </div>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>
);

export default Checkout;