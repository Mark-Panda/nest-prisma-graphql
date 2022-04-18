import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
// import prisma from 'src/common/db/prisma';
import { prisma } from '@app/public-tool';
import { GraphQLResolveInfo } from 'graphql';

import { Article } from '../../@generated/article/article.model';
import { AggregateArticle } from '../../@generated/article/aggregate-article.output';
import { ArticleAggregateArgs } from '../../@generated/article/article-aggregate.args';
import { CreateOneArticleArgs } from '../../@generated/article/create-one-article.args';
import { CreateManyArticleArgs } from '../../@generated/article/create-many-article.args';
import { FindFirstArticleArgs } from '../../@generated/article/find-first-article.args';
import { FindUniqueArticleArgs } from '../../@generated/article/find-unique-article.args';
import { FindManyArticleArgs } from '../../@generated/article/find-many-article.args';
import { UpdateOneArticleArgs } from '../../@generated/article/update-one-article.args';
import { UpsertOneArticleArgs } from '../../@generated/article/upsert-one-article.args';
import { DeleteOneArticleArgs } from '../../@generated/article/delete-one-article.args';
// import { ArticleGroupByArgs } from '../../@generated/article/article-group-by.args';
// import { ArticleGroupBy } from '../../@generated/article/article-group-by.output';
import { UpdateManyArticleArgs } from '../../@generated/article/update-many-article.args';
import { DeleteManyArticleArgs } from '../../@generated/article/delete-many-article.args';
import { AffectedRows } from '../../@generated/prisma/affected-rows.output';

/**
 * Resolves Article object type.
 */
@Resolver(() => Article)
export class ArticleResolver {
    /**
     * 查询Article信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => Article)
    async article(
        @Args() args: FindUniqueArticleArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.article.findUnique(args);
    }

    /**
     * 查询Article信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => Article)
    async articleFirst(
        @Args() args: FindFirstArticleArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.article.findFirst(args);
    }

    /**
     * 查询所有Article
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => [Article])
    async articles(
        @Args() args: FindManyArticleArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.article.findMany(args);
    }

    /**
     * 创建Article
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => Article, { nullable: true })
    async createOneArticle(
        @Args() args: CreateOneArticleArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<any> {
        const select = new PrismaSelect(info).value;
        args = Object.assign(args, select);
        return await prisma.article.create(args);
    }

    /**
     * 更新Article信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    // @Mutation(() => Article, { nullable: true })
    // async updateOneArticle(
    //     @Args() args: UpdateOneArticleArgs,
    //     @Info() info: GraphQLResolveInfo,
    // ): Promise<any> {
    //     const select = new PrismaSelect(info).value;
    //     console.log('select', select);
    //     args = Object.assign(args, select);
    //     return await prisma.article.update(args);
    // }

    /**
     * 修改或新增Article信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    // @Mutation(() => Article, { nullable: true })
    // async upsertOneArticle(
    //     @Args() args: UpsertOneArticleArgs,
    //     @Info() info: GraphQLResolveInfo,
    // ): Promise<any> {
    //     const select = new PrismaSelect(info).value;
    //     console.log('select', select);
    //     args = Object.assign(args, select);
    //     return await prisma.article.upsert(args);
    // }

    /**
     * 删除Article信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => Article, { nullable: true })
    async deleteOneArticle(
        @Args() args: DeleteOneArticleArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return await prisma.article.delete(args);
    }

    /**
     * Article统计计算
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => AggregateArticle)
    articleAggregate(
        @Args() args: ArticleAggregateArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        console.log('select', select);
        args = Object.assign(args, select);
        return prisma.article.aggregate(args);
    }

    // /**
    //  * Article分组
    //  * @param args 请求参数
    //  * @param info 返回字段
    //  * @returns 返回
    //  */
    // @Query(() => [ArticleGroupBy])
    // async articleGroupBy(
    //     @Args() args: ArticleGroupByArgs,
    //     @Info() info: GraphQLResolveInfo,
    // ) {
    //     const select = new PrismaSelect(info).value;
    //     console.log('select', select);
    //     args = Object.assign(args, select);
    //     return await prisma.article.groupBy(args);
    // }

    /**
     * 创建多个Article
     *  @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async createManyArticles(
        @Args() args: CreateManyArticleArgs,
    ): Promise<any> {
        const result = await prisma.article.createMany(args);
        console.log('result', result);
        return result;
    }

    /**
     * 更新多个Article
     * @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async updateManyArticles(
        @Args() args: UpdateManyArticleArgs,
    ): Promise<any> {
        return await prisma.article.updateMany(args);
    }

    /**
     * 删除多个Article
     *  @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async deleteManyArticles(
        @Args() args: DeleteManyArticleArgs,
    ): Promise<any> {
        return await prisma.article.deleteMany(args);
    }
}
