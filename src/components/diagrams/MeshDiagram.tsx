function nodePosition(index: number, count: number, cx: number, cy: number, r: number) {
  const angle = (index / count) * 2 * Math.PI - Math.PI / 2;
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

export function MeshDiagram() {
  const count = 5;
  const cx = 110;
  const cy = 75;
  const r = 60;
  const nodes = Array.from({ length: count }, (_, i) => ({
    ...nodePosition(i, count, cx, cy, r),
    label: `peer-${i + 1}`,
  }));

  const lines: { a: number; b: number }[] = [];
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      lines.push({ a: i, b: j });
    }
  }

  return (
    <svg viewBox="0 0 220 150" className="h-auto w-full max-w-[280px]" role="img" aria-label="Five peer agents fully interconnected, negotiating as equals">
      {lines.map(({ a, b }, i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--color-border-strong)"
          strokeWidth="1.25"
          opacity="0.6"
        />
      ))}

      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="12" fill="var(--color-mint-soft)" stroke="var(--color-mint)" strokeWidth="1.5" />
          <text
            x={n.x}
            y={n.y + (n.y > cy ? 24 : -18)}
            textAnchor="middle"
            className="font-mono text-[9px]"
            fill="var(--color-text-secondary)"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
