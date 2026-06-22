# Kotorin's Digital Garden

基于 [Firefly](https://github.com/CuteLeaf/Firefly) 与 [Astro](https://astro.build/) 的个人博客和作品集。

## 已包含内容

- 游戏宣发网页《Stellar Blade: BLOOD RAIN》项目说明与源码下载
- GitHub 项目 OpsDeputy、Some-tools 展示
- 作品集、归档、分类、标签、搜索、RSS、主题切换和响应式布局
- Cloudflare Workers 部署配置
- 集中式个人配置说明

## 本地运行

环境要求：Node.js 22+、pnpm 9.14.4、Git。

```bash
corepack enable
pnpm install
pnpm dev
```

开发地址默认是 `http://localhost:4321/`。

## 验证与构建

```bash
pnpm check
pnpm build
pnpm preview
```

## 修改个人内容

站点标题、头像、导航、背景文案、文章和项目入口的具体位置见：

[docs/PERSONALIZATION.md](docs/PERSONALIZATION.md)

## 部署

本项目按教程使用 Cloudflare Workers，不要求绑定个人域名。完成 GitHub Fork 与推送后：

1. 登录 Cloudflare，进入 Workers & Pages。
2. 连接 GitHub 仓库。
3. 构建命令设置为 `pnpm build`。
4. 部署命令使用 `npx wrangler deploy`。
5. 部署完成后使用 Cloudflare 提供的 `workers.dev` 地址。

`wrangler.jsonc` 中的 Worker 名称当前为 `kotorin-firefly`。

## 开源说明

本站个性化内容归站点作者所有。主题代码基于 Firefly 二次配置，继续遵循仓库内原有开源许可，并保留主题作者署名。
