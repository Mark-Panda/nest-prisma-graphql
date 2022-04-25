import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/resolver/auth/auth.service';
// @Injectable()
// export class GqlAuthGuard extends JwtAuthGuard {
//     getRequest(context: ExecutionContext) {
//         const ctx = GqlExecutionContext.create(context);
//         return ctx.getContext().req;
//     }
// }

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
            const accessToken =
                req.get('Authorization') || req.headers.Authorization;
            if (!accessToken) throw new UnauthorizedException('请先登录');
            const atUserId = this.authService.verifyToken(accessToken);
            if (atUserId) return ctx.getContext().req;
            const refreshToken = req.get('RefreshToken');
            const tokenInfo = this.authService.verifyToken(refreshToken);
            if (!tokenInfo) {
                throw new UnauthorizedException('当前登录已过期，请重新登录');
            }
            const userInfo = await this.authService.getInfo(
                tokenInfo[`secret-${this.configService.get('jwt.secret')}`],
            );
            if (userInfo) {
                const tokens = this.authService.genToken({
                    id: userInfo.id,
                    username: userInfo.username,
                });
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
                throw new UnauthorizedException('用户不存在');
            }
        } catch (error) {
            // Logger
            return false;
        }
    }
}