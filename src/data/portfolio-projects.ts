import type { PortfolioProject, PortfolioProjectId } from "@/types/portfolio";

const exeNote = "Windows 程序未配置商业代码签名时可能触发 SmartScreen。";

export const portfolioProjects: Record<PortfolioProjectId, PortfolioProject> = {
	"ops-deputy": {
		id: "ops-deputy", title: "OpsDeputy", role: ["产品设计", "AI 产品运营", "桌面应用"],
		summary: "把零散运营任务沉淀为可编排、可追踪、可复用的本地 AI 工作流。", accent: "#5b6cff",
		cover: "/assets/images/portfolio/ops-deputy/home.png",
		metrics: [{ value: "Local-first", label: "数据边界" }, { value: "闭环", label: "任务执行" }, { value: "Windows", label: "交付平台" }],
		gallery: [
			{ src: "/assets/images/portfolio/ops-deputy/home.png", alt: "OpsDeputy 运营工作台首页" },
			{ src: "/assets/images/portfolio/ops-deputy/interactions.png", alt: "OpsDeputy 工作流交互界面" },
			{ src: "/assets/images/portfolio/ops-deputy/packaged.png", alt: "OpsDeputy Windows 打包版本" },
		],
		downloads: [
			{ label: "Windows 程序", href: "/downloads/portfolio/ops-deputy/ops-deputy-v1-x64.exe", kind: "exe", version: "v1", platform: "Windows", size: "11.0 MiB", description: `可直接启动的演示程序。${exeNote}` },
			{ label: "产品需求文档", href: "/downloads/portfolio/ops-deputy/ops-deputy-prd-zh-cn.pdf", kind: "pdf", version: "v1", platform: "通用", size: "PDF", description: "产品定义、工作流、功能需求与验收标准。" },
			{ label: "交互设计素材", href: "/downloads/portfolio/ops-deputy/ops-deputy-interaction-assets-v1.zip", kind: "zip", version: "v1", platform: "通用", size: "ZIP", description: "截图、图标、流程与设计资料。" },
			{ label: "源码包", href: "/downloads/portfolio/ops-deputy/ops-deputy-source-v1.zip", kind: "zip", version: "v1", platform: "通用", size: "ZIP", description: "排除依赖、缓存和用户数据的源码。" },
		],
	},
	"windows-motion-studio": {
		id: "windows-motion-studio", title: "Windows Motion Studio", role: ["工具产品", "交互设计", "Python"],
		summary: "面向 Windows 用户的动态效果配置、实时预览与适配器工具。", accent: "#27a6e5",
		cover: "/assets/images/portfolio/windows-motion-studio/icon.png",
		metrics: [{ value: "实时", label: "参数预览" }, { value: "可扩展", label: "适配器架构" }, { value: "11.1 MiB", label: "单文件程序" }],
		gallery: [{ src: "/assets/images/portfolio/windows-motion-studio/icon.png", alt: "Windows Motion Studio 应用图标" }],
		downloads: [
			{ label: "Windows 程序", href: "/downloads/portfolio/windows-motion-studio/windows-motion-studio-v1-x64.exe", kind: "exe", version: "v1", platform: "Windows", size: "11.1 MiB", description: `Windows 单文件程序。${exeNote}` },
			{ label: "产品需求文档", href: "/downloads/portfolio/windows-motion-studio/windows-motion-studio-prd-zh-cn.pdf", kind: "pdf", version: "v1", platform: "通用", size: "PDF", description: "产品、交互、适配器与质量要求。" },
			{ label: "交互设计素材", href: "/downloads/portfolio/windows-motion-studio/windows-motion-studio-interaction-assets-v1.zip", kind: "zip", version: "v1", platform: "通用", size: "ZIP", description: "图标、适配说明与交互资料。" },
			{ label: "源码包", href: "/downloads/portfolio/windows-motion-studio/windows-motion-studio-source-v1.zip", kind: "zip", version: "v1", platform: "通用", size: "ZIP", description: "Python 源码与构建说明。" },
		],
	},
	fancy: {
		id: "fancy", title: "Fancy!", role: ["产品经理", "内容运营", "ACGN 社区"],
		summary: "聚合资讯、AI 搜索、统一阅读、论坛与共创能力的 ACGN 桌面产品。", accent: "#744577",
		cover: "/assets/images/portfolio/fancy/home.png",
		metrics: [{ value: "41/41", label: "自动化测试" }, { value: "12", label: "导航入口" }, { value: "4", label: "主题方案" }],
		gallery: [
			{ src: "/assets/images/portfolio/fancy/home.png", alt: "Fancy ACGN 资讯首页" },
			{ src: "/assets/images/portfolio/fancy/search.png", alt: "Fancy AI 搜索页" },
			{ src: "/assets/images/portfolio/fancy/settings.png", alt: "Fancy 主题设置" },
			{ src: "/assets/images/portfolio/fancy/create.png", alt: "Fancy 共创广场" },
		],
		downloads: [
			{ label: "Windows 安装版", href: "/downloads/portfolio/fancy/fancy-setup-v0.3.0-x64.exe", kind: "exe", version: "v0.3.0", platform: "Windows", size: "91.8 MiB", description: `桌面安装包。${exeNote}` },
			{ label: "Windows 便携版", href: "/downloads/portfolio/fancy/fancy-portable-v0.3.0-x64.exe", kind: "exe", version: "v0.3.0", platform: "Windows", size: "91.6 MiB", description: `免安装版本。${exeNote}` },
			{ label: "产品需求文档", href: "/downloads/portfolio/fancy/fancy-prd-zh-cn.pdf", kind: "pdf", version: "v1.2", platform: "通用", size: "0.7 MiB", description: "完整中文 PRD。" },
			{ label: "交互设计素材", href: "/downloads/portfolio/fancy/fancy-interaction-assets-v0.3.0.zip", kind: "zip", version: "v0.3.0", platform: "通用", size: "ZIP", description: "原型、架构、Logo 与界面素材。" },
			{ label: "源码包", href: "/downloads/portfolio/fancy/fancy-source-v0.3.0.zip", kind: "zip", version: "v0.3.0", platform: "通用", size: "ZIP", description: "公开版本源码。" },
		],
	},
	"stellar-blade-blood-rain": {
		id: "stellar-blade-blood-rain", title: "Stellar Blade: BLOOD RAIN【非官方，仅个人非商业目标创作】",
		role: ["游戏运营", "全球宣发", "活动网页"], summary: "模拟海外动作游戏项目的七语言宣发页面、内容运营与社区方案交付。", accent: "#d63c47",
		cover: "/assets/images/portfolio/stellar-blade-blood-rain/hero.jpg",
		metrics: [{ value: "7", label: "语言入口" }, { value: "多端", label: "响应式适配" }, { value: "完整", label: "运营验收" }],
		gallery: [
			{ src: "/assets/images/portfolio/stellar-blade-blood-rain/hero.jpg", alt: "BLOOD RAIN 宣发网页首屏" },
			{ src: "/assets/images/portfolio/stellar-blade-blood-rain/media-1.jpg", alt: "BLOOD RAIN 媒体展示" },
			{ src: "/assets/images/portfolio/stellar-blade-blood-rain/character.jpg", alt: "BLOOD RAIN 角色展示" },
		],
		downloads: [
			{ label: "用户与社区运营方案", href: "/downloads/portfolio/stellar-blade-blood-rain/stellar-blade-blood-rain-community-operations-plan-zh-cn.pdf", kind: "pdf", version: "v1", platform: "通用", size: "PDF", description: "用户分层、UGC、指标和风险方案。" },
			{ label: "页面与交互素材", href: "/downloads/portfolio/stellar-blade-blood-rain/stellar-blade-blood-rain-interaction-assets-v1.zip", kind: "zip", version: "v1", platform: "通用", size: "ZIP", description: "页面素材、多语言结构与来源说明。" },
			{ label: "网页源码包", href: "/downloads/portfolio/stellar-blade-blood-rain/stellar-blade-blood-rain-source-v1.zip", kind: "zip", version: "v1", platform: "通用", size: "ZIP", description: "React + TypeScript 宣发网页源码。" },
		],
	},
};
