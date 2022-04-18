import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    errorFormat: 'colorless',
    log: [
        {
            emit: 'event',
            level: 'query',
        },
    ],
});

prisma.$on('query', (event) => {
    console.log('查询日志', event);
});

/**
 * prisma中间件
 */
prisma.$use(async (params, next) => {
    console.log('prisma中间件开始', params);
    const result = await next(params);
    console.log('prisma中间件结束');
    return result;
});

export { prisma };
