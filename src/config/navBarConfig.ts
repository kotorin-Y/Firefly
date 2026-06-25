import {
	type NavBarConfig,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/navBarConfig";

export const navBarConfig: NavBarConfig = {
	links: [
		{
			name: "主页",
			url: "/",
			icon: "material-symbols:home",
		},
		{
			name: "个人作品集",
			url: "/posts/portfolio/",
			icon: "material-symbols:work-outline",
		},
		{
			name: "内容",
			url: "#",
			icon: "material-symbols:article-outline",
			children: [
				{
					name: "归档",
					url: "/archive/",
					icon: "material-symbols:archive-outline",
				},
				{
					name: "分类",
					url: "/categories/",
					icon: "material-symbols:folder-open-rounded",
				},
				{
					name: "标签",
					url: "/tags/",
					icon: "material-symbols:tag-rounded",
				},
			],
		},
		{
			name: "关于",
			url: "/about/",
			icon: "material-symbols:person-outline",
		},
		{
			name: "GitHub",
			url: "https://github.com/kotorin-Y",
			external: true,
			icon: "fa7-brands:github",
		},
	],
};

export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};
