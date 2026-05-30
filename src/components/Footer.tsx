import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="border-t border-border/40 bg-secondary/30 mt-20">
    <div className="container py-16 grid gap-10 md:grid-cols-4">
      <div className="space-y-4">
        <Logo />
        <p className="text-sm text-muted-foreground max-w-xs">
          Premium athletic footwear engineered for athletes who refuse to slow down.
        </p>
        <div className="flex gap-3">
          {[Instagram, Twitter, Youtube].map((Icon, i) => (
            <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth" aria-label="Social link">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <FooterCol title="Shop" links={[["/shop/running","Running"],["/shop/gym","Gym & Training"],["/shop/casual","Casual"],["/shop","All Sneakers"]]} />
      <FooterCol title="Company" links={[["/about","About"],["/contact","Contact"],["/shop","Sustainability"],["/shop","Careers"]]} />
      <FooterCol title="Support" links={[["/contact","Help Center"],["/contact","Shipping"],["/contact","Returns"],["/contact","Size Guide"]]} />
    </div>
    <div className="border-t border-border/40">
      <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} FlexRun. All rights reserved.</p>
        <p>Run Beyond Limits.</p>
      </div>
    </div>
  </footer>
);

const FooterCol = ({ title, links }: { title: string; links: [string, string][] }) => (
  <div>
    <h4 className="font-display font-semibold mb-4">{title}</h4>
    <ul className="space-y-2.5">
      {links.map(([to, label]) => (
        <li key={label}>
          <Link to={to} className="text-sm text-muted-foreground hover:text-primary transition-smooth">{label}</Link>
        </li>
      ))}
    </ul>
  </div>
);