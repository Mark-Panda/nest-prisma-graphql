import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import {
    LoggerService,
    LocalStrategy,
    JwtStrategy,
} from 'commons/public-module';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../resolver/auth/auth.service';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

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
    controllers: [TasksController],
    providers: [
        AuthService,
        TasksService,
        LocalStrategy,
        JwtStrategy,
        LoggerService,
    ],
})
export class TasksModule {}
