import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Scalars from 'graphql-scalars';
import { Role } from '../prisma/role.enum';
import { Float } from '@nestjs/graphql';
import { UserStatus } from '../prisma/user-status.enum';

@InputType()
export class UserCreateManyInput {
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

    @Field(() => String, { nullable: true })
    RFID?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => Float, { nullable: true })
    expired?: number;

    @Field(() => UserStatus, { nullable: true })
    status?: keyof typeof UserStatus;
}
