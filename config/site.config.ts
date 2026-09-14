/**
 * 配置层 —— 换一个游戏，只改这个文件。
 * 字段结构刻意对齐《8月航海》手册关卡 3 的 ChatGPT 调研提示词输出的 JSON，
 * 这样手册流程产出的素材可以直接填进来，不用二次转换。
 */
/**
 * image：分类卡片配图，放在 public/ 下的路径；内页 frontmatter 的 image 优先于它
 * imageFit："cover"（默认）铺满卡片，适合风景/场景照；"contain" 居中不裁切，
 * 给透明背景的单位立绘用——铺满会把方形小图硬拉伸/裁得只剩局部，很难看
 */
export type NavCategory = { slug: string; label: string; image?: string; imageFit?: "cover" | "contain" };

// ---- 图片（官方宣传图 + Fandom wiki 单位立绘，均已自托管到 public/，不热链）----
// 3 张官方宣传图（风景/场景）+ 6 张单位渲染图（透明背景），共 9 张按内容相关性分配到
// 16 个分类，避免只有 3 张图轮流复用导致的"到处重复"观感（2026-09-14 用户反馈后修）。
const IMG = {
  sunflowers: "/images/official/roblox/hero.png",
  tower: "/images/official/roblox/promo-2.png",
  pepper: "/images/official/roblox/promo-3.png",
  golem: "/images/units/golem.png",
  venusFlytrap: "/images/units/venus-flytrap.png",
  rafflesia: "/images/units/rafflesia.png",
  farmer: "/images/units/farmer.png",
  moneyTree: "/images/units/money-tree.png",
  beehive: "/images/units/beehive.png",
};

export const site = {
  // ---- 基本信息 ----
  gameName: "Garden Tower Defense",
  // 隐私政策/条款页的免责声明用（"不隶属于开发商或 XX 公司"）；换非 Roblox 游戏时必改，
  // 否则这句免责声明会指名一个跟这个游戏无关的平台方，是错误陈述，不是小事
  platformOwner: "Roblox Corporation",
  siteName: "Garden Tower Defense Guide",
  // 导航 logo 与 apple icon；/favicon.ico 放在 public/ 根目录
  logo: "/images/logo.png",
  // 上线前改成真实域名；本地开发用 localhost
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "https://gardentowerdefenseguide.wiki",
  // 隐私政策/服务条款页展示，也是隐私相关问题的联系方式
  contactEmail: "asgharrulislam401@gmail.com",

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
    { slug: "codes", label: "Codes", image: IMG.tower },
    { slug: "values", label: "Values", image: IMG.rafflesia, imageFit: "contain" },
    { slug: "tier-list", label: "Tier List", image: IMG.golem, imageFit: "contain" },
    { slug: "units", label: "Units", image: IMG.venusFlytrap, imageFit: "contain" },
    { slug: "best-units", label: "Best Units", image: IMG.beehive, imageFit: "contain" },
    { slug: "best-dps", label: "Best DPS", image: IMG.venusFlytrap, imageFit: "contain" },
    { slug: "plants", label: "Plants", image: IMG.sunflowers },
    { slug: "loadout", label: "Loadout", image: IMG.rafflesia, imageFit: "contain" },
    { slug: "pvp", label: "PvP", image: IMG.golem, imageFit: "contain" },
    { slug: "endless", label: "Endless", image: IMG.beehive, imageFit: "contain" },
    { slug: "early-game", label: "Early Game", image: IMG.farmer, imageFit: "contain" },
    { slug: "money-farm", label: "Money Farm", image: IMG.moneyTree, imageFit: "contain" },
    { slug: "crates", label: "Crates", image: IMG.pepper },
    { slug: "trading", label: "Trading", image: IMG.rafflesia, imageFit: "contain" },
    { slug: "calculator", label: "Calculator", image: IMG.tower },
    { slug: "guide", label: "Guide", image: IMG.pepper },
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
