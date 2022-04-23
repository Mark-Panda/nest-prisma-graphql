import { Module } from '@nestjs/common';
import { SimpleResolver } from './simple.resolver';
import { LoggerService } from 'commons/public-module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/resolver/auth/auth.service';
@Module({
    imports: [
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
    providers: [SimpleResolver, LoggerService, AuthService],
})
export class SimpleModule {}
