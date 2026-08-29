# dsh-marketplace has moved

**Source of truth is now [`dsh-community/packages/marketplace`](https://github.com/kamanager2012/dsh-community/tree/main/packages/marketplace).**

[简体中文](README.md) | **English**

This repository is archived. Catalog browse, search, compatibility labels, and the install entry live in the product repo. Installation still calls official `dsh plugin add`. The catalog is [`packages/marketplace/catalog.json`](https://github.com/kamanager2012/dsh-community/blob/main/packages/marketplace/catalog.json); the standalone [`dsh-community-plugins`](https://github.com/kamanager2012/dsh-community-plugins) repo is archived.

## How to run it

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

If the `dsh-marketplace` binary from this repo is still on PATH, it only prints this migration notice and exits 1. Do not `npm i -g github:kamanager2012/dsh-marketplace`.

## Why this GitHub repo still exists

Old docs, bookmarks, and `github:kamanager2012/dsh-marketplace` installs need a URL that is not 404. This tree is a redirect, not a second CLI source of truth.
