"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  communityHighlights,
  gameInsights,
  resourceLinks,
  sidebarLinks,
  upcomingEvents,
  type GameCard,
} from "@/lib/siteData";

type PortalPageProps = {
  personalGames: GameCard[];
  publicGames: GameCard[];
  totalGames: number;
};

export function PortalPage({
  personalGames,
  publicGames,
  totalGames,
}: PortalPageProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navLinks = useMemo(() => sidebarLinks, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-500/40 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-cyan-500/30 blur-[120px]" />
        <div className="absolute bottom-20 right-0 h-[320px] w-[280px] rounded-full bg-fuchsia-500/40 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-8 px-6 py-10 lg:flex-row lg:pl-[300px] lg:pr-12">
        <MobileHeader
          isNavOpen={isNavOpen}
          onToggle={() => setIsNavOpen((prev) => !prev)}
          navLinks={navLinks}
        />

        <Sidebar
          navLinks={navLinks}
          totalGames={totalGames}
          isNavOpen={isNavOpen}
          onClose={() => setIsNavOpen(false)}
        />

        <main className="order-1 flex w-full flex-col gap-12 lg:order-2">
          <Hero totalGames={totalGames} />
          <PersonalGamesSection games={personalGames} />
          <PublicGamesSection games={publicGames} />
          <InsightSection />
          <CommunitySection />
          <EventsSection />
          <ResourcesSection />
          <PlaytestSection />
        </main>
      </div>
    </div>
  );
}

type NavLinks = typeof sidebarLinks;

type SidebarProps = {
  navLinks: NavLinks;
  totalGames: number;
  isNavOpen: boolean;
  onClose: () => void;
};

function Sidebar({ navLinks, totalGames, isNavOpen, onClose }: SidebarProps) {
  return (
    <>
      <aside
        id="portal-sidebar"
        className={`fixed left-0 top-0 z-40 flex h-full w-[260px] flex-col gap-8 border-r border-white/10 bg-slate-950/95 px-6 py-10 backdrop-blur-xl transition-transform duration-300 lg:max-h-screen lg:overflow-y-auto lg:translate-x-0 ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-sm font-medium text-indigo-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Portal Games Hub
          </div>
          <h1 className="mt-4 text-2xl font-semibold leading-tight">
            Mainkan. Belajar. Bangun.
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Katalog game edukatif dan kreatif untuk komunitas pembuat game muda.
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <aside className="flex flex-col gap-5 rounded-3xl border border-indigo-500/40 bg-indigo-500/10 p-5">
          <div className="flex items-center gap-2 text-indigo-200">
            <span className="h-3 w-3 animate-ping rounded-full bg-emerald-400" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              Badge Komunitas
            </span>
          </div>
          <p className="text-sm text-slate-100">
            Dapatkan akses Discord, mentor industri, dan sesi build bareng.
          </p>
          <Link
            href="https://example.com/join-community"
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-300"
          >
            Join Komunitas
          </Link>
        </aside>

        <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-5 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-widest text-indigo-200">
            Koleksi Aktif
          </p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {totalGames.toString().padStart(2, "0")}+
          </p>
          <p className="mt-1">Portal games ramah SD & SMP</p>
        </div>
      </aside>

      {isNavOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}

type MobileHeaderProps = {
  isNavOpen: boolean;
  onToggle: () => void;
  navLinks: NavLinks;
};

function MobileHeader({ isNavOpen, onToggle, navLinks }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 backdrop-blur-md lg:hidden">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-indigo-200">
          Portal Games
        </p>
        <p className="text-sm text-slate-200">Hub kreator & pemain muda</p>
      </div>
      <button
        type="button"
        className="relative h-11 w-11 rounded-full border border-white/20 bg-white/5 text-white transition hover:border-indigo-400/60 hover:bg-indigo-500/20"
        onClick={onToggle}
        aria-label="Toggle navigation"
        aria-expanded={isNavOpen}
        aria-controls="portal-mobile-menu"
      >
        <span
          className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-2 transform bg-white transition ${
            isNavOpen ? "rotate-45 translate-y-0" : ""
          }`}
        />
        <span
          className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 transform bg-white transition ${
            isNavOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 translate-y-2 transform bg-white transition ${
            isNavOpen ? "-rotate-45 translate-y-0" : ""
          }`}
        />
      </button>

      {isNavOpen && (
        <nav
          id="portal-mobile-menu"
          className="absolute right-0 top-[4.2rem] flex w-full flex-col gap-2 rounded-3xl border border-white/10 bg-slate-950/95 p-5 shadow-xl"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-indigo-500/10"
              onClick={onToggle}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero({ totalGames }: { totalGames: number }) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/30 via-slate-900 to-slate-950 p-10 shadow-[0_25px_80px_-40px_rgba(56,189,248,0.9)]"
    >
      <div className="absolute -top-20 right-10 h-48 w-48 rounded-full border border-white/20 opacity-30" />
      <div className="absolute left-10 top-14 h-20 w-20 rounded-xl border border-white/10 bg-white/5 backdrop-blur" />
      <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">
            Portal Games Universe
          </p>
          <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
            Pusat inspirasi untuk pemain muda dan kreator game Indonesia.
          </h2>
          <p className="text-base text-slate-200 md:text-lg">
            Jelajahi game buatan komunitas, temukan judul publik yang aman,
            dan ikuti kegiatan yang mendorong anak SD & SMP belajar lewat
            pengalaman bermain.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#personal-games"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-300"
            >
              Telusuri Karya
            </Link>
            <Link
              href="#community"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-indigo-300 hover:text-white"
            >
              Gabung Komunitas
            </Link>
          </div>
        </div>
        <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 backdrop-blur-lg md:text-base">
          <div>
            <p className="text-xs uppercase tracking-wider text-indigo-200">
              Koleksi
            </p>
            <p className="text-3xl font-semibold text-white">
              {totalGames.toString().padStart(2, "0")}+
            </p>
            <p>Game terkurasi</p>
          </div>
          <div className="hidden h-full w-px bg-white/10 md:block" />
          <div>
            <p className="text-xs uppercase tracking-wider text-indigo-200">
              Fokus
            </p>
            <p className="text-3xl font-semibold text-white">Pembelajar</p>
            <p>Usia 8 - 15 tahun</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PersonalGamesSection({ games }: { games: GameCard[] }) {
  return (
    <section
      id="personal-games"
      className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
    >
      <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-200">
            Games Buatan Kamu
          </p>
          <h3 className="text-3xl font-semibold text-white">
            Rak Portofolio Digital
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Simpan semua project terbaikmu di satu halaman agar mudah dibagikan
            ke sekolah, event, atau kolaborator baru.
          </p>
        </div>
        <Link
          href="mailto:portalgames.id@gmail.com?subject=Submit Game Portal Games"
          className="inline-flex items-center justify-center rounded-full border border-indigo-300/60 px-5 py-2 text-sm font-semibold text-indigo-100 transition hover:border-indigo-200 hover:text-white"
        >
          Tambah Game Baru
        </Link>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {games.map((game) => (
          <article
            key={game.title}
            className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/40 p-6 transition hover:border-indigo-400/50 hover:bg-slate-900/80"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xl font-semibold text-white">
                  {game.title}
                </h4>
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
    </section>
  );
}

function PublicGamesSection({ games }: { games: GameCard[] }) {
  return (
    <section
      id="public-games"
      className="rounded-3xl border border-sky-400/30 bg-sky-500/10 p-8 backdrop-blur"
    >
      <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sky-200">
            Rekomendasi Terkurasi
          </p>
          <h3 className="text-3xl font-semibold text-white">
            Games Publik Ramah Anak
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-sky-100">
            Daftar otomatis dari FreeToGame API dengan filter genre aman,
            disempurnakan dengan kurasi manual supaya selalu relevan.
          </p>
        </div>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <article
            key={game.title}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/20 bg-slate-950/60 transition hover:border-white hover:bg-slate-950"
          >
            {game.thumbnail && (
              <div
                className="h-36 w-full bg-cover bg-center opacity-80 transition group-hover:opacity-100"
                style={{ backgroundImage: `url(${game.thumbnail})` }}
                aria-hidden
              />
            )}
            <div className="flex flex-1 flex-col gap-4 p-5">
              <div className="flex items-center gap-2">
                <Tag>{game.genre}</Tag>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-white">
                  {game.title}
                </h4>
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
    </section>
  );
}

function InsightSection() {
  return (
    <section
      id="insight"
      className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
    >
      <header className="border-b border-white/10 pb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-200">
          Insight Dunia Game
        </p>
        <h3 className="mt-2 text-3xl font-semibold text-white">
          Fakta & Inspirasi Konten
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Pakai insight ini untuk materi sosmed, newsletter komunitas, atau
          pitch ke sekolah dan orang tua.
        </p>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {gameInsights.map((insight) => (
          <article
            key={insight.title}
            className="rounded-3xl border border-white/10 bg-slate-900/60 p-6"
          >
            <h4 className="text-lg font-semibold text-white">
              {insight.title}
            </h4>
            <p className="mt-3 text-sm text-slate-300">{insight.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section
      id="community"
      className="rounded-3xl border border-emerald-400/40 bg-emerald-500/10 p-8 backdrop-blur"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">
            Komunitas Portal Games
          </p>
          <h3 className="text-3xl font-semibold text-white">
            Belajar bikin game dari mentor & teman satu frekuensi.
          </h3>
          <p className="text-sm text-emerald-100">
            Gabung dan dapatkan badge profil, akses Discord, materi kurikulum,
            dan sesi feedback rutin yang membantu rilis game lebih cepat.
          </p>
        </div>
        <Link
          href="https://example.com/join-community"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-100"
        >
          Join Komunitas
        </Link>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {communityHighlights.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-emerald-500/10 p-5 text-sm text-emerald-100"
          >
            <h4 className="text-base font-semibold text-white">{item.title}</h4>
            <p className="mt-2">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function EventsSection() {
  return (
    <section
      id="events"
      className="rounded-3xl border border-indigo-400/40 bg-indigo-500/10 p-8 backdrop-blur"
    >
      <header className="border-b border-white/10 pb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-indigo-100">
          Kalender Portal Games
        </p>
        <h3 className="mt-2 text-3xl font-semibold text-white">
          Agenda komunitas & sesi belajar terdekat.
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-indigo-50">
          Semua aktivitas terbuka untuk anggota baru. Catat jadwalnya dan ajak
          teman supaya makin ramai.
        </p>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map((event) => (
          <article
            key={event.title}
            className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-slate-950/70 p-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-indigo-100">
                <span>{event.format}</span>
                <span>{event.time}</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-white">
                  {event.title}
                </h4>
                <p className="text-sm text-indigo-100">{event.focus}</p>
              </div>
              <div className="rounded-2xl border border-indigo-400/40 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-100">
                {event.date}
              </div>
            </div>
            <Link
              href={event.link}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-100 transition hover:text-white"
            >
              Detail & RSVP <span aria-hidden>↗</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section
      id="resources"
      className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
    >
      <header className="border-b border-white/10 pb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-100">
          Resource Library
        </p>
        <h3 className="mt-2 text-3xl font-semibold text-white">
          Toolkit cepat buat produksi game kamu.
        </h3>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          Gunakan resources ini untuk mempercepat proses dari ide ke demo,
          mulai dari dokumen desain sampai asset pendukung.
        </p>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {resourceLinks.map((resource) => (
          <article
            key={resource.title}
            className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6"
          >
            <div className="flex items-center gap-2">
              <Tag>{resource.tag}</Tag>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-white">
                {resource.title}
              </h4>
              <p className="text-sm text-slate-300">{resource.description}</p>
            </div>
            <Link
              href={resource.link}
              className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-slate-100 transition hover:text-white"
            >
              Download <span aria-hidden>↗</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function PlaytestSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) ?? "";
    const email = (formData.get("email") as string) ?? "";
    const game = (formData.get("game") as string) ?? "";
    const goals = (formData.get("goals") as string) ?? "";

    const subject = encodeURIComponent(
      `[Portal Games] Request Playtest - ${game || "Game Baru"}`
    );
    const body = encodeURIComponent(
      `Nama: ${name}\nEmail: ${email}\nJudul Game: ${game}\nTujuan Playtest: ${goals}\n\nSaya ingin menjadwalkan sesi playtest bersama komunitas Portal Games.`
    );

    const mailto = `mailto:portalgames.id@gmail.com?subject=${subject}&body=${body}`;

    try {
      setIsSubmitting(true);
      window.location.href = mailto;
      form.reset();
      setFeedbackMessage(
        "Request playtest kamu sudah disiapkan. Jika email belum terbuka, cek pengaturan mail client."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="playtest"
      className="rounded-3xl border border-emerald-400/40 bg-emerald-500/10 p-8 backdrop-blur"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">
            Request Playtest
          </p>
          <h3 className="text-3xl font-semibold text-white">
            Dapatkan feedback jujur dari pemain target.
          </h3>
          <p className="text-sm text-emerald-100">
            Tim komunitas akan hubungi kamu untuk memfasilitasi sesi playtest
            terstruktur, lengkap dengan checklist observasi agar sesuai kebutuhan
            siswa SD & SMP.
          </p>
          <ul className="text-sm text-emerald-100">
            <li>- Waktu playtest fleksibel sesuai jadwal tim kamu.</li>
            <li>- Rekap insight dikirim maksimal 3 hari setelah sesi.</li>
            <li>- Prioritas untuk anggota aktif komunitas Portal Games.</li>
          </ul>
          {feedbackMessage && (
            <p className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
              {feedbackMessage}
            </p>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6"
        >
          <label className="text-sm font-semibold text-white">
            Nama Lengkap
            <input
              name="name"
              type="text"
              required
              placeholder="Contoh: Rafa L."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-300 focus:outline-none"
            />
          </label>
          <label className="text-sm font-semibold text-white">
            Email Aktif
            <input
              name="email"
              type="email"
              required
              placeholder="Email untuk follow-up"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-300 focus:outline-none"
            />
          </label>
          <label className="text-sm font-semibold text-white">
            Judul Game
            <input
              name="game"
              type="text"
              required
              placeholder="Nama game yang akan diuji"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-300 focus:outline-none"
            />
          </label>
          <label className="text-sm font-semibold text-white">
            Tujuan Playtest
            <textarea
              name="goals"
              required
              rows={4}
              placeholder="Contoh: cek tingkat kesulitan level 2, validasi UI tutorial, dll."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-300 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Menyiapkan Email..." : "Kirim Request Playtest"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200">
      {children}
    </span>
  );
}
