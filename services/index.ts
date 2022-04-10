import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { ProfileModule } from './profile/profile.module';
import { DummyModule } from './dummy/dummy.module';
@Module({
    imports: [
        UserModule,
        TagModule,
        ArticleModule,
        CommentModule,
        ProfileModule,
        DummyModule,
    ],
})
export class AllModules {}
