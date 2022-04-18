import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginService {
    constructor(private configService: ConfigService) {}
    getHello(): string {
        const redisHost = this.configService.get<string>('cache.redis.host');
        console.log(`测试配置信息${redisHost}`);
        return 'Hello World!';
    }
}
