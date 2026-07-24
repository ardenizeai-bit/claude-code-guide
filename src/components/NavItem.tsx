import Link from "next/link";
import { forwardRef } from "react";

export const NavItem = forwardRef<
  HTMLAnchorElement,
  {
    href: string;
    label: string;
    active?: boolean;
    onClick?: () => void;
  }
>(function NavItem({ href, label, active, onClick }, ref) {
  return (
    <Link
      ref={ref}
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        active
          ? "bg-accent-soft font-medium text-accent"
          : "text-text-secondary hover:bg-bg-sunken hover:text-text-primary"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
          active ? "bg-accent" : "bg-border-strong"
        }`}
      />
      <span className="truncate">{label}</span>
    </Link>
  );
});
