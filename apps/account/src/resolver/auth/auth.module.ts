import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from '@app/public-module';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from '../../jwtAuth/local.strategy';
import { JwtStrategy } from '../../jwtAuth/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        ConfigModule,
        PassportModule,
        {
            ...JwtModule.registerAsync({
                useFactory: (configService: ConfigService) => {
                    const { secret, expiresIn } = configService.get('jwt');
                    return { secret, signOptions: { expiresIn } };
                },
                inject: [ConfigService],
            }),
        },
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, LoggerService],
})
export class AuthModule {}
