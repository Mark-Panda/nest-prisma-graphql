import { load } from 'js-yaml';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { rootPath } from '.';
import { merge, cloneDeepWith } from 'lodash';

let configs: any = {};
const configPath = [
    'config.yaml',
    'config.jwt.yaml',
    `${process.env.NODE_ENV || 'development'}.yaml`,
];
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

// Redis设置取环境变量
configs.cache.redis.host = process.env.CONFIG_CACHE_HOST
    ? process.env.CONFIG_CACHE_HOST
    : configs.cache.redis.host;
configs.cache.redis.port = process.env.CONFIG_CACHE_PORT
    ? process.env.CONFIG_CACHE_PORT
    : configs.cache.redis.port;
configs.cache.redis.db = process.env.CONFIG_CACHE_DB
    ? process.env.CONFIG_CACHE_DB
    : configs.cache.redis.db;

// 限流设置取环境变量
configs.httpLimiter.tokenKey = process.env.CONFIG_LIMITER_TOKENKEY
    ? process.env.CONFIG_LIMITER_TOKENKEY
    : configs.httpLimiter.tokenKey;
configs.httpLimiter.timestampKey = process.env.CONFIG_LIMITER_TIMESTAMPKEY
    ? process.env.CONFIG_LIMITER_TIMESTAMPKEY
    : configs.httpLimiter.timestampKey;
configs.httpLimiter.capacity = process.env.CONFIG_LIMITER_CAPACITY
    ? process.env.CONFIG_LIMITER_CAPACITY
    : configs.httpLimiter.capacity;
configs.httpLimiter.rate = process.env.CONFIG_LIMITER_RATE
    ? process.env.CONFIG_LIMITER_RATE
    : configs.httpLimiter.rate;

// 服务占用端口
configs.serve.port = process.env.CONFIG_SERVE_PORT
    ? process.env.CONFIG_SERVE_PORT
    : configs.serve.port;

//JWT token失效时间
configs.jwt.expiresIn = process.env.CONFIG_JWT_EXPIRESIN
    ? process.env.CONFIG_JWT_EXPIRESIN
    : configs.jwt.expiresIn;
configs.jwt.refreshExpiresIn = process.env.CONFIG_JWT_REFRESHEXPIRESIN
    ? process.env.CONFIG_JWT_REFRESHEXPIRESIN
    : configs.jwt.refreshExpiresIn;

export const configYml = configs;
