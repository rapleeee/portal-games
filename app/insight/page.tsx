import { gameInsights } from "@/lib/siteData";

export default function InsightPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-200">
          Insight Dunia Game
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
          Fakta, statistik, dan angle konten untuk Portal Games.
        </h1>
        <p className="max-w-3xl text-base text-slate-300">
          Gunakan insight berikut sebagai bahan presentasi, konten sosial, atau
          diskusi dengan orang tua dan stakeholder sekolah. Semua data fokus pada
          value pembelajaran dan dampak komunitas.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gameInsights.map((insight) => (
          <article
            key={insight.title}
            className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/65 to-slate-950/60 p-6 shadow-[0_20px_60px_-40px_rgba(244,114,182,0.7)] transition hover:border-fuchsia-300/50 hover:shadow-[0_30px_80px_-45px_rgba(244,114,182,0.6)]"
          >
            <h2 className="text-lg font-semibold text-white">
              {insight.title}
            </h2>
            <p className="mt-3 text-sm text-slate-300">{insight.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
