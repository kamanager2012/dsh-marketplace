#!/usr/bin/env node
process.stderr.write(`dsh-marketplace has moved to dsh-community.

  git clone https://github.com/kamanager2012/dsh-community
  cd dsh-community
  pnpm install
  pnpm marketplace -- list

Source: https://github.com/kamanager2012/dsh-community/tree/main/packages/marketplace
`)
process.exit(1)
