import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaSelect } from '@paljs/plugins';
// import prisma from 'src/common/db/prisma';
import { prisma } from '@app/public-tool';
import { LoggerService } from '@app/public-module';

import { Tag } from '../../@generated/tag/tag.model';
import { AggregateTag } from '../../@generated/tag/aggregate-tag.output';
import { TagAggregateArgs } from '../../@generated/tag/tag-aggregate.args';
import { CreateOneTagArgs } from '../../@generated/tag/create-one-tag.args';
import { CreateManyTagArgs } from '../../@generated/tag/create-many-tag.args';
import { FindFirstTagArgs } from '../../@generated/tag/find-first-tag.args';
import { FindUniqueTagArgs } from '../../@generated/tag/find-unique-tag.args';
import { FindManyTagArgs } from '../../@generated/tag/find-many-tag.args';
import { UpdateOneTagArgs } from '../../@generated/tag/update-one-tag.args';
import { UpsertOneTagArgs } from '../../@generated/tag/upsert-one-tag.args';
import { DeleteOneTagArgs } from '../../@generated/tag/delete-one-tag.args';
// import { TagGroupByArgs } from '../../@generated/tag/tag-group-by.args';
// import { TagGroupBy } from '../../@generated/tag/tag-group-by.output';
import { UpdateManyTagArgs } from '../../@generated/tag/update-many-tag.args';
import { DeleteManyTagArgs } from '../../@generated/tag/delete-many-tag.args';
import { AffectedRows } from '../../@generated/prisma/affected-rows.output';

/**
 * Resolves Tag object type.
 */
@Injectable()
@Resolver(() => Tag)
export class TagResolver {
    constructor(private readonly logger: LoggerService) {}
    /**
     * 查询Tag信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => Tag)
    async tag(
        @Args() args: FindUniqueTagArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'GraphQL请求参数');
        args = Object.assign(args, select);
        return await prisma.tag.findUnique(args);
    }

    /**
     * 查询Tag信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => Tag)
    async tagFirst(
        @Args() args: FindFirstTagArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'GraphQL请求参数');
        args = Object.assign(args, select);
        return await prisma.tag.findFirst(args);
    }

    /**
     * 查询所有Tag
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => [Tag])
    async tags(
        @Args() args: FindManyTagArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'GraphQL请求参数');
        args = Object.assign(args, select);
        return await prisma.tag.findMany(args);
    }

    /**
     * 创建Tag
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => Tag, { nullable: true })
    async createOneTag(
        @Args() args: CreateOneTagArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<any> {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'GraphQL请求参数');
        args = Object.assign(args, select);
        return await prisma.tag.create(args);
    }

    /**
     * 更新Tag信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    // @Mutation(() => Tag, { nullable: true })
    // async updateOneTag(
    //     @Args() args: UpdateOneTagArgs,
    //     @Info() info: GraphQLResolveInfo,
    // ): Promise<any> {
    //     const select = new PrismaSelect(info).value;
    //     this.logger.log(select, 'GraphQL请求参数');
    //     args = Object.assign(args, select);
    //     return await prisma.tag.update(args);
    // }

    /**
     * 修改或新增Tag信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    // @Mutation(() => Tag, { nullable: true })
    // async upsertOneTag(
    //     @Args() args: UpsertOneTagArgs,
    //     @Info() info: GraphQLResolveInfo,
    // ): Promise<any> {
    //     const select = new PrismaSelect(info).value;
    //     this.logger.log(select, 'GraphQL请求参数');
    //     args = Object.assign(args, select);
    //     return await prisma.tag.upsert(args);
    // }

    /**
     * 删除Tag信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => Tag, { nullable: true })
    async deleteOneTag(
        @Args() args: DeleteOneTagArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'GraphQL请求参数');
        args = Object.assign(args, select);
        return await prisma.tag.delete(args);
    }

    /**
     * Tag统计计算
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => AggregateTag)
    tagAggregate(
        @Args() args: TagAggregateArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'GraphQL请求参数');
        args = Object.assign(args, select);
        return prisma.tag.aggregate(args);
    }

    // /**
    //  * Tag分组
    //  * @param args 请求参数
    //  * @param info 返回字段
    //  * @returns 返回
    //  */
    // @Query(() => [TagGroupBy])
    // async tagGroupBy(
    //     @Args() args: TagGroupByArgs,
    //     @Info() info: GraphQLResolveInfo,
    // ) {
    //     const select = new PrismaSelect(info).value;
    //     this.logger.log(select, 'GraphQL请求参数');
    //     args = Object.assign(args, select);
    //     return await prisma.tag.groupBy(args);
    // }

    /**
     * 创建多个Tag
     *  @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async createManyTags(@Args() args: CreateManyTagArgs): Promise<any> {
        this.logger.log(args, 'GraphQL请求参数');
        const result = await prisma.tag.createMany(args);
        return result;
    }

    /**
     * 更新多个Tag
     * @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async updateManyTags(@Args() args: UpdateManyTagArgs): Promise<any> {
        this.logger.log(args, 'GraphQL请求参数');
        return await prisma.tag.updateMany(args);
    }

    /**
     * 删除多个Tag
     *  @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async deleteManyTags(@Args() args: DeleteManyTagArgs): Promise<any> {
        this.logger.log(args, 'GraphQL请求参数');
        return await prisma.tag.deleteMany(args);
    }
}
