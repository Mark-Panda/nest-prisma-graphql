import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ArticleScalarWhereInput } from './article-scalar-where.input';
import { ArticleUpdateManyMutationInput } from './article-update-many-mutation.input';

@InputType()
export class ArticleUpdateManyWithWhereWithoutTagsInput {

    @Field(() => ArticleScalarWhereInput, {nullable:false})
    where!: ArticleScalarWhereInput;

    @Field(() => ArticleUpdateManyMutationInput, {nullable:false})
    data!: ArticleUpdateManyMutationInput;
}
