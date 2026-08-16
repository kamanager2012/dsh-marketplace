import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import { parseCatalog, type PluginCatalog } from '../src/catalog.js'

const valid: PluginCatalog = {
  version: 1,
  updatedAt: '2026-08-15T00:00:00Z',
  plugins: [
    {
      name: '@dsh-community/tui',
      description: '社区版·终端',
      author: 'dsh-community',
      repo: 'https://github.com/kamanager2012/dsh-community',
      category: 'ui',
      versions: [{ version: '0.1.0', testedDsh: '0.1.0-rc.6', notes: 'ok' }],
    },
  ],
}

describe('catalog schema', () => {
  it('accepts a well-formed catalog', () => {
    const catalog = parseCatalog(valid)
    assert.equal(catalog?.plugins[0]?.name, '@dsh-community/tui')
    assert.equal(catalog?.plugins[0]?.versions[0]?.notes, 'ok')
  })

  it('carries registry verification facts: integrity and provenance', () => {
    const withFacts = {
      ...valid,
      plugins: [{
        ...valid.plugins[0],
        versions: [{
          version: '0.1.0',
          testedDsh: '0.1.0-rc.6',
          integrity: 'sha512-abcdef',
          provenance: true,
        }],
      }],
    }
    const catalog = parseCatalog(withFacts)
    assert.equal(catalog?.plugins[0]?.versions[0]?.integrity, 'sha512-abcdef')
    assert.equal(catalog?.plugins[0]?.versions[0]?.provenance, true)
    const bare = parseCatalog(valid)
    assert.equal(bare?.plugins[0]?.versions[0]?.integrity, undefined)
    assert.equal(bare?.plugins[0]?.versions[0]?.provenance, undefined)
  })

  it('rejects duplicate plugin names', () => {
    const dup = { ...valid, plugins: [...valid.plugins, ...valid.plugins] }
    assert.equal(parseCatalog(dup), undefined)
  })

  it('rejects an untested rc line that is not 0.1.0-rc.N', () => {
    const bad = {
      version: 1 as const,
      updatedAt: 'x',
      plugins: [
        {
          name: 'x',
          description: 'x',
          author: 'x',
          repo: 'https://example.com/x',
          category: 'tool' as const,
          versions: [{ version: '1.0.0', testedDsh: '0.1.0' }],
        },
      ],
    }
    assert.equal(parseCatalog(bad), undefined)
  })

  it('rejects unknown categories', () => {
    const bad = {
      version: 1 as const,
      updatedAt: 'x',
      plugins: [
        {
          name: 'x',
          description: 'x',
          author: 'x',
          repo: 'https://example.com/x',
          category: 'game',
          versions: [{ version: '1.0.0', testedDsh: '0.1.0-rc.6' }],
        },
      ],
    }
    assert.equal(parseCatalog(bad), undefined)
  })

  it('rejects empty versions', () => {
    const bad = {
      version: 1 as const,
      updatedAt: 'x',
      plugins: [
        {
          name: 'x',
          description: 'x',
          author: 'x',
          repo: 'https://example.com/x',
          category: 'tool' as const,
          versions: [],
        },
      ],
    }
    assert.equal(parseCatalog(bad), undefined)
  })
})
