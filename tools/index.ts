import { getSchema } from '@mrleebo/prisma-ast';
import {
    readFileSync,
    mkdirSync,
    writeFileSync,
    rmdirSync,
    existsSync,
    readdirSync,
    statSync,
    unlinkSync,
} from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';
import { kebabCase } from 'lodash';
const rootPath = resolve(process.cwd());

async function autoGenerated() {
    console.log('rootPath', rootPath);
    const souceGql = readFileSync(`${rootPath}/prisma/schema.prisma`, 'utf8');
    const schema = getSchema(souceGql);
    const projectPath = `${rootPath}/services`;
    // 删除项目文件夹
    await deleteall(projectPath);
    // 创建项目文件夹
    mkdirSync(projectPath);
    let exportModules = '';
    let importModules = '';
    for (const modelItem of schema.list) {
        if (modelItem.type === 'model') {
            const lowerModel = modelItem.name.toLowerCase();
            const kebabCaseModel = kebabCase(modelItem.name);
            const modelName = modelItem.name;
            const workPath = `${rootPath}/services/${kebabCaseModel}`;
            // 创建文件夹
            mkdirSync(workPath);
            // 创建 xx.resolver.ts
            writeFileSync(
                `${rootPath}/services/${kebabCaseModel}/${kebabCaseModel}.resolver.ts`,
                `
                import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
                import { PrismaSelect } from '@paljs/plugins';
                import { GraphQLResolveInfo } from 'graphql';
                import { UseGuards } from '@nestjs/common';
                import { LoggerService, GqlAuthGuard } from 'commons/public-module';
                import { prisma } from 'commons/public-tool';

                import { ${modelName} } from '@generated/${kebabCaseModel}/${kebabCaseModel}.model';
                import { Aggregate${modelName} } from '@generated/${kebabCaseModel}/aggregate-${kebabCaseModel}.output';
                import { ${modelName}AggregateArgs } from '@generated/${kebabCaseModel}/${kebabCaseModel}-aggregate.args';
                import { CreateOne${modelName}Args } from '@generated/${kebabCaseModel}/create-one-${kebabCaseModel}.args';
                import { CreateMany${modelName}Args } from '@generated/${kebabCaseModel}/create-many-${kebabCaseModel}.args';
                import { FindFirst${modelName}Args } from '@generated/${kebabCaseModel}/find-first-${kebabCaseModel}.args';
                import { FindUnique${modelName}Args } from '@generated/${kebabCaseModel}/find-unique-${kebabCaseModel}.args';
                import { FindMany${modelName}Args } from '@generated/${kebabCaseModel}/find-many-${kebabCaseModel}.args';
                import { UpdateOne${modelName}Args } from '@generated/${kebabCaseModel}/update-one-${kebabCaseModel}.args';
                import { UpsertOne${modelName}Args } from '@generated/${kebabCaseModel}/upsert-one-${kebabCaseModel}.args';
                import { DeleteOne${modelName}Args } from '@generated/${kebabCaseModel}/delete-one-${kebabCaseModel}.args';
                import { ${modelName}GroupByArgs } from '@generated/${kebabCaseModel}/${kebabCaseModel}-group-by.args';
                import { ${modelName}GroupBy } from '@generated/${kebabCaseModel}/${kebabCaseModel}-group-by.output';
                import { UpdateMany${modelName}Args } from '@generated/${kebabCaseModel}/update-many-${kebabCaseModel}.args';
                import { DeleteMany${modelName}Args } from '@generated/${kebabCaseModel}/delete-many-${kebabCaseModel}.args';
                import { AffectedRows } from '@generated/prisma/affected-rows.output';
                
                
                /**
                 * Resolves ${modelName} object type.
                 */
                @Resolver(() => ${modelName})
                export class ${modelName}Resolver {
                    constructor(private readonly logger: LoggerService) {}
                    /**
                     * 查询${modelName}信息
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Query(() => ${modelName})
                    @UseGuards(GqlAuthGuard)
                    async ${lowerModel}(
                        @Args() args: FindUnique${modelName}Args,
                        @Info() info: GraphQLResolveInfo,
                    ) {
                        const select = new PrismaSelect(info).value;
                        this.logger.log(select, '${modelName}模型单个查询GraphQL请求参数');
                        args = Object.assign(args, select);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        return await prisma.${lowerModel}.findUnique(args);
                    }
                
                    /**
                     * 查询${modelName}信息
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Query(() => ${modelName})
                    @UseGuards(GqlAuthGuard)
                    async ${lowerModel}First(
                        @Args() args: FindFirst${modelName}Args,
                        @Info() info: GraphQLResolveInfo,
                    ) {
                        const select = new PrismaSelect(info).value;
                        this.logger.log(select, '${modelName}模型首个查询GraphQL请求参数');
                        args = Object.assign(args, select);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        return await prisma.${lowerModel}.findFirst(args);
                    }
                
                    /**
                     * 查询所有${modelName}
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Query(() => [${modelName}])
                    @UseGuards(GqlAuthGuard)
                    async ${lowerModel}s(
                        @Args() args: FindMany${modelName}Args,
                        @Info() info: GraphQLResolveInfo,
                    ) {
                        const select = new PrismaSelect(info).value;
                        this.logger.log(select, '${modelName}模型多个查询GraphQL请求参数');
                        args = Object.assign(args, select);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        return await prisma.${lowerModel}.findMany(args);
                    }
                
                    /**
                     * 创建${modelName}
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Mutation(() => ${modelName}, { nullable: true })
                    @UseGuards(GqlAuthGuard)
                    async createOne${modelName}(
                        @Args() args: CreateOne${modelName}Args,
                        @Info() info: GraphQLResolveInfo,
                    ): Promise<any> {
                        const select = new PrismaSelect(info).value;
                        this.logger.log(select, '${modelName}模型单体创建GraphQL请求参数');
                        args = Object.assign(args, select);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        return await prisma.${lowerModel}.create(args);
                    }
                
                    /**
                     * 更新${modelName}信息
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Mutation(() => ${modelName}, { nullable: true })
                    @UseGuards(GqlAuthGuard)
                    async updateOne${modelName}(
                        @Args() args: UpdateOne${modelName}Args,
                        @Info() info: GraphQLResolveInfo,
                    ): Promise<any> {
                        const select = new PrismaSelect(info).value;
                        this.logger.log(select, '${modelName}模型单体更新GraphQL请求参数');
                        args = Object.assign(args, select);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        return await prisma.${lowerModel}.update(args);
                    }
                
                    /**
                     * 修改或新增${modelName}信息
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Mutation(() => ${modelName}, { nullable: true })
                    @UseGuards(GqlAuthGuard)
                    async upsertOne${modelName}(
                        @Args() args: UpsertOne${modelName}Args,
                        @Info() info: GraphQLResolveInfo,
                    ): Promise<any> {
                        const select = new PrismaSelect(info).value;
                        this.logger.log(select, '${modelName}模型单体增补GraphQL请求参数');
                        args = Object.assign(args, select);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        return await prisma.${lowerModel}.upsert(args);
                    }
                
                    /**
                     * 删除${modelName}信息
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Mutation(() => ${modelName}, { nullable: true })
                    @UseGuards(GqlAuthGuard)
                    async deleteOne${modelName}(
                        @Args() args: DeleteOne${modelName}Args,
                        @Info() info: GraphQLResolveInfo,
                    ) {
                        const select = new PrismaSelect(info).value;
                        this.logger.log(select, '${modelName}模型单体删除GraphQL请求参数');
                        args = Object.assign(args, select);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        return await prisma.${lowerModel}.delete(args);
                    }
                
                    /**
                     * ${modelName}统计计算
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Query(() => Aggregate${modelName})
                    @UseGuards(GqlAuthGuard)
                    ${lowerModel}Aggregate(
                        @Args() args: ${modelName}AggregateArgs,
                        @Info() info: GraphQLResolveInfo,
                    ) {
                        const select = new PrismaSelect(info).value;
                        this.logger.log(select, '${modelName}模型统计GraphQL请求参数');
                        args = Object.assign(args, select);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        return prisma.${lowerModel}.aggregate(args);
                    }
                
                    /**
                     * ${modelName}分组
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Query(() => [${modelName}GroupBy])
                    @UseGuards(GqlAuthGuard)
                    async ${lowerModel}GroupBy(
                        @Args() args: ${modelName}GroupByArgs,
                        @Info() info: GraphQLResolveInfo,
                    ) {
                        const select = new PrismaSelect(info).value;
                        this.logger.log(select, '${modelName}模型分组GraphQL请求参数');
                        args = Object.assign(args, select);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        return await prisma.${lowerModel}.groupBy(args);
                    }
                
                    /**
                     * 创建多个${modelName}
                     *  @param args 请求参数
                     * @returns 返回
                     */
                    @Mutation(() => AffectedRows, { nullable: true })
                    @UseGuards(GqlAuthGuard)
                    async createMany${modelName}s(@Args() args: CreateMany${modelName}Args): Promise<any> {
                        this.logger.log(args, '${modelName}模型多个创建GraphQL请求参数');
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        const result = await prisma.${lowerModel}.createMany(args);
                        return result;
                    }
                
                    /**
                     * 更新多个${modelName}
                     * @param args 请求参数
                     * @returns 返回
                     */
                    @Mutation(() => AffectedRows, { nullable: true })
                    @UseGuards(GqlAuthGuard)
                    async updateMany${modelName}s(@Args() args: UpdateMany${modelName}Args): Promise<any> {
                        this.logger.log(args, '${modelName}模型多个更新GraphQL请求参数');
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        return await prisma.${lowerModel}.updateMany(args);
                    }
                
                    /**
                     * 删除多个${modelName}
                     *  @param args 请求参数
                     * @returns 返回
                     */
                    @Mutation(() => AffectedRows, { nullable: true })
                    @UseGuards(GqlAuthGuard)
                    async deleteMany${modelName}s(@Args() args: DeleteMany${modelName}Args): Promise<any> {
                        this.logger.log(args, '${modelName}模型多个删除GraphQL请求参数');
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        return await prisma.${lowerModel}.deleteMany(args);
                    }
                }
                                    
                `,
            );
            // 创建 xx.module.ts
            writeFileSync(
                `${rootPath}/services/${kebabCaseModel}/${kebabCaseModel}.module.ts`,
                `
                import { Module } from '@nestjs/common';
                import { LoggerService } from 'commons/public-module';
                import { PassportModule } from '@nestjs/passport';
                import { JwtModule } from '@nestjs/jwt';
                import { ConfigService } from '@nestjs/config';
                import { AuthService } from 'src/resolver/auth/auth.service';
                import { ${modelName}Resolver } from './${kebabCaseModel}.resolver';

                @Module({
                    imports: [
                        PassportModule,
                        {
                            ...JwtModule.registerAsync({
                                useFactory: (configService: ConfigService) => {
                                    const { secret, expiresIn } = configService.get('jwt');
                                    return { secret, signOptions: { expiresIn } };
                                },
                                inject: [ConfigService],
                            }),
                        },
                    ],
                    providers: [${modelName}Resolver, LoggerService, AuthService],
                })

                export class ${modelName}Module {}
                `,
            );
            // 追加导出的module文件
            importModules += `import { ${modelName}Module } from './${kebabCaseModel}/${kebabCaseModel}.module';\n`;
            exportModules += `${modelName}Module,\n`;
        }
    }
    // 创建 index.ts文件 导出所有的module文件
    writeFileSync(
        `${rootPath}/services/index.ts`,
        `import { Module } from '@nestjs/common';\n` +
            `${importModules}` +
            `@Module({
                imports: [\n` +
            `${exportModules}` +
            `],\n})\nexport class AllModules {}`,
    );
    // 执行格式化文件命令
    console.log('开始格式化业务文件');
    execSync('npm run format:s');
    console.log('文件格式化完成');
}

/**
 * 删除文件夹及其内文件
 * @param path 文件夹路径
 */
async function deleteall(path) {
    let files = [];
    if (existsSync(path)) {
        files = readdirSync(path);
        files.forEach(function (file) {
            const curPath = path + '/' + file;
            if (statSync(curPath).isDirectory()) {
                // recurse
                deleteall(curPath);
            } else {
                // delete file
                unlinkSync(curPath);
            }
        });
        rmdirSync(path);
    }
}

autoGenerated();
