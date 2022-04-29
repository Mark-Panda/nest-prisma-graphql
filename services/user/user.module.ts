import { Module } from '@nestjs/common';
import { LoggerService } from 'commons/public-module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/resolver/auth/auth.service';
import { UserResolver } from './user.resolver';

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
    providers: [UserResolver, LoggerService, AuthService],
})
export class UserModule {}
