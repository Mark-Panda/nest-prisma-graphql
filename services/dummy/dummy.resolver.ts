import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import prisma from 'src/common/db/prisma';
import { GraphQLResolveInfo } from 'graphql';

import { Dummy } from '@generated/dummy/dummy.model';
import { AggregateDummy } from '@generated/dummy/aggregate-dummy.output';
import { DummyAggregateArgs } from '@generated/dummy/dummy-aggregate.args';
import { CreateOneDummyArgs } from '@generated/dummy/create-one-dummy.args';
import { CreateManyDummyArgs } from '@generated/dummy/create-many-dummy.args';
import { FindFirstDummyArgs } from '@generated/dummy/find-first-dummy.args';
import { FindUniqueDummyArgs } from '@generated/dummy/find-unique-dummy.args';
import { FindManyDummyArgs } from '@generated/dummy/find-many-dummy.args';
import { UpdateOneDummyArgs } from '@generated/dummy/update-one-dummy.args';
import { UpsertOneDummyArgs } from '@generated/dummy/upsert-one-dummy.args';
import { DeleteOneDummyArgs } from '@generated/dummy/delete-one-dummy.args';
// import { DummyGroupByArgs } from '@generated/dummy/dummy-group-by.args';
// import { DummyGroupBy } from '@generated/dummy/dummy-group-by.output';
import { UpdateManyDummyArgs } from '@generated/dummy/update-many-dummy.args';
import { DeleteManyDummyArgs } from '@generated/dummy/delete-many-dummy.args';
import { AffectedRows } from '@generated/prisma/affected-rows.output';

/**
 * Resolves Dummy object type.
 */
@Resolver(() => Dummy)
export class DummyResolver {
    /**
     * 查询Dummy信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => Dummy)
    async dummy(
        @Args() args: FindUniqueDummyArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.dummy.findUnique(args);
    }

    /**
     * 查询Dummy信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => Dummy)
    async dummyFirst(
        @Args() args: FindFirstDummyArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.dummy.findFirst(args);
    }

    /**
     * 查询所有Dummy
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => [Dummy])
    async dummys(
        @Args() args: FindManyDummyArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.dummy.findMany(args);
    }

    /**
     * 创建Dummy
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => Dummy, { nullable: true })
    async createOneDummy(
        @Args() args: CreateOneDummyArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<any> {
        const select = new PrismaSelect(info).value;
        args = Object.assign(args, select);
        return await prisma.dummy.create(args);
    }

    /**
     * 更新Dummy信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => Dummy, { nullable: true })
    async updateOneDummy(
        @Args() args: UpdateOneDummyArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<any> {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.dummy.update(args);
    }

    /**
     * 修改或新增Dummy信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => Dummy, { nullable: true })
    async upsertOneDummy(
        @Args() args: UpsertOneDummyArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<any> {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.dummy.upsert(args);
    }

    /**
     * 删除Dummy信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => Dummy, { nullable: true })
    async deleteOneDummy(
        @Args() args: DeleteOneDummyArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.dummy.delete(args);
    }

    /**
     * Dummy统计计算
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => AggregateDummy)
    dummyAggregate(
        @Args() args: DummyAggregateArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return prisma.dummy.aggregate(args);
    }

    // /**
    //  * Dummy分组
    //  * @param args 请求参数
    //  * @param info 返回字段
    //  * @returns 返回
    //  */
    // @Query(() => [DummyGroupBy])
    // async dummyGroupBy(
    //     @Args() args: DummyGroupByArgs,
    //     @Info() info: GraphQLResolveInfo,
    // ) {
    //     const select = new PrismaSelect(info).value;
    //     console.log('select', select);
    //     args = Object.assign(args, select);
    //     return await prisma.dummy.groupBy(args);
    // }

    /**
     * 创建多个Dummy
     *  @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async createManyDummys(@Args() args: CreateManyDummyArgs): Promise<any> {
        const result = await prisma.dummy.createMany(args);
        console.log('result', result);
        return result;
    }

    /**
     * 更新多个Dummy
     * @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async updateManyDummys(@Args() args: UpdateManyDummyArgs): Promise<any> {
        return await prisma.dummy.updateMany(args);
    }

    /**
     * 删除多个Dummy
     *  @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async deleteManyDummys(@Args() args: DeleteManyDummyArgs): Promise<any> {
        return await prisma.dummy.deleteMany(args);
    }
}
