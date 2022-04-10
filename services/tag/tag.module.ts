import { Module } from '@nestjs/common';
import { TagResolver } from './tag.resolver';

@Module({
    imports: [],
    providers: [TagResolver],
})
export class TagModule {}
