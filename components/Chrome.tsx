/** 框架层：导航与页脚。三种页型共用，换游戏时一行都不用改。 */
import Link from "next/link";
import { site } from "@/config/site.config";
import { getNavCategories } from "@/lib/content";

export function Nav() {
  const cats = getNavCategories();
  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--bg))]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
        <Link href="/" className="font-semibold text-[hsl(var(--theme))]">
          {site.siteName}
        </Link>
        <ul className="flex flex-wrap gap-4 text-sm">
          {cats.map((c) => (
            <li key={c.slug}>
              <Link href={`/${c.slug}`} className="text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]">
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function Footer() {
  const { footer, links, gameName } = site;
  const external = [
    links.official && { label: "Official Site", href: links.official },
    links.discord && { label: "Discord", href: links.discord },
    links.youtube && { label: "YouTube", href: links.youtube },
    links.platform && { label: `Play ${gameName}`, href: links.platform },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="mt-20 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm">
        <h2 className="font-semibold">{footer.aboutTitle}</h2>
        <p className="mt-2 max-w-2xl text-[hsl(var(--muted))]">{footer.about}</p>
        <p className="mt-1 max-w-2xl text-[hsl(var(--muted))]">{footer.description}</p>
        {external.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-4">
            {external.map((l) => (
              <li key={l.href}>
                <a href={l.href} rel="noopener noreferrer" className="text-[hsl(var(--theme))] hover:underline">
                  {l.label}
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
