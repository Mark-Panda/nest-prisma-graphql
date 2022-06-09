import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input';
import { EnumRoleWithAggregatesFilter } from '../prisma/enum-role-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { FloatNullableWithAggregatesFilter } from '../prisma/float-nullable-with-aggregates-filter.input';
import { EnumUserStatusWithAggregatesFilter } from '../prisma/enum-user-status-with-aggregates-filter.input';

@InputType()
export class UserScalarWhereWithAggregatesInput {
    @Field(() => [UserScalarWhereWithAggregatesInput], { nullable: true })
    AND?: Array<UserScalarWhereWithAggregatesInput>;

    @Field(() => [UserScalarWhereWithAggregatesInput], { nullable: true })
    OR?: Array<UserScalarWhereWithAggregatesInput>;

    @Field(() => [UserScalarWhereWithAggregatesInput], { nullable: true })
    NOT?: Array<UserScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, { nullable: true })
    id?: StringWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
    create_date?: DateTimeWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
    update_date?: DateTimeWithAggregatesFilter;

    @Field(() => BoolWithAggregatesFilter, { nullable: true })
    isDelete?: BoolWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, { nullable: true })
    username?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, { nullable: true })
    email?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, { nullable: true })
    password?: StringWithAggregatesFilter;

    @Field(() => EnumRoleWithAggregatesFilter, { nullable: true })
    role?: EnumRoleWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
    RFID?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
    description?: StringNullableWithAggregatesFilter;

    @Field(() => FloatNullableWithAggregatesFilter, { nullable: true })
    expired?: FloatNullableWithAggregatesFilter;

    @Field(() => EnumUserStatusWithAggregatesFilter, { nullable: true })
    status?: EnumUserStatusWithAggregatesFilter;
}
