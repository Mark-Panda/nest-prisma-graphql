import Redis from 'ioredis';
import { configYml } from './config';
/**
 * Redis连接客户端
 */
export const redisClient = new Redis({
    port: configYml.cache.redis.port ? configYml.cache.redis.port : 6379,
    host: configYml.cache.redis.host ? configYml.cache.redis.host : 'localhost',
    password: null,
    db: configYml.cache.redis.db ? configYml.cache.redis.db : null,
});
