import Link from "next/link";
import {
  communityHighlights,
  curatedPublicGames,
  friendlyGenres,
  gameInsights,
  personalGames,
  resourceLinks,
  upcomingEvents,
} from "@/lib/siteData";
import { Tag } from "@/app/components/tag";

type SearchParamValue = Record<string, string | string[] | undefined>;

type SearchPageProps = {
  searchParams?: Promise<SearchParamValue> | undefined;
};

type FreeToGame = {
  id: number;
  title: string;
  genre: string;
  short_description: string;
  thumbnail: string;
  game_url: string;
};

type PublicResult = {
  title: string;
  description: string;
  genre: string;
  link: string;
  thumbnail?: string;
  source: "api" | "curated";
};

const quickLinks = [
  { key: "personal", title: "Games Pesat", href: "/games-pesat" },
  { key: "public", title: "Games Publik", href: "/games-publik" },
  { key: "events", title: "Event Komunitas", href: "/komunitas/events" },
  { key: "resources", title: "Resource Library", href: "/komunitas/resources" },
  { key: "insight", title: "Insight & Highlight", href: "/insight" },
  { key: "community", title: "Program Komunitas", href: "/komunitas/playtest" },
];

const filterOptions = [
  { key: "personal", label: "Games Pesat" },
  { key: "public", label: "Games Publik" },
  { key: "events", label: "Event Komunitas" },
  { key: "resources", label: "Resource" },
  { key: "insight", label: "Insight & Highlight" },
  { key: "community", label: "Program Komunitas" },
];

const friendlyGenresSet = new Set(friendlyGenres);

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};

  const rawQuery = resolvedSearchParams.q;
  const query =
    (Array.isArray(rawQuery) ? rawQuery[0] ?? "" : rawQuery ?? "").trim();
  const normalizedQuery = query.toLowerCase();
  const rawSectionParam = resolvedSearchParams.sections;
  const sectionParams = Array.isArray(rawSectionParam)
    ? rawSectionParam
    : rawSectionParam
      ? [rawSectionParam]
      : [];
  const selectedSections =
    sectionParams.length > 0
      ? new Set(sectionParams)
      : new Set(filterOptions.map((option) => option.key));

  const hasQuery = query.length > 0;

  const personalMatches = hasQuery
    ? personalGames.filter(
        (game) =>
          game.title.toLowerCase().includes(normalizedQuery) ||
          game.description.toLowerCase().includes(normalizedQuery) ||
          game.genre.toLowerCase().includes(normalizedQuery) ||
          game.tech?.some((stack) =>
            stack.toLowerCase().includes(normalizedQuery)
          )
      )
    : [];

  const curatedPublicMatches = hasQuery
    ? curatedPublicGames.filter(
        (game) =>
          game.title.toLowerCase().includes(normalizedQuery) ||
          game.description.toLowerCase().includes(normalizedQuery) ||
          game.genre.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const livePublicMatches = hasQuery
    ? await fetchPublicMatches(normalizedQuery)
    : [];

  const seenTitles = new Set<string>();
  const publicResults: PublicResult[] = [];

  for (const game of livePublicMatches) {
    if (!seenTitles.has(game.title)) {
      seenTitles.add(game.title);
      publicResults.push({ ...game, source: "api" });
    }
  }

  for (const game of curatedPublicMatches) {
    if (!seenTitles.has(game.title)) {
      seenTitles.add(game.title);
      publicResults.push({ ...game, source: "curated" });
    }
  }

  const eventMatches = hasQuery
    ? upcomingEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(normalizedQuery) ||
          event.focus.toLowerCase().includes(normalizedQuery) ||
          event.format.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const resourceMatches = hasQuery
    ? resourceLinks.filter(
        (resource) =>
          resource.title.toLowerCase().includes(normalizedQuery) ||
          resource.description.toLowerCase().includes(normalizedQuery) ||
          resource.tag.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const insightMatches = hasQuery
    ? gameInsights.filter(
        (insight) =>
          insight.title.toLowerCase().includes(normalizedQuery) ||
          insight.detail.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const communityMatches = hasQuery
    ? communityHighlights.filter(
        (item) =>
          item.title.toLowerCase().includes(normalizedQuery) ||
          item.detail.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const filteredCounts = [
    selectedSections.has("personal") ? personalMatches.length : 0,
    selectedSections.has("public") ? publicResults.length : 0,
    selectedSections.has("events") ? eventMatches.length : 0,
    selectedSections.has("resources") ? resourceMatches.length : 0,
    selectedSections.has("insight") ? insightMatches.length : 0,
    selectedSections.has("community") ? communityMatches.length : 0,
  ];

  const totalMatches = filteredCounts.reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-indigo-200">
          Pencarian Portal Games
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
          Temukan game, resource, dan program komunitas.
        </h1>
        {hasQuery ? (
          <p className="max-w-3xl text-base text-slate-300">
            Menampilkan hasil untuk{" "}
            <span className="font-semibold text-white">“{query}”</span> —{" "}
            {totalMatches} hasil relevan berdasarkan filter aktif.
          </p>
        ) : (
          <p className="max-w-3xl text-base text-slate-300">
            Masukkan kata kunci di kolom pencarian untuk mencari game, event,
            resource, atau insight. Coba “coding”, “workshop”, atau “math”.
          </p>
        )}

        <div className="flex flex-wrap gap-3 text-xs text-slate-400">
          {quickLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-semibold text-slate-200 transition hover:border-indigo-400/50 hover:text-white"
            >
              {link.title}
              <span aria-hidden>↗</span>
            </Link>
          ))}
        </div>

        <form
          method="get"
          className="mt-6 flex flex-col gap-3 rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-300"
        >
          <input type="hidden" name="q" value={query} />
          <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">
            Filter hasil pencarian
          </p>
          <div className="flex flex-wrap gap-3">
            {filterOptions.map((filter) => (
              <label
                key={filter.key}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 font-semibold text-slate-200 transition hover:border-indigo-400/50 hover:text-white"
              >
                <input
                  type="checkbox"
                  name="sections"
                  value={filter.key}
                  defaultChecked={selectedSections.has(filter.key)}
                  className="h-4 w-4 accent-indigo-400"
                />
                {filter.label}
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-4 py-2 text-xs font-semibold text-indigo-100 transition hover:bg-indigo-500/30"
            >
              Terapkan Filter
            </button>
            <Link
              href={`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-indigo-400/50 hover:text-white"
            >
              Reset
            </Link>
          </div>
        </form>
      </header>

      {!hasQuery && (
        <p className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-300">
          Ketik kata kunci pada search bar di kiri atas untuk mulai mencari konten.
        </p>
      )}

      {hasQuery && totalMatches === 0 && (
        <p className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-300">
          Belum ada hasil yang cocok dengan pencarianmu. Coba kata lain atau
          aktifkan kembali kategori yang relevan.
        </p>
      )}

      {selectedSections.has("personal") && personalMatches.length > 0 && (
        <section className="space-y-4">
          <header className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-white">Games Pesat</h2>
              <p className="text-sm text-slate-400">
                Game internal yang dikembangkan tim Portal Games.
              </p>
            </div>
            <Link
              href="/games-pesat"
              className="text-sm font-semibold text-indigo-200 transition hover:text-white"
            >
              Lihat semua
            </Link>
          </header>
          <div className="grid gap-6 md:grid-cols-2">
            {personalMatches.map((game) => (
              <article
                key={game.title}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white">{game.title}</h3>
                  {game.status && (
                    <span className="rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-200">
                      {game.status}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-slate-300">{game.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Tag>{game.genre}</Tag>
                  {game.tech?.map((stack) => (
                    <Tag key={stack}>{stack}</Tag>
                  ))}
                </div>
                <Link
                  href={game.link}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
                >
                  Mainkan Sekarang
                  <span aria-hidden>↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {selectedSections.has("public") && publicResults.length > 0 && (
        <section className="space-y-4">
          <header className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-white">Games Publik</h2>
              <p className="text-sm text-slate-400">
                Kombinasi hasil live dari FreeToGame API dan kurasi madya Portal
                Games.
              </p>
            </div>
            <Link
              href="/games-publik"
              className="text-sm font-semibold text-sky-200 transition hover:text-white"
            >
              Lihat semua
            </Link>
          </header>
          <div className="grid gap-6 md:grid-cols-3">
            {publicResults.map((game) => (
              <article
                key={`${game.source}-${game.title}`}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <Tag>{game.genre}</Tag>
                  <span className="rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-sky-100">
                    {game.source === "api" ? "Live API" : "Kurasi"}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {game.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{game.description}</p>
                <Link
                  href={game.link}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 transition hover:text-sky-100"
                >
                  Buka Game
                  <span aria-hidden>↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {selectedSections.has("events") && eventMatches.length > 0 && (
        <section className="space-y-4">
          <header className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-white">Event Komunitas</h2>
              <p className="text-sm text-slate-400">
                Workshop, showcase, dan mentoring yang sedang berjalan.
              </p>
            </div>
            <Link
              href="/komunitas/events"
              className="text-sm font-semibold text-indigo-200 transition hover:text-white"
            >
              Lihat semua
            </Link>
          </header>
          <div className="grid gap-6 md:grid-cols-3">
            {eventMatches.map((event) => (
              <article
                key={event.title}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-indigo-100">
                  <span>{event.format}</span>
                  <span>{event.time}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{event.focus}</p>
                <div className="mt-3 rounded-2xl border border-indigo-400/40 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-100">
                  {event.date}
                </div>
                <Link
                  href={event.link}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-100 transition hover:text-white"
                >
                  Detail & RSVP
                  <span aria-hidden>↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {selectedSections.has("resources") && resourceMatches.length > 0 && (
        <section className="space-y-4">
          <header className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-white">Resource Library</h2>
              <p className="text-sm text-slate-400">
                Template dan asset siap pakai untuk produksi game.
              </p>
            </div>
            <Link
              href="/komunitas/resources"
              className="text-sm font-semibold text-indigo-200 transition hover:text-white"
            >
              Lihat semua
            </Link>
          </header>
          <div className="grid gap-6 md:grid-cols-3">
            {resourceMatches.map((resource) => (
              <article
                key={resource.title}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-5"
              >
                <Tag>{resource.tag}</Tag>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  {resource.description}
                </p>
                <Link
                  href={resource.link}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-100 transition hover:text-white"
                >
                  Download
                  <span aria-hidden>↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {selectedSections.has("insight") && insightMatches.length > 0 && (
        <section className="space-y-4">
          <header className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Insight Portal Games
              </h2>
              <p className="text-sm text-slate-400">
                Fakta industri dan inspirasi konten.
              </p>
            </div>
            <Link
              href="/insight"
              className="text-sm font-semibold text-fuchsia-200 transition hover:text-white"
            >
              Lihat semua
            </Link>
          </header>
          <div className="grid gap-6 md:grid-cols-3">
            {insightMatches.map((insight) => (
              <article
                key={insight.title}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-5"
              >
                <h3 className="text-lg font-semibold text-white">
                  {insight.title}
                </h3>
                <p className="mt-3 text-sm text-slate-300">{insight.detail}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {selectedSections.has("community") && communityMatches.length > 0 && (
        <section className="space-y-4">
          <header className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Program & Highlight Komunitas
              </h2>
              <p className="text-sm text-slate-400">
                Aktivitas unggulan yang bisa kamu ikuti.
              </p>
            </div>
            <Link
              href="/komunitas/playtest"
              className="text-sm font-semibold text-emerald-200 transition hover:text-white"
            >
              Lihat program
            </Link>
          </header>
          <div className="grid gap-6 md:grid-cols-3">
            {communityMatches.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 text-sm text-emerald-100"
              >
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3">{item.detail}</p>
                <Link
                  href="/komunitas/playtest"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition hover:text-emerald-100"
                >
                  Ikuti Program
                  <span aria-hidden>↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

async function fetchPublicMatches(
  normalizedQuery: string
): Promise<Array<Omit<PublicResult, "source">>> {
  try {
    const response = await fetch(
      "https://www.freetogame.com/api/games?platform=browser",
      { next: { revalidate: 43200 } }
    );

    if (!response.ok) {
      return [];
    }

    const rawGames: FreeToGame[] = await response.json();
    const safeGames = rawGames.filter(
      (game) =>
        friendlyGenresSet.has(game.genre) &&
        !/Shooter|War|Battle|Zombie|Killer|Sniper/i.test(game.title)
    );

    const matches = safeGames.filter(
      (game) =>
        game.title.toLowerCase().includes(normalizedQuery) ||
        game.short_description.toLowerCase().includes(normalizedQuery) ||
        game.genre.toLowerCase().includes(normalizedQuery)
    );

    return matches.slice(0, 12).map((game) => ({
      title: game.title,
      description: game.short_description,
      genre: game.genre,
      link: game.game_url,
      thumbnail: game.thumbnail,
    }));
  } catch {
    return [];
  }
}
