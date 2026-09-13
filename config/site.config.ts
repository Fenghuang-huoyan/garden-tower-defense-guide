/**
 * 配置层 —— 换一个游戏，只改这个文件。
 * 字段结构刻意对齐《8月航海》手册关卡 3 的 ChatGPT 调研提示词输出的 JSON，
 * 这样手册流程产出的素材可以直接填进来，不用二次转换。
 */
/** image：分类卡片配图，放在 public/ 下的路径；内页 frontmatter 的 image 优先于它 */
export type NavCategory = { slug: string; label: string; image?: string };

// ---- 图片（官方宣传图自托管在 public/，Roblox CDN 链接带 180DAY- 前缀会过期，不能热链）----
const IMG = {
  sunflowers: "/images/official/roblox/hero.png",
  tower: "/images/official/roblox/promo-2.png",
  pepper: "/images/official/roblox/promo-3.png",
};

export const site = {
  // ---- 基本信息 ----
  gameName: "Garden Tower Defense",
  siteName: "Garden Tower Defense Guide",
  // 导航 logo 与 apple icon；/favicon.ico 放在 public/ 根目录
  logo: "/images/logo.png",
  // 上线前改成真实域名；本地开发用 localhost
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "https://gardentowerdefenseguide.wiki",

  // ---- SEO 元数据 ----
  meta: {
    title: "Garden Tower Defense Guide — Codes, Tier List, Value List",
    description:
      "Community-checked Garden Tower Defense wiki for Roblox: active codes, tier list, best units, trading values and beginner guides, updated from official and cross-verified sources.",
    keywords: "Garden Tower Defense, Roblox, codes, tier list, value list, best units",
  },

  // ---- 官方链接（手册：只放官方和正经社群，不留 404）----
  links: {
    platform: "https://www.roblox.com/games/108533757090220/Garden-Tower-Defense",
    official: "https://www.roblox.com/communities/35989084/Garden-Defenders",
    discord: "",
    youtube: "",
    reddit: "",
  },

  // ---- 主题色（HSL，亮暗两套，全站唯一来源）----
  // 键名自动转成 CSS 变量（themeShadow → --theme-shadow）。配色取自游戏画面：
  // 草绿（主色/按钮）、向日葵黄（强调按钮）、天蓝（背景底色）、泥土棕（正文）
  theme: {
    light: {
      theme: "122 65% 30%", themeLight: "122 55% 42%", themeShadow: "122 70% 18%",
      accent: "48 100% 52%", accentFg: "25 60% 16%", accentShadow: "38 95% 40%",
      bg: "200 100% 97%", fg: "25 35% 14%", muted: "25 12% 36%", card: "0 0% 100%", border: "200 40% 85%",
    },
    dark: {
      theme: "122 58% 36%", themeLight: "122 50% 55%", themeShadow: "122 65% 20%",
      accent: "48 100% 55%", accentFg: "25 60% 12%", accentShadow: "38 90% 35%",
      bg: "205 45% 9%", fg: "45 30% 94%", muted: "200 12% 68%", card: "205 35% 14%", border: "205 25% 22%",
    },
  },

  // ---- 多语言（手册：最多 4 门，必须有英语；新手先把英语做扎实）----
  i18n: { locales: ["en"] as const, defaultLocale: "en" as const },

  // ---- 导航分类（对应 content/<locale>/<category>/ 目录，对齐 keywords.json 16 个分类）----
  categories: [
    { slug: "codes", label: "Codes", image: IMG.sunflowers },
    { slug: "values", label: "Values", image: IMG.pepper },
    { slug: "tier-list", label: "Tier List", image: IMG.tower },
    { slug: "units", label: "Units", image: IMG.tower },
    { slug: "best-units", label: "Best Units", image: IMG.pepper },
    { slug: "best-dps", label: "Best DPS", image: IMG.pepper },
    { slug: "plants", label: "Plants", image: IMG.sunflowers },
    { slug: "loadout", label: "Loadout", image: IMG.tower },
    { slug: "pvp", label: "PvP", image: IMG.pepper },
    { slug: "endless", label: "Endless", image: IMG.sunflowers },
    { slug: "early-game", label: "Early Game", image: IMG.sunflowers },
    { slug: "money-farm", label: "Money Farm", image: IMG.pepper },
    { slug: "crates", label: "Crates", image: IMG.tower },
    { slug: "trading", label: "Trading", image: IMG.pepper },
    { slug: "calculator", label: "Calculator", image: IMG.tower },
    { slug: "guide", label: "Guide", image: IMG.sunflowers },
  ] satisfies NavCategory[],

  // ---- 首页各区块 ----
  hero: {
    eyebrow: "Fan-Made Community Wiki",
    title: "Garden Tower Defense",
    image: { src: IMG.sunflowers, alt: "Sunflower units defending against red ants in Garden Tower Defense, official Roblox promo art" },
    description:
      "Grow an army of 350+ plant units, defend your base from waves of enemies, and climb the leaderboard. Every guide here is checked against official sources and community data.",
    stats: ["350+ Plant Units", "Weekly Updates: Sat 13:00 UTC", "3.3M+ Community Members", "Roblox Tower Defense"],
    primaryCta: { label: "Start Beginner Guide", href: "/guide/garden-tower-defense-beginner-guide" },
    secondaryCta: { label: "Check Active Codes", href: "/codes" },
    tertiaryCta: { label: "Browse Tier List", href: "/tier-list" },
  },

  start: {
    eyebrow: "Start Here",
    title: "Your Garden Tower Defense Journey",
    cards: [
      { number: "1", title: "Beginner Guide", description: "Controls, your first units and your first hour.", href: "/guide/garden-tower-defense-beginner-guide", image: IMG.sunflowers },
      { number: "2", title: "Active Codes", description: "Working codes with rewards and redemption steps.", href: "/codes", image: IMG.tower },
      { number: "3", title: "Tier List", description: "Every unit ranked, with the evidence behind each ranking.", href: "/tier-list", image: IMG.pepper },
      { number: "4", title: "Value List", description: "Current trading values for units and gamepasses.", href: "/values", image: IMG.sunflowers },
    ],
  },

  aboutGame: {
    title: "What is Garden Tower Defense?",
    paragraphs: [
      "Garden Tower Defense is a free Roblox tower defense game by Garden Defenders. Build an army of plant units to defend your base from waves of enemies, with over 350 plants, flowers and units to grow, each with unique attacks and abilities.",
      "The game ships weekly updates every Saturday at 13:00 UTC, and its community group on Roblox has surpassed 3.3M members.",
    ],
    stats: [
      { label: "Developer", value: "Garden Defenders" },
      { label: "Platform", value: "Roblox" },
      { label: "Genre", value: "Tower Defense / Strategy" },
    ],
    cta: { label: "Explore All Guides", href: "/guide" },
  },

  finalCta: {
    title: "Ready to Defend Your Garden?",
    description: "From your first plant to endgame tier picks, every page here cites where its claims came from.",
    primary: { label: "Read the Beginner Guide", href: "/guide/garden-tower-defense-beginner-guide" },
    secondary: { label: "Play on Roblox", href: "https://www.roblox.com/games/108533757090220/Garden-Tower-Defense" },
  },

  footer: {
    aboutTitle: "Garden Tower Defense Guide",
    about:
      "An independent, fan-made Garden Tower Defense reference. Not affiliated with Garden Defenders or Roblox Corporation.",
    description: "Free Roblox tower defense game. Grow plant units, defend your base, climb the leaderboard.",
  },
} as const;

export type Site = typeof site;
