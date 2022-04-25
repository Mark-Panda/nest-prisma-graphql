import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { LoggerService } from '../public-module';
import { mw } from 'request-ip';
import * as express from 'express';

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

    // 获取配置服务
    const configService = app.get<ConfigService>(ConfigService);

    // 服务配置
    const serve = configService.get('serve');
    // 注入日志
    const loggerService = new LoggerService();
    app.useLogger(loggerService);
    // 接口请求前缀
    app.setGlobalPrefix(serve.prefix);

    // swagger 接口文档
    const swagger = configService.get('swagger');
    const documentBuilder = new DocumentBuilder()
        .setTitle(swagger.title)
        .setDescription(swagger.description)
        .addBearerAuth(
            { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
            'access-token',
        )
        .addServer(serve.prefix)
        .build();
    const document = SwaggerModule.createDocument(app, documentBuilder, {
        ignoreGlobalPrefix: true,
    });
    SwaggerModule.setup(swagger.path, app, document);

    // 启动HTTP服务
    await app.listen(serve.port);
    // 捕获进程错误
    process.on('uncaughtException', function (err) {
        loggerService.error(err, '进程异常');
    });
    loggerService.log(
        `\nhttp://localhost:${serve.port}/dev\nhttp://localhost:${serve.port}/${swagger.path}`,
        swagger.title,
    );
}
