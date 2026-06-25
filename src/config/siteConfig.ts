import type { SiteConfig } from "@/types/siteConfig";

const SITE_LANG = "zh_CN";

export const siteConfig: SiteConfig = {
	title: "kotorin｜运营与产品作品集",
	subtitle: "游戏与互联网运营 × 产品设计 × AI 闭环工程",
	site_url: "https://kotorin-firefly.kotorin-y.workers.dev",
	description:
		"kotorin 的运营与产品作品集，展示用户洞察、活动与内容运营、商业化增长、产品设计、AI 闭环工程和真实交付。",
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
