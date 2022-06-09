import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { Role } from '../prisma/role.enum';
import { Float } from '@nestjs/graphql';
import { UserStatus } from '../prisma/user-status.enum';

@ObjectType()
export class UserMaxAggregate {
    @Field(() => String, { nullable: true })
    id?: string;

    @Field(() => Date, { nullable: true })
    create_date?: Date | string;

    @Field(() => Date, { nullable: true })
    update_date?: Date | string;

    @Field(() => Boolean, { nullable: true })
    isDelete?: boolean;

    @Field(() => String, { nullable: true })
    username?: string;

    @Field(() => String, { nullable: true })
    email?: string;

    @HideField()
    password?: string;

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
