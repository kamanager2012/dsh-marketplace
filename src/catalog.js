/** Catalog schema for the DSH 社区市场 registry (dsh-community-plugins). */
export const PLUGIN_CATEGORIES = ['ui', 'tool', 'provider', 'workflow', 'other'];
const DSH_RC_LINE = /^0\.1\.0-rc\.\d+$/u;
export function parseCatalog(raw) {
    if (raw === null || typeof raw !== 'object')
        return undefined;
    const value = raw;
    if (value.version !== 1)
        return undefined;
    if (!Array.isArray(value.plugins))
        return undefined;
    const plugins = [];
    const names = new Set();
    for (const item of value.plugins) {
        if (item === null || typeof item !== 'object')
            return undefined;
        const plugin = item;
        const { name, description, author, repo, category } = plugin;
        if (typeof name !== 'string' || name === '' || names.has(name)
            || typeof description !== 'string' || description === ''
            || typeof author !== 'string' || author === ''
            || typeof repo !== 'string' || repo === ''
            || typeof category !== 'string' || !PLUGIN_CATEGORIES.includes(category))
            return undefined;
        names.add(name);
        if (!Array.isArray(plugin.versions) || plugin.versions.length === 0)
            return undefined;
        const versions = [];
        for (const versionItem of plugin.versions) {
            if (versionItem === null || typeof versionItem !== 'object')
                return undefined;
            const version = versionItem;
            if (typeof version.version !== 'string' || version.version === '')
                return undefined;
            if (typeof version.testedDsh !== 'string' || !DSH_RC_LINE.test(version.testedDsh))
                return undefined;
            const entry = { version: version.version, testedDsh: version.testedDsh };
            if (typeof version.notes === 'string' && version.notes !== '')
                entry.notes = version.notes;
            versions.push(entry);
        }
        plugins.push({
            name,
            description,
            author,
            repo,
            category: category,
            versions,
        });
    }
    return { version: 1, updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : '', plugins };
}
