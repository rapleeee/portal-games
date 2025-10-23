export type GameCard = {
  title: string;
  description: string;
  genre: string;
  link: string;
  tech?: string[];
  status?: string;
  thumbnail?: string;
};

export type Insight = {
  title: string;
  detail: string;
};

export type Highlight = {
  title: string;
  detail: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type Event = {
  title: string;
  date: string;
  time: string;
  format: string;
  focus: string;
  link: string;
};

export type Resource = {
  title: string;
  description: string;
  link: string;
  tag: string;
};

export const personalGames: GameCard[] = [
  {
    title: "Portal Runner",
    description:
      "Platformer refleks cepat dengan portal antar dimensi dan level yang terus berubah.",
    genre: "Platformer",
    link: "https://example.com/portal-runner",
    tech: ["Phaser", "TypeScript"],
    status: "Live",
  },
  {
    title: "Eco Tycoon",
    description:
      "Simulator membangun kota hijau. Pemain belajar manajemen energi dan lingkungan.",
    genre: "Simulasi Edukasi",
    link: "https://example.com/eco-tycoon",
    tech: ["React", "Three.js"],
    status: "Beta",
  },
  {
    title: "Robo Puzzle Lab",
    description:
      "Puzzle coding yang mengajarkan logika pemrograman lewat robot lucu dan level menantang.",
    genre: "Puzzle Edukasi",
    link: "https://example.com/robo-puzzle-lab",
    tech: ["Unity", "C#"],
    status: "Live",
  },
  {
    title: "Galaxy Rhythm",
    description:
      "Game ritme musik dengan elemen sci-fi, cocok dimainkan bersama teman SMP/SMA.",
    genre: "Rhythm",
    link: "https://example.com/galaxy-rhythm",
    tech: ["Godot", "GDScript"],
    status: "Prototype",
  },
];

export const curatedPublicGames: GameCard[] = [
  {
    title: "Prodigy Math Game",
    description:
      "Petualangan matematika berbasis cerita yang cocok untuk siswa SD & SMP.",
    genre: "Edukasi RPG",
    link: "https://www.prodigygame.com/main-en/",
    thumbnail:
      "https://images.ctfassets.net/si9mqy6u7qtl/2LQWz_J3iWikoSokHbX0ds/e0a30d1d5b020b7b4b182965d4536c59/prodigy-thumbnail.jpg",
  },
  {
    title: "Lightbot",
    description:
      "Game puzzle pemrograman yang mengasah kemampuan logika dengan cara yang menyenangkan.",
    genre: "Puzzle",
    link: "https://lightbot.com/",
    thumbnail:
      "https://lightbot.com/images/shared/lightbot-logo-square.png",
  },
  {
    title: "PBS Kids Games",
    description:
      "Koleksi game ramah anak dengan karakter program PBS yang edukatif dan aman.",
    genre: "Mini Games",
    link: "https://pbskids.org/games/",
    thumbnail:
      "https://pbskids.org/apps/assets/images/pbskids-share.jpg",
  },
  {
    title: "Scratch Game Gallery",
    description:
      "Game buatan komunitas Scratch untuk menginspirasi anak mempelajari coding.",
    genre: "Kreatif",
    link: "https://scratch.mit.edu/explore/projects/games/",
    thumbnail:
      "https://scratch.mit.edu/images/scratch-og.png",
  },
  {
    title: "GeoGuessr - Seterra Geography",
    description:
      "Permainan geografi interaktif untuk mengenal negara, bendera, dan kota dunia.",
    genre: "Edukasi",
    link: "https://www.geoguessr.com/seterra",
    thumbnail:
      "https://www.geoguessr.com/_next/static/media/share-img.b12bcdf2.png",
  },
  {
    title: "Turtle Diary STEM Games",
    description:
      "Bank game sains, matematika, dan bahasa dengan visual cerah ramah anak.",
    genre: "STEM",
    link: "https://www.turtlediary.com/games.html",
    thumbnail:
      "https://www.turtlediary.com/images-new/turtlediary-logo.png",
  },
];

export const gameInsights: Insight[] = [
  {
    title: "Industri Game Tumbuh Cepat",
    detail:
      "Pendapatan global industri game 2023 tembus USD 184 miliar, melampaui gabungan film dan musik.",
  },
  {
    title: "Player Suka Belajar",
    detail:
      "76% gamer usia sekolah menjadikan game edukasi untuk eksplorasi minat baru seperti STEM dan seni.",
  },
  {
    title: "Komunitas Membuat Betah",
    detail:
      "Komunitas dengan event rutin meningkatkan retensi pemain hingga 2,5x dibanding game tanpa komunitas.",
  },
];

export const communityHighlights: Highlight[] = [
  {
    title: "Workshop Build Rutin",
    detail: "Kolaborasi bikin mini game 3 jam setiap Jumat malam.",
  },
  {
    title: "Mentor Industri",
    detail:
      "Sesi AMA dengan developer profesional dan alumni jam game lokal.",
  },
  {
    title: "Challenge Bulanan",
    detail: "Tema baru tiap bulan dengan hadiah akses asset premium.",
  },
];

export const sidebarLinks: NavLink[] = [
  { label: "Beranda", href: "#hero" },
  { label: "Games Kamu", href: "#personal-games" },
  { label: "Games Publik", href: "#public-games" },
  { label: "Insight", href: "#insight" },
  { label: "Komunitas", href: "#community" },
  { label: "Event", href: "#events" },
  { label: "Resource", href: "#resources" },
  { label: "Playtest", href: "#playtest" },
];

export const friendlyGenres = [
  "Card Game",
  "Strategy",
  "Racing",
  "Sports",
  "Puzzle",
  "Educational",
  "Casual",
  "Adventure",
  "Simulation",
  "Platformer",
];

export const upcomingEvents: Event[] = [
  {
    title: "Portal Games Jam Mini",
    date: "19 April 2024",
    time: "19.00 - 21.30 WIB",
    format: "Virtual",
    focus: "Prototype game edukasi tema lingkungan",
    link: "https://example.com/event/game-jam",
  },
  {
    title: "Mentoring Art & UI",
    date: "27 April 2024",
    time: "10.00 - 12.00 WIB",
    format: "Hybrid (Jakarta & Zoom)",
    focus: "Menyusun visual guide untuk game anak SD",
    link: "https://example.com/event/mentor-ui",
  },
  {
    title: "Showcase Bulanan",
    date: "4 Mei 2024",
    time: "15.00 - 17.00 WIB",
    format: "Streaming YouTube",
    focus: "Demo level terbaru & pengumpulan feedback komunitas",
    link: "https://example.com/event/showcase",
  },
];

export const resourceLinks: Resource[] = [
  {
    title: "Template Game Design Doc",
    description:
      "Format ringkas untuk merencanakan gameplay, karakter, dan level.",
    link: "https://example.com/resources/gdd-template",
    tag: "Docs",
  },
  {
    title: "Starter Asset Pack Edukasi",
    description:
      "Kumpulan sprite dan audio free-to-use untuk game belajar sains.",
    link: "https://example.com/resources/asset-pack",
    tag: "Asset",
  },
  {
    title: "Checklist Playtest Anak",
    description:
      "Checklist observasi agar sesi playtest dengan siswa berjalan aman.",
    link: "https://example.com/resources/playtest-checklist",
    tag: "Playtest",
  },
];
