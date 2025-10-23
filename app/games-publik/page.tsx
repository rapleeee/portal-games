import Link from "next/link";
import {
  curatedPublicGames,
  friendlyGenres,
  type GameCard,
} from "@/lib/siteData";
import { Tag } from "@/app/components/tag";

type FreeToGame = {
  id: number;
  title: string;
  genre: string;
  short_description: string;
  thumbnail: string;
  game_url: string;
};

const friendlyGenresSet = new Set(friendlyGenres);

async function getPublicGames(): Promise<GameCard[]> {
  try {
    const response = await fetch(
      "https://www.freetogame.com/api/games?platform=browser",
      { next: { revalidate: 43200 } }
    );

    if (!response.ok) {
      return curatedPublicGames;
    }

    const rawGames: FreeToGame[] = await response.json();
    const filtered = rawGames
      .filter(
        (game) =>
          friendlyGenresSet.has(game.genre) &&
          !/Shooter|War|Battle|Zombie/i.test(game.title)
      )
      .slice(0, 12)
      .map((game) => ({
        title: game.title,
        description: game.short_description,
        genre: game.genre,
        link: game.game_url,
        thumbnail: game.thumbnail,
      }));

    return filtered.length ? filtered : curatedPublicGames;
  } catch {
    return curatedPublicGames;
  }
}

export default async function GamesPublikPage() {
  const publicGames = await getPublicGames();

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-sky-200">
          Games Publik
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
          Rekomendasi game aman untuk siswa SD & SMP.
        </h1>
        <p className="max-w-3xl text-base text-slate-300">
          Daftar ini dikurasi otomatis dari FreeToGame API dengan filter genre ramah
          anak dan fallback manual. Jadikan referensi belajar, inspirasi mekanik,
          atau rekomendasi ke guru & orang tua.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {publicGames.map((game) => (
          <article
            key={game.title}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/60 to-slate-950/60 shadow-[0_20px_60px_-40px_rgba(14,165,233,0.9)] transition hover:border-sky-300/60 hover:shadow-[0_35px_80px_-40px_rgba(125,211,252,0.55)]"
          >
            {game.thumbnail && (
              <div
                className="h-40 w-full bg-cover bg-center opacity-80 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                style={{ backgroundImage: `url(${game.thumbnail})` }}
                aria-hidden
              />
            )}
            <div className="flex flex-1 flex-col gap-4 p-5">
              <Tag>{game.genre}</Tag>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-white">
                  {game.title}
                </h2>
                <p className="text-sm text-slate-300">{game.description}</p>
              </div>
              <Link
                href={game.link}
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-sky-200 transition hover:text-sky-100"
              >
                Buka Game
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
