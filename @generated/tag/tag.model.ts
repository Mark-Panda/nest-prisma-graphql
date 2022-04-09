import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Directive } from '@nestjs/graphql';
import { Article } from '../article/article.model';
import { TagCount } from './tag-count.output';

@ObjectType()
export class Tag {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    @Directive('@lower')
    name!: string;

    @Field(() => [Article], {nullable:true})
    articles?: Array<Article>;

    @Field(() => TagCount, {nullable:false})
    _count?: TagCount;
}
