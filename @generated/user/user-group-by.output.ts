import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { Role } from '../prisma/role.enum';
import { UserCountAggregate } from './user-count-aggregate.output';
import { UserMinAggregate } from './user-min-aggregate.output';
import { UserMaxAggregate } from './user-max-aggregate.output';

@ObjectType()
export class UserGroupBy {
    @Field(() => String, { nullable: false })
    id!: string;

    @Field(() => Date, { nullable: false })
    create_date!: Date | string;

    @Field(() => Date, { nullable: false })
    update_date!: Date | string;

    @Field(() => String, { nullable: false })
    email!: string;

    @Field(() => String, { nullable: false })
    username!: string;

    @HideField()
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

    @Field(() => UserCountAggregate, { nullable: true })
    _count?: UserCountAggregate;

    @Field(() => UserMinAggregate, { nullable: true })
    _min?: UserMinAggregate;

    @Field(() => UserMaxAggregate, { nullable: true })
    _max?: UserMaxAggregate;
}
