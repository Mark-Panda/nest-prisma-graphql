import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '@app/public-module';
import { AccountAdmin } from './auth.entity';
import { prisma } from '@app/public-tool';
import * as bcrypt from 'bcrypt';
import { User } from '@generated/user/user.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly logger: LoggerService,
        @Inject(CACHE_MANAGER) private readonly cacheManager,
    ) {}

    /**
     * 生成加密串
     */
    getToken(accountAdmin: AccountAdmin) {
        const { id, username } = accountAdmin;
        return this.jwtService.sign({
            [`secret-${this.configService.get('jwt.secret')}`]: id,
            username,
        });
    }

    /**
     * 登录
     */
    async login(req: any) {
        const { user } = req;
        // 获取鉴权 token
        const access_token = this.getToken(user);
        // 保存登录信息
        await prisma.user.update({ where: { id: user.id }, data: user });
        return { ...user, access_token };
    }

    /**
     * 获取账号信息
     */
    async getInfo(id: string) {
        const user = await prisma.user.findUnique({ where: { id: id } });
        return user;
    }

    /**
     * 写入缓存
     */
    async getRole(user: User) {
        const userInfo = await prisma.user.findUnique({
            where: { id: user.id },
        });

        // 账号权限写入缓存
        await this.cacheManager.set(`permissions-${user.id}`, userInfo.role, {
            ttl: parseInt(this.configService.get('jwt.expiresIn')),
        });

        return userInfo;
    }

    /**
     * 校验用户名密码
     * @param username 用户名
     * @param pass 密码
     * @returns 返回
     */
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await prisma.user.findUnique({
            where: { username: username },
        });
        this.logger.log(user, '用户信息');
        const isMatch = await bcrypt.compare(pass, user.password);
        if (user && isMatch) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
