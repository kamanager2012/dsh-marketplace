export function classifyVersion(version, testedDshLine) {
    return version.testedDsh === testedDshLine ? 'tested' : 'untested';
}
export function classifyPlugin(plugin, testedDshLine) {
    const sorted = [...plugin.versions].sort((a, b) => a.version.localeCompare(b.version, undefined, { numeric: true }));
    const latestEntry = sorted[sorted.length - 1];
    if (latestEntry === undefined)
        throw new Error(`plugin ${plugin.name} has no versions`);
    return {
        plugin,
        latest: { entry: latestEntry, status: classifyVersion(latestEntry, testedDshLine) },
        hasTestedVersion: plugin.versions.some(version => classifyVersion(version, testedDshLine) === 'tested'),
    };
}
export function searchPlugins(plugins, query) {
    const q = query.trim().toLowerCase();
    if (q === '')
        return plugins;
    return plugins.filter(item => item.plugin.name.toLowerCase().includes(q)
        || item.plugin.description.toLowerCase().includes(q));
}
