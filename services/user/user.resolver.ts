import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { prisma } from 'commons/public-tool';
import { GraphQLResolveInfo } from 'graphql';

import { User } from '@generated/user/user.model';
import { AggregateUser } from '@generated/user/aggregate-user.output';
import { UserAggregateArgs } from '@generated/user/user-aggregate.args';
import { CreateOneUserArgs } from '@generated/user/create-one-user.args';
import { CreateManyUserArgs } from '@generated/user/create-many-user.args';
import { FindFirstUserArgs } from '@generated/user/find-first-user.args';
import { FindUniqueUserArgs } from '@generated/user/find-unique-user.args';
import { FindManyUserArgs } from '@generated/user/find-many-user.args';
import { UpdateOneUserArgs } from '@generated/user/update-one-user.args';
import { UpsertOneUserArgs } from '@generated/user/upsert-one-user.args';
import { DeleteOneUserArgs } from '@generated/user/delete-one-user.args';
// import { UserGroupByArgs } from '@generated/user/user-group-by.args';
// import { UserGroupBy } from '@generated/user/user-group-by.output';
import { UpdateManyUserArgs } from '@generated/user/update-many-user.args';
import { DeleteManyUserArgs } from '@generated/user/delete-many-user.args';
import { AffectedRows } from '@generated/prisma/affected-rows.output';

/**
 * Resolves User object type.
 */
@Resolver(() => User)
export class UserResolver {
    /**
     * 查询User信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => User)
    async user(
        @Args() args: FindUniqueUserArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.user.findUnique(args);
    }

    /**
     * 查询User信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => User)
    async userFirst(
        @Args() args: FindFirstUserArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.user.findFirst(args);
    }

    /**
     * 查询所有User
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => [User])
    async users(
        @Args() args: FindManyUserArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.user.findMany(args);
    }

    /**
     * 创建User
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => User, { nullable: true })
    async createOneUser(
        @Args() args: CreateOneUserArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<any> {
        const select = new PrismaSelect(info).value;
        args = Object.assign(args, select);
        return await prisma.user.create(args);
    }

    /**
     * 更新User信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => User, { nullable: true })
    async updateOneUser(
        @Args() args: UpdateOneUserArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<any> {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.user.update(args);
    }

    /**
     * 修改或新增User信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => User, { nullable: true })
    async upsertOneUser(
        @Args() args: UpsertOneUserArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<any> {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.user.upsert(args);
    }

    /**
     * 删除User信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => User, { nullable: true })
    async deleteOneUser(
        @Args() args: DeleteOneUserArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.user.delete(args);
    }

    /**
     * User统计计算
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => AggregateUser)
    userAggregate(
        @Args() args: UserAggregateArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return prisma.user.aggregate(args);
    }

    // /**
    //  * User分组
    //  * @param args 请求参数
    //  * @param info 返回字段
    //  * @returns 返回
    //  */
    // @Query(() => [UserGroupBy])
    // async userGroupBy(
    //     @Args() args: UserGroupByArgs,
    //     @Info() info: GraphQLResolveInfo,
    // ) {
    //     const select = new PrismaSelect(info).value;
    //     console.log('select', select);
    //     args = Object.assign(args, select);
    //     return await prisma.user.groupBy(args);
    // }

    /**
     * 创建多个User
     *  @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async createManyUsers(@Args() args: CreateManyUserArgs): Promise<any> {
        const result = await prisma.user.createMany(args);
        console.log('result', result);
        return result;
    }

    /**
     * 更新多个User
     * @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async updateManyUsers(@Args() args: UpdateManyUserArgs): Promise<any> {
        return await prisma.user.updateMany(args);
    }

    /**
     * 删除多个User
     *  @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async deleteManyUsers(@Args() args: DeleteManyUserArgs): Promise<any> {
        return await prisma.user.deleteMany(args);
    }
}
