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
                    // 所有的执行方法记录下来用于willSendResponse
                    requestContext.context.realAllFunc = allFuncList;
                    // 让多任务只走 multiTasking 方法
                    requestContext.operation.selectionSet.selections =
                        multiTaskFunc;
                }
            },
            /**
             * 干预最后服务器响应graphql的执行，针对多任务的情况，将有异常的数据，放到data中展示出来。
             */
            async willSendResponse(requestContext) {
                if (requestContext.context.multiTaskQuery) {
                    // 需要将所有的执行方法重新放回原处 否则会出现再次请求失效的情况
                    requestContext.operation.selectionSet.selections =
                        requestContext.context.realAllFunc;
                    if (
                        requestContext.response.data &&
                        requestContext.response.data.multiTasking
                    ) {
                        // 重组返回信息
                        for (const item of requestContext.response.data
                            .multiTasking.data) {
                            for (const key in item) {
                                requestContext.response.data[key] = [item[key]];
                            }
                        }
                        // 删除multiTasking方法返回信息
                        delete requestContext.response.data.multiTasking;
                    }
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
