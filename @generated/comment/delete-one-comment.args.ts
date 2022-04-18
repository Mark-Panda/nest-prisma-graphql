import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CommentWhereUniqueInput } from './comment-where-unique.input';

@ArgsType()
export class DeleteOneCommentArgs {

    @Field(() => CommentWhereUniqueInput, {nullable:false})
    where!: CommentWhereUniqueInput;
}
