/** 框架层：导航与页脚。升级为紧凑胶囊导航与清晰层级，保留三种页型零耦合配置驱动。 */
import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site.config";
import { getNavCategories } from "@/lib/content";

const FEATURED_SLUGS = new Set(["values", "codes", "tier-list", "calculator"]);

export function Nav() {
  const cats = getNavCategories();
  return (
    <header className="sticky top-0 z-50 border-b-2 border-[hsl(var(--theme))]/40 bg-[hsl(var(--card))]/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
        <Link href="/" className="font-display flex shrink-0 items-center gap-2.5 text-lg font-bold text-[hsl(var(--theme))]">
          <Image src={site.logo} alt="" width={34} height={34} className="rounded-lg shadow-xs" />
          <span>{site.siteName}</span>
        </Link>
        {/* 手机端单行横滑，桌面端胶囊排布，核心工具高亮 */}
        <ul className="flex w-full items-center gap-1.5 overflow-x-auto py-0.5 whitespace-nowrap text-xs font-semibold sm:w-auto sm:flex-1 sm:flex-wrap sm:whitespace-normal">
          {cats.map((c) => {
            const isHot = FEATURED_SLUGS.has(c.slug);
            return (
              <li key={c.slug}>
                <Link
                  href={`/${c.slug}`}
                  className={
                    isHot
                      ? "inline-flex min-h-[32px] items-center rounded-full border border-[hsl(var(--theme))]/35 bg-[hsl(var(--theme))]/12 px-3 py-1 text-[hsl(var(--theme))] transition hover:bg-[hsl(var(--theme))] hover:text-white"
                      : "inline-flex min-h-[32px] items-center rounded-full px-2.5 py-1 text-[hsl(var(--muted))] transition hover:bg-[hsl(var(--border))]/45 hover:text-[hsl(var(--fg))]"
                  }
                >
                  {c.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export function Footer() {
  const { footer, links, gameName } = site;
  const external = [
    links.official && { label: "Official Community", href: links.official },
    links.discord && { label: "Discord", href: links.discord },
    links.youtube && { label: "YouTube", href: links.youtube },
    links.platform && { label: `Play ${gameName}`, href: links.platform },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="mt-20 border-t-2 border-[hsl(var(--theme))]/40 bg-[hsl(var(--card))]">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm">
        <h2 className="font-semibold text-base">{footer.aboutTitle}</h2>
        <p className="mt-2 max-w-2xl text-[hsl(var(--muted))]">{footer.about}</p>
        <p className="mt-1 max-w-2xl text-[hsl(var(--muted))]">{footer.description}</p>
        {external.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-4 font-semibold">
            {external.map((l) => (
              <li key={l.href}>
                <a href={l.href} rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[hsl(var(--theme))] hover:underline">
                  <span>{l.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-4 flex gap-4 text-[hsl(var(--muted))]">
          <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
          <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
        </ul>
      </div>
    </footer>
  );
}
