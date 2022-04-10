import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';

@Module({
    imports: [],
    providers: [CommentResolver],
})
export class CommentModule {}
