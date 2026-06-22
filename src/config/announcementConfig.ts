import type { AnnouncementConfig } from "../types/announcementConfig";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题
	title: "正在建设",

	// 公告内容
	content:
		"这里集中展示可运行项目、实现过程与复盘。内容会持续补充，所有项目入口都优先提供真实代码、演示或下载文件。",

	// 是否允许用户关闭公告
	closable: true,

	link: {
		// 启用链接
		enable: true,
		// 链接文本
		text: "查看作品集",
		// 链接 URL
		url: "/posts/portfolio/",
		// 内部链接
		external: false,
	},
};
