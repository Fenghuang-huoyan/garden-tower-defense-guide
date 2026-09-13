import Link from "next/link";
import { site } from "@/config/site.config";

/** 首页承接主游戏词。区块顺序对齐手册关卡 3 的结构：hero / start / aboutGame / finalCta。 */
export default function Home() {
  const { hero, start, aboutGame, finalCta } = site;
  return (
    <main className="mx-auto max-w-5xl px-4">
      <section className="py-14">
        <p className="text-sm uppercase tracking-wide text-[hsl(var(--theme))]">{hero.eyebrow}</p>
        {/* 全站有且仅有这一个 H1 */}
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{hero.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-[hsl(var(--muted))]">{hero.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {hero.stats.map((s) => (
            <li key={s} className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1 text-sm">{s}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={hero.primaryCta.href} className="rounded-lg bg-[hsl(var(--theme))] px-5 py-2.5 font-medium text-white">{hero.primaryCta.label}</Link>
          <Link href={hero.secondaryCta.href} className="rounded-lg border border-[hsl(var(--border))] px-5 py-2.5 font-medium">{hero.secondaryCta.label}</Link>
          <Link href={hero.tertiaryCta.href} className="rounded-lg border border-[hsl(var(--border))] px-5 py-2.5 font-medium">{hero.tertiaryCta.label}</Link>
        </div>
      </section>

      <section className="py-10">
        <p className="text-sm uppercase tracking-wide text-[hsl(var(--theme))]">{start.eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold">{start.title}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {start.cards.map((c) => (
            <Link key={c.number} href={c.href} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 hover:border-[hsl(var(--theme))]">
              <span className="text-sm font-semibold text-[hsl(var(--theme))]">{c.number}</span>
              <h3 className="mt-1 font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-[hsl(var(--muted))]">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-10">
        <h2 className="text-2xl font-bold">{aboutGame.title}</h2>
        {aboutGame.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="mt-3 max-w-3xl text-[hsl(var(--muted))]">{p}</p>
        ))}
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {aboutGame.stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-[hsl(var(--border))] p-4">
              <dt className="text-sm text-[hsl(var(--muted))]">{s.label}</dt>
              <dd className="mt-1 font-medium">{s.value}</dd>
            </div>
          ))}
        </dl>
        <Link href={aboutGame.cta.href} className="mt-6 inline-block text-[hsl(var(--theme))] hover:underline">{aboutGame.cta.label} →</Link>
      </section>

      <section className="my-10 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8">
        <h2 className="text-2xl font-bold">{finalCta.title}</h2>
        <p className="mt-2 max-w-2xl text-[hsl(var(--muted))]">{finalCta.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={finalCta.primary.href} className="rounded-lg bg-[hsl(var(--theme))] px-5 py-2.5 font-medium text-white">{finalCta.primary.label}</Link>
          <a href={finalCta.secondary.href} rel="noopener noreferrer" className="rounded-lg border border-[hsl(var(--border))] px-5 py-2.5 font-medium">{finalCta.secondary.label}</a>
        </div>
      </section>
    </main>
  );
}
