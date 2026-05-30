import { Link } from "react-router-dom";
import { ArrowRight, Award, Shield, Truck, Zap } from "lucide-react";
import heroShoe from "@/assets/hero-shoe.jpg";
import aboutImg from "@/assets/about.jpg";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeader } from "@/components/SectionHeader";
import { bestSellers, newArrivals, products, categoryLabels } from "@/data/products";

const testimonials = [
  { name: "Marcus T.", role: "Marathon Runner", quote: "The Velocity X1 carried me through my PR. Light, responsive, unreal." },
  { name: "Aisha K.", role: "CrossFit Athlete", quote: "Forge Trainer is the only shoe I trust under heavy squats and box jumps." },
  { name: "Diego R.", role: "Streetwear Editor", quote: "FlexRun nails the line between performance and everyday style." },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container relative grid lg:grid-cols-2 gap-10 items-center py-16 md:py-24 lg:py-32">
          <div className="space-y-7 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" /> Drop 04 — Velocity Series
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
              Run<br />
              <span className="text-gradient">Beyond</span><br />
              Limits.
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Engineered for athletes who refuse to slow down. Performance footwear, crafted with obsession.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow h-12 px-8 text-base">
                <Link to="/shop">Shop the drop <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
                <Link to="/about">Our story</Link>
              </Button>
            </div>
            <div className="flex gap-8 pt-6 border-t border-border/50">
              <Stat n="2M+" label="Runners" />
              <Stat n="4.9★" label="Avg rating" />
              <Stat n="60+" label="Countries" />
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <img
              src={heroShoe}
              alt="FlexRun Velocity X1 running shoe"
              width={1920}
              height={1280}
              className="relative w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-border/40 py-5 overflow-hidden bg-secondary/30">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...Array(2)].flatMap((_, i) =>
            ["Run Beyond Limits", "Free Shipping Over $100", "30-Day Returns", "Engineered for Athletes", "Drop 04 Live Now"].map((t, j) => (
              <span key={`${i}-${j}`} className="font-display text-2xl font-bold uppercase tracking-tight text-foreground/80 flex items-center gap-12">
                {t} <span className="text-primary">•</span>
              </span>
            )),
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="container py-20">
        <SectionHeader eyebrow="Collections" title="Shop by category" />
        <div className="grid gap-5 md:grid-cols-3">
          {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((cat, i) => {
            const p = products.find((x) => x.category === cat);
            if (!p) return null;
            return (
              <Link
                key={cat}
                to={`/shop/${cat}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <img src={p.image} alt={categoryLabels[cat]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <h3 className="font-display text-3xl font-bold">{categoryLabels[cat]}</h3>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 group-hover:text-primary transition-smooth" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container py-20">
        <SectionHeader eyebrow="Most loved" title="Best Sellers" linkTo="/shop" linkLabel="Shop all" />
        <ProductGrid products={bestSellers().concat(products).slice(0, 4)} />
      </section>

      {/* New Arrivals */}
      <section className="bg-secondary/30 py-20">
        <div className="container">
          <SectionHeader eyebrow="Just dropped" title="New Arrivals" linkTo="/shop" linkLabel="View all" />
          <ProductGrid products={newArrivals()} />
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { Icon: Zap, title: "Engineered performance", body: "Every stride backed by athlete-tested R&D." },
            { Icon: Truck, title: "Free fast shipping", body: "Complimentary delivery on orders over $100." },
            { Icon: Shield, title: "30-day returns", body: "Run in them. Don't love them? Send them back." },
            { Icon: Award, title: "2-year warranty", body: "We stand behind every pair we ship." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border/50 bg-card p-6 transition-smooth hover:border-primary/50 hover:shadow-glow">
              <Icon className="h-7 w-7 text-primary mb-4" />
              <h4 className="font-display font-semibold mb-1.5">{title}</h4>
              <p className="text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <img src={aboutImg} alt="Athlete running at dusk" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Our story</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Built by runners.<br />For everyone who runs.</h2>
            <p className="text-lg text-muted-foreground">
              FlexRun was founded in 2019 by a team of marathoners, coaches, and material scientists obsessed with one question: how do we make every stride feel effortless?
            </p>
            <p className="text-muted-foreground">
              Today, our shoes carry runners across finish lines in 60+ countries — from first-time 5K finishers to Olympic qualifiers. Every model is engineered, tested, and refined by athletes.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">Read our story <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-hero py-20">
        <div className="container">
          <SectionHeader eyebrow="From the community" title="Athletes who trust us" />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={t.name} className="rounded-2xl border border-border/50 bg-card p-8 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="text-primary text-2xl mb-4">★★★★★</div>
                <p className="text-lg mb-6 leading-relaxed">"{t.quote}"</p>
                <div>
                  <p className="font-display font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_white_0%,_transparent_50%)] opacity-20" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              Ready to run beyond?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-xl mx-auto">
              Join the FlexRun community and be the first to know about drops, exclusives, and athlete stories.
            </p>
            <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
              <Link to="/shop">Shop the collection</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

const Stat = ({ n, label }: { n: string; label: string }) => (
  <div>
    <div className="font-display text-2xl font-bold">{n}</div>
    <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
  </div>
);

export default Index;
