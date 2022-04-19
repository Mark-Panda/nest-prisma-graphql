import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { LoggerService } from '@app/public-module';

@Module({
    imports: [ConfigModule],
    controllers: [LoginController],
    providers: [LoginService, LoggerService],
})
export class LoginModule {}
