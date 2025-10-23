import Link from "next/link";
import { upcomingEvents } from "@/lib/siteData";

export default function CommunityEventsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-indigo-200">
          Komunitas Portal Games
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
          Agenda komunitas dan sesi belajar terdekat.
        </h1>
        <p className="max-w-3xl text-base text-slate-300">
          Semua kegiatan terbuka untuk anggota baru. Catat jadwal dan RSVP supaya slot
          kamu aman dan mentor bisa menyiapkan materi sesuai kebutuhan.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map((event) => (
          <article
            key={event.title}
            className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-950/60 p-6 shadow-[0_20px_60px_-40px_rgba(99,102,241,0.8)] transition hover:border-indigo-300/60 hover:shadow-[0_30px_80px_-45px_rgba(129,140,248,0.65)]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-indigo-100">
                <span>{event.format}</span>
                <span>{event.time}</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-white">
                  {event.title}
                </h2>
                <p className="text-sm text-slate-300">{event.focus}</p>
              </div>
              <div className="rounded-2xl border border-indigo-400/40 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-100">
                {event.date}
              </div>
            </div>
            <Link
              href={event.link}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-100 transition hover:text-white"
            >
              Detail & RSVP
              <span aria-hidden>↗</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
