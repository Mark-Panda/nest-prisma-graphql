import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { Role } from '../prisma/role.enum';

@ObjectType()
export class UserMinAggregate {
    @Field(() => String, { nullable: true })
    id?: string;

    @Field(() => Date, { nullable: true })
    create_date?: Date | string;

    @Field(() => Date, { nullable: true })
    update_date?: Date | string;

    @Field(() => String, { nullable: true })
    email?: string;

    @Field(() => String, { nullable: true })
    username?: string;

    @HideField()
    password?: string;

    @Field(() => String, { nullable: true })
    reg_ip?: string;

    @Field(() => String, { nullable: true })
    login_ip?: string;

    @Field(() => Date, { nullable: true })
    login_date?: Date | string;

    @Field(() => String, { nullable: true })
    phone?: string;

    @Field(() => String, { nullable: true })
    nickname?: string;

    @Field(() => String, { nullable: true })
    avatar?: string;

    @Field(() => Role, { nullable: true })
    role?: keyof typeof Role;
}
