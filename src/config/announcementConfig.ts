import type { AnnouncementConfig } from "../types/announcementConfig";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题
	title: "开放求职机会 ✨",

	// 公告内容
	content:
		"目标方向：游戏运营、产品运营与产品经理，也期待内容平台、本地生活及其他互联网业务机会。作品均提供真实演示与交付物。",

	// 是否允许用户关闭公告
	closable: true,

	link: {
		// 启用链接
		enable: true,
		// 链接文本
		text: "查看个人作品集",
		// 链接 URL
		url: "/posts/portfolio/",
		// 内部链接
		external: false,
	},
};
