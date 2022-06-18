import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { WsAdapter } from '@nestjs/platform-ws';
import { join } from 'path';
import { mw } from 'request-ip';
import * as express from 'express';
import { LoggerService, limiterMiddleware } from '../public-module';
import { connectLogger } from 'log4js';
import { toIp, getIPAdress } from './data';

type BootstrapOptions = NestApplicationOptions & {
    // 在服务启动之前执行
    before?: (app: INestApplication) => void;
};

/**
 * 服务启动引导程序
 */
export async function bootstrap(
    module: any,
    bootstrapOptions?: BootstrapOptions,
) {
    const { before, ...options } = bootstrapOptions || {};
    const app = await NestFactory.create<NestExpressApplication>(
        module,
        options,
    );

    before?.(app);
    //静态资源目录
    app.use(express.static(join(process.cwd(), './public')));
    app.set('views', join(process.cwd(), './views'));
    app.set('view engine', 'ejs');
    // 获取客户端真实IP
    app.use(mw());
    // 限流中间件
    app.use(limiterMiddleware);
    // websocket
    app.useWebSocketAdapter(new WsAdapter(app));
    // 获取配置服务
    const configService = app.get<ConfigService>(ConfigService);

    // 服务配置
    const serve = configService.get('serve');
    // 注入日志
    const loggerService = new LoggerService();
    app.use(
        connectLogger(loggerService.log4js, {
            level: 'info',
            format: (req, res, format) => {
                const logInfo = `请求IP: ${toIp(
                    req.clientIp,
                )}\n请求方法: :method\n请求路径: :url\n请求实例: ${JSON.stringify(
                    req.body,
                )}\n响应时间: ${
                    res.responseTime || '-'
                }ms\nHTTP状态: :status\n请求来源: :referrer`;
                return format(logInfo);
            },
        }),
    );
    // 接口请求前缀
    app.setGlobalPrefix(serve.prefix);
    // swagger 接口文档
    const swagger = configService.get('swagger');
    if (process.env.NODE_ENV !== 'production') {
        const documentBuilder = new DocumentBuilder()
            .setTitle(swagger.title)
            .setDescription(swagger.description)
            .addBearerAuth(
                { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
                'Authorization',
            )
            .setVersion('1.0')
            .addServer(serve.prefix)
            .build();
        const document = SwaggerModule.createDocument(app, documentBuilder, {
            ignoreGlobalPrefix: true,
        });
        SwaggerModule.setup(swagger.path, app, document);
    }
    // 启动HTTP服务
    await app.listen(serve.port);
    // 捕获进程错误
    process.on('uncaughtException', function (err) {
        loggerService.error(err, '进程异常');
    });
    loggerService.log(`http://localhost:${serve.port}/dev`, '本地服务地址');
    loggerService.log(
        `http://localhost:${serve.port}/playground`,
        '本地GraphQL调试地址',
    );
    loggerService.log(
        `http://localhost:${serve.port}/${swagger.path}`,
        '本地Swagger' + swagger.title,
    );
    loggerService.log(`http://${getIPAdress()}:${serve.port}/dev`, '服务地址');
    loggerService.log(
        `http://${getIPAdress()}:${serve.port}/playground`,
        'GraphQL调试地址',
    );
    loggerService.log(
        `http://${getIPAdress()}:${serve.port}/${swagger.path}`,
        swagger.title,
    );
}
