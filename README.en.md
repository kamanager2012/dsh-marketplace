# dsh-marketplace

**Discovery and distribution UX for the DeepSeek Harness community plugin ecosystem.**

[简体中文](README.md) | **English**

This repository provides catalog browsing, search, compatibility labels, and an
installation entry point for official DeepSeek Harness plugins. It is not a Runtime,
not a replacement Package Manager, and not the source of plugin truth. The catalog is
maintained by [`dsh-community-plugins`](https://github.com/kamanager2012/dsh-community-plugins);
installation continues through the official `dsh plugin add` command.

The current strategy is **GitHub-only distribution and maintenance**. Marketplace is
stable for discovery/install UX; it is not a new Runtime, registry owner, or
cross-platform release channel, and it should not compete with the canonical product's
release work.

## Position in the ecosystem

| Repository | Role | Entry |
|---|---|---|
| [`dsh-community`](https://github.com/kamanager2012/dsh-community) | Canonical Product and only normal download entry | [Latest release](https://github.com/kamanager2012/dsh-community/releases/latest) |
| [`deepseek-harness-suite`](https://github.com/kamanager2012/deepseek-harness-suite) | Community Labs | [Experimental source](https://github.com/kamanager2012/deepseek-harness-suite) |
| [`deepseek-harness-handbook`](https://github.com/kamanager2012/deepseek-harness-handbook) | Knowledge / Evidence | [Online handbook](https://kamanager2012.github.io/deepseek-harness-handbook/) |
| [`dsh-community-plugins`](https://github.com/kamanager2012/dsh-community-plugins) | Compatibility Registry | [`catalog.json`](https://github.com/kamanager2012/dsh-community-plugins/blob/main/catalog.json) |
| `dsh-marketplace` | Discovery / Install UX | The CLI in this repository |
| [`dsh-community-edition`](https://github.com/kamanager2012/dsh-community-edition) | Merge & Archive | [Historical reference](https://github.com/kamanager2012/dsh-community-edition) |

The data flow is intentionally small and traceable:

```text
dsh-community-plugins/catalog.json
              ↓ fetch / parse / classify
        dsh-marketplace
              ↓ official command
        dsh plugin add <name>
```

## Install

Requires Node.js 22+. Install from GitHub or link a local checkout:

```sh
npm i -g github:kamanager2012/dsh-marketplace

git clone https://github.com/kamanager2012/dsh-marketplace
cd dsh-marketplace
npm install
npm link
```

Plugin installation also requires the official `dsh` CLI on `PATH`:

```sh
npm i -g @deepseek-ai/dsh
```

## Use

```sh
dsh-marketplace list
dsh-marketplace search <keyword>
dsh-marketplace info <package-name>
dsh-marketplace install <package-name>[@version]
```

`list`, `search`, and `info` expose the tested Runtime lines from the registry.
Versions that do not match the current Runtime line must be shown as `[UNVERIFIED]`.
`install` passes the selection to the official install chain; it does not bypass the
official plugin protocol.

## Development and verification

```sh
npm install
npm run typecheck
npm run build
npm test
```

Plugin authors should submit catalog entries to
[`dsh-community-plugins`](https://github.com/kamanager2012/dsh-community-plugins)
with actual installation and Runtime-version evidence. A current package, a README
claim, or one successful network fetch is not a compatibility guarantee.
