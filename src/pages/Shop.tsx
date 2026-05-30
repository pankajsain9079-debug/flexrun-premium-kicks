import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Category, categoryLabels, products } from "@/data/products";

const Shop = () => {
  const { category } = useParams<{ category?: Category }>();
  const [params] = useSearchParams();
  const initialQ = params.get("q") || "";

  const [q, setQ] = useState(initialQ);
  const [sort, setSort] = useState("featured");
  const [price, setPrice] = useState<[number, number]>([0, 250]);
  const [cats, setCats] = useState<Set<Category>>(() => (category ? new Set([category]) : new Set()));

  const filtered = useMemo(() => {
    let list = products;
    if (category) list = list.filter((p) => p.category === category);
    else if (cats.size > 0) list = list.filter((p) => cats.has(p.category));
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(s) || p.tagline.toLowerCase().includes(s) || p.category.includes(s));
    }
    list = list.filter((p) => p.price >= price[0] && p.price <= price[1]);
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [category, cats, q, price, sort]);

  const title = category ? categoryLabels[category] : "All Sneakers";

  const Filters = (
    <div className="space-y-8">
      <div>
        <h4 className="font-display font-semibold mb-3">Search</h4>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" />
      </div>
      {!category && (
        <div>
          <h4 className="font-display font-semibold mb-3">Category</h4>
          <div className="space-y-2">
            {(Object.keys(categoryLabels) as Category[]).map((c) => (
              <label key={c} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={cats.has(c)}
                  onChange={(e) => {
                    const next = new Set(cats);
                    e.target.checked ? next.add(c) : next.delete(c);
                    setCats(next);
                  }}
                  className="h-4 w-4 accent-primary"
                />
                {categoryLabels[c]}
              </label>
            ))}
          </div>
        </div>
      )}
      <div>
        <h4 className="font-display font-semibold mb-3">Price</h4>
        <Slider value={price} onValueChange={(v) => setPrice(v as [number, number])} min={0} max={250} step={5} />
        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>${price[0]}</span><span>${price[1]}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-10 animate-fade-in">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">Shop</p>
        <h1 className="font-display text-4xl md:text-6xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-2">{filtered.length} products</p>
      </div>

      <div className="flex items-center justify-between mb-6 gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden">
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetTitle className="font-display">Filters</SheetTitle>
            <div className="mt-6">{Filters}</div>
          </SheetContent>
        </Sheet>
        <div className="ml-auto">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-10">
        <aside className="hidden lg:block sticky top-24 self-start">{Filters}</aside>
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
};

export default Shop;