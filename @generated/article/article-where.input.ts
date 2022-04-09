import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { TagListRelationFilter } from '../tag/tag-list-relation-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { UserWhereInput } from '../user/user-where.input';
import { UserListRelationFilter } from '../user/user-list-relation-filter.input';
import { CommentListRelationFilter } from '../comment/comment-list-relation-filter.input';
import { BoolNullableFilter } from '../prisma/bool-nullable-filter.input';

@InputType()
export class ArticleWhereInput {
    @Field(() => [ArticleWhereInput], { nullable: true })
    AND?: Array<ArticleWhereInput>;

    @Field(() => [ArticleWhereInput], { nullable: true })
    OR?: Array<ArticleWhereInput>;

    @Field(() => [ArticleWhereInput], { nullable: true })
    NOT?: Array<ArticleWhereInput>;

    @Field(() => StringFilter, { nullable: true })
    id?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    slug?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    title?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    description?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    body?: StringFilter;

    @Field(() => TagListRelationFilter, { nullable: true })
    tags?: TagListRelationFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    updatedAt?: DateTimeFilter;

    @Field(() => IntFilter, { nullable: true })
    favoritesCount?: IntFilter;

    @Field(() => UserWhereInput, { nullable: true })
    author?: UserWhereInput;

    @Field(() => StringFilter, { nullable: true })
    authorId?: StringFilter;

    @Field(() => UserListRelationFilter, { nullable: true })
    favoritedBy?: UserListRelationFilter;

    @Field(() => CommentListRelationFilter, { nullable: true })
    comments?: CommentListRelationFilter;

    @Field(() => BoolNullableFilter, { nullable: true })
    active?: BoolNullableFilter;
}
