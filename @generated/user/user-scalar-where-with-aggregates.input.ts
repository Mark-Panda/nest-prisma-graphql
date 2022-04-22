import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { DateTimeNullableWithAggregatesFilter } from '../prisma/date-time-nullable-with-aggregates-filter.input';
import { EnumRoleNullableWithAggregatesFilter } from '../prisma/enum-role-nullable-with-aggregates-filter.input';

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

    @Field(() => StringWithAggregatesFilter, { nullable: true })
    email?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, { nullable: true })
    username?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, { nullable: true })
    password?: StringWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
    reg_ip?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
    login_ip?: StringNullableWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, { nullable: true })
    login_date?: DateTimeNullableWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, { nullable: true })
    phone?: StringWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
    nickname?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
    avatar?: StringNullableWithAggregatesFilter;

    @Field(() => EnumRoleNullableWithAggregatesFilter, { nullable: true })
    role?: EnumRoleNullableWithAggregatesFilter;
}
