"use client";

import { Suspense, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteSidebar } from "@/app/components/site-sidebar";
import { PageToolbar } from "@/app/components/page-toolbar";

export function AppShell({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative flex min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[140px]" />
        <div className="absolute bottom-24 right-0 h-[360px] w-[300px] rounded-[48%] bg-fuchsia-500/20 blur-[160px]" />
      </div>

      <SiteSidebar
        key={pathname}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col md:ml-[280px]">
        <Suspense fallback={<div className="px-4 py-4 text-sm text-slate-400">Memuat navigasi...</div>}>
          <PageToolbar onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} />
        </Suspense>
        <div className="flex-1 px-4 pb-12 pt-6 md:px-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-lg md:p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
