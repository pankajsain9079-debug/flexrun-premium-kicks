import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const SectionHeader = ({
  eyebrow,
  title,
  linkTo,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  linkTo?: string;
  linkLabel?: string;
}) => (
  <div className="flex items-end justify-between mb-8 md:mb-12">
    <div>
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">{eyebrow}</p>}
      <h2 className="font-display text-3xl md:text-5xl font-bold">{title}</h2>
    </div>
    {linkTo && (
      <Link to={linkTo} className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-smooth">
        {linkLabel || "View all"} <ArrowRight className="h-4 w-4" />
      </Link>
    )}
  </div>
);