import type { SiteConfig } from "@/types/siteConfig";

const SITE_LANG = "zh_CN";

export const siteConfig: SiteConfig = {
	title: "Kotorin's Digital Garden",
	subtitle: "游戏运营 × AI 工具 × Web 制作",
	site_url: "https://kotorin-firefly.kotorin-y.workers.dev",
	description:
		"Kotorin 的个人作品集与数字花园，记录游戏运营、AI Agent、Web 宣发页面和个人效率工具的设计与实现。",
	keywords: [
		"kotorin",
		"游戏运营",
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
		title: "Kotorin",
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
