import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
    imports: [ConfigModule],
    controllers: [LoginController],
    providers: [LoginService],
})
export class LoginModule {}
