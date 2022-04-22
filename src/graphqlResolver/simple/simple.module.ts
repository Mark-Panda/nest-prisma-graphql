import { Module } from '@nestjs/common';
import { SimpleResolver } from './simple.resolver';
import { LoggerService } from 'commons/public-module';

@Module({
    imports: [],
    providers: [SimpleResolver, LoggerService],
})
export class SimpleModule {}
