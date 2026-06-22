# Firefly 个人博客与作品集实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 按视频教程完成可本地运行、可推送 GitHub、可部署 Cloudflare Workers 的 Firefly 个人博客，并展示现有项目和公开仓库。

**架构：** 保留 Firefly 的 Astro 6 配置驱动架构，通过 `src/config/` 修改站点行为，通过 Markdown / MDX 管理作品内容，通过 `public/downloads/` 提供项目包。部署沿用仓库内 Cloudflare Adapter 和 Wrangler 静态资源配置。

**技术栈：** Astro 6、TypeScript、Svelte 5、Tailwind CSS 4、pnpm 9、Pagefind、Cloudflare Workers。

---

### 任务 1：完成教程环境与依赖安装

**文件：**
- 修改：`pnpm-lock.yaml`（仅当 pnpm 安装解析产生必要变化）

- [ ] **步骤 1：验证环境**

运行：

```powershell
node -v
pnpm.cmd -v
git --version
```

预期：Node.js ≥22、pnpm ≥9、Git 可用。

- [ ] **步骤 2：安装项目依赖**

运行：

```powershell
pnpm.cmd install
```

预期：依赖安装完成且无失败。

- [ ] **步骤 3：运行默认站点**

运行：

```powershell
pnpm.cmd dev --host 0.0.0.0
```

预期：`http://localhost:4321/` 返回 Firefly 默认首页。

### 任务 2：配置个人站点身份

**文件：**
- 修改：`src/config/siteConfig.ts`
- 修改：`src/config/profileConfig.ts`
- 修改：`src/config/navBarConfig.ts`
- 修改：`src/config/backgroundWallpaper.ts`
- 修改：`src/config/announcementConfig.ts`

- [ ] **步骤 1：替换站点元数据**

设置标题 `Kotorin's Digital Garden`、副标题 `游戏运营 × AI 工具 × Web 制作`、
GitHub 地址 `https://github.com/kotorin-Y`、时区 `Asia/Shanghai`，关闭未配置的
打赏、留言和番组页面。

- [ ] **步骤 2：替换个人资料**

使用 GitHub 公开头像
`https://avatars.githubusercontent.com/u/279659525?v=4`，名称 `kotorin`，
保留 GitHub 和 RSS 链接，不添加未知邮箱。

- [ ] **步骤 3：整理导航**

添加作品集直达链接 `/posts/portfolio/`，保留文章归档、分类、标签、关于页和
GitHub 外链，删除主题作者 QQ、Gitee 和私人博客入口。

- [ ] **步骤 4：配置首页文案**

设置首页标题 `Kotorin's Digital Garden`，使用可轮播的职业方向副标题，
保留打字机、壁纸模式、主题色和水波纹开关。

### 任务 3：建立作品集文章

**文件：**
- 创建：`src/content/posts/portfolio/index.mdx`
- 创建：`src/content/posts/stellar-blade-blood-rain/index.md`
- 创建：`src/content/posts/ops-deputy/index.mdx`
- 创建：`src/content/posts/some-tools/index.mdx`
- 修改：`src/content/spec/about.md`

- [ ] **步骤 1：创建置顶作品集**

使用 Frontmatter：

```yaml
title: 作品集 / Portfolio
published: 2026-06-22
pinned: true
category: 作品集
tags: [游戏运营, Web, AI, GitHub]
```

正文连接三项作品，并使用 `::github` 指令展示两个公开仓库。

- [ ] **步骤 2：创建 BLOOD RAIN 案例文章**

写明岗位职责映射、需求梳理、页面搭建、七语言、验收、QA、部署与非官方声明，
并提供 `/downloads/stellar-blade-blood-rain-source.zip`。

- [ ] **步骤 3：创建 GitHub 仓库文章**

分别为 OpsDeputy 与 Some-tools 创建项目背景、技术栈、功能边界和 GitHub 卡片。

- [ ] **步骤 4：重写关于页**

说明站点定位、技能方向、项目索引、GitHub 地址和 Firefly / Fuwari 署名。

### 任务 4：打包并引入 BLOOD RAIN 项目

**文件：**
- 创建：`public/downloads/stellar-blade-blood-rain-source.zip`
- 创建：`src/content/posts/stellar-blade-blood-rain/cover.jpg`

- [ ] **步骤 1：生成源码包**

从 `../stellar-blade-blood-rain` 打包源代码、文档和素材，排除
`node_modules`、`dist`、`.git`、日志与本地缓存。

- [ ] **步骤 2：复制封面素材**

使用项目的 `public/assets/reveal-hero.jpg` 作为案例封面，不生成或伪造官方素材。

- [ ] **步骤 3：验证下载**

开发服务器中请求：

```text
http://localhost:4321/downloads/stellar-blade-blood-rain-source.zip
```

预期：HTTP 200 且文件大小大于 0。

### 任务 5：创建个人修改手册和 Cloudflare 配置

**文件：**
- 创建：`docs/PERSONALIZATION.md`
- 修改：`wrangler.jsonc`
- 修改：`README.md`

- [ ] **步骤 1：编写修改手册**

覆盖名称、头像、导航、壁纸、主题色、功能开关、文章、项目、音乐和公告的文件路径、
示例与修改后验证命令。

- [ ] **步骤 2：对齐教程部署配置**

保持：

```json
{
  "name": "kotorin-firefly",
  "compatibility_date": "2026-06-22",
  "compatibility_flags": ["nodejs_compat"],
  "assets": { "directory": "./dist" }
}
```

- [ ] **步骤 3：补充 README**

写明本地命令、GitHub Fork 状态、Cloudflare 构建命令 `pnpm build`、部署命令
`npx wrangler deploy`，并明确不绑定个人域名。

### 任务 6：验证、审查和交付

**文件：**
- 创建：`docs/qa/2026-06-22-personal-blog-qa.md`

- [ ] **步骤 1：静态检查**

运行：

```powershell
pnpm.cmd check
```

预期：0 errors。

- [ ] **步骤 2：生产构建**

运行：

```powershell
pnpm.cmd build
```

预期：生成 `dist/` 和 Pagefind 索引，退出码 0。

- [ ] **步骤 3：浏览器 QA**

验证 1440、768、390、320 像素宽度；检查首页、作品集、项目文章、关于、搜索、
主题设置、GitHub 外链和下载。

- [ ] **步骤 4：Git 配置与提交**

仓库级 Git 身份设置为：

```powershell
git config user.name "kotorin-Y"
git config user.email "279659525+kotorin-Y@users.noreply.github.com"
```

提交已验证修改。GitHub 重新认证并完成 Fork 后，将 `origin` 指向
`https://github.com/kotorin-Y/Firefly.git` 再推送。

