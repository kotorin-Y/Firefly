import { cp, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "dist");
const target = path.join(root, ".cloudflare-dist");
const excluded = new Set([
	path.join(source, "downloads/portfolio/fancy/fancy-setup-v0.3.0-x64.exe"),
	path.join(source, "downloads/portfolio/fancy/fancy-portable-v0.3.0-x64.exe"),
]);

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(source, target, {
	recursive: true,
	filter: (entry) => !excluded.has(entry),
});

for (const file of excluded) {
	const fileStat = await stat(file);
	if (fileStat.size <= 25 * 1024 * 1024) {
		throw new Error(`Expected an oversized Cloudflare asset: ${file}`);
	}
}

console.log(`Prepared Cloudflare assets in ${target}; excluded ${excluded.size} GitHub-hosted executables.`);
