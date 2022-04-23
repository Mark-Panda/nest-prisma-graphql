import { Module } from '@nestjs/common';
import { LoggerService } from 'commons/public-module';
import { UserResolver } from './user.resolver';

@Module({
    imports: [],
    providers: [UserResolver, LoggerService],
})
export class UserModule {}
