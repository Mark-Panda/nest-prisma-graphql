import { load } from 'js-yaml';
import { join, resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import { merge, cloneDeepWith } from 'lodash';
const rootPath = resolve(process.cwd());
let configs: any = {};
const configPath = ['config.yaml', 'config.jwt.yaml'];
for (const path of configPath) {
    try {
        // 读取并解析配置文件
        const filePath = join(rootPath, 'config', path);
        if (existsSync(filePath))
            configs = merge(configs, load(readFileSync(filePath, 'utf8')));
    } catch {}
}
// 递归将 null 转 空字符串
configs = cloneDeepWith(configs, (value) => {
    if (value === null) return '';
});

export const configYml = configs;
