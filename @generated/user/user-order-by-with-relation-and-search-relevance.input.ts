import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserGroupOrderByRelationAggregateInput } from '../user-group/user-group-order-by-relation-aggregate.input';
import { PersonOrderByRelationAggregateInput } from '../person/person-order-by-relation-aggregate.input';
import { UserOrderByRelevanceInput } from './user-order-by-relevance.input';

@InputType()
export class UserOrderByWithRelationAndSearchRelevanceInput {
    @Field(() => SortOrder, { nullable: true })
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, { nullable: true })
    create_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, { nullable: true })
    update_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, { nullable: true })
    isDelete?: keyof typeof SortOrder;

    @Field(() => SortOrder, { nullable: true })
    username?: keyof typeof SortOrder;

    @Field(() => SortOrder, { nullable: true })
    email?: keyof typeof SortOrder;

    @Field(() => SortOrder, { nullable: true })
    password?: keyof typeof SortOrder;

    @Field(() => SortOrder, { nullable: true })
    role?: keyof typeof SortOrder;

    @Field(() => UserGroupOrderByRelationAggregateInput, { nullable: true })
    group?: UserGroupOrderByRelationAggregateInput;

    @Field(() => SortOrder, { nullable: true })
    RFID?: keyof typeof SortOrder;

    @Field(() => PersonOrderByRelationAggregateInput, { nullable: true })
    person?: PersonOrderByRelationAggregateInput;

    @Field(() => SortOrder, { nullable: true })
    description?: keyof typeof SortOrder;

    @Field(() => SortOrder, { nullable: true })
    expired?: keyof typeof SortOrder;

    @Field(() => SortOrder, { nullable: true })
    status?: keyof typeof SortOrder;

    @Field(() => UserOrderByRelevanceInput, { nullable: true })
    _relevance?: UserOrderByRelevanceInput;
}
