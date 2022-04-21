import { Field } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType({ description: '登录信息' })
export class AccountLoginDto {
    @Field(() => String, { nullable: false, description: "User's name" })
    username!: string;

    @HideField()
    password!: string;
}

@ObjectType({ description: '管理员登录信息' })
export class AdminLoginInfoDto {
    @Field(() => String, { nullable: false, description: "User's name" })
    username!: string;

    @HideField()
    password!: string;
}

@ObjectType({ description: '管理员登录信息' })
export class AdminInfoDto {
    @Field(() => String, { nullable: false, description: "User's name" })
    username!: string;

    @HideField()
    password!: string;
}

@ObjectType({ description: '管理员登录信息' })
export class AccountAdmin {
    @Field(() => ID, { nullable: false })
    id!: string;

    @Field(() => String, { nullable: false, description: "User's name" })
    username!: string;

    @HideField()
    password!: string;
}
