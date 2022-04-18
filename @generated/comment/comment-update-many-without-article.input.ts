import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentCreateWithoutArticleInput } from './comment-create-without-article.input';
import { CommentCreateOrConnectWithoutArticleInput } from './comment-create-or-connect-without-article.input';
import { CommentUpsertWithWhereUniqueWithoutArticleInput } from './comment-upsert-with-where-unique-without-article.input';
import { CommentCreateManyArticleInputEnvelope } from './comment-create-many-article-input-envelope.input';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { CommentUpdateWithWhereUniqueWithoutArticleInput } from './comment-update-with-where-unique-without-article.input';
import { CommentUpdateManyWithWhereWithoutArticleInput } from './comment-update-many-with-where-without-article.input';
import { CommentScalarWhereInput } from './comment-scalar-where.input';

@InputType()
export class CommentUpdateManyWithoutArticleInput {

    @Field(() => [CommentCreateWithoutArticleInput], {nullable:true})
    create?: Array<CommentCreateWithoutArticleInput>;

    @Field(() => [CommentCreateOrConnectWithoutArticleInput], {nullable:true})
    connectOrCreate?: Array<CommentCreateOrConnectWithoutArticleInput>;

    @Field(() => [CommentUpsertWithWhereUniqueWithoutArticleInput], {nullable:true})
    upsert?: Array<CommentUpsertWithWhereUniqueWithoutArticleInput>;

    @Field(() => CommentCreateManyArticleInputEnvelope, {nullable:true})
    createMany?: CommentCreateManyArticleInputEnvelope;

    @Field(() => [CommentWhereUniqueInput], {nullable:true})
    set?: Array<CommentWhereUniqueInput>;

    @Field(() => [CommentWhereUniqueInput], {nullable:true})
    disconnect?: Array<CommentWhereUniqueInput>;

    @Field(() => [CommentWhereUniqueInput], {nullable:true})
    delete?: Array<CommentWhereUniqueInput>;

    @Field(() => [CommentWhereUniqueInput], {nullable:true})
    connect?: Array<CommentWhereUniqueInput>;

    @Field(() => [CommentUpdateWithWhereUniqueWithoutArticleInput], {nullable:true})
    update?: Array<CommentUpdateWithWhereUniqueWithoutArticleInput>;

    @Field(() => [CommentUpdateManyWithWhereWithoutArticleInput], {nullable:true})
    updateMany?: Array<CommentUpdateManyWithWhereWithoutArticleInput>;

    @Field(() => [CommentScalarWhereInput], {nullable:true})
    deleteMany?: Array<CommentScalarWhereInput>;
}
