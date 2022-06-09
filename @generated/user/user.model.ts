import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { Role } from '../prisma/role.enum';
import { UserGroup } from '../user-group/user-group.model';
import { Person } from '../person/person.model';
import { Float } from '@nestjs/graphql';
import { UserStatus } from '../prisma/user-status.enum';
import { UserCount } from './user-count.output';

/**
 * 用户信息 登录、密码、鉴权
 */
@ObjectType({ description: '用户信息 登录、密码、鉴权' })
export class User {
    @Field(() => ID, { nullable: false })
    id!: string;

    @Field(() => Date, { nullable: false })
    create_date!: Date;

    @Field(() => Date, { nullable: false })
    update_date!: Date;

    /**
     * 删除的数据
     */
    @Field(() => Boolean, {
        nullable: false,
        defaultValue: false,
        description: '删除的数据',
    })
    isDelete!: boolean;

    /**
     * "用户名称，用户登录字段"
     */
    @Field(() => String, {
        nullable: false,
        description: '"用户名称，用户登录字段"',
    })
    username!: string;

    /**
     * "用户邮箱，密码找回用"
     */
    @Field(() => String, {
        nullable: false,
        description: '"用户邮箱，密码找回用"',
    })
    email!: string;

    /**
     * 密码
     */
    @HideField()
    password!: string;

    /**
     * "用户角色组"
     */
    @Field(() => Role, {
        nullable: false,
        defaultValue: 'USER',
        description: '"用户角色组"',
    })
    role!: keyof typeof Role;

    /**
     * "用户组"
     */
    @Field(() => [UserGroup], { nullable: true, description: '"用户组"' })
    group?: Array<UserGroup>;

    /**
     * "RFID 可以为空不能重复"
     */
    @Field(() => String, {
        nullable: true,
        description: '"RFID 可以为空不能重复"',
    })
    RFID!: string | null;

    /**
     * "用户对应人员"
     */
    @Field(() => [Person], { nullable: true, description: '"用户对应人员"' })
    person?: Array<Person>;

    /**
     * "其他描述信息"
     */
    @Field(() => String, { nullable: true, description: '"其他描述信息"' })
    description!: string | null;

    /**
     * "用户过期,时间戳"
     */
    @Field(() => Float, {
        nullable: true,
        defaultValue: 0,
        description: '"用户过期,时间戳"',
    })
    expired!: number | null;

    /**
     * "用户状态"
     */
    @Field(() => UserStatus, {
        nullable: false,
        defaultValue: 'INACTIVATED',
        description: '"用户状态"',
    })
    status!: keyof typeof UserStatus;

    @Field(() => UserCount, { nullable: false })
    _count?: UserCount;
}
