import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@app/public-module';

@Injectable()
export class LoginService {
    constructor(
        private configService: ConfigService,
        private readonly logger: LoggerService,
        @Inject(CACHE_MANAGER) private readonly cacheManager,
    ) {}
    async getHello(): Promise<string> {
        const redisHost = this.configService.get<string>('cache.redis.host');
        // 测试Redis获取
        await this.cacheManager.set('simple', 'panda', { ttl: 100 });
        const redisInfo = await this.cacheManager.get('simple');
        this.logger.log(redisInfo, '登录');
        this.logger.log(`测试配置信息${redisHost}`, '登录');
        return 'Hello World!';
    }
}
