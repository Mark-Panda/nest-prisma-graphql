import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/resolver/auth/auth.service';
import { AuthenticationError } from 'commons/public-module/errors/errorsGql';
import { redisClient } from 'commons/public-tool';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    constructor(
        readonly authService: AuthService,
        readonly configService: ConfigService,
    ) {
        super();
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        const res = ctx.getContext().req.res;
        try {
            const accessToken = req.get('Authorization');
            if (!accessToken) throw new AuthenticationError('请先登录');
            const atUserId = await this.authService.verifyToken(
                accessToken,
                'accessToken',
            );
            if (atUserId) {
                const redisAccessToken = await redisClient.get(
                    `accessToken-${atUserId.username}`,
                );
                if (accessToken.replace('Bearer ', '') !== redisAccessToken) {
                    throw new AuthenticationError('请先登录');
                }
                // 给req存放userInfo信息,用于角色判断用户来源
                ctx.getContext().req.userInfo = { username: atUserId.username };
                return ctx.getContext().req;
            }
            const refreshToken = req.get('RefreshToken');
            const tokenInfo = await this.authService.verifyToken(
                refreshToken,
                'refreshToken',
            );
            if (!tokenInfo) {
                throw new AuthenticationError('当前登录已过期，请重新登录');
            }
            const userInfo = await this.authService.getInfo(
                tokenInfo[`secret-${this.configService.get('jwt.secret')}`],
            );
            if (userInfo) {
                const redisRefreshToken = await redisClient.get(
                    `refreshToken-${userInfo.username}`,
                );
                if (refreshToken.replace('Bearer ', '') !== redisRefreshToken) {
                    throw new AuthenticationError('请先登录');
                }
                const tokens: any = this.authService.genToken({
                    id: userInfo.id,
                    username: userInfo.username,
                });
                // 写入Redis中
                await redisClient.set(
                    `accessToken-${userInfo.username}`,
                    tokens.accessToken,
                    'EX',
                    parseInt(this.configService.get('jwt.expiresIn')),
                );
                await redisClient.set(
                    `refreshToken-${userInfo.username}`,
                    tokens.refreshToken,
                    'EX',
                    parseInt(this.configService.get('jwt.refreshExpiresIn')),
                );
                // 给req存放userInfo信息,用于角色判断用户来源
                ctx.getContext().req.userInfo = { username: userInfo.username };
                // request headers 对象 prop 属性全自动转成小写，
                // 所以 获取 request.headers['authorization'] 或 request.get('Authorization')
                // 重置属性 request.headers[authorization] = value
                req.headers['authorization'] = 'Bearer ' + tokens.accessToken;
                req.headers['refreshToken'] = tokens.refreshToken;
                // 在响应头中加入新的token，客户端判断响应头有无 Authorization 字段，有则重置
                res.header('Authorization', tokens.accessToken);
                res.header('RefreshToken', tokens.refreshToken);
                // 将当前请求交给下一级
                return ctx.getContext().req;
            } else {
                throw new AuthenticationError('用户未认证');
            }
        } catch (error) {
            // Logger
            throw new AuthenticationError('用户认证失败');
            // return false;
        }
    }
}
