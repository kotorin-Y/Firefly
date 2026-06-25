import type { SiteConfig } from "@/types/siteConfig";

const SITE_LANG = "zh_CN";

export const siteConfig: SiteConfig = {
	title: "こんにちは、kotorinです 👋",
	subtitle: "ACGN、产品与运营，还有一些认真做出来的 AI 实验",
	site_url: "https://kotorin-firefly.kotorin-y.workers.dev",
	description:
		"kotorin 的个人博客，记录 ACGN、互联网运营、产品设计、AI Agent 和一些真正做完的项目。",
	keywords: [
		"kotorin",
		"游戏运营",
		"产品运营",
		"产品经理",
		"互联网运营",
		"AI Agent",
		"Web 开发",
		"作品集",
		"Astro",
		"Firefly",
	],
	themeColor: {
		hue: 215,
		fixed: false,
		defaultMode: "system",
	},
	pageWidth: 100,
	card: {
		border: true,
		followTheme: true,
	},
	favicon: [{ src: "/favicon/favicon.ico" }],
	navbar: {
		logo: {
			type: "icon",
			value: "material-symbols:deployed-code-outline",
			alt: "Kotorin",
		},
		title: "kotorin",
		widthFull: false,
		menuAlign: "center",
		followTheme: true,
		stickyNavbar: true,
	},
	siteStartDate: "2026-06-22",
	timezone: "Asia/Shanghai",
	pages: {
		friends: false,
		sponsor: false,
		guestbook: false,
		bangumi: false,
		gallery: false,
	},
	categoryBar: true,
	foldArticle: true,
	postListLayout: {
		defaultMode: "grid",
		mobileDefaultMode: "list",
		showTags: true,
		descriptionLines: 3,
		allowSwitch: true,
		grid: {
			masonry: false,
			columnWidth: 320,
		},
	},
	post: {
		rehypeCallouts: {
			theme: "github",
			enablePythonMarkdownAdmonitions: false,
		},
		showLastModified: true,
		outdatedThreshold: 180,
		sharePoster: true,
		generateOgImages: false,
	},
	pagination: {
		postsPerPage: 9,
	},
	imageOptimization: {
		formats: "webp",
		quality: 84,
		noReferrerDomains: ["avatars.githubusercontent.com"],
	},
	lang: SITE_LANG,
};
