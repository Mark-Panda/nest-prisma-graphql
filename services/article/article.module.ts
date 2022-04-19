import { Module } from '@nestjs/common';
import { LoggerService } from '@app/public-module';
import { ArticleResolver } from './article.resolver';

@Module({
    imports: [],
    providers: [ArticleResolver, LoggerService],
})
export class ArticleModule {}
