import shoe1 from "@/assets/shoe-1.jpg";
import shoe2 from "@/assets/shoe-2.jpg";
import shoe3 from "@/assets/shoe-3.jpg";
import shoe4 from "@/assets/shoe-4.jpg";
import shoe5 from "@/assets/shoe-5.jpg";
import shoe6 from "@/assets/shoe-6.jpg";
import shoe7 from "@/assets/shoe-7.jpg";

export type Category = "running" | "gym" | "casual";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: Category;
  colors: string[];
  sizes: number[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: "velocity-x1",
    name: "Velocity X1",
    tagline: "Race-day running",
    price: 189,
    image: shoe1,
    category: "running",
    colors: ["Electric Blue", "Midnight"],
    sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.9,
    reviews: 1248,
    isBestSeller: true,
    description:
      "Built for athletes chasing personal bests. The Velocity X1 pairs a carbon-infused plate with a featherlight knit upper, delivering explosive energy return on every stride.",
    features: ["Carbon-infused propulsion plate", "Ultra-light engineered knit upper", "Responsive foam midsole", "Grip-zone outsole rubber"],
  },
  {
    id: "phantom-pro",
    name: "Phantom Pro",
    tagline: "Stealth performance",
    price: 165,
    originalPrice: 195,
    image: shoe2,
    category: "running",
    colors: ["Triple Black", "Blue Flash"],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    rating: 4.8,
    reviews: 892,
    isBestSeller: true,
    description: "All-black aggression meets daily-mile comfort. Phantom Pro is your stealth weapon for long runs and tempo days alike.",
    features: ["Dual-density cushioning", "Reflective heel cage", "Breathable mesh tongue", "Anatomical fit"],
  },
  {
    id: "forge-trainer",
    name: "Forge Trainer",
    tagline: "Built for the gym floor",
    price: 145,
    image: shoe3,
    category: "gym",
    colors: ["Cloud White", "Storm Grey"],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.7,
    reviews: 614,
    isNew: true,
    description: "Lift heavier, jump higher, train longer. Forge Trainer locks your foot in with a stability shank and grippy flat outsole.",
    features: ["Stability shank", "Flat traction outsole", "Reinforced heel counter", "Compression-resistant foam"],
  },
  {
    id: "noir-classic",
    name: "Noir Classic",
    tagline: "Off-duty essential",
    price: 119,
    image: shoe4,
    category: "casual",
    colors: ["Triple Black"],
    sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.6,
    reviews: 421,
    description: "Minimal silhouette, maximum comfort. The Noir Classic is the everyday low-top that elevates any fit.",
    features: ["Premium suede upper", "Memory foam insole", "Vulcanized rubber sole", "Hidden blue accent"],
  },
  {
    id: "stride-flow",
    name: "Stride Flow",
    tagline: "Daily distance runner",
    price: 159,
    image: shoe5,
    category: "running",
    colors: ["Frost", "Electric Blue"],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    rating: 4.8,
    reviews: 1023,
    isNew: true,
    description: "Effortless cushioning for every mile. Stride Flow keeps your stride smooth from sunrise to sunset.",
    features: ["Plush rebound midsole", "Engineered mesh upper", "Wide forefoot platform", "Heel-to-toe drop optimised"],
  },
  {
    id: "apex-lift",
    name: "Apex Lift",
    tagline: "Strength + conditioning",
    price: 135,
    image: shoe6,
    category: "gym",
    colors: ["Triple Black", "Ash"],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.7,
    reviews: 358,
    description: "Engineered for hybrid athletes. Apex Lift transitions seamlessly from rack work to conditioning circuits.",
    features: ["Multi-surface outsole", "TPU midfoot cage", "Cushioned collar", "Quick-lace system"],
  },
  {
    id: "azure-high",
    name: "Azure High",
    tagline: "Statement high-top",
    price: 139,
    originalPrice: 165,
    image: shoe7,
    category: "casual",
    colors: ["Electric Blue"],
    sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.5,
    reviews: 276,
    isNew: true,
    description: "All eyes on you. Azure High commands attention with bold color and clean lines.",
    features: ["Premium leather upper", "Padded ankle collar", "Soft cotton lining", "Signature blue colorway"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getByCategory = (c: Category) => products.filter((p) => p.category === c);
export const bestSellers = () => products.filter((p) => p.isBestSeller);
export const newArrivals = () => products.filter((p) => p.isNew);

export const categoryLabels: Record<Category, string> = {
  running: "Running",
  gym: "Gym & Training",
  casual: "Casual Sneakers",
};