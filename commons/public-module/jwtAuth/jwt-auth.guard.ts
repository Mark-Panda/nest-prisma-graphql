import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/resolver/auth/auth.service';
import { redisClient } from 'commons/public-tool';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private readonly authService: AuthService,
        readonly configService: ConfigService,
    ) {
        super();
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        try {
            const accessToken = req.get('Authorization');
            if (!accessToken) throw new UnauthorizedException('请先登录');
            const atUserInfo = await this.authService.verifyToken(
                accessToken,
                'accessToken',
            );
            if (atUserInfo) {
                console.log('---atUserInfo', atUserInfo);
                const redisAccessToken = await redisClient.get(
                    `accessToken-${atUserInfo.username}`,
                );
                console.log('---redisAccessToken', redisAccessToken);
                if (accessToken.replace('Bearer ', '') !== redisAccessToken) {
                    throw new UnauthorizedException('请先登录');
                }
                // 给req存放userInfo信息,用于角色判断用户来源
                context.switchToHttp().getRequest().userInfo = {
                    username: atUserInfo.username,
                };
                return this.activate(context);
            }
            const refreshToken = req.get('refreshToken');
            const tokenInfo = await this.authService.verifyToken(
                refreshToken,
                'refreshToken',
            );
            if (!tokenInfo) {
                throw new UnauthorizedException('当前登录已过期，请重新登录');
            }
            const userInfo = await this.authService.getInfo(
                tokenInfo[`secret-${this.configService.get('jwt.secret')}`],
            );
            if (userInfo) {
                const redisRefreshToken = await redisClient.get(
                    `refreshToken-${userInfo.username}`,
                );
                if (refreshToken.replace('Bearer ', '') !== redisRefreshToken) {
                    throw new UnauthorizedException('请先登录');
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
                context.switchToHttp().getRequest().userInfo = {
                    username: userInfo.username,
                };
                // request headers 对象 prop 属性全自动转成小写，
                // 所以 获取 request.headers['authorization'] 或 request.get('Authorization')
                // 重置属性 request.headers[authorization] = value
                req.headers['authorization'] = 'Bearer ' + tokens.accessToken;
                req.headers['refreshToken'] = tokens.refreshToken;
                // 在响应头中加入新的token，客户端判断响应头有无 Authorization 字段，有则重置
                res.header('Authorization', tokens.accessToken);
                res.header('RefreshToken', tokens.refreshToken);
                // 将当前请求交给下一级
                return this.activate(context);
            } else {
                throw new UnauthorizedException('用户不存在');
            }
        } catch (error) {
            // Logger
            return false;
        }
    }

    async activate(context: ExecutionContext): Promise<boolean> {
        return super.canActivate(context) as Promise<boolean>;
    }
}
