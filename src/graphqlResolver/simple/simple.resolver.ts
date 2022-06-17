import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { Injectable, UseGuards } from '@nestjs/common';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaSelect } from '@paljs/plugins';
import { LoggerService, GqlAuthGuard } from 'commons/public-module';
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
}
