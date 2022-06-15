import {
    Args,
    Info,
    Query,
    Mutation,
    Resolver,
    Context,
} from '@nestjs/graphql';
import { Injectable, UseGuards } from '@nestjs/common';
import { GraphQLResolveInfo } from 'graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { PrismaSelect } from '@paljs/plugins';
import {
    LoggerService,
    GqlAuthGuard,
    MultiTaskError,
    RolesGuard,
} from 'commons/public-module';
import { prisma } from 'commons/public-tool/prisma';
import { selectInfo } from 'commons/public-decorator';
import { Roles } from 'commons/public-module/roles/role.decorator';
import { Role } from 'commons/public-module/roles/role.enum';
import { Simple } from './simple.model';

/**
 * Resolves User object type.
 */
@Injectable()
@Resolver(() => Simple)
export class SimpleResolver {
    constructor(private readonly logger: LoggerService) {}
    /**
     * 自定义GraphQL查询
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Query(() => Simple)
    @UseGuards(GqlAuthGuard)
    async simple(@Args('data') args: string, @Info() info: GraphQLResolveInfo) {
        const select = new PrismaSelect(info).value;
        this.logger.log(select, 'GraphQL请求参数');
        args = Object.assign(args, select);
        return { email: '123@qq.com', name: 'Simple' };
    }

    /**
     * 自定义GraphQL多任务执行
     * @param args 请求参数
     * @param info 返回字段
     * @returns 返回
     */
    @Mutation(() => GraphQLJSONObject)
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @UseGuards(GqlAuthGuard)
    async multiTasking(@Info() info: GraphQLResolveInfo, @Context() ctx: any) {
        try {
            const multiTaskResult = [];
            await prisma.$transaction(async (prisma) => {
                for (const key in ctx.multiTaskQuery) {
                    if (key !== 'multiTasking') {
                        const signSelect = ctx.multiTaskQuery[key].content;
                        const selectObj = selectInfo(signSelect, {});
                        const modelName =
                            ctx.multiTaskQuery[key].optName.substring(9);
                        const prismaModel = modelName.replace(
                            modelName[0],
                            modelName[0].toLowerCase(),
                        );
                        const funcName = ctx.multiTaskQuery[key].optName.substr(
                            0,
                            6,
                        );
                        const selectArgs =
                            selectObj[`${ctx.multiTaskQuery[key].optName}`];
                        const reqArgs = ctx.multiTaskArgs[`${key}`];
                        const result = await prisma[`${prismaModel}`][
                            `${funcName}`
                        ]({
                            ...reqArgs,
                            ...selectArgs,
                        });
                        const keyObj = {};
                        keyObj[`${key}`] = result;
                        multiTaskResult.push(keyObj);
                    }
                }
            });
            return { data: multiTaskResult };
        } catch (error) {
            throw new MultiTaskError('多任务执行异常', {
                variable: error.message,
            });
        }
    }
}
