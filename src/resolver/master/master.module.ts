import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from 'commons/public-module';
import { MasterController } from './master.controller';

@Module({
    imports: [ConfigModule],
    controllers: [MasterController],
    providers: [LoggerService],
})
export class MasterModule {}
