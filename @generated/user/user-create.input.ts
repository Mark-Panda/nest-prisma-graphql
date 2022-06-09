import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Scalars from 'graphql-scalars';
import { Role } from '../prisma/role.enum';
import { UserGroupCreateNestedManyWithoutUsersInput } from '../user-group/user-group-create-nested-many-without-users.input';
import { PersonCreateNestedManyWithoutUserInput } from '../person/person-create-nested-many-without-user.input';
import { Float } from '@nestjs/graphql';
import { UserStatus } from '../prisma/user-status.enum';

@InputType()
export class UserCreateInput {
    @Field(() => String, { nullable: true })
    id?: string;

    @Field(() => Date, { nullable: true })
    create_date?: Date | string;

    @Field(() => Date, { nullable: true })
    update_date?: Date | string;

    @Field(() => Boolean, { nullable: true })
    isDelete?: boolean;

    @Field(() => String, { nullable: false })
    username!: string;

    @Field(() => Scalars.GraphQLEmailAddress, { nullable: false })
    email!: string;

    @Field(() => String, { nullable: false })
    password!: string;

    @Field(() => Role, { nullable: true })
    role?: keyof typeof Role;

    @Field(() => UserGroupCreateNestedManyWithoutUsersInput, { nullable: true })
    group?: UserGroupCreateNestedManyWithoutUsersInput;

    @Field(() => String, { nullable: true })
    RFID?: string;

    @Field(() => PersonCreateNestedManyWithoutUserInput, { nullable: true })
    person?: PersonCreateNestedManyWithoutUserInput;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => Float, { nullable: true })
    expired?: number;

    @Field(() => UserStatus, { nullable: true })
    status?: keyof typeof UserStatus;
}
