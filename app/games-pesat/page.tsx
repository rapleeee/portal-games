import Link from "next/link";
import { personalGames } from "@/lib/siteData";
import { Tag } from "@/app/components/tag";

export default function GamesPesatPage() {
  const totalGames = personalGames.length;

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-indigo-200">
          Games Pesat
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
          Katalog game buatan tim PDD Studio.
        </h1>
        <p className="max-w-3xl text-base text-slate-300">
          Koleksi ini berisi game internal yang dikembangkan bareng komunitas Portal
          Games. Gunakan detail status rilis dan teknologi sebagai referensi saat
          pitching, menyusun modul belajar, atau mengundang kolaborator baru.
        </p>
        <div className="inline-flex items-center gap-3 rounded-2xl border border-indigo-400/40 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-100">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span>{totalGames} judul aktif · Update terakhir 2024</span>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {personalGames.map((game) => (
          <article
            key={game.title}
            className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-linear-to-br from-slate-900/70 to-slate-950/60 p-6 shadow-[0_20px_60px_-35px_rgba(79,70,229,0.8)] transition hover:border-indigo-400/50 hover:shadow-[0_35px_80px_-40px_rgba(56,189,248,0.45)]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-semibold text-white">
                  {game.title}
                </h2>
                {game.status && (
                  <span className="rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-200">
                    {game.status}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-300">{game.description}</p>
              <div className="flex flex-wrap gap-2">
                <Tag>{game.genre}</Tag>
                {game.tech?.map((stack) => (
                  <Tag key={stack}>{stack}</Tag>
                ))}
              </div>
            </div>
            <Link
              href={game.link}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
            >
              Mainkan Sekarang
              <span aria-hidden>↗</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
