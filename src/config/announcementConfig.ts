import type { AnnouncementConfig } from "../types/announcementConfig";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题
	title: "最近在做什么？",

	// 公告内容
	content:
		"最近在整理产品设计、AI Agent 和游戏运营相关项目。能运行的程序、过程文档和踩过的坑，我都尽量留在博客里。",

	// 是否允许用户关闭公告
	closable: true,

	link: {
		// 启用链接
		enable: true,
		// 链接文本
		text: "看看产品设计作品",
		// 链接 URL
		url: "/posts/portfolio/",
		// 内部链接
		external: false,
	},
};
