# Firefly 个人博客与作品集设计规格

## 目标

严格依据 B 站视频 `BV1hX9XBKEhm` 及作者文字教程搭建个人博客：使用
Firefly 官方 Astro 主题，本地通过 pnpm 开发，代码托管于 GitHub，最终可由
Cloudflare Workers 自动构建部署。当前阶段不绑定个人域名。

## 教程流程映射

1. 环境：Node.js 22+、pnpm 9+、Git、VS Code。
2. 源码：Fork `CuteLeaf/Firefly` 到 `kotorin-Y/Firefly`。
3. 本地：克隆仓库、`pnpm install`、`pnpm dev`。
4. 配置：修改 `src/config/`，保留 `wrangler.jsonc` 的静态资源部署配置。
5. 内容：使用 Markdown / MDX 编写个人介绍、项目文章和维护指南。
6. 推送：提交到个人 GitHub 仓库。
7. 部署：Cloudflare Workers 连接 GitHub；构建命令 `pnpm build`，部署命令
   `npx wrangler deploy`。
8. 域名：按用户要求跳过，使用 `workers.dev` 临时域名。

## 站点定位

- 名称：Kotorin's Digital Garden
- 语言：简体中文
- 内容方向：游戏运营、网页制作、AI 工具、个人开发记录
- GitHub 身份：`kotorin-Y`
- 首页重点：个人简介、置顶作品集、最新文章、分类与标签

## 展示内容

### Stellar Blade: BLOOD RAIN

- 以完整项目文章展示需求背景、网页运营职责、内容策略、技术实现和 QA 结果。
- 提供本地源码压缩包下载。
- 提供本地预览说明；在该项目拥有公开仓库后，可追加 GitHub 卡片。

### GitHub 公开仓库

- `kotorin-Y/OpsDeputy`
- `kotorin-Y/Some-tools...`

每个仓库使用 Firefly 内置 GitHub 卡片语法和独立介绍文章展示。

## 基础功能

保留 Firefly 的：

- 响应式布局、搜索、归档、分类、标签、RSS。
- 亮色 / 暗色 / 跟随系统。
- 主题色、壁纸模式、列表 / 网格布局切换。
- 双侧栏、公告、统计、日历、文章目录、音乐组件。
- Markdown 扩展、GitHub 仓库卡片、代码高亮和分享海报。

未配置真实数据的打赏、留言、番组页面默认关闭，避免展示主题作者信息。

## 可修改能力

1. `src/config/siteConfig.ts`：站点名称、描述、主题色、页面开关和列表布局。
2. `src/config/profileConfig.ts`：头像、签名、GitHub、RSS。
3. `src/config/navBarConfig.ts`：作品集、文章、关于和 GitHub 导航。
4. `src/config/backgroundWallpaper.ts`：标题、副标题、壁纸和动效开关。
5. `src/config/announcementConfig.ts`：首页公告。
6. `src/content/posts/`：项目与博客文章。
7. `src/content/spec/about.md`：个人介绍。
8. `docs/PERSONALIZATION.md`：面向非开发者的修改手册。

## 内容边界

- 不伪造未公开的个人履历、联系方式和项目数据。
- GitHub 仓库信息以 2026 年 6 月 22 日公开 API 为准。
- Firefly 与 Fuwari 的开源署名和 MIT 许可证保留。
- Stellar Blade 项目继续保留非官方、非商业声明和素材来源记录。

## 验收标准

- `pnpm install` 成功。
- `pnpm dev` 可访问首页。
- `pnpm check` 和 `pnpm build` 通过。
- 桌面、平板和手机无关键布局溢出。
- 导航、搜索、主题切换、文章、下载链接和 GitHub 链接可用。
- 页面不再出现 CuteLeaf 的个人 QQ、邮箱、博客或打赏信息。
- Cloudflare 配置符合教程命令，且不要求个人域名。

