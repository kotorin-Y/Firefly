# 个人博客修改指南

这份文档用于后续不改动页面组件的情况下，快速更新个人信息、作品与视觉内容。

## 1. 站点基础信息

编辑 `src/config/siteConfig.ts`：

- `title`：浏览器标题与站点名称
- `subtitle`：站点副标题
- `site_url`：Cloudflare 部署完成后的正式地址
- `description`、`keywords`：SEO 描述与关键词
- `themeColor.hue`：主题主色，范围 0–360
- `pages`：友链、打赏、留言、番组、相册页面开关

当前 Cloudflare 地址是 `https://kotorin-firefly.kotorin-y.workers.dev`。如果以后修改 Worker 或账户子域，必须同步修改 `site_url`。

## 2. 头像与外部链接

编辑 `src/config/profileConfig.ts`：

- `avatar`：支持本地图片或远程 URL
- `name`、`bio`：昵称与个人签名
- `links`：GitHub、RSS 或其他社交入口

## 3. 顶部导航

编辑 `src/config/navBarConfig.ts`。每个入口支持名称、URL、图标、外链标识和子菜单。

## 4. 首页背景与动效

编辑 `src/config/backgroundWallpaper.ts`：

- `src.desktop`、`src.mobile`：桌面与移动端背景
- `common.homeText`：首页标题、轮播副标题与打字机速度
- `common.waves`：水波动效；当前移动端关闭以降低性能负担
- `playerEnable`：背景视频开关；当前关闭，避免依赖外部视频

## 5. 作品和文章

文章目录为 `src/content/posts/`。新增项目建议复制已有项目目录，并修改 Front Matter：

```yaml
---
title: 项目标题
published: 2026-06-22
description: 一句话说明项目价值
image: ./cover.jpg
tags: [标签一, 标签二]
category: 项目分类
draft: false
---
```

首页置顶使用 `pinned: true`。暂不公开的文章使用 `draft: true`。

作品集入口：`src/content/posts/portfolio/index.mdx`。

## 6. 替换可下载项目

当前下载文件：

`public/downloads/stellar-blade-blood-rain-source.zip`

更新原项目后，可在原项目仓库执行：

```bash
git archive --format=zip --output=stellar-blade-blood-rain-source.zip HEAD
```

再用新文件替换博客中的同名压缩包。

## 7. GitHub 项目卡片

MDX 中可以使用 Firefly 的 GitHub 卡片语法：

```md
::github{repo="kotorin-Y/OpsDeputy"}
```

仓库必须公开，且名称必须与 GitHub 完全一致。

## 8. 本地检查

每次提交前至少运行：

```bash
pnpm check
pnpm build
```

然后启动 `pnpm preview`，检查首页、作品集、每个项目页、下载链接、搜索、移动端菜单和主题切换。
