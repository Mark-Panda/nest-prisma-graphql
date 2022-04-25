import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from 'commons/public-module';
import { PageController } from './page.controller';

@Module({
    imports: [ConfigModule],
    controllers: [PageController],
    providers: [LoggerService],
})
export class PageModule {}
