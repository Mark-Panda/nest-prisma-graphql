import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { PrismaClient } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';

import { Comment } from '@generated/comment/comment.model';
import { AggregateComment } from '@generated/comment/aggregate-comment.output';
import { CommentAggregateArgs } from '@generated/comment/comment-aggregate.args';
import { CreateOneCommentArgs } from '@generated/comment/create-one-comment.args';
import { CreateManyCommentArgs } from '@generated/comment/create-many-comment.args';
import { FindFirstCommentArgs } from '@generated/comment/find-first-comment.args';
import { FindUniqueCommentArgs } from '@generated/comment/find-unique-comment.args';
import { FindManyCommentArgs } from '@generated/comment/find-many-comment.args';
import { UpdateOneCommentArgs } from '@generated/comment/update-one-comment.args';
import { UpsertOneCommentArgs } from '@generated/comment/upsert-one-comment.args';
import { DeleteOneCommentArgs } from '@generated/comment/delete-one-comment.args';
// import { CommentGroupByArgs } from '@generated/comment/comment-group-by.args';
// import { CommentGroupBy } from '@generated/comment/comment-group-by.output';
import { UpdateManyCommentArgs } from '@generated/comment/update-many-comment.args';
import { DeleteManyCommentArgs } from '@generated/comment/delete-many-comment.args';
import { AffectedRows } from '@generated/prisma/affected-rows.output';

const prisma = new PrismaClient({
    errorFormat: 'colorless',
    log: [
        {
            emit: 'event',
            level: 'query',
        },
    ],
});

prisma.$on('query', (event) => {
    console.log('查询日志', event);
});

/**
 * Resolves Comment object type.
 */
@Resolver(() => Comment)
export class CommentResolver {
    /**
     * 查询Comment信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => Comment)
    async comment(
        @Args() args: FindUniqueCommentArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.comment.findUnique(args);
    }

    /**
     * 查询Comment信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => Comment)
    async commentFirst(
        @Args() args: FindFirstCommentArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.comment.findFirst(args);
    }

    /**
     * 查询所有Comment
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => [Comment])
    async comments(
        @Args() args: FindManyCommentArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.comment.findMany(args);
    }

    /**
     * 创建Comment
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => Comment, { nullable: true })
    async createOneComment(
        @Args() args: CreateOneCommentArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<any> {
        const select = new PrismaSelect(info).value;
        args = Object.assign(args, select);
        return await prisma.comment.create(args);
    }

    /**
     * 更新Comment信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => Comment, { nullable: true })
    async updateOneComment(
        @Args() args: UpdateOneCommentArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<any> {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.comment.update(args);
    }

    /**
     * 修改或新增Comment信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => Comment, { nullable: true })
    async upsertOneComment(
        @Args() args: UpsertOneCommentArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<any> {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.comment.upsert(args);
    }

    /**
     * 删除Comment信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => Comment, { nullable: true })
    async deleteOneComment(
        @Args() args: DeleteOneCommentArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.comment.delete(args);
    }

    /**
     * Comment统计计算
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => AggregateComment)
    commentAggregate(
        @Args() args: CommentAggregateArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return prisma.comment.aggregate(args);
    }

    // /**
    //  * Comment分组
    //  * @param args 请求参数
    //  * @param info 返回字段
    //  * @returns 返回
    //  */
    // @Query(() => [CommentGroupBy])
    // async commentGroupBy(
    //     @Args() args: CommentGroupByArgs,
    //     @Info() info: GraphQLResolveInfo,
    // ) {
    //     const select = new PrismaSelect(info).value;
    //     console.log('select', select);
    //     args = Object.assign(args, select);
    //     return await prisma.comment.groupBy(args);
    // }

    /**
     * 创建多个Comment
     *  @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async createManyComments(
        @Args() args: CreateManyCommentArgs,
    ): Promise<any> {
        const result = await prisma.comment.createMany(args);
        console.log('result', result);
        return result;
    }

    /**
     * 更新多个Comment
     * @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async updateManyComments(
        @Args() args: UpdateManyCommentArgs,
    ): Promise<any> {
        return await prisma.comment.updateMany(args);
    }

    /**
     * 删除多个Comment
     *  @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async deleteManyComments(
        @Args() args: DeleteManyCommentArgs,
    ): Promise<any> {
        return await prisma.comment.deleteMany(args);
    }
}
