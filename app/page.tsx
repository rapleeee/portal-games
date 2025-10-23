import { PortalPage } from "@/app/components/portal-page";
import {
  curatedPublicGames,
  friendlyGenres,
  personalGames,
  type GameCard,
} from "@/lib/siteData";

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
      .slice(0, 8)
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

export default async function Home() {
  const publicGames = await getPublicGames();
  const totalGames = personalGames.length + publicGames.length;

  return (
    <PortalPage
      personalGames={personalGames}
      publicGames={publicGames}
      totalGames={totalGames}
    />
  );
}
