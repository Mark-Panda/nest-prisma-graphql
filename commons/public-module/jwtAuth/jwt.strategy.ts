import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/resolver/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwt.secret'),
        });
    }

    async validate(payload: any) {
        console.log('验证测试', payload);
        const user = await this.authService.validateUserByJwt(
            payload[`secret-${this.configService.get('jwt.secret')}`],
        );
        // 如果有用户信息，代表 token 没有过期，没有则 token 已失效
        if (!user) throw new UnauthorizedException();
        return {
            id: payload[`secret-${this.configService.get('jwt.secret')}`],
            username: payload.username,
        };
    }
}
