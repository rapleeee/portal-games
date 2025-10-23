"use client";

import { useState, type FormEvent } from "react";

export default function CommunityPlaytestPage() {
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
    const goal = (formData.get("goal") as string) ?? "";

    const subject = encodeURIComponent(
      `[Portal Games] Request Playtest - ${game || "Game Baru"}`
    );
    const body = encodeURIComponent(
      `Nama: ${name}\nEmail: ${email}\nJudul Game: ${game}\nTujuan Playtest: ${goal}\n\nSaya ingin menjadwalkan sesi playtest bersama komunitas Portal Games.`
    );

    const mailto = `mailto:portalgames.id@gmail.com?subject=${subject}&body=${body}`;

    try {
      setIsSubmitting(true);
      window.location.href = mailto;
      form.reset();
      setFeedbackMessage(
        "Request playtest disiapkan. Jika email tidak muncul, cek mail client kamu."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">
          Komunitas Portal Games
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
          Ajukan sesi playtest dengan pemain target.
        </h1>
        <p className="max-w-3xl text-base text-emerald-100">
          Tim komunitas membantu memfasilitasi playtest bersama siswa SD & SMP. Lengkapi
          formulir di bawah untuk menjadwalkan sesi dan memperoleh rekap insight yang
          dapat langsung kamu implementasikan ke build berikutnya.
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start">
        <div className="space-y-5 rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-sm text-emerald-100">
          <h2 className="text-base font-semibold text-white">Keunggulan playtest</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-300" />
              <span>Waktu pelaksanaan fleksibel mengikuti agenda tim kamu.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-300" />
              <span>Setiap sesi difasilitasi mentor komunitas dan didokumentasikan.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-300" />
              <span>Rekap insight dikirim maksimal 3 hari setelah playtest selesai.</span>
            </li>
          </ul>
          {feedbackMessage && (
            <p className="rounded-2xl border border-emerald-300/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
              {feedbackMessage}
            </p>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-3xl border border-emerald-300/40 bg-gradient-to-br from-slate-900/70 to-slate-950/70 p-6 shadow-[0_24px_70px_-40px_rgba(16,185,129,0.65)]"
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
              name="goal"
              rows={4}
              required
              placeholder="Contoh: cek tingkat kesulitan, validasi UI tutorial, dll."
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
      </section>
    </div>
  );
}
