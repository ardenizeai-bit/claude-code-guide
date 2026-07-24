export function TreeDiagram() {
  const children = [
    { label: "sub-1", x: 40 },
    { label: "sub-2", x: 110 },
    { label: "sub-3", x: 180 },
  ];
  const parent = { x: 110, y: 26 };
  const childY = 110;

  return (
    <svg viewBox="0 0 220 150" className="h-auto w-full max-w-[280px]" role="img" aria-label="A parent agent delegating to three isolated child subagents">
      {children.map((c) => (
        <path
          key={c.label}
          d={`M ${parent.x} ${parent.y + 14} C ${parent.x} ${(parent.y + childY) / 2}, ${c.x} ${(parent.y + childY) / 2}, ${c.x} ${childY - 14}`}
          stroke="var(--color-border-strong)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="1 7"
          strokeLinecap="round"
        />
      ))}

      <circle cx={parent.x} cy={parent.y} r="16" fill="var(--color-accent)" />
      <text
        x={parent.x}
        y={parent.y + 34}
        textAnchor="middle"
        className="font-mono text-[9px]"
        fill="var(--color-text-primary)"
      >
        main
      </text>

      {children.map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy={childY} r="11" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="1.5" />
          <text
            x={c.x}
            y={childY + 24}
            textAnchor="middle"
            className="font-mono text-[9px]"
            fill="var(--color-text-secondary)"
          >
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
