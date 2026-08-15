import { strict as assert } from 'node:assert'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it } from 'node:test'
import type { PluginEntry } from '../src/catalog.js'
import { fetchCatalog } from '../src/client.js'
import { classifyPlugin, searchPlugins } from '../src/compat.js'
import { installPluginArgv } from '../src/install.js'

const sampleCatalog: { version: 1; updatedAt: string; plugins: PluginEntry[] } = {
  version: 1,
  updatedAt: 'x',
  plugins: [
    {
      name: 'plugin-a',
      description: 'Alpha 插件',
      author: 'a',
      repo: 'https://example.com/a',
      category: 'tool',
      versions: [{ version: '1.0.0', testedDsh: '0.1.0-rc.6' }],
    },
    {
      name: 'plugin-b',
      description: 'Beta 插件',
      author: 'b',
      repo: 'https://example.com/b',
      category: 'ui',
      versions: [
        { version: '0.9.0', testedDsh: '0.1.0-rc.6' },
        { version: '2.0.0', testedDsh: '0.1.0-rc.9' },
      ],
    },
  ],
}

describe('marketplace client and classification', () => {
  it('fetches and parses the catalog', async () => {
    const fetchImpl = (async () => new Response(JSON.stringify(sampleCatalog), { status: 200 })) as unknown as typeof fetch
    const result = await fetchCatalog({ fetchImpl })
    assert.equal(result.source, 'network')
    assert.equal(result.catalog.plugins.length, 2)
  })

  it('falls back to cache when the registry is unreachable', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'mkt-cache-'))
    try {
      const cachePath = join(dir, 'catalog.json')
      writeFileSync(cachePath, JSON.stringify(sampleCatalog))
      const fetchImpl = (async () => { throw new Error('offline') }) as unknown as typeof fetch
      const result = await fetchCatalog({ fetchImpl, cachePath })
      assert.equal(result.source, 'cache')
      assert.equal(result.catalog.plugins[0]?.name, 'plugin-a')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('classifies latest versions against the tested rc line', () => {
    const a = classifyPlugin(sampleCatalog.plugins[0]!, '0.1.0-rc.6')
    assert.equal(a.latest.status, 'tested')
    const b = classifyPlugin(sampleCatalog.plugins[1]!, '0.1.0-rc.6')
    assert.equal(b.latest.status, 'untested')
    assert.equal(b.hasTestedVersion, true)
  })

  it('searches by name and description', () => {
    const classified = sampleCatalog.plugins.map(plugin => classifyPlugin(plugin, '0.1.0-rc.6'))
    assert.deepEqual(searchPlugins(classified, 'beta').map(item => item.plugin.name), ['plugin-b'])
    assert.equal(searchPlugins(classified, '').length, 2)
  })

  it('builds the official dsh plugin add argv', () => {
    assert.deepEqual(installPluginArgv({ profile: 'dsh-community-tui', packageName: 'plugin-a' }),
      ['plugin', '--profile', 'dsh-community-tui', 'add', 'plugin-a'])
    assert.deepEqual(installPluginArgv({ profile: 'p', packageName: 'plugin-a', version: '1.0.0' }),
      ['plugin', '--profile', 'p', 'add', 'plugin-a@1.0.0'])
  })
})
