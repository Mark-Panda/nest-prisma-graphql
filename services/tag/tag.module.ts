import { Module } from '@nestjs/common';
import { LoggerService } from '@app/public-module';
import { TagResolver } from './tag.resolver';

@Module({
    imports: [],
    providers: [TagResolver, LoggerService],
})
export class TagModule {}
