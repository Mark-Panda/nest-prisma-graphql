import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'commons/public-module';
import { AccountAdmin } from './auth.entity';
import { prisma } from 'commons/public-tool';
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
     * 生成 token
     */
    genToken(accountAdmin: AccountAdmin): Record<string, unknown> {
        const { id, username } = accountAdmin;
        // const accessToken = `Bearer ${this.jwtService.sign(payload)}`;
        const accessToken = this.jwtService.sign({
            [`secret-${this.configService.get('jwt.secret')}`]: id,
            username,
        });
        const refreshToken = this.jwtService.sign(
            {
                [`secret-${this.configService.get('jwt.secret')}`]: id,
                username,
            },
            {
                expiresIn: this.configService.get('jwt.refreshExpiresIn'),
            },
        );
        return { accessToken, refreshToken };
    }

    // 刷新 token
    refreshToken(accountAdmin: AccountAdmin): string {
        const { id, username } = accountAdmin;
        return this.jwtService.sign({
            [`secret-${this.configService.get('jwt.secret')}`]: id,
            username,
        });
    }

    /**
     * 校验 token
     */
    verifyToken(token: string): any {
        try {
            if (!token) return 0;
            const tokenInfo = this.jwtService.verify(
                token.replace('Bearer ', ''),
            );
            return tokenInfo;
        } catch (error) {
            return 0;
        }
    }

    /**
     * 根据JWT解析的ID校验用户
     */
    async validateUserByJwt(id: string) {
        const user = await prisma.user.findUnique({ where: { id: id } });
        return user;
    }

    /**
     * 登录
     */
    async login(req: any) {
        const { user } = req;
        // 获取鉴权 token
        const access_token = this.genToken(user);
        // 写入Redis中
        // 保存登录信息
        await prisma.user.update({ where: { id: user.id }, data: user });
        req.user = user;
        return { ...user, ...access_token };
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
        const isMatch = await bcrypt.compare(pass, user.password);
        if (user && isMatch) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    /**
     * 注册用户
     * @param req 请求信息
     * @returns 返回
     */
    async register(req: any): Promise<object> {
        try {
            const { username, password, email, phone } = req.body;
            const salt = await bcrypt.genSalt(
                this.configService.get<number>('encryption.saltOrRounds'),
            );
            const bcryptPwd = await bcrypt.hash(password, salt);
            await prisma.user.create({
                data: {
                    username,
                    password: bcryptPwd,
                    email,
                    phone,
                    role: 'USER',
                },
            });
            const user = await prisma.user.findUnique({
                where: { email_username: { email, username } },
            });
            // 获取鉴权 token
            const access_token = this.genToken(user);
            return { ...user, ...access_token };
        } catch (error) {
            this.logger.log(error, '注册异常信息');
            return { error: error };
        }
    }
}
