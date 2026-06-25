import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const root = path.resolve(import.meta.dirname, "..");
const downloads = path.join(root, "public", "downloads", "portfolio");
const required = [
	"ops-deputy/ops-deputy-v1-x64.exe", "ops-deputy/ops-deputy-prd-zh-cn.pdf", "ops-deputy/ops-deputy-interaction-assets-v1.zip", "ops-deputy/ops-deputy-source-v1.zip",
	"windows-motion-studio/windows-motion-studio-v1-x64.exe", "windows-motion-studio/windows-motion-studio-prd-zh-cn.pdf", "windows-motion-studio/windows-motion-studio-interaction-assets-v1.zip", "windows-motion-studio/windows-motion-studio-source-v1.zip",
	"fancy/fancy-setup-v0.3.0-x64.exe", "fancy/fancy-portable-v0.3.0-x64.exe", "fancy/fancy-prd-zh-cn.pdf", "fancy/fancy-interaction-assets-v0.3.0.zip", "fancy/fancy-source-v0.3.0.zip",
	"stellar-blade-blood-rain/stellar-blade-blood-rain-community-operations-plan-zh-cn.pdf", "stellar-blade-blood-rain/stellar-blade-blood-rain-interaction-assets-v1.zip", "stellar-blade-blood-rain/stellar-blade-blood-rain-source-v1.zip"
];
const assets = [];
for (const relative of required) {
	const file = path.join(downloads, relative);
	const stat = await fs.stat(file);
	if (stat.size > 100 * 1024 * 1024) throw new Error(`${relative} exceeds 100 MiB`);
	const hash = crypto.createHash("sha256").update(await fs.readFile(file)).digest("hex");
	assets.push({ href: `downloads/portfolio/${relative.replaceAll("\\", "/")}`, bytes: stat.size, sha256: hash });
}
const disclosure = "【非官方，仅个人非商业目标创作】";
for (const file of ["src/content/resources/stellar-blade-community-operations-plan.md", "src/content/posts/stellar-blade-blood-rain/index.mdx"]) {
	const text = await fs.readFile(path.join(root, file), "utf8");
	if (!text.includes(disclosure)) throw new Error(`${file} missing disclosure`);
}
const manifestPath = path.join(downloads, "manifest.json");
const manifest = `${JSON.stringify({ assets }, null, 2)}\n`;
const current = await fs.readFile(manifestPath, "utf8").catch(() => "");
if (current !== manifest) await fs.writeFile(manifestPath, manifest);
console.log(`verified ${assets.length} portfolio assets`);
