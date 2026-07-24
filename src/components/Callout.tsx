import type { ReactNode } from "react";
import { Lightbulb, TriangleAlert, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/pages";

type CalloutVariant = "tip" | "warning" | "try-it";

const VARIANT_CONFIG: Record<
  CalloutVariant,
  { icon: typeof Lightbulb; label: Record<Locale, string>; colorVar: string; softVar: string }
> = {
  tip: {
    icon: Lightbulb,
    label: { en: "TIP", zh: "提示" },
    colorVar: "var(--color-mint)",
    softVar: "var(--color-mint-soft)",
  },
  warning: {
    icon: TriangleAlert,
    label: { en: "WARNING", zh: "注意" },
    colorVar: "var(--color-amber)",
    softVar: "var(--color-amber-soft)",
  },
  "try-it": {
    icon: Sparkles,
    label: { en: "TRY IT YOURSELF", zh: "亲自试试" },
    colorVar: "#4A47CC",
    softVar: "#E7E6FA",
  },
};

function BaseCallout({
  variant,
  locale = "en",
  children,
}: {
  variant: CalloutVariant;
  locale?: Locale;
  children: ReactNode;
}) {
  const { icon: Icon, label, colorVar, softVar } = VARIANT_CONFIG[variant];

  return (
    <div
      className="flex gap-3 rounded-lg border-l-4 p-4"
      style={{ borderLeftColor: colorVar, backgroundColor: softVar }}
    >
      <Icon size={18} style={{ color: colorVar }} className="mt-0.5 shrink-0" />
      <div className="flex flex-col gap-1">
        <span
          className="font-mono text-xs font-semibold tracking-wider"
          style={{ color: colorVar }}
        >
          {label[locale]}
        </span>
        <div className="callout-body text-sm leading-relaxed" style={{ color: "#1B1A17" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function TipCallout({ locale, children }: { locale?: Locale; children: ReactNode }) {
  return <BaseCallout variant="tip" locale={locale}>{children}</BaseCallout>;
}

export function WarningCallout({ locale, children }: { locale?: Locale; children: ReactNode }) {
  return <BaseCallout variant="warning" locale={locale}>{children}</BaseCallout>;
}

export function TryItCallout({ locale, children }: { locale?: Locale; children: ReactNode }) {
  return <BaseCallout variant="try-it" locale={locale}>{children}</BaseCallout>;
}
