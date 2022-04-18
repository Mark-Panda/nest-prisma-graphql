import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { NestedFloatWithAggregatesFilter } from './nested-float-with-aggregates-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedFloatFilter } from './nested-float-filter.input';

@InputType()
export class FloatWithAggregatesFilter {

    @Field(() => Float, {nullable:true})
    equals?: number;

    @Field(() => [Float], {nullable:true})
    in?: Array<number>;

    @Field(() => [Float], {nullable:true})
    notIn?: Array<number>;

    @Field(() => Float, {nullable:true})
    lt?: number;

    @Field(() => Float, {nullable:true})
    lte?: number;

    @Field(() => Float, {nullable:true})
    gt?: number;

    @Field(() => Float, {nullable:true})
    gte?: number;

    @Field(() => NestedFloatWithAggregatesFilter, {nullable:true})
    not?: NestedFloatWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedFloatFilter, {nullable:true})
    _avg?: NestedFloatFilter;

    @Field(() => NestedFloatFilter, {nullable:true})
    _sum?: NestedFloatFilter;

    @Field(() => NestedFloatFilter, {nullable:true})
    _min?: NestedFloatFilter;

    @Field(() => NestedFloatFilter, {nullable:true})
    _max?: NestedFloatFilter;
}
