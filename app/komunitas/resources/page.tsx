import Link from "next/link";
import { resourceLinks } from "@/lib/siteData";
import { Tag } from "@/app/components/tag";

export default function CommunityResourcesPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-indigo-200">
          Komunitas Portal Games
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
          Resource library untuk mempercepat produksi game.
        </h1>
        <p className="max-w-3xl text-base text-slate-300">
          Pilih template dokumen, asset, dan checklist untuk mendukung workflow tim
          kamu saat mengembangkan game edukasi dan aktivitas komunitas.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resourceLinks.map((resource) => (
          <article
            key={resource.title}
            className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/65 to-slate-950/60 p-6 shadow-[0_20px_60px_-45px_rgba(56,189,248,0.7)] transition hover:border-indigo-300/60 hover:shadow-[0_34px_85px_-45px_rgba(59,130,246,0.55)]"
          >
            <div className="flex items-center gap-2">
              <Tag>{resource.tag}</Tag>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">
                {resource.title}
              </h2>
              <p className="text-sm text-slate-300">{resource.description}</p>
            </div>
            <Link
              href={resource.link}
              className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-indigo-100 transition hover:text-white"
            >
              Download
              <span aria-hidden>↗</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
