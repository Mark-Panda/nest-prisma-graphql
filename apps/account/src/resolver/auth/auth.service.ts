import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { format } from '@app/public-tool';
import { AccountAdmin } from './auth.entity';
import { prisma } from '@app/public-tool';
import { User } from '@generated/user/user.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
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
        console.log('req', req);
        const { user } = req;
        // 获取鉴权 token
        const access_token = this.getToken(user);
        console.log('access_token', access_token);

        // 保存登录信息
        await prisma.user.update({ where: { id: user.id }, data: user });

        // 查询角色信息
        // const role = await this.getRole(user);

        return { ...user, access_token };
        // return { ...user, role, access_token };
    }

    /**
     * 获取账号信息
     */
    async getInfo(id: string) {
        console.log('getInfo', id);
        // 查询角色信息
        const user = await prisma.user.findUnique({ where: { id: id } });
        return user;

        // // 查询角色信息
        // const role = await this.getRole(user);

        // return { ...user, role };
    }

    /**
     * 写入缓存
     */
    async getRole(user: User) {
        // const role = await lastValueFrom(
        //     this.client.send('AdminRole.get.one', user.roleId),
        // );
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
        if (user && user.password === pass) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
