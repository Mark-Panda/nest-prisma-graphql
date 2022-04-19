import { Module } from '@nestjs/common';
import { LoggerService } from '@app/public-module';
import { CommentResolver } from './comment.resolver';

@Module({
    imports: [],
    providers: [CommentResolver, LoggerService],
})
export class CommentModule {}
