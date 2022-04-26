import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Scalars from 'graphql-scalars';
import * as Validator from 'class-validator';
import { Role } from '../prisma/role.enum';

@InputType()
export class UserUncheckedCreateInput {
    @Field(() => String, { nullable: true })
    id?: string;

    @Field(() => Date, { nullable: true })
    create_date?: Date | string;

    @Field(() => Date, { nullable: true })
    update_date?: Date | string;

    @Field(() => Scalars.GraphQLEmailAddress, { nullable: false })
    email!: string;

    @Field(() => String, { nullable: false })
    @Validator.MinLength(3)
    @Validator.MaxLength(50)
    username!: string;

    @Field(() => String, { nullable: false })
    password!: string;

    @Field(() => String, { nullable: true })
    reg_ip?: string;

    @Field(() => String, { nullable: true })
    login_ip?: string;

    @Field(() => Date, { nullable: true })
    login_date?: Date | string;

    @Field(() => String, { nullable: false })
    phone!: string;

    @Field(() => String, { nullable: true })
    nickname?: string;

    @Field(() => String, { nullable: true })
    avatar?: string;

    @Field(() => Role, { nullable: true })
    role?: keyof typeof Role;
}
