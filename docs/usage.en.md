# dsh-marketplace Usage and Data Flow

[简体中文](usage.md) · [Back to English README](../README.en.md) · [Online Handbook](https://kamanager2012.github.io/deepseek-harness-handbook/en/)

## What it is

`dsh-marketplace` is plugin discovery and install UX. It reads `dsh-community-plugins/catalog.json`, helps users search and inspect compatibility, and hands installation to the official `dsh plugin add` command.

It is not a Runtime, not a new Package Manager, and not the owner of the registry or user Sessions.

```text
dsh-community-plugins/catalog.json
              ↓ fetch / parse / classify
        dsh-marketplace
              ↓ official command
        dsh plugin add <name>
```

## Install

Node.js 22+ is required, and the official `dsh` CLI must be available on PATH:

```sh
npm i -g github:kamanager2012/dsh-marketplace
npm i -g @deepseek-ai/dsh
```

From source:

```sh
git clone https://github.com/kamanager2012/dsh-marketplace
cd dsh-marketplace
npm install
npm link
```

## Common commands

```sh
dsh-marketplace list
dsh-marketplace search <keyword>
dsh-marketplace info <package-name>
dsh-marketplace install <package-name>[@version]
```

`list`, `search`, and `info` display registry verification lines, not a live security scan.
`info` also displays the registry-recorded digest and provenance when present. Before
calling the official install chain, `install` prints the registry digest and a check
command such as:

```text
registry digest: sha512-...
npm view <name>@<version> dist.integrity
```

It forwards the user choice and does not bypass the official plugin protocol. The
current implementation test suite is 11/11 green.

## Read compatibility correctly

| Marker | Meaning |
| --- | --- |
| Matching `testedDsh` | The registry has evidence for that Runtime line |
| `[UNVERIFIED]` | No matching line, stale evidence, or existence-only information |
| `[PARTIAL]` | Only install/composition evidence exists; do not claim full runtime compatibility |

Compatibility is not trust. A plugin may read files, access the network, start processes, or mutate the system. Review its source, permission notes, and official install output before installing.

## First checks when something fails

1. Confirm `node --version` is 22+;
2. Confirm the official CLI is available with `dsh --help`;
3. Check whether the entry `testedDsh` matches the current Runtime;
4. Read the original error from official `dsh plugin add`, not only the Marketplace summary;
5. Check for undeclared credentials, network access, or system permissions.

Do not treat a successful catalog fetch, network request, or README claim as a successful plugin runtime test.

## Development and validation

```sh
npm install
npm run typecheck
npm run build
npm test
```

When registry fields change, update the verification record in [dsh-community-plugins](https://github.com/kamanager2012/dsh-community-plugins) before changing presentation or parsing here.

## Ecosystem links

- [Canonical Product: dsh-community](https://github.com/kamanager2012/dsh-community)
- [Plugin registry](https://github.com/kamanager2012/dsh-community-plugins)
- [Community Labs](https://github.com/kamanager2012/deepseek-harness-suite)
- [Handbook plugin section](https://kamanager2012.github.io/deepseek-harness-handbook/en/10-plugins/)
- [Official Runtime](https://github.com/deepseek-ai/deepseek-harness)
