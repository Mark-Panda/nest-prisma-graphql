import { Request, Response, NextFunction } from 'express';
import { redisClient, configYml } from 'commons/public-tool';
import { rootPath } from 'commons/public-tool';
import { readFileSync } from 'fs';
import moment from 'moment';

export async function limiterMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const redisLuaScript = readFileSync(
        rootPath + '/commons/public-module/limiter/tokenlimit.lua',
    );
    const nowtimestamp = moment().format('X'); //当前时间戳 秒级
    const isPass = await redisClient.eval(
        redisLuaScript, //redisLuaScript脚本
        2, //表示后面参数有几个是Key
        configYml.httpLimiter.tokenKey, //剩余tokenKey
        configYml.httpLimiter.timestampKey, //刷新时间Key
        configYml.httpLimiter.rate, //每秒生成token数量即token生成速度
        configYml.httpLimiter.capacity, //桶容量
        nowtimestamp, //当前时间戳
        1, //当前请求token数量
    );
    if (isPass) {
        next();
    } else {
        return res.json({ code: 401, error: '请求频率太高' });
    }
}
