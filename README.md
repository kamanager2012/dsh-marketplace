# dsh-marketplace

**DSH 社区市场客户端** — 官方 DeepSeek Harness 插件的目录浏览与一键安装 CLI。

- 注册表:[kamanager2012/dsh-community-plugins](https://github.com/kamanager2012/dsh-community-plugins)
- 零依赖(仅 Node 22+ 内置 fetch);安装插件走官方 `dsh plugin add`,不做任何私有协议

## 安装

```sh
npm i -g dsh-marketplace
# 或直接跑源码
npx tsx src/cli-entry.ts list
```

## 使用

```sh
dsh-marketplace list                        # 列出全部插件(标出未验证版本)
dsh-marketplace search <关键词>             # 按名字/描述搜索
dsh-marketplace info <包名>                 # 版本与验证线详情
dsh-marketplace install <包名>[@版本]       # 官方 dsh plugin add 一键安装
```

安装需要官方 `dsh` CLI 在 PATH 里(`npm i -g @deepseek-ai/dsh`)。
默认安装进 `dsh-community-tui` profile;`--profile <名>` 可换。

## 契约分类

每个插件版本声明它验证过的官方 DSH 版本线(`0.1.0-rc.N`)。
与当前验证线(默认 `0.1.0-rc.6`)不一致的版本标 `(未验证)`——
**只推荐验证过的版本,不追最新**。

## 收录插件

在 [dsh-community-plugins](https://github.com/kamanager2012/dsh-community-plugins)
给 `catalog.json` 开 PR,CI 校验格式后合入即可。

## 开发

```sh
npm install
npm run build
npm test
```
