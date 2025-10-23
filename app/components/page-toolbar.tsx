"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type PageToolbarProps = {
  onMenuToggle: () => void;
};

export function PageToolbar({ onMenuToggle }: PageToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [now, setNow] = useState(() => new Date());
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    []
  );

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    []
  );

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = (searchInputRef.current?.value ?? "").trim();
    if (trimmed.length === 0) {
      router.push("/search");
      return;
    }

    const params = new URLSearchParams({ q: trimmed });
    router.push(`/search?${params.toString()}`);
  };
  const currentQuery = searchParams.get("q") ?? "";

  return (
    <div className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 px-4 py-4 backdrop-blur-2xl md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-indigo-400/60 hover:bg-indigo-500/20 md:hidden"
            aria-label="Toggle sidebar"
          >
            <span className="sr-only">Toggle sidebar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-indigo-200">
              Portal Games Hub
            </p>
            <p className="text-sm text-slate-200">
              {dateFormatter.format(now)} · {timeFormatter.format(now)}
            </p>
          </div>
        </div>

        <form
          role="search"
          onSubmit={handleSearchSubmit}
          className="flex w-full max-w-xl items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            viewBox="0 0 24 24"
            className="text-slate-400"
            aria-hidden
          >
            <path d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.64 5.64a7.5 7.5 0 0 0 10.61 10.61Z" />
          </svg>
          <input
            ref={searchInputRef}
            name="q"
            type="search"
            placeholder="Cari game, resource, atau event..."
            defaultValue={currentQuery}
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            aria-label="Cari konten portal games"
          />
          <button
            type="submit"
            className="rounded-2xl bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-100 transition hover:bg-indigo-500/30"
          >
            Cari
          </button>
        </form>
      </div>
    </div>
  );
}
