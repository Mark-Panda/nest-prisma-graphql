import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { Role } from '../prisma/role.enum';
import { Float } from '@nestjs/graphql';
import { UserStatus } from '../prisma/user-status.enum';
import { UserCountAggregate } from './user-count-aggregate.output';
import { UserAvgAggregate } from './user-avg-aggregate.output';
import { UserSumAggregate } from './user-sum-aggregate.output';
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

    @Field(() => Boolean, { nullable: false })
    isDelete!: boolean;

    @Field(() => String, { nullable: false })
    username!: string;

    @Field(() => String, { nullable: false })
    email!: string;

    @HideField()
    password!: string;

    @Field(() => Role, { nullable: false })
    role!: keyof typeof Role;

    @Field(() => String, { nullable: true })
    RFID?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => Float, { nullable: true })
    expired?: number;

    @Field(() => UserStatus, { nullable: false })
    status!: keyof typeof UserStatus;

    @Field(() => UserCountAggregate, { nullable: true })
    _count?: UserCountAggregate;

    @Field(() => UserAvgAggregate, { nullable: true })
    _avg?: UserAvgAggregate;

    @Field(() => UserSumAggregate, { nullable: true })
    _sum?: UserSumAggregate;

    @Field(() => UserMinAggregate, { nullable: true })
    _min?: UserMinAggregate;

    @Field(() => UserMaxAggregate, { nullable: true })
    _max?: UserMaxAggregate;
}
