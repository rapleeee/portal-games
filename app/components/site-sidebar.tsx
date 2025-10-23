"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { portalNavigation } from "@/lib/siteData";

type SiteSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SiteSidebar({ isOpen, onClose }: SiteSidebarProps) {
  const pathname = usePathname();
  const [isCommunityOpen, setIsCommunityOpen] = useState(() =>
    pathname.startsWith("/komunitas")
  );

  const navigation = useMemo(() => portalNavigation, []);

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col gap-7 overflow-y-auto border-r border-white/10 bg-slate-950/95 px-6 py-8 backdrop-blur-xl transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Portal Games Hub
            </div>
            <Link
              href="/games-pesat"
              className="mt-4 block text-2xl font-semibold text-white"
            >
              Belajar. Jangan Cuma Mainkan
            </Link>
            <p className="mt-2 text-sm text-slate-400">
              Kurasi game edukatif & aktivitas komunitas generasi kreator muda.
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:border-indigo-400/60 hover:bg-indigo-500/20 md:hidden"
            onClick={onClose}
            aria-label="Tutup menu"
          >
            Tutup
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-3 overflow-y-auto pr-1 text-sm font-semibold text-slate-200">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.label} className="flex flex-col gap-2">
                <button
                  type="button"
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition hover:border-indigo-400/60 hover:text-white ${
                    isCommunityOpen
                      ? "border-indigo-400/40 bg-indigo-500/10 text-white"
                      : "border-white/10 bg-white/5"
                  }`}
                  onClick={() => setIsCommunityOpen((prev) => !prev)}
                  aria-expanded={isCommunityOpen}
                  aria-controls="sidebar-community"
                >
                  <span>{item.label}</span>
                  <span
                    className={`transition-transform ${
                      isCommunityOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>
                {isCommunityOpen && (
                  <div
                    id="sidebar-community"
                    className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-900/70 p-3"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`rounded-2xl px-4 py-2 transition hover:bg-indigo-500/10 hover:text-white ${
                          pathname === child.href ? "bg-indigo-500/10 text-white" : ""
                        }`}
                        onClick={onClose}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`rounded-2xl border px-4 py-3 transition hover:border-indigo-400/60 hover:text-white ${
                  pathname === item.href
                    ? "border-indigo-400/50 bg-indigo-500/10 text-white"
                    : "border-white/10 bg-white/5"
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex flex-col gap-4 rounded-3xl border border-indigo-500/40 bg-indigo-500/10 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-100">
                Komunitas Aktif
              </p>
              <p className="mt-2 text-xl font-semibold text-white">Ambil Badge</p>
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-indigo-300/50 bg-indigo-500/20 text-sm font-semibold text-white">
              ⭐
            </span>
          </div>
          <p className="text-sm text-indigo-100">
            Gabung Discord untuk mentor, playtest, dan event build rutin.
          </p>
          <Link
            href="https://mentora.smkpesat.sch.id"
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-300"
          >
            Join Komunitas
          </Link>
        </div>
      </aside>

      {isOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
