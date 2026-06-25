export type PortfolioProjectId =
	| "ops-deputy"
	| "windows-motion-studio"
	| "fancy"
	| "stellar-blade-blood-rain";

export interface PortfolioDownload {
	label: string;
	href: string;
	kind: "exe" | "pdf" | "zip";
	version: string;
	platform: "Windows" | "通用";
	size: string;
	description: string;
}

export interface PortfolioProject {
	id: PortfolioProjectId;
	title: string;
	role: string[];
	summary: string;
	accent: string;
	cover: string;
	metrics: Array<{ value: string; label: string }>;
	gallery: Array<{ src: string; alt: string }>;
	downloads: PortfolioDownload[];
}
