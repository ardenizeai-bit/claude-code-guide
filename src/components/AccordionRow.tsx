"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function AccordionRow({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 bg-bg-raised px-4 py-3 text-left transition-colors hover:bg-bg-sunken focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
      >
        <span className="font-medium text-text-primary">{title}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-text-muted transition-transform motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-4 py-3 text-sm leading-relaxed text-text-secondary">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
