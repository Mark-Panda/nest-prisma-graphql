import { Module } from '@nestjs/common';
import { LoggerService } from 'commons/public-module';
import { EventsGateway } from './events.gateway';

@Module({
    providers: [EventsGateway, LoggerService],
})
export class EventsModule {}
