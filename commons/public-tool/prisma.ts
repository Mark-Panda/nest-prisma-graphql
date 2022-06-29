import { PrismaClient } from '@prisma/client';
import { LoggerService } from '../public-module/logger/logger.service';
const loggerService = new LoggerService();
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
if (NODE_ENV !== 'production') {
    prisma.$on('query', (event) => {
        loggerService.debug(event, '查询日志');
    });
}

/**
 * prisma中间件
 */
prisma.$use(async (params, next) => {
    const { model, action, args } = params;
    loggerService.debug(model, 'prisma中间件拦截模型名称');
    loggerService.debug(action, 'prisma中间件拦截模型操作');
    loggerService.debug(args, 'prisma中间件拦截模型参数');
    const result = await next(params);
    return result;
});

export { prisma };
