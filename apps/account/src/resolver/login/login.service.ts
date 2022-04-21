import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoggerService } from '@app/public-module';
import { prisma } from '@app/public-tool';
import { RegisternInfoDto } from '../auth/auth.entity';

@Injectable()
export class LoginService {
    constructor(
        private configService: ConfigService,
        private readonly logger: LoggerService,
        @Inject(CACHE_MANAGER) private readonly cacheManager,
    ) {}
    async register(userInfo: RegisternInfoDto): Promise<string> {
        try {
            const { username, password, email, phone } = userInfo;
            const salt = await bcrypt.genSalt(
                this.configService.get<number>('encryption.saltOrRounds'),
            );
            this.logger.log(salt, 'bcrypt盐');
            this.logger.log(password, '密码');
            const bcryptPwd = await bcrypt.hash(password, salt);
            this.logger.log(bcryptPwd, 'bcrypt加密密码');
            await prisma.user.create({
                data: {
                    username,
                    password: bcryptPwd,
                    email,
                    phone,
                    role: 'USER',
                },
            });
            return '注册成功';
        } catch (error) {
            this.logger.log(error, 'error');
            return '注册失败';
        }
    }
}
