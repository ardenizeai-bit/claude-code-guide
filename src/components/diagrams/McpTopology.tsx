const SERVERS = ["GitHub", "Postgres", "Slack", "Playwright"];

export function McpTopology() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-bg-raised p-6">
      <div className="rounded-md border-2 border-accent bg-accent-soft px-5 py-2.5">
        <span className="font-mono text-sm font-medium text-accent">Claude Code</span>
      </div>
      <div className="h-6 w-px bg-border-strong" />
      <div className="rounded-full border border-border-strong px-3 py-1 font-mono text-[11px] text-text-secondary">
        MCP protocol
      </div>
      <div className="h-6 w-px bg-border-strong" />
      <div className="flex flex-wrap justify-center gap-3">
        {SERVERS.map((server) => (
          <div
            key={server}
            className="rounded-md border border-border bg-bg-sunken px-4 py-2 font-mono text-xs text-text-secondary"
          >
            {server}
          </div>
        ))}
      </div>
    </div>
  );
}
