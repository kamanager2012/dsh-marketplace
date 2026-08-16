# dsh-marketplace

**社区插件发现与安装体验（Discovery / Distribution UX）**

[English](README.en.md) | 简体中文

本仓库提供官方 DeepSeek Harness 插件的目录浏览、搜索、兼容性标记和安装入口。
它不是 Runtime、不是新的 Package Manager，也不拥有插件真源；目录来自
[`dsh-community-plugins`](https://github.com/kamanager2012/dsh-community-plugins)，
实际安装继续调用官方 `dsh plugin add`。

当前策略是 **GitHub-only distribution / 稳定维护**：Marketplace 暂不抢主产品发行
优先级，也不扩展成新的 Runtime、Registry 或跨平台打包渠道。

当前实现状态（2026-08-16）：`info` 会展示注册表记录的 package digest 和 provenance；
`install` 会在调用官方安装链前打印注册表 digest 以及
`npm view <name>@<version> dist.integrity` 核对命令。当前测试套件为 **11/11 通过**。

## 在六仓生态中的位置

| 仓库 | 定位 | 入口 |
|---|---|---|
| [`dsh-community`](https://github.com/kamanager2012/dsh-community) | Canonical Product，唯一正式下载入口 | [最新 Release](https://github.com/kamanager2012/dsh-community/releases/latest) |
| [`deepseek-harness-suite`](https://github.com/kamanager2012/deepseek-harness-suite) | Community Labs | [实验仓](https://github.com/kamanager2012/deepseek-harness-suite) |
| [`deepseek-harness-handbook`](https://github.com/kamanager2012/deepseek-harness-handbook) | Knowledge / Evidence | [在线手册](https://kamanager2012.github.io/deepseek-harness-handbook/) |
| [`dsh-community-plugins`](https://github.com/kamanager2012/dsh-community-plugins) | Compatibility Registry | [`catalog.json`](https://github.com/kamanager2012/dsh-community-plugins/blob/main/catalog.json) |
| `dsh-marketplace` | Discovery / Install UX | 本仓库的 CLI |
| [`dsh-community-edition`](https://github.com/kamanager2012/dsh-community-edition) | Merge & Archive | [历史参考](https://github.com/kamanager2012/dsh-community-edition) |

数据流保持单向且可追踪：

```text
dsh-community-plugins/catalog.json
              ↓ fetch / parse / classify
        dsh-marketplace
              ↓ official command
        dsh plugin add <name>
```

## 安装

需要 Node.js 22+。可以直接从 GitHub 安装，或从源码链接：

```sh
npm i -g github:kamanager2012/dsh-marketplace

git clone https://github.com/kamanager2012/dsh-marketplace
cd dsh-marketplace
npm install
npm link
```

完整使用、数据流和排障说明见[双语使用指南](docs/usage.md) / [English guide](docs/usage.en.md)。

安装插件还需要官方 `dsh` CLI 位于 PATH：

```sh
npm i -g @deepseek-ai/dsh
```

## 使用

```sh
dsh-marketplace list
dsh-marketplace search <keyword>
dsh-marketplace info <package-name>
dsh-marketplace install <package-name>[@version]
```

`list`、`search` 和 `info` 展示注册表中的验证线；与当前 Runtime 线不匹配的版本
必须标记为 `[UNVERIFIED]`。`install` 只负责把用户选择传给官方安装链，不绕过官方插件协议。

## 开发与验证

```sh
npm install
npm run typecheck
npm run build
npm test
```

插件作者应先在 [dsh-community-plugins](https://github.com/kamanager2012/dsh-community-plugins)
为 `catalog.json` 提交记录，并提供实际安装和 Runtime 版本验证证据。不要把最新版本、
README 声明或一次网络请求成功写成兼容性保证。
