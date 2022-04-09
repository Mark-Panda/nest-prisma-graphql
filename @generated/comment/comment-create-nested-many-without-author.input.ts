import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentCreateWithoutAuthorInput } from './comment-create-without-author.input';
import { CommentCreateOrConnectWithoutAuthorInput } from './comment-create-or-connect-without-author.input';
import { CommentCreateManyAuthorInputEnvelope } from './comment-create-many-author-input-envelope.input';
import { CommentWhereUniqueInput } from './comment-where-unique.input';

@InputType()
export class CommentCreateNestedManyWithoutAuthorInput {
    @Field(() => [CommentCreateWithoutAuthorInput], { nullable: true })
    create?: Array<CommentCreateWithoutAuthorInput>;

    @Field(() => [CommentCreateOrConnectWithoutAuthorInput], { nullable: true })
    connectOrCreate?: Array<CommentCreateOrConnectWithoutAuthorInput>;

    @Field(() => CommentCreateManyAuthorInputEnvelope, { nullable: true })
    createMany?: CommentCreateManyAuthorInputEnvelope;

    @Field(() => [CommentWhereUniqueInput], { nullable: true })
    connect?: Array<CommentWhereUniqueInput>;
}
