import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaSelect } from '@paljs/plugins';
// import prisma from 'src/common/db/prisma';
import { prisma } from '@app/public-tool';
import { LoggerService } from '@app/public-module';

import { Profile } from '../../@generated/profile/profile.model';
import { AggregateProfile } from '../../@generated/profile/aggregate-profile.output';
import { ProfileAggregateArgs } from '../../@generated/profile/profile-aggregate.args';
import { CreateOneProfileArgs } from '../../@generated/profile/create-one-profile.args';
import { CreateManyProfileArgs } from '../../@generated/profile/create-many-profile.args';
import { FindFirstProfileArgs } from '../../@generated/profile/find-first-profile.args';
import { FindUniqueProfileArgs } from '../../@generated/profile/find-unique-profile.args';
import { FindManyProfileArgs } from '../../@generated/profile/find-many-profile.args';
import { UpdateOneProfileArgs } from '../../@generated/profile/update-one-profile.args';
import { UpsertOneProfileArgs } from '../../@generated/profile/upsert-one-profile.args';
import { DeleteOneProfileArgs } from '../../@generated/profile/delete-one-profile.args';
// import { ProfileGroupByArgs } from '../../@generated/profile/profile-group-by.args';
// import { ProfileGroupBy } from '../../@generated/profile/profile-group-by.output';
import { UpdateManyProfileArgs } from '../../@generated/profile/update-many-profile.args';
import { DeleteManyProfileArgs } from '../../@generated/profile/delete-many-profile.args';
import { AffectedRows } from '../../@generated/prisma/affected-rows.output';

/**
 * Resolves Profile object type.
 */
@Injectable()
@Resolver(() => Profile)
export class ProfileResolver {
    constructor(private readonly logger: LoggerService) {}
    /**
     * 查询Profile信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => Profile)
    async profile(
        @Args() args: FindUniqueProfileArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'GraphQL请求参数');
        args = Object.assign(args, select);
        return await prisma.profile.findUnique(args);
    }

    /**
     * 查询Profile信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => Profile)
    async profileFirst(
        @Args() args: FindFirstProfileArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'GraphQL请求参数');
        args = Object.assign(args, select);
        return await prisma.profile.findFirst(args);
    }

    /**
     * 查询所有Profile
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => [Profile])
    async profiles(
        @Args() args: FindManyProfileArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'GraphQL请求参数');
        args = Object.assign(args, select);
        return await prisma.profile.findMany(args);
    }

    /**
     * 创建Profile
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => Profile, { nullable: true })
    async createOneProfile(
        @Args() args: CreateOneProfileArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<any> {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'GraphQL请求参数');
        args = Object.assign(args, select);
        return await prisma.profile.create(args);
    }

    /**
     * 更新Profile信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    // @Mutation(() => Profile, { nullable: true })
    // async updateOneProfile(
    //     @Args() args: UpdateOneProfileArgs,
    //     @Info() info: GraphQLResolveInfo,
    // ): Promise<any> {
    //     const select = new PrismaSelect(info).value;
    //     this.logger.log(select, 'GraphQL请求参数');
    //     args = Object.assign(args, select);
    //     return await prisma.profile.update(args);
    // }

    /**
     * 修改或新增Profile信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    // @Mutation(() => Profile, { nullable: true })
    // async upsertOneProfile(
    //     @Args() args: UpsertOneProfileArgs,
    //     @Info() info: GraphQLResolveInfo,
    // ): Promise<any> {
    //     const select = new PrismaSelect(info).value;
    //     this.logger.log(select, 'GraphQL请求参数');
    //     args = Object.assign(args, select);
    //     return await prisma.profile.upsert(args);
    // }

    /**
     * 删除Profile信息
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => Profile, { nullable: true })
    async deleteOneProfile(
        @Args() args: DeleteOneProfileArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'GraphQL请求参数');
        args = Object.assign(args, select);
        return await prisma.profile.delete(args);
    }

    /**
     * Profile统计计算
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => AggregateProfile)
    profileAggregate(
        @Args() args: ProfileAggregateArgs,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'GraphQL请求参数');
        args = Object.assign(args, select);
        return prisma.profile.aggregate(args);
    }

    // /**
    //  * Profile分组
    //  * @param args 请求参数
    //  * @param info 返回字段
    //  * @returns 返回
    //  */
    // @Query(() => [ProfileGroupBy])
    // async profileGroupBy(
    //     @Args() args: ProfileGroupByArgs,
    //     @Info() info: GraphQLResolveInfo,
    // ) {
    //     const select = new PrismaSelect(info).value;
    //     this.logger.log(select, 'GraphQL请求参数');
    //     args = Object.assign(args, select);
    //     return await prisma.profile.groupBy(args);
    // }

    /**
     * 创建多个Profile
     *  @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async createManyProfiles(
        @Args() args: CreateManyProfileArgs,
    ): Promise<any> {
        this.logger.log(args, 'GraphQL请求参数');
        const result = await prisma.profile.createMany(args);
        return result;
    }

    /**
     * 更新多个Profile
     * @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async updateManyProfiles(
        @Args() args: UpdateManyProfileArgs,
    ): Promise<any> {
        this.logger.log(args, 'GraphQL请求参数');
        return await prisma.profile.updateMany(args);
    }

    /**
     * 删除多个Profile
     *  @param args 请求参数
     * @returns 返回
     */
    @Mutation(() => AffectedRows, { nullable: true })
    async deleteManyProfiles(
        @Args() args: DeleteManyProfileArgs,
    ): Promise<any> {
        this.logger.log(args, 'GraphQL请求参数');
        return await prisma.profile.deleteMany(args);
    }
}
