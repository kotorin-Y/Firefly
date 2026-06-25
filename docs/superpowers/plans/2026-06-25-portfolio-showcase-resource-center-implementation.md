# kotorin 个人作品集与资源中心实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将 Firefly 博客改造成面向游戏运营、产品运营和产品经理求职的完整作品站，集中展示四个项目，并提供 EXE、PRD、交互素材、运营方案和源码的站内下载。

**架构：** 保留 Astro + Firefly 的文章与布局体系，以 MDX 承载项目案例，以小型 Astro 组件承载能力地图、指标、截图画廊和下载卡。所有公开资源由一个资源清单驱动，构建前运行脚本检查文件存在性、大小、哈希、敏感路径和项目披露文字；大文件直接随 GitHub 仓库和 GitHub Pages 产物发布。

**技术栈：** Astro 6、MDX、Svelte 5、TypeScript、Node.js、Python 文档生成、Sharp、GitHub Pages、PowerShell、Playwright/浏览器 QA。

---

## 文件结构与职责

### 新增文件

- `src/data/portfolio-projects.ts`：四个项目的统一元数据、下载清单和能力标签。
- `src/types/portfolio.ts`：项目、下载资源、指标和截图类型。
- `src/components/portfolio/PortfolioJourney.astro`：作品集叙事与能力路径。
- `src/components/portfolio/ProjectOverview.astro`：项目详情页头部和职责摘要。
- `src/components/portfolio/ProjectMetrics.astro`：量化指标与验证证据。
- `src/components/portfolio/ProjectGallery.astro`：项目截图画廊。
- `src/components/portfolio/DownloadCenter.astro`：站内下载资源卡和风险提示。
- `src/styles/portfolio.css`：作品集专用响应式样式。
- `src/content/posts/windows-motion-studio/index.mdx`：Windows Motion Studio 详情页。
- `src/content/posts/fancy/index.mdx`：Fancy! 详情页。
- `src/content/resources/*.md`：三份 PRD 与剑星运营方案的可维护文档源稿。
- `scripts/generate-portfolio-documents.py`：将文档源稿生成中文 PDF。
- `scripts/build-portfolio-packages.ps1`：按白名单创建源码包和交互素材包。
- `scripts/verify-portfolio-assets.mjs`：验证下载文件、大小、路径、披露和页面引用。
- `public/assets/images/portfolio/background/83647245_p0.png`：用户提供的博客背景图。
- `public/assets/images/portfolio/<project>/*`：项目截图、封面和展示素材。
- `public/downloads/portfolio/<project>/*`：EXE、PDF 和 ZIP 交付物。

### 修改文件

- `src/content.config.ts`：增加 `hiddenFromHome` 字段。
- `src/utils/content-utils.ts`：增加首页文章过滤函数，不影响归档和项目详情。
- `src/pages/[...page].astro`：首页只获取普通博客内容。
- `src/content/posts/portfolio/index.mdx`：改造成策展叙事型作品集总览。
- `src/content/posts/ops-deputy/index.mdx`：补全 OpsDeputy 案例和下载区。
- `src/content/posts/stellar-blade-blood-rain/index.md`：补全案例、下载区和强制非官方披露。
- `src/content/spec/about.md`：重写求职定位、经历、技能和联系信息。
- `src/config/backgroundWallpaper.ts`：使用指定背景图并更新首页 Banner 文案。
- `src/config/siteConfig.ts`、`profileConfig.ts`、`announcementConfig.ts`、`navBarConfig.ts`：统一求职定位和入口。
- `src/styles/main.css`：引入 `portfolio.css`。
- `package.json`：增加资源生成和校验命令，并让构建先执行资源校验。
- `.gitignore`：忽略临时打包目录，但不忽略公开下载资源。

---

### 任务 1：首页内容与作品集内容分离

**文件：**
- 修改：`src/content.config.ts`
- 修改：`src/utils/content-utils.ts`
- 修改：`src/pages/[...page].astro`
- 创建：`scripts/verify-home-content.mjs`

- [ ] **步骤 1：编写失败的首页内容校验**

创建 `scripts/verify-home-content.mjs`，读取作品项目 frontmatter，并断言四个项目均设置 `hiddenFromHome: true`：

```js
import fs from "node:fs/promises";

const projectFiles = [
  "src/content/posts/portfolio/index.mdx",
  "src/content/posts/ops-deputy/index.mdx",
  "src/content/posts/windows-motion-studio/index.mdx",
  "src/content/posts/fancy/index.mdx",
  "src/content/posts/stellar-blade-blood-rain/index.md"
];

for (const file of projectFiles) {
  const source = await fs.readFile(file, "utf8");
  if (!/^hiddenFromHome:\s*true$/m.test(source)) {
    throw new Error(`${file} must set hiddenFromHome: true`);
  }
}
```

- [ ] **步骤 2：运行校验并确认失败**

运行：

```powershell
node scripts/verify-home-content.mjs
```

预期：因新页面尚不存在或 frontmatter 未配置而失败。

- [ ] **步骤 3：扩展内容类型**

在 `src/content.config.ts` 的文章 schema 中增加：

```ts
hiddenFromHome: z.boolean().optional().default(false),
```

- [ ] **步骤 4：增加首页专用查询**

在 `src/utils/content-utils.ts` 增加：

```ts
export async function getHomePosts() {
  const posts = await getSortedPosts();
  return posts.filter((post) => !post.data.hiddenFromHome);
}
```

将 `src/pages/[...page].astro` 的 `getSortedPosts()` 改为 `getHomePosts()`。归档、分类、标签、RSS 和项目页面继续使用完整集合。

- [ ] **步骤 5：为现有及新项目设置隐藏字段**

在五个作品相关 frontmatter 中加入：

```yaml
hiddenFromHome: true
```

- [ ] **步骤 6：运行校验**

运行：

```powershell
node scripts/verify-home-content.mjs
pnpm astro check
```

预期：首页内容校验通过，Astro 无 schema 错误。

- [ ] **步骤 7：Commit**

```powershell
git add src/content.config.ts src/utils/content-utils.ts src/pages/[...page].astro src/content/posts scripts/verify-home-content.mjs
git commit -m "feat: separate portfolio projects from home feed"
```

---

### 任务 2：建立作品集数据模型和可复用组件

**文件：**
- 创建：`src/types/portfolio.ts`
- 创建：`src/data/portfolio-projects.ts`
- 创建：`src/components/portfolio/PortfolioJourney.astro`
- 创建：`src/components/portfolio/ProjectOverview.astro`
- 创建：`src/components/portfolio/ProjectMetrics.astro`
- 创建：`src/components/portfolio/ProjectGallery.astro`
- 创建：`src/components/portfolio/DownloadCenter.astro`
- 创建：`src/styles/portfolio.css`
- 修改：`src/styles/main.css`

- [ ] **步骤 1：定义强类型接口**

`src/types/portfolio.ts`：

```ts
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
  warning?: string;
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
```

- [ ] **步骤 2：创建统一项目数据**

在 `src/data/portfolio-projects.ts` 导出：

```ts
export const portfolioProjects: Record<PortfolioProjectId, PortfolioProject> = {
  // 四个项目的标题、职责、摘要、截图、指标和下载路径
};
```

所有 `href` 必须以 `/downloads/portfolio/` 开头，所有图片必须以 `/assets/images/portfolio/` 开头。

- [ ] **步骤 3：实现下载中心**

`DownloadCenter.astro` 接受 `downloads`，输出语义化 `<a download>` 卡片，展示格式、版本、平台、体积和用途。EXE 卡片固定显示：

```text
Windows 可执行文件；未配置商业代码签名时，系统可能显示 SmartScreen 提示。
```

- [ ] **步骤 4：实现项目头、指标和画廊**

组件职责：

- `ProjectOverview`：标题、摘要、职责标签。
- `ProjectMetrics`：只显示可核验指标或测试结果。
- `ProjectGallery`：使用现有 Fancybox 属性和延迟加载图片。
- `PortfolioJourney`：展示“洞察 → 策略 → 产品 → 交付 → 复盘”。

- [ ] **步骤 5：添加响应式样式**

`portfolio.css` 必须覆盖：

- 390 px 单列下载卡与画廊。
- 768 px 双列卡片。
- 1280 px 以上项目 Hero 与信息侧栏。
- `:focus-visible`、`prefers-reduced-motion` 和高对比度文本。

- [ ] **步骤 6：运行静态检查**

```powershell
pnpm astro check
pnpm biome check src/components/portfolio src/data src/types/portfolio.ts
```

预期：无类型和格式错误。

- [ ] **步骤 7：Commit**

```powershell
git add src/types/portfolio.ts src/data/portfolio-projects.ts src/components/portfolio src/styles
git commit -m "feat: add reusable portfolio presentation components"
```

---

### 任务 3：建立下载资源清单、打包和安全校验

**文件：**
- 创建：`scripts/build-portfolio-packages.ps1`
- 创建：`scripts/verify-portfolio-assets.mjs`
- 修改：`package.json`
- 修改：`.gitignore`

- [ ] **步骤 1：先编写失败的资源校验器**

`scripts/verify-portfolio-assets.mjs` 导入 `src/data/portfolio-projects.ts` 不方便直接由 Node 运行，因此维护一份机器可读清单 `public/downloads/portfolio/manifest.json`，并校验：

```js
for (const asset of manifest.assets) {
  const stat = await fs.stat(path.join("public", asset.href));
  if (stat.size !== asset.bytes) throw new Error(`${asset.href}: size mismatch`);
  if (stat.size > 100 * 1024 * 1024) throw new Error(`${asset.href}: exceeds GitHub 100 MiB limit`);
}
```

额外扫描 ZIP 内文件名和可读取文本，拒绝：

```text
C:\Users\
New project
.env
node_modules/
.git/
user-data/
```

校验剑星页面源文和 PDF 源稿均包含：

```text
【非官方，仅个人非商业目标创作】
```

- [ ] **步骤 2：运行校验并确认失败**

```powershell
node scripts/verify-portfolio-assets.mjs
```

预期：资源目录或 manifest 尚不存在。

- [ ] **步骤 3：编写白名单打包脚本**

`build-portfolio-packages.ps1` 使用显式项目根目录和排除规则：

```powershell
$excludeNames = @(".git", "node_modules", "dist", "release", ".astro", ".wrangler", "artifacts")
$excludeFiles = @(".env", ".env.local", "*.log", "*.tmp")
```

脚本分别生成：

- `ops-deputy-source-v1.zip`
- `windows-motion-studio-source-v1.zip`
- `fancy-source-v0.3.0.zip`
- `stellar-blade-blood-rain-source-v1.zip`
- 四个项目对应的 `interaction-assets` ZIP

脚本必须先复制到 `C:\tmp\portfolio-package-stage\<project>`，再压缩，避免修改源项目。

- [ ] **步骤 4：复制 EXE 并标准化名称**

复制：

```text
opspilot-prototype/dist/OpsPilot Agent.exe
  -> public/downloads/portfolio/ops-deputy/ops-deputy-v1-x64.exe

windows-motion-studio/dist/WindowsMotionStudio.exe
  -> public/downloads/portfolio/windows-motion-studio/windows-motion-studio-v1-x64.exe

violet-nexus-desktop/release-0.3.0/Fancy-Setup-0.3.0-x64.exe
  -> public/downloads/portfolio/fancy/fancy-setup-v0.3.0-x64.exe

violet-nexus-desktop/release-0.3.0/Fancy-Portable-0.3.0-x64.exe
  -> public/downloads/portfolio/fancy/fancy-portable-v0.3.0-x64.exe
```

- [ ] **步骤 5：生成 manifest**

manifest 每个条目包含：

```json
{
  "project": "fancy",
  "href": "downloads/portfolio/fancy/fancy-setup-v0.3.0-x64.exe",
  "bytes": 96231470,
  "sha256": "...",
  "kind": "exe"
}
```

- [ ] **步骤 6：接入 package scripts**

`package.json` 增加：

```json
"portfolio:packages": "powershell -NoProfile -ExecutionPolicy Bypass -File scripts/build-portfolio-packages.ps1",
"portfolio:verify": "node scripts/verify-portfolio-assets.mjs",
"prebuild": "pnpm portfolio:verify"
```

- [ ] **步骤 7：运行资源校验**

```powershell
pnpm portfolio:packages
pnpm portfolio:verify
```

预期：所有文件存在、哈希一致、无本地路径、无超 100 MiB 单文件。

- [ ] **步骤 8：Commit**

```powershell
git add scripts package.json .gitignore public/downloads/portfolio
git commit -m "build: add verified portfolio download packages"
```

---

### 任务 4：生成 OpsDeputy 与 Windows Motion Studio PRD PDF

**文件：**
- 创建：`src/content/resources/ops-deputy-prd.md`
- 创建：`src/content/resources/windows-motion-studio-prd.md`
- 创建：`scripts/generate-portfolio-documents.py`
- 创建：`public/downloads/portfolio/ops-deputy/ops-deputy-prd-zh-cn.pdf`
- 创建：`public/downloads/portfolio/windows-motion-studio/windows-motion-studio-prd-zh-cn.pdf`

- [ ] **步骤 1：撰写 OpsDeputy PRD 源稿**

必须包含：

- 产品定义与目标用户。
- 运营任务碎片化问题。
- local-first 数据边界。
- 工作流、任务、检查点、人工确认和结果导出。
- 功能优先级、异常状态、指标和验收标准。
- 技术架构及安全限制。

- [ ] **步骤 2：撰写 Windows Motion Studio PRD 源稿**

必须包含：

- 产品定义与 Windows 用户场景。
- 动效配置、实时预览、配置档案和适配器。
- 用户流程、功能需求、非功能需求。
- 错误恢复、性能、可访问性、验收和迭代路线。

- [ ] **步骤 3：实现 PDF 生成器**

脚本使用可用的中文字体和 PDF 库生成 A4 PDF：

```python
def render_markdown_pdf(source: Path, target: Path, title: str) -> None:
    # 解析标题、段落、列表和表格
    # 生成封面、目录、页眉页脚和正文
    # 对长表格执行分页
```

输出文件禁止包含本地绝对路径。

- [ ] **步骤 4：生成并检查 PDF**

```powershell
python scripts/generate-portfolio-documents.py
```

预期：两个 PDF 均大于 50 KiB，文字可选择、中文无乱码、目录和页码完整。

- [ ] **步骤 5：渲染检查**

将 PDF 页面渲染为 PNG，检查封面、目录、表格页和末页；发现截断后修复并重新生成。

- [ ] **步骤 6：Commit**

```powershell
git add src/content/resources scripts/generate-portfolio-documents.py public/downloads/portfolio
git commit -m "docs: add product requirement documents for desktop projects"
```

---

### 任务 5：生成剑星用户与社区运营方案 PDF

**文件：**
- 创建：`src/content/resources/stellar-blade-community-operations-plan.md`
- 修改：`scripts/generate-portfolio-documents.py`
- 创建：`public/downloads/portfolio/stellar-blade-blood-rain/stellar-blade-blood-rain-community-operations-plan-zh-cn.pdf`

- [ ] **步骤 1：撰写运营方案**

标题必须为：

```text
Stellar Blade: BLOOD RAIN 用户与社区运营方案
【非官方，仅个人非商业目标创作】
```

正文必须覆盖：

- 核心用户、潜在用户、内容创作者和观望用户分层。
- 宣发预热、上线、版本运营和长尾四阶段。
- 官方内容、攻略、角色话题、二创征集和社区活动。
- 国内与海外社区阵地策略。
- UGC 激励、作者权益、内容审核和剧透管理。
- DAU、活跃率、投稿量、互动率、内容转化和负面反馈等指标。
- 风险预案和复盘机制。
- 非官方、个人非商业声明。

- [ ] **步骤 2：生成 PDF**

```powershell
python scripts/generate-portfolio-documents.py --only stellar-blade
```

- [ ] **步骤 3：自动检查声明**

```powershell
node scripts/verify-portfolio-assets.mjs --disclosures
```

预期：源稿、项目页面和下载资源元数据均包含完整声明。

- [ ] **步骤 4：视觉检查**

检查封面和正文至少两处显示声明，图表、阶段计划和指标表没有截断。

- [ ] **步骤 5：Commit**

```powershell
git add src/content/resources scripts/generate-portfolio-documents.py public/downloads/portfolio/stellar-blade-blood-rain
git commit -m "docs: add unofficial stellar blade community operations plan"
```

---

### 任务 6：整理项目展示图片与背景资源

**文件：**
- 创建：`public/assets/images/portfolio/background/83647245_p0.png`
- 创建：`public/assets/images/portfolio/ops-deputy/*`
- 创建：`public/assets/images/portfolio/windows-motion-studio/*`
- 创建：`public/assets/images/portfolio/fancy/*`
- 创建：`public/assets/images/portfolio/stellar-blade-blood-rain/*`

- [ ] **步骤 1：复制背景图**

从用户提供文件复制到公开资源目录，保留原始 PNG，不在配置中引用绝对路径。

- [ ] **步骤 2：选择真实项目截图**

OpsDeputy：

- `opsdeputy-packaged-updated.png`
- `opsdeputy-updated-interactions.png`
- `opsdeputy-home-fixed.png`

Fancy：

- 首页、搜索、设置、个人中心、共创广场、论坛或交互审计截图。

Stellar Blade：

- Hero、世界观、战斗、角色和媒体区域截图。

Windows Motion Studio：

- 从可运行程序生成首页、参数面板和预览状态截图；若程序无法运行，使用真实界面静态截图，不使用 AI 生成替代图。

- [ ] **步骤 3：生成响应式展示版本**

使用 Sharp 生成宽度 1600 px 和 900 px 的 WebP，质量 84；保留原 PNG 作为下载素材，不在页面一次加载全部原图。

- [ ] **步骤 4：检查图片**

```powershell
pnpm lqips
```

预期：无缺失图片，页面展示图比例统一，所有图片都有可描述的 alt 文本。

- [ ] **步骤 5：Commit**

```powershell
git add public/assets/images/portfolio
git commit -m "assets: add portfolio backgrounds and project galleries"
```

---

### 任务 7：重写作品集总览与四个项目详情页

**文件：**
- 修改：`src/content/posts/portfolio/index.mdx`
- 修改：`src/content/posts/ops-deputy/index.mdx`
- 创建：`src/content/posts/windows-motion-studio/index.mdx`
- 创建：`src/content/posts/fancy/index.mdx`
- 修改：`src/content/posts/stellar-blade-blood-rain/index.md`，必要时改为 `.mdx`

- [ ] **步骤 1：实现作品集总览**

页面顺序：

```text
求职定位
能力地图
工作方法
四个项目案例
下载与版权说明
```

使用 `PortfolioJourney`，不在首页复制同一项目卡片。

- [ ] **步骤 2：重写 OpsDeputy**

必须说明：

- 用户问题和 local-first 选择。
- 运营任务、提示词和 AI 工作流闭环。
- 失败恢复与人工确认。
- EXE、PRD、素材包和源码包下载。

- [ ] **步骤 3：新增 Windows Motion Studio**

必须说明：

- 用户场景、动效参数和实时预览。
- 配置档案、适配器设计、工程边界。
- EXE、PRD、素材包和源码包下载。

- [ ] **步骤 4：新增 Fancy!**

必须说明：

- ACGN 用户问题和产品定义。
- 多来源、分类、AI 搜索、翻译、文章、社区和主题。
- 41 项测试和打包后冒烟验证。
- 两个 EXE、PRD、素材包和源码包下载。

- [ ] **步骤 5：重写 Stellar Blade**

标题与正文首段必须出现：

```text
【非官方，仅个人非商业目标创作】
```

下载区前和版权说明再次出现该声明。页面说明七语言、动效、响应式、运营验收，并提供运营方案 PDF、页面素材包和源码包。

- [ ] **步骤 6：运行内容和披露校验**

```powershell
node scripts/verify-home-content.mjs
node scripts/verify-portfolio-assets.mjs
pnpm astro check
```

- [ ] **步骤 7：Commit**

```powershell
git add src/content/posts
git commit -m "content: publish complete portfolio case studies"
```

---

### 任务 8：重写关于页面与全站求职文案

**文件：**
- 修改：`src/content/spec/about.md`
- 修改：`src/config/profileConfig.ts`
- 修改：`src/config/siteConfig.ts`
- 修改：`src/config/announcementConfig.ts`
- 修改：`src/config/navBarConfig.ts`

- [ ] **步骤 1：重写关于页开头**

首屏信息：

```text
kotorin
游戏运营 / 产品运营 / 产品经理求职中
中国上海
531188217@qq.com
```

说明 ACGN 兴趣与职业目标，但不使用空泛自评。

- [ ] **步骤 2：写入昂立教育经历**

按照“用户研究 → 体验活动 → 内容与社区 → 转化跟进”的结构描述，不虚构量化数据。

- [ ] **步骤 3：写入美团经历**

使用准确归因表达，并展示：

- 社区周活跃度提升 40,000+。
- 转化率对比提升 13%。
- 落地成本缩减 20%。
- 核心商圈 GMV 月均同比提升 17%。
- 平台市占率提高 8%。

- [ ] **步骤 4：写入技能矩阵**

明确写出：

- Axure RP、Figma、FigJam、Pencil、ProcessOn。
- Excel、PowerPoint、Word、飞书多维表格、Notion。
- ChatGPT、Codex、Claude、Gemini。
- Canva、Photoshop。
- VS Code、Git、GitHub、PowerShell、Vitest、Playwright。
- HTML、CSS、JavaScript、TypeScript、React、Astro、Electron、Node.js。

AI 能力单独说明结构化提示词和：

```text
需求澄清 → 信息检索 → 来源核验 → 内容生成 → 人工审查 → 自动化测试 → 结果复盘
```

- [ ] **步骤 5：统一站点元信息**

标题、描述、关键词、Profile bio 和公告均改为求职作品站语气，导航名称使用“个人作品集”。

- [ ] **步骤 6：检查公开信息**

```powershell
rg -n "kotorin|中国上海|531188217@qq.com|Axure|Figma|闭环" src/content/spec/about.md src/config
```

预期：所需信息存在，不出现真实姓名或其他私人数据。

- [ ] **步骤 7：Commit**

```powershell
git add src/content/spec/about.md src/config
git commit -m "content: position kotorin for game and product operations roles"
```

---

### 任务 9：应用新背景与首页入口

**文件：**
- 修改：`src/config/backgroundWallpaper.ts`
- 修改：`src/styles/portfolio.css`
- 修改：`src/config/announcementConfig.ts`

- [ ] **步骤 1：切换桌面和移动背景**

```ts
src: {
  desktop: "/assets/images/portfolio/background/83647245_p0.png",
  mobile: "/assets/images/portfolio/background/83647245_p0.png"
}
```

桌面 `position` 以人物和主要水母不被标题覆盖为准；移动端通过媒体查询使用右侧或中心裁切。

- [ ] **步骤 2：更新 Banner 文案**

```ts
title: "把玩家洞察，做成真实可用的产品。",
subtitle: [
  "🎮 游戏运营 × 产品运营 × 产品经理",
  "从用户问题、活动策略到可验证交付",
  "用 AI 与工程能力缩短想法到上线的距离"
]
```

- [ ] **步骤 3：强化可读性**

设置遮罩、文字阴影和卡片透明度；确保 WCAG AA 正文对比度。减少背景波浪动画对插画主体的干扰。

- [ ] **步骤 4：增加作品集主入口**

公告区使用“查看个人作品集”，链接 `/posts/portfolio/`。首页文章流不显示项目卡片。

- [ ] **步骤 5：浏览器验证**

检查 390、768、1280、1440 px：

- Banner 标题不遮挡人物。
- 背景无横向拉伸。
- 作品集入口可见。
- 首页没有四个项目卡片。

- [ ] **步骤 6：Commit**

```powershell
git add src/config/backgroundWallpaper.ts src/config/announcementConfig.ts src/styles/portfolio.css
git commit -m "design: apply aquatic portfolio identity"
```

---

### 任务 10：完整构建、下载与安全 QA

**文件：**
- 修改：`scripts/verify-portfolio-assets.mjs`
- 创建：`docs/qa/portfolio-release-checklist.md`

- [ ] **步骤 1：运行完整检查**

```powershell
corepack.cmd pnpm check
corepack.cmd pnpm run build
node scripts/verify-home-content.mjs
node scripts/verify-portfolio-assets.mjs
git diff --check
```

预期：全部返回 0。

- [ ] **步骤 2：检查构建产物下载文件**

对 manifest 中每个资源验证：

```text
public/downloads/... 存在
dist/downloads/... 存在
字节数一致
SHA-256 一致
```

- [ ] **步骤 3：运行浏览器 QA**

验证：

- 作品集总览。
- 四个详情页。
- 关于页。
- 每种下载类型至少一个链接。
- 主页去重。
- 404、控制台错误和图片错误。
- 390、768、1280、1440 px。

- [ ] **步骤 4：检查大文件**

确认：

- 单文件均小于 100 MiB。
- Fancy EXE 可完整下载。
- GitHub Pages artifact 包含全部下载文件。

- [ ] **步骤 5：安全扫描**

```powershell
rg -n --hidden -g '!node_modules/**' -g '!dist/**' `
  "C:\\Users|New project|API_KEY|SECRET|TOKEN|PASSWORD|\\.env" `
  public src scripts
```

允许的开发示例必须人工确认；公开资源中不得出现真实本地路径、凭据或用户数据。

- [ ] **步骤 6：记录 QA**

`docs/qa/portfolio-release-checklist.md` 记录命令、结果、已知限制、浏览器和日期。

- [ ] **步骤 7：Commit**

```powershell
git add scripts docs/qa
git commit -m "test: verify portfolio downloads and responsive flows"
```

---

### 任务 11：部署 GitHub Pages 并验证线上交付

**文件：**
- 修改：`.github/workflows/deploy.yml`（仅在需要增加 artifact 大小或校验步骤时）

- [ ] **步骤 1：在部署工作流中加入资源校验**

在 Build site 前增加：

```yaml
- name: Verify portfolio downloads
  run: pnpm portfolio:verify
```

- [ ] **步骤 2：推送当前分支**

```powershell
git push -u origin feat/personal-portfolio
```

- [ ] **步骤 3：合并到部署分支**

按仓库现有策略将分支合并到 `master`，触发 GitHub Pages。

- [ ] **步骤 4：等待 Actions**

确认：

- Code quality 通过。
- Build and Check 通过。
- Deploy to GitHub Pages 通过。

- [ ] **步骤 5：验证线上页面**

在线检查：

- `/`
- `/about/`
- `/posts/portfolio/`
- 四个项目详情页。
- Fancy 安装版下载。
- 剑星运营方案 PDF 下载。

- [ ] **步骤 6：最终安全复核**

在 GitHub 远端树中确认没有：

- 临时打包目录。
- `.env`。
- 用户数据。
- 本地绝对路径。
- 未声明性质的剑星页面。

- [ ] **步骤 7：发布总结**

交付：

- 线上博客地址。
- 分支与 commit。
- 四个项目页面链接。
- 主要下载链接。
- 测试、构建和部署证据。
- 因 GitHub 大文件限制产生的已知维护成本。

