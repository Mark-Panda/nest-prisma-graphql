import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CommentWhereInput } from './comment-where.input';
import { CommentOrderByWithRelationAndSearchRelevanceInput } from './comment-order-by-with-relation-and-search-relevance.input';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CommentScalarFieldEnum } from './comment-scalar-field.enum';

@ArgsType()
export class FindManyCommentArgs {

    @Field(() => CommentWhereInput, {nullable:true})
    where?: CommentWhereInput;

    @Field(() => [CommentOrderByWithRelationAndSearchRelevanceInput], {nullable:true})
    orderBy?: Array<CommentOrderByWithRelationAndSearchRelevanceInput>;

    @Field(() => CommentWhereUniqueInput, {nullable:true})
    cursor?: CommentWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [CommentScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof CommentScalarFieldEnum>;
}
