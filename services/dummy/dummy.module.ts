import { Module } from '@nestjs/common';
import { LoggerService } from '@app/public-module';
import { DummyResolver } from './dummy.resolver';

@Module({
    imports: [],
    providers: [DummyResolver, LoggerService],
})
export class DummyModule {}
