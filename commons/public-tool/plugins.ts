import { Plugin } from '@nestjs/apollo';
import {
    ApolloServerPlugin,
    GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import { parse } from 'graphql';

@Plugin()
export class FunctionPlugin implements ApolloServerPlugin {
    async requestDidStart(): Promise<GraphQLRequestListener> {
        return {
            /**
             * 在服务器即将执行document之前进行干预
             */
            async executionDidStart(requestContext) {
                if (
                    requestContext.operation.operation === 'mutation' &&
                    requestContext.operation.selectionSet.selections.length > 1
                ) {
                    // 多任务仅仅走向multiTasking方法
                    const allFuncList: any =
                        requestContext.operation.selectionSet.selections;
                    const multiTaskFunc = allFuncList.filter((filed) => {
                        return filed.name.value === 'multiTasking';
                    });
                    if (multiTaskFunc.length === 0) {
                        throw new Error('未包含必传的multiTasking方法');
                    }
                    const query = requestContext.request.query;
                    const document = parse(query);
                    const executableDefinitionNode: any =
                        document.definitions[0];
                    const { selections } =
                        executableDefinitionNode.selectionSet;
                    const cloneSelections = [...selections],
                        gqls = {};
                    const paramInfo = {};
                    for (
                        let index = 0;
                        index < cloneSelections.length;
                        index++
                    ) {
                        const select = cloneSelections[index];
                        selections.length = 0;
                        selections.push(select);
                        //如果是变量参数请求的，这一步是为了将请求的参数分开到每个请求中
                        if (executableDefinitionNode.variableDefinitions)
                            paramDistribute(
                                select,
                                paramInfo,
                                requestContext.request.variables,
                            );
                        const documentNow = parse(query);
                        const executableDefinitionNodeNow: any =
                            documentNow.definitions[0];
                        gqls[
                            select.alias
                                ? select.alias.value
                                : select.name.value
                        ] = {};
                        // 每个任务的查询参数AST
                        gqls[
                            select.alias
                                ? select.alias.value
                                : select.name.value
                        ]['content'] =
                            executableDefinitionNodeNow.selectionSet.selections.filter(
                                (filed) =>
                                    filed.name.value === select.name.value,
                            );
                        // 每个任务方法真实的请求方法
                        gqls[
                            select.alias
                                ? select.alias.value
                                : select.name.value
                        ]['optName'] = select.name.value;
                    }
                    requestContext.context.multiTaskQuery = gqls;
                    requestContext.context.multiTaskArgs = paramInfo;
                    requestContext.operation.selectionSet.selections =
                        multiTaskFunc;
                }
            },
        };
    }
}

/**
 * 参数分发
 * @param {Array} variableDefinition
 * @param {Object} select
 * @param {Object} document
 * @param {Object} paramInfo
 */
function paramDistribute(select: any, paramInfo: any, argsJson: any) {
    const resObj = {};
    for (let i = 0; i < select.arguments.length; i++) {
        if (argsJson[`${select.arguments[i].value.name.value}`]) {
            resObj[`${select.arguments[i].name.value}`] =
                argsJson[`${select.arguments[i].value.name.value}`];
        }
    }
    paramInfo[select.alias ? select.alias.value : select.name.value] = resObj;
}
