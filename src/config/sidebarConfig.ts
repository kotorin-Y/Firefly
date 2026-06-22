import type { SidebarLayoutConfig } from "../types/sidebarConfig";

export const sidebarLayoutConfig: SidebarLayoutConfig = {
	enable: true,
	position: "both",
	tabletSidebar: "left",
	showBothSidebarsOnPostPage: true,
	leftComponents: [
		{
			type: "profile",
			enable: true,
			position: "top",
			showOnPostPage: true,
		},
		{
			type: "announcement",
			enable: true,
			position: "top",
			showOnPostPage: false,
		},
		{
			type: "categories",
			enable: true,
			position: "sticky",
			showOnPostPage: true,
			specificConfig: { collapseThreshold: 6 },
		},
		{
			type: "tags",
			enable: true,
			position: "sticky",
			showOnPostPage: true,
			specificConfig: { collapseThreshold: 12 },
		},
	],
	rightComponents: [
		{
			type: "stats",
			enable: true,
			position: "top",
			showOnPostPage: true,
		},
		{
			type: "siteInfo",
			enable: true,
			position: "top",
			showOnPostPage: true,
			specificConfig: {
				siteInfo: { unknownBuildPlatform: "Local / Cloudflare" },
			},
		},
		{
			type: "calendar",
			enable: true,
			showTitle: false,
			position: "sticky",
			showOnPostPage: false,
			specificConfig: { calendar: { showHeatmap: true } },
		},
		{
			type: "sidebarToc",
			enable: true,
			position: "sticky",
			showOnPostPage: true,
			showOnNonPostPage: false,
		},
	],
	mobileBottomComponents: [
		{
			type: "profile",
			enable: true,
			showOnPostPage: true,
		},
		{
			type: "announcement",
			enable: true,
			showOnPostPage: false,
		},
		{
			type: "categories",
			enable: true,
			showOnPostPage: true,
			specificConfig: { collapseThreshold: 6 },
		},
		{
			type: "tags",
			enable: true,
			showOnPostPage: true,
			specificConfig: { collapseThreshold: 12 },
		},
		{
			type: "siteInfo",
			enable: true,
			showOnPostPage: true,
			specificConfig: {
				siteInfo: { unknownBuildPlatform: "Local / Cloudflare" },
			},
		},
	],
};
