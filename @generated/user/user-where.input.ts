import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { EnumRoleFilter } from '../prisma/enum-role-filter.input';
import { UserGroupListRelationFilter } from '../user-group/user-group-list-relation-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { PersonListRelationFilter } from '../person/person-list-relation-filter.input';
import { FloatNullableFilter } from '../prisma/float-nullable-filter.input';
import { EnumUserStatusFilter } from '../prisma/enum-user-status-filter.input';

@InputType()
export class UserWhereInput {
    @Field(() => [UserWhereInput], { nullable: true })
    AND?: Array<UserWhereInput>;

    @Field(() => [UserWhereInput], { nullable: true })
    OR?: Array<UserWhereInput>;

    @Field(() => [UserWhereInput], { nullable: true })
    NOT?: Array<UserWhereInput>;

    @Field(() => StringFilter, { nullable: true })
    id?: StringFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    create_date?: DateTimeFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    update_date?: DateTimeFilter;

    @Field(() => BoolFilter, { nullable: true })
    isDelete?: BoolFilter;

    @Field(() => StringFilter, { nullable: true })
    username?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    email?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    password?: StringFilter;

    @Field(() => EnumRoleFilter, { nullable: true })
    role?: EnumRoleFilter;

    @Field(() => UserGroupListRelationFilter, { nullable: true })
    group?: UserGroupListRelationFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    RFID?: StringNullableFilter;

    @Field(() => PersonListRelationFilter, { nullable: true })
    person?: PersonListRelationFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    description?: StringNullableFilter;

    @Field(() => FloatNullableFilter, { nullable: true })
    expired?: FloatNullableFilter;

    @Field(() => EnumUserStatusFilter, { nullable: true })
    status?: EnumUserStatusFilter;
}
