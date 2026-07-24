export function CaseStudyCard({
  company,
  stat,
  description,
  sourceUrl,
  sourceLabel = "Source",
}: {
  company: string;
  stat: string;
  description: string;
  sourceUrl: string;
  sourceLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg-raised p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-ink">
        <span className="font-heading text-sm font-semibold text-amber">
          {company.charAt(0)}
        </span>
      </div>
      <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
        {company}
      </span>
      <span className="font-heading text-2xl font-semibold text-accent">{stat}</span>
      <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 text-xs font-medium text-accent underline underline-offset-2"
      >
        {sourceLabel} ↗
      </a>
    </div>
  );
}
