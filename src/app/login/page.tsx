"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      const next = searchParams.get("next") || "/en/getting-started";
      router.push(next);
      router.refresh();
    } else {
      setError(true);
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink">
          <span className="font-heading text-lg font-semibold text-amber">CC</span>
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="font-heading text-xl font-semibold text-text-primary">
            Claude Code Reference Guide
          </h1>
          <p className="text-sm text-text-secondary">This site is password protected.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
            className="w-full rounded-md border border-border bg-bg-raised px-3 py-2 text-sm text-text-primary outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          {error && <p className="text-xs text-rose">Incorrect password — try again.</p>}
          <button
            type="submit"
            disabled={submitting || !password}
            className="w-full rounded-md bg-accent px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Checking…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
