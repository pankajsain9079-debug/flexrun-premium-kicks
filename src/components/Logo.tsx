import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2 group ${className}`}>
    <img
      src={logo}
      alt="FlexRun logo"
      width={36}
      height={36}
      className="h-9 w-9 transition-transform duration-300 group-hover:scale-110"
    />
    <span className="font-display text-xl font-bold tracking-tight">
      Flex<span className="text-primary">Run</span>
    </span>
  </Link>
);