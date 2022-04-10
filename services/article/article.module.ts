import { Module } from '@nestjs/common';
import { ArticleResolver } from './article.resolver';

@Module({
    imports: [],
    providers: [ArticleResolver],
})
export class ArticleModule {}
