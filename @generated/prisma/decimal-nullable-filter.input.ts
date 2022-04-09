import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { NestedDecimalNullableFilter } from './nested-decimal-nullable-filter.input';

@InputType()
export class DecimalNullableFilter {
    @Field(() => GraphQLDecimal, { nullable: true })
    equals?: any;

    @Field(() => [GraphQLDecimal], { nullable: true })
    in?: Array<any>;

    @Field(() => [GraphQLDecimal], { nullable: true })
    notIn?: Array<any>;

    @Field(() => GraphQLDecimal, { nullable: true })
    lt?: any;

    @Field(() => GraphQLDecimal, { nullable: true })
    lte?: any;

    @Field(() => GraphQLDecimal, { nullable: true })
    gt?: any;

    @Field(() => GraphQLDecimal, { nullable: true })
    gte?: any;

    @Field(() => NestedDecimalNullableFilter, { nullable: true })
    not?: NestedDecimalNullableFilter;
}
