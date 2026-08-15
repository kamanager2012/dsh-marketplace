/** Install a catalog plugin through the official `dsh plugin add` surface. */
import { spawnSync } from 'node:child_process';
export function installPluginArgv(options) {
    const target = options.version === undefined ? options.packageName : `${options.packageName}@${options.version}`;
    return ['plugin', '--profile', options.profile, 'add', target];
}
/** Run the official plugin install; stdio passthrough keeps dsh's own UX. */
export function installPlugin(options) {
    const argv = installPluginArgv(options);
    if (options.dryRun === true)
        return { status: 0 };
    const result = spawnSync('dsh', argv, { stdio: 'inherit', env: process.env });
    if (result.error !== undefined) {
        const hint = result.error.code === 'ENOENT'
            ? '\n官方 dsh CLI 不在 PATH 里。先装一次:npm i -g @deepseek-ai/dsh(或 npx @deepseek-ai/dsh --help)'
            : `\n${result.error.message}`;
        process.stderr.write(`dsh-marketplace: 无法启动官方 dsh:${hint}\n`);
        return { status: 1 };
    }
    return { status: result.status };
}
