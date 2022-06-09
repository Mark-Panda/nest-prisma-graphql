import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class UserCountAggregate {
    @Field(() => Int, { nullable: false })
    id!: number;

    @Field(() => Int, { nullable: false })
    create_date!: number;

    @Field(() => Int, { nullable: false })
    update_date!: number;

    @Field(() => Int, { nullable: false })
    isDelete!: number;

    @Field(() => Int, { nullable: false })
    username!: number;

    @Field(() => Int, { nullable: false })
    email!: number;

    @HideField()
    password!: number;

    @Field(() => Int, { nullable: false })
    role!: number;

    @Field(() => Int, { nullable: false })
    RFID!: number;

    @Field(() => Int, { nullable: false })
    description!: number;

    @Field(() => Int, { nullable: false })
    expired!: number;

    @Field(() => Int, { nullable: false })
    status!: number;

    @Field(() => Int, { nullable: false })
    _all!: number;
}
