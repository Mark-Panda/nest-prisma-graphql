import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
    Module,
    DynamicModule,
    ValidationPipe,
    CacheModule,
} from '@nestjs/common';
import type { ClientOpts } from 'redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import * as redisStore from 'cache-manager-redis-store';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';
import { merge, cloneDeepWith } from 'lodash';
import {
    rootPath,
    AllExceptionFilter,
    TransformInterceptor,
} from 'commons/public-tool';

export interface GlobalModuleOptions {
    yamlFilePath?: string[]; // 配置文件路径
    microservice?: string[]; // 开启微服务模块
    cache?: boolean; // 开启缓存模块
    graphq?: boolean; // 开启GraphQL
}
/**
 * 全局模块
 */
@Module({})
export class GlobalModule {
    /**
     * 全局模块初始化
     */
    static forRoot(options: GlobalModuleOptions): DynamicModule {
        const { yamlFilePath = [], cache, microservice } = options || {};
        const imports: DynamicModule['imports'] = [
            // 配置模块
            ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                load: [
                    () => {
                        let configs: any = {};
                        const configPath = [
                            'config.yaml',
                            'config.jwt.yaml',
                            `${process.env.NODE_ENV || 'development'}.yaml`,
                            ...yamlFilePath,
                        ];
                        for (const path of configPath) {
                            try {
                                // 读取并解析配置文件
                                const filePath = join(rootPath, 'config', path);
                                if (existsSync(filePath))
                                    configs = merge(
                                        configs,
                                        load(readFileSync(filePath, 'utf8')),
                                    );
                            } catch {}
                        }
                        // 递归将 null 转 空字符串
                        configs = cloneDeepWith(configs, (value) => {
                            if (value === null) return '';
                        });

                        return configs;
                    },
                ],
            }),
        ];

        // 开启微服务模块
        if (microservice) {
            imports.push({
                ...ClientsModule.registerAsync(
                    microservice.map((name) => ({
                        name,
                        useFactory: (configService: ConfigService) => {
                            const microserviceClient = configService.get(
                                `microserviceClients.${name}`,
                            );
                            return microserviceClient;
                        },
                        inject: [ConfigService],
                    })),
                ),
                global: true,
            });
        }

        // 开启缓存模块
        if (cache) {
            imports.push({
                ...CacheModule.registerAsync<ClientOpts>({
                    useFactory: (configService: ConfigService) => {
                        const { redis } = configService.get('cache');
                        // 使用 redis 做缓存服务
                        return {
                            store: redisStore,
                            ...redis,
                        };
                    },
                    inject: [ConfigService],
                }),
                global: true,
            });
        }

        return {
            module: GlobalModule,
            imports,
            providers: [
                // 全局使用验证管道，并统一报错处理
                {
                    provide: APP_PIPE,
                    useValue: new ValidationPipe({ transform: true }),
                },
                // 异常过滤器
                { provide: APP_FILTER, useClass: AllExceptionFilter },
                // 响应参数转化拦截器
                { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
            ],
        };
    }
}
