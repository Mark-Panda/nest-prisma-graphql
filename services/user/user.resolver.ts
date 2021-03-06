import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { UseGuards } from '@nestjs/common';
import { LoggerService, GqlAuthGuard, RolesGuard } from 'commons/public-module';
import { Roles } from 'commons/public-module/roles/role.decorator';
import { Role } from 'commons/public-module/roles/role.enum';
import { prisma } from 'commons/public-tool';

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
import { UserGroupByArgs } from '@generated/user/user-group-by.args';
import { UserGroupBy } from '@generated/user/user-group-by.output';
import { UpdateManyUserArgs } from '@generated/user/update-many-user.args';
import { DeleteManyUserArgs } from '@generated/user/delete-many-user.args';
import { AffectedRows } from '@generated/prisma/affected-rows.output';

/**
 * Resolves User object type.
 */
@Resolver(() => User)
export class UserResolver {
    constructor(private readonly logger: LoggerService) {}
    /**
     * 查询User信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => User)
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.System, Role.User)
    @UseGuards(GqlAuthGuard)
    async user(
        @Args() args: FindUniqueUserArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'User模型单个查询GraphQL请求参数');
        args = Object.assign(args, select);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return await prisma.user.findUnique(args);
    }

    /**
     * 查询User信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => User)
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @UseGuards(GqlAuthGuard)
    async userFirst(
        @Args() args: FindFirstUserArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'User模型首个查询GraphQL请求参数');
        args = Object.assign(args, select);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return await prisma.user.findFirst(args);
    }

    /**
     * 查询所有User
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => [User])
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.System, Role.User)
    @UseGuards(GqlAuthGuard)
    async users(
        @Args() args: FindManyUserArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'User模型多个查询GraphQL请求参数');
        args = Object.assign(args, select);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return await prisma.user.findMany(args);
    }

    /**
     * 创建User
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => User, { nullable: true })
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @UseGuards(GqlAuthGuard)
    async createOneUser(
        @Args() args: CreateOneUserArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<any> {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'User模型单体创建GraphQL请求参数');
        args = Object.assign(args, select);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return await prisma.user.create(args);
    }

    /**
     * 更新User信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => User, { nullable: true })
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @UseGuards(GqlAuthGuard)
    async updateOneUser(
        @Args() args: UpdateOneUserArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<any> {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'User模型单体更新GraphQL请求参数');
        args = Object.assign(args, select);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return await prisma.user.update(args);
    }

    /**
     * 修改或新增User信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => User, { nullable: true })
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @UseGuards(GqlAuthGuard)
    async upsertOneUser(
        @Args() args: UpsertOneUserArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<any> {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'User模型单体增补GraphQL请求参数');
        args = Object.assign(args, select);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return await prisma.user.upsert(args);
    }

    /**
     * 删除User信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => User, { nullable: true })
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @UseGuards(GqlAuthGuard)
    async deleteOneUser(
        @Args() args: DeleteOneUserArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'User模型单体删除GraphQL请求参数');
        args = Object.assign(args, select);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return await prisma.user.delete(args);
    }

    /**
     * User统计计算
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => AggregateUser)
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.System, Role.User)
    @UseGuards(GqlAuthGuard)
    async userAggregate(
        @Args() args: UserAggregateArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'User模型统计GraphQL请求参数');
        args = Object.assign(args, select);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return await prisma.user.aggregate(args);
    }

    /**
     * User分组
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => [UserGroupBy])
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.System, Role.User)
    @UseGuards(GqlAuthGuard)
    async userGroupBy(
        @Args() args: UserGroupByArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'User模型分组GraphQL请求参数');
        args = Object.assign(args, select);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return await prisma.user.groupBy(args);
    }

    /**
     * 创建多个User
     *  @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @UseGuards(GqlAuthGuard)
    async createManyusers(@Args() args: CreateManyUserArgs): Promise<any> {
        this.logger.log(args, 'User模型多个创建GraphQL请求参数');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const result = await prisma.user.createMany(args);
        return result;
    }

    /**
     * 更新多个User
     * @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @UseGuards(GqlAuthGuard)
    async updateManyusers(@Args() args: UpdateManyUserArgs): Promise<any> {
        this.logger.log(args, 'User模型多个更新GraphQL请求参数');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return await prisma.user.updateMany(args);
    }

    /**
     * 删除多个User
     *  @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @UseGuards(GqlAuthGuard)
    async deleteManyusers(@Args() args: DeleteManyUserArgs): Promise<any> {
        this.logger.log(args, 'User模型多个删除GraphQL请求参数');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return await prisma.user.deleteMany(args);
    }
}
