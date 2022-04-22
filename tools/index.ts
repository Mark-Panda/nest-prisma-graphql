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
            const modelName = modelItem.name;
            const workPath = `${rootPath}/services/${lowerModel}`;
            // 创建文件夹
            mkdirSync(workPath);
            // 创建 xx.resolver.ts
            writeFileSync(
                `${rootPath}/services/${lowerModel}/${lowerModel}.resolver.ts`,
                `
                import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
                import { PrismaSelect } from '@paljs/plugins';
                import { prisma } from 'commons/public-tool';
                import { GraphQLResolveInfo } from 'graphql';
                
                import { ${modelName} } from '@generated/${lowerModel}/${lowerModel}.model';
                import { Aggregate${modelName} } from '@generated/${lowerModel}/aggregate-${lowerModel}.output';
                import { ${modelName}AggregateArgs } from '@generated/${lowerModel}/${lowerModel}-aggregate.args';
                import { CreateOne${modelName}Args } from '@generated/${lowerModel}/create-one-${lowerModel}.args';
                import { CreateMany${modelName}Args } from '@generated/${lowerModel}/create-many-${lowerModel}.args';
                import { FindFirst${modelName}Args } from '@generated/${lowerModel}/find-first-${lowerModel}.args';
                import { FindUnique${modelName}Args } from '@generated/${lowerModel}/find-unique-${lowerModel}.args';
                import { FindMany${modelName}Args } from '@generated/${lowerModel}/find-many-${lowerModel}.args';
                import { UpdateOne${modelName}Args } from '@generated/${lowerModel}/update-one-${lowerModel}.args';
                import { UpsertOne${modelName}Args } from '@generated/${lowerModel}/upsert-one-${lowerModel}.args';
                import { DeleteOne${modelName}Args } from '@generated/${lowerModel}/delete-one-${lowerModel}.args';
                // import { ${modelName}GroupByArgs } from '@generated/${lowerModel}/${lowerModel}-group-by.args';
                // import { ${modelName}GroupBy } from '@generated/${lowerModel}/${lowerModel}-group-by.output';
                import { UpdateMany${modelName}Args } from '@generated/${lowerModel}/update-many-${lowerModel}.args';
                import { DeleteMany${modelName}Args } from '@generated/${lowerModel}/delete-many-${lowerModel}.args';
                import { AffectedRows } from '@generated/prisma/affected-rows.output';
                
                
                /**
                 * Resolves ${modelName} object type.
                 */
                @Resolver(() => ${modelName})
                export class ${modelName}Resolver {
                    /**
                     * 查询${modelName}信息
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Query(() => ${modelName})
                    async ${lowerModel}(
                        @Args() args: FindUnique${modelName}Args,
                        @Info() info: GraphQLResolveInfo,
                    ) {
                        const select = new PrismaSelect(info).value;
                        console.log('select', select);
                        args = Object.assign(args, select);
                        return await prisma.${lowerModel}.findUnique(args);
                    }
                
                    /**
                     * 查询${modelName}信息
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Query(() => ${modelName})
                    async ${lowerModel}First(
                        @Args() args: FindFirst${modelName}Args,
                        @Info() info: GraphQLResolveInfo,
                    ) {
                        const select = new PrismaSelect(info).value;
                        console.log('select', select);
                        args = Object.assign(args, select);
                        return await prisma.${lowerModel}.findFirst(args);
                    }
                
                    /**
                     * 查询所有${modelName}
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Query(() => [${modelName}])
                    async ${lowerModel}s(
                        @Args() args: FindMany${modelName}Args,
                        @Info() info: GraphQLResolveInfo,
                    ) {
                        const select = new PrismaSelect(info).value;
                        console.log('select', select);
                        args = Object.assign(args, select);
                        return await prisma.${lowerModel}.findMany(args);
                    }
                
                    /**
                     * 创建${modelName}
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Mutation(() => ${modelName}, { nullable: true })
                    async createOne${modelName}(
                        @Args() args: CreateOne${modelName}Args,
                        @Info() info: GraphQLResolveInfo,
                    ): Promise<any> {
                        const select = new PrismaSelect(info).value;
                        args = Object.assign(args, select);
                        return await prisma.${lowerModel}.create(args);
                    }
                
                    /**
                     * 更新${modelName}信息
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Mutation(() => ${modelName}, { nullable: true })
                    async updateOne${modelName}(
                        @Args() args: UpdateOne${modelName}Args,
                        @Info() info: GraphQLResolveInfo,
                    ): Promise<any> {
                        const select = new PrismaSelect(info).value;
                        console.log('select', select);
                        args = Object.assign(args, select);
                        return await prisma.${lowerModel}.update(args);
                    }
                
                    /**
                     * 修改或新增${modelName}信息
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Mutation(() => ${modelName}, { nullable: true })
                    async upsertOne${modelName}(
                        @Args() args: UpsertOne${modelName}Args,
                        @Info() info: GraphQLResolveInfo,
                    ): Promise<any> {
                        const select = new PrismaSelect(info).value;
                        console.log('select', select);
                        args = Object.assign(args, select);
                        return await prisma.${lowerModel}.upsert(args);
                    }
                
                    /**
                     * 删除${modelName}信息
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Mutation(() => ${modelName}, { nullable: true })
                    async deleteOne${modelName}(
                        @Args() args: DeleteOne${modelName}Args,
                        @Info() info: GraphQLResolveInfo,
                    ) {
                        const select = new PrismaSelect(info).value;
                        console.log('select', select);
                        args = Object.assign(args, select);
                        return await prisma.${lowerModel}.delete(args);
                    }
                
                    /**
                     * ${modelName}统计计算
                     * @param args 请求参数
                     * @param info 返回字段
                     * @returns 返回
                     */
                    @Query(() => Aggregate${modelName})
                    ${lowerModel}Aggregate(
                        @Args() args: ${modelName}AggregateArgs,
                        @Info() info: GraphQLResolveInfo,
                    ) {
                        const select = new PrismaSelect(info).value;
                        console.log('select', select);
                        args = Object.assign(args, select);
                        return prisma.${lowerModel}.aggregate(args);
                    }
                
                    // /**
                    //  * ${modelName}分组
                    //  * @param args 请求参数
                    //  * @param info 返回字段
                    //  * @returns 返回
                    //  */
                    // @Query(() => [${modelName}GroupBy])
                    // async ${lowerModel}GroupBy(
                    //     @Args() args: ${modelName}GroupByArgs,
                    //     @Info() info: GraphQLResolveInfo,
                    // ) {
                    //     const select = new PrismaSelect(info).value;
                    //     console.log('select', select);
                    //     args = Object.assign(args, select);
                    //     return await prisma.${lowerModel}.groupBy(args);
                    // }
                
                    /**
                     * 创建多个${modelName}
                     *  @param args 请求参数
                     * @returns 返回
                     */
                    @Mutation(() => AffectedRows, { nullable: true })
                    async createMany${modelName}s(@Args() args: CreateMany${modelName}Args): Promise<any> {
                        const result = await prisma.${lowerModel}.createMany(args);
                        console.log('result', result);
                        return result;
                    }
                
                    /**
                     * 更新多个${modelName}
                     * @param args 请求参数
                     * @returns 返回
                     */
                    @Mutation(() => AffectedRows, { nullable: true })
                    async updateMany${modelName}s(@Args() args: UpdateMany${modelName}Args): Promise<any> {
                        return await prisma.${lowerModel}.updateMany(args);
                    }
                
                    /**
                     * 删除多个${modelName}
                     *  @param args 请求参数
                     * @returns 返回
                     */
                    @Mutation(() => AffectedRows, { nullable: true })
                    async deleteMany${modelName}s(@Args() args: DeleteMany${modelName}Args): Promise<any> {
                        return await prisma.${lowerModel}.deleteMany(args);
                    }
                }
                                    
                `,
            );
            // 创建 xx.module.ts
            writeFileSync(
                `${rootPath}/services/${lowerModel}/${lowerModel}.module.ts`,
                `
                import { Module } from '@nestjs/common';
                import { ${modelName}Resolver } from './${lowerModel}.resolver';

                @Module({
                    imports: [],
                    providers: [${modelName}Resolver],
                })
                export class ${modelName}Module {}
                `,
            );
            // 追加导出的module文件
            importModules += `import { ${modelName}Module } from './${lowerModel}/${lowerModel}.module';\n`;
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
