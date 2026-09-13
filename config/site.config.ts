/**
 * 配置层 —— 换一个游戏，只改这个文件。
 * 字段结构刻意对齐《8月航海》手册关卡 3 的 ChatGPT 调研提示词输出的 JSON，
 * 这样手册流程产出的素材可以直接填进来，不用二次转换。
 */
export type NavCategory = { slug: string; label: string };

export const site = {
  // ---- 基本信息 ----
  gameName: "Garden Tower Defense",
  siteName: "Garden Tower Defense Guide",
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
  theme: {
    light: { theme: "142 65% 38%", themeLight: "142 60% 50%", bg: "0 0% 100%", fg: "150 20% 12%", muted: "150 8% 45%", card: "140 20% 97%", border: "140 12% 88%" },
    dark:  { theme: "142 55% 55%", themeLight: "142 55% 68%", bg: "150 20% 8%",  fg: "140 15% 94%", muted: "140 8% 62%",  card: "150 16% 13%", border: "150 12% 20%" },
  },

  // ---- 多语言（手册：最多 4 门，必须有英语；新手先把英语做扎实）----
  i18n: { locales: ["en"] as const, defaultLocale: "en" as const },

  // ---- 导航分类（对应 content/<locale>/<category>/ 目录，对齐 keywords.json 16 个分类）----
  categories: [
    { slug: "codes", label: "Codes" },
    { slug: "values", label: "Values" },
    { slug: "tier-list", label: "Tier List" },
    { slug: "units", label: "Units" },
    { slug: "best-units", label: "Best Units" },
    { slug: "best-dps", label: "Best DPS" },
    { slug: "plants", label: "Plants" },
    { slug: "loadout", label: "Loadout" },
    { slug: "pvp", label: "PvP" },
    { slug: "endless", label: "Endless" },
    { slug: "early-game", label: "Early Game" },
    { slug: "money-farm", label: "Money Farm" },
    { slug: "crates", label: "Crates" },
    { slug: "trading", label: "Trading" },
    { slug: "calculator", label: "Calculator" },
    { slug: "guide", label: "Guide" },
  ] satisfies NavCategory[],

  // ---- 首页各区块 ----
  hero: {
    eyebrow: "Fan-Made Community Wiki",
    title: "Garden Tower Defense",
    description:
      "Grow an army of 350+ plant units, defend your base from waves of enemies, and climb the leaderboard. Every guide here is checked against official sources and community data.",
    stats: ["350+ Plant Units", "Weekly Updates: Sat 13:00 UTC", "3.3M+ Community Members", "Roblox Tower Defense"],
    primaryCta: { label: "Start Beginner Guide", href: "/guide/beginner-guide" },
    secondaryCta: { label: "Check Active Codes", href: "/codes" },
    tertiaryCta: { label: "Browse Tier List", href: "/tier-list" },
  },

  start: {
    eyebrow: "Start Here",
    title: "Your Garden Tower Defense Journey",
    cards: [
      { number: "1", title: "Beginner Guide", description: "Controls, your first units and your first hour.", href: "/guide/beginner-guide" },
      { number: "2", title: "Active Codes", description: "Working codes with rewards and redemption steps.", href: "/codes" },
      { number: "3", title: "Tier List", description: "Every unit ranked, with the evidence behind each ranking.", href: "/tier-list" },
      { number: "4", title: "Value List", description: "Current trading values for units and gamepasses.", href: "/values" },
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
    primary: { label: "Read the Beginner Guide", href: "/guide/beginner-guide" },
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
