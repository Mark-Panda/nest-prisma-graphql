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

const { NODE_ENV } = process.env;
if (NODE_ENV === 'production') {
    prisma.$on('query', (event) => {
        console.log('查询日志', event);
    });
}

/**
 * prisma中间件
 */
prisma.$use(async (params, next) => {
    const result = await next(params);
    return result;
});

export { prisma };
