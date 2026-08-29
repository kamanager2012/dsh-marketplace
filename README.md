# dsh-marketplace 已迁移

**真源已并入 [`dsh-community/packages/marketplace`](https://github.com/kamanager2012/dsh-community/tree/main/packages/marketplace)。**

[English](README.en.md) | 简体中文

本仓库不再接受功能开发，GitHub 仓库已归档。目录浏览、搜索、兼容性展示和安装入口都在产品仓里；安装仍调用官方 `dsh plugin add`。插件目录是 [`packages/marketplace/catalog.json`](https://github.com/kamanager2012/dsh-community/blob/main/packages/marketplace/catalog.json)；独立仓 `dsh-community-plugins` 已归档。

## 怎么用

```sh
git clone https://github.com/kamanager2012/dsh-community
cd dsh-community
pnpm install
pnpm marketplace -- list
```

```sh
pnpm marketplace -- search <keyword>
pnpm marketplace -- info <package-name>
pnpm marketplace -- audit <package-name>
pnpm marketplace -- install [--yes] <package-name>[@version]
```

如果本仓库的 `dsh-marketplace` 命令仍在 PATH 上，它只会打印这段迁移说明并退出 1。不要 `npm i -g github:kamanager2012/dsh-marketplace`。

## 为什么还留着这个 GitHub 仓库

旧文档、书签和 `github:kamanager2012/dsh-marketplace` 安装方式需要一个不会 404 的地址。这里只做跳转，不是第二份 CLI 真源。
