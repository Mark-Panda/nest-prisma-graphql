import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Directive } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { Role } from '../prisma/role.enum';

/** 用户信息 */
@ObjectType({description:'用户信息'})
export class User {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => Date, {nullable:false})
    create_date!: Date;

    @Field(() => Date, {nullable:false})
    update_date!: Date;

    @Field(() => String, {nullable:false})
    email!: string;

    /** User's name */
    @Field(() => String, {nullable:false,description:"User's name"})
    @Directive('@upper')
    username!: string;

    @HideField()
    password!: string;

    @Field(() => String, {nullable:true})
    reg_ip!: string | null;

    @Field(() => String, {nullable:true})
    login_ip!: string | null;

    @Field(() => Date, {nullable:true})
    login_date!: Date | null;

    @Field(() => String, {nullable:false})
    phone!: string;

    @Field(() => String, {nullable:true})
    nickname!: string | null;

    @Field(() => String, {nullable:true})
    avatar!: string | null;

    @Field(() => Role, {nullable:true})
    role!: keyof typeof Role | null;
}
