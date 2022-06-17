import { Info, Mutation, Resolver, Context } from '@nestjs/graphql';
import { Injectable, UseGuards } from '@nestjs/common';
import { GraphQLResolveInfo } from 'graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
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

/**
 * Resolves User object type.
 */
@Injectable()
@Resolver(() => GraphQLJSONObject)
export class MultiTaskResolver {
    constructor(private readonly logger: LoggerService) {}

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
                        // GraphQL原生请求实体
                        const signSelect = ctx.multiTaskQuery[key].content;
                        // 构造prisma查询字段的格式
                        const selectObj = selectInfo(signSelect, {});
                        // 方法createOne updateOne upsertOne deleteOne后的内容 按照生成规则为模型名称
                        const modelName =
                            ctx.multiTaskQuery[key].optName.substring(9);
                        // prisma原生方法中模型为首字母小写
                        const prismaModel = modelName.replace(
                            modelName[0],
                            modelName[0].toLowerCase(),
                        );
                        // 匹配CRUD create update upsert delete
                        const funcName = ctx.multiTaskQuery[key].optName.substr(
                            0,
                            6,
                        );
                        // GraphQL语句的查询字段
                        const selectArgs =
                            selectObj[`${ctx.multiTaskQuery[key].optName}`];
                        // GraphQL语句的请求参数
                        const reqArgs = ctx.multiTaskArgs[`${key}`];
                        // 执行prisma方法
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
