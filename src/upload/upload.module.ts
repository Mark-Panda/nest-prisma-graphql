import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerService, JwtStrategy } from 'commons/public-module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { AuthService } from 'src/resolver/auth/auth.service';

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
    controllers: [UploadController],
    providers: [AuthService, UploadService, JwtStrategy, LoggerService],
})
export class UploadModule {}
