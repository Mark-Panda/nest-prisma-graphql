import { APP_PIPE } from '@nestjs/core';
import { Module, DynamicModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';
import { merge, cloneDeepWith } from 'lodash';
import { rootPath } from 'commons/public-tool';
import { configYml } from 'commons/public-tool';

export interface GlobalModuleOptions {
    yamlFilePath?: string[]; // 配置文件路径
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
        const { yamlFilePath = [] } = options || {};
        const imports: DynamicModule['imports'] = [
            // 配置模块
            ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                load: [
                    () => {
                        let configs = configYml;
                        const configPath = [...yamlFilePath];
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

        return {
            module: GlobalModule,
            imports,
            providers: [
                // 全局使用验证管道，并统一报错处理
                {
                    provide: APP_PIPE,
                    useValue: new ValidationPipe({ transform: true }),
                },
            ],
        };
    }
}
