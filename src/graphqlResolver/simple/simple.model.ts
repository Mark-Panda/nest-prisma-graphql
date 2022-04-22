import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Directive } from '@nestjs/graphql';

/** 自定义查询模型 */
@ObjectType({ description: 'Simple 描述' })
export class Simple {
    @Field(() => String, { nullable: false, description: 'Simple的邮件地址' })
    email!: string;

    /** User's name */
    @Field(() => String, { nullable: false, description: 'simple 的名字' })
    @Directive('@upper')
    name!: string;
}
