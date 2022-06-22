import Redis from 'ioredis';
import Redlock from 'redlock';
import { configYml } from './config';
/**
 * Redis连接客户端
 */
export const redisClient = new Redis({
    port: configYml.cache.redis.port ? configYml.cache.redis.port : 6379,
    host: configYml.cache.redis.host ? configYml.cache.redis.host : 'localhost',
    password: configYml.cache.redis.password
        ? configYml.cache.redis.password
        : null,
    db: configYml.cache.redis.db ? configYml.cache.redis.db : null,
});

/**
 * Redis分布式锁
 */
export const redlock = new Redlock([redisClient], {
    retryDelay: 200, // time in ms
    retryCount: 5,
});
